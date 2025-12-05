const { initializeDocumentAI } = require('../../config/google-cloud');
const { initializeStorage, buckets } = require('../../config/google-cloud');
const logger = require('../../utils/logger');
const fs = require('fs').promises;

/**
 * Document AI Service
 * Handles PDF/DOCX extraction using Google Cloud Document AI
 */
class DocumentAIService {
  constructor() {
    this.client = null;
    this.processorName = null;
  }

  /**
   * Initialize Document AI client
   */
  async initialize() {
    if (!this.client) {
      this.client = initializeDocumentAI();
      const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
      const location = process.env.DOCUMENT_AI_LOCATION || 'us';
      const processorId = process.env.DOCUMENT_AI_PROCESSOR_ID;

      this.processorName = `projects/${projectId}/locations/${location}/processors/${processorId}`;
    }
  }

  /**
   * Process document and extract text
   */
  async processDocument(filePath, mimeType) {
    try {
      await this.initialize();

      // Read file content
      const fileContent = await fs.readFile(filePath);
      const encodedFile = Buffer.from(fileContent).toString('base64');

      // Prepare request
      const request = {
        name: this.processorName,
        rawDocument: {
          content: encodedFile,
          mimeType: mimeType,
        },
      };

      // Process document
      logger.info('Processing document with Document AI', { filePath, mimeType });
      const [result] = await this.client.processDocument(request);

      const { document } = result;

      // Extract text and structure
      const extractedData = {
        text: document.text,
        pages: this.extractPages(document),
        entities: this.extractEntities(document),
        tables: this.extractTables(document),
        paragraphs: this.extractParagraphs(document),
      };

      logger.info('Document processed successfully', {
        textLength: extractedData.text.length,
        pageCount: extractedData.pages.length,
      });

      return extractedData;
    } catch (error) {
      logger.error('Document AI processing failed', { error: error.message });
      throw new Error(`Failed to process document: ${error.message}`);
    }
  }

  /**
   * Extract pages information
   */
  extractPages(document) {
    if (!document.pages) return [];

    return document.pages.map((page, index) => ({
      pageNumber: index + 1,
      width: page.dimension?.width,
      height: page.dimension?.height,
      blocks: page.blocks?.length || 0,
      lines: page.lines?.length || 0,
      tokens: page.tokens?.length || 0,
    }));
  }

  /**
   * Extract entities (key concepts)
   */
  extractEntities(document) {
    if (!document.entities) return [];

    return document.entities.map((entity) => ({
      type: entity.type,
      mentionText: entity.mentionText,
      confidence: entity.confidence,
    }));
  }

  /**
   * Extract tables
   */
  extractTables(document) {
    if (!document.pages) return [];

    const tables = [];

    document.pages.forEach((page) => {
      if (page.tables) {
        page.tables.forEach((table) => {
          const tableData = {
            rows: table.bodyRows?.length || 0,
            columns: table.headerRows?.[0]?.cells?.length || 0,
            content: this.extractTableContent(table, document.text),
          };
          tables.push(tableData);
        });
      }
    });

    return tables;
  }

  /**
   * Extract table content
   */
  extractTableContent(table, fullText) {
    const rows = [];

    // Header rows
    if (table.headerRows) {
      table.headerRows.forEach((row) => {
        const cells = row.cells.map((cell) => this.getTextFromLayout(cell.layout, fullText));
        rows.push(cells);
      });
    }

    // Body rows
    if (table.bodyRows) {
      table.bodyRows.forEach((row) => {
        const cells = row.cells.map((cell) => this.getTextFromLayout(cell.layout, fullText));
        rows.push(cells);
      });
    }

    return rows;
  }

  /**
   * Extract paragraphs
   */
  extractParagraphs(document) {
    if (!document.pages) return [];

    const paragraphs = [];

    document.pages.forEach((page) => {
      if (page.paragraphs) {
        page.paragraphs.forEach((paragraph) => {
          const text = this.getTextFromLayout(paragraph.layout, document.text);
          paragraphs.push({
            text: text.trim(),
            confidence: paragraph.layout?.confidence,
          });
        });
      }
    });

    return paragraphs;
  }

  /**
   * Get text from layout
   */
  getTextFromLayout(layout, fullText) {
    if (!layout || !layout.textAnchor) return '';

    const textSegments = layout.textAnchor.textSegments || [];
    let text = '';

    textSegments.forEach((segment) => {
      const startIndex = parseInt(segment.startIndex || 0, 10);
      const endIndex = parseInt(segment.endIndex || 0, 10);
      text += fullText.substring(startIndex, endIndex);
    });

    return text;
  }

  /**
   * Extract curriculum content structure
   */
  extractCurriculumStructure(extractedData) {
    const { text, paragraphs, entities } = extractedData;

    // Identify sections, topics, and key concepts
    const structure = {
      title: this.extractTitle(paragraphs),
      sections: this.identifySections(paragraphs),
      keyTerms: entities.filter((e) => e.confidence > 0.7).map((e) => e.mentionText),
      fullText: text,
    };

    return structure;
  }

  /**
   * Extract document title
   */
  extractTitle(paragraphs) {
    // Assume first paragraph is title
    if (paragraphs.length > 0) {
      return paragraphs[0].text;
    }
    return 'Untitled';
  }

  /**
   * Identify sections in document
   */
  identifySections(paragraphs) {
    const sections = [];
    let currentSection = null;

    paragraphs.forEach((para) => {
      const text = para.text;

      // Simple heuristic: short paragraphs with certain patterns might be headers
      const isHeader =
        text.length < 100 &&
        (text.match(/^chapter|^section|^unit|^\d+\./i) || text === text.toUpperCase());

      if (isHeader) {
        if (currentSection) {
          sections.push(currentSection);
        }
        currentSection = {
          title: text,
          content: [],
        };
      } else if (currentSection) {
        currentSection.content.push(text);
      }
    });

    if (currentSection) {
      sections.push(currentSection);
    }

    return sections;
  }
}

module.exports = new DocumentAIService();
