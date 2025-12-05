const { initializeVertexAI } = require('../../config/google-cloud');
const logger = require('../../utils/logger');

/**
 * Vertex AI Service
 * Handles content simplification and exam generation using Gemini models
 */
class VertexAIService {
  constructor() {
    this.generativeModel = null;
  }

  /**
   * Initialize Vertex AI
   */
  async initialize() {
    if (!this.generativeModel) {
      const { generativeModel } = initializeVertexAI();
      this.generativeModel = generativeModel;
    }
  }

  /**
   * Simplify complex curriculum content for students with Down syndrome
   */
  async simplifyContent(originalContent, options = {}) {
    try {
      await this.initialize();

      const {
        readingLevel = 'elementary',
        maxSentenceLength = 15,
        includeVisualCues = true,
      } = options;

      const prompt = `You are an expert in creating accessible educational content for students with Down syndrome.

Please simplify the following educational content following these guidelines:
- Use simple, clear language at ${readingLevel} reading level
- Keep sentences short (maximum ${maxSentenceLength} words)
- Use active voice
- Break complex ideas into smaller chunks
- Use repetition for key concepts
- Suggest visual aids and emojis where appropriate
${includeVisualCues ? '- Include suggestions for visual learning cards' : ''}

Original Content:
${originalContent}

Please provide the simplified content in the following JSON format:
{
  "simplifiedText": "The simplified content here...",
  "keyPoints": ["point 1", "point 2", ...],
  "vocabulary": [{"word": "difficult word", "simpleDefinition": "easy explanation"}],
  "visualSuggestions": ["suggestion 1", "suggestion 2", ...],
  "emojiCues": {"concept1": "🎨", "concept2": "📚"}
}`;

      logger.info('Simplifying content with Vertex AI');
      const result = await this.generativeModel.generateContent(prompt);
      const response = result.response;
      const text = response.candidates[0].content.parts[0].text;

      // Parse JSON response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const simplifiedContent = JSON.parse(jsonMatch[0]);
        logger.info('Content simplified successfully');
        return simplifiedContent;
      }

      // Fallback if JSON parsing fails
      return {
        simplifiedText: text,
        keyPoints: [],
        vocabulary: [],
        visualSuggestions: [],
        emojiCues: {},
      };
    } catch (error) {
      logger.error('Content simplification failed', { error: error.message });
      throw new Error(`Failed to simplify content: ${error.message}`);
    }
  }

  /**
   * Generate visual learning cards from content
   */
  async generateVisualCards(content, lessonTitle) {
    try {
      await this.initialize();

      const prompt = `Create visual learning cards for students with Down syndrome based on this lesson.

Lesson Title: ${lessonTitle}
Content: ${content}

Generate 5-8 learning cards with:
- Simple title (2-4 words)
- Brief description (1 sentence)
- Suggested visual/image description
- Emoji to represent the concept
- Interactive element suggestion (e.g., "tap to hear", "drag and match")

Provide response in JSON format:
{
  "cards": [
    {
      "title": "Card title",
      "description": "Simple description",
      "visualDescription": "What image or graphic should be shown",
      "emoji": "📝",
      "interactiveElement": "Tap to hear the word",
      "audioText": "Text to be converted to speech"
    }
  ]
}`;

      logger.info('Generating visual cards with Vertex AI');
      const result = await this.generativeModel.generateContent(prompt);
      const response = result.response;
      const text = response.candidates[0].content.parts[0].text;

      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const cardsData = JSON.parse(jsonMatch[0]);
        logger.info('Visual cards generated successfully', {
          cardCount: cardsData.cards.length,
        });
        return cardsData.cards;
      }

      return [];
    } catch (error) {
      logger.error('Visual card generation failed', { error: error.message });
      throw new Error(`Failed to generate visual cards: ${error.message}`);
    }
  }

  /**
   * Generate adaptive exam questions
   */
  async generateExamQuestions(lessonContent, difficulty = 1, questionCount = 10, previousPerformance = null) {
    try {
      await this.initialize();

      const difficultyDescriptions = {
        1: 'Very simple recognition and matching questions',
        2: 'Simple yes/no and multiple choice with images',
        3: 'Basic comprehension with visual support',
        4: 'Moderate comprehension and application',
        5: 'Advanced understanding and reasoning',
      };

      const performanceContext = previousPerformance
        ? `The student previously scored ${previousPerformance.score}% and struggled with: ${previousPerformance.struggles.join(', ')}`
        : 'This is the first assessment';

      const prompt = `Generate ${questionCount} accessible exam questions for a student with Down syndrome.

Lesson Content: ${lessonContent}

Difficulty Level: ${difficulty}/5 - ${difficultyDescriptions[difficulty]}
${performanceContext}

Guidelines:
- Use simple, clear language
- Include visual descriptions for each question
- Provide emoji-based answer options where appropriate
- Make questions engaging and encouraging
- Focus on key concepts
- Avoid trick questions or complex wording

Provide response in JSON format:
{
  "questions": [
    {
      "id": 1,
      "type": "multiple-choice | true-false | matching | selection",
      "question": "Simple, clear question text",
      "visualDescription": "Description of supporting image/visual",
      "options": [
        {"id": "a", "text": "Option text", "emoji": "😊", "isCorrect": true},
        {"id": "b", "text": "Option text", "emoji": "🎨", "isCorrect": false}
      ],
      "correctFeedback": "Encouraging positive feedback with emoji",
      "incorrectFeedback": "Gentle, supportive feedback",
      "audioText": "Question read aloud",
      "hint": "Optional hint if student struggles"
    }
  ]
}`;

      logger.info('Generating exam questions with Vertex AI', { difficulty, questionCount });
      const result = await this.generativeModel.generateContent(prompt);
      const response = result.response;
      const text = response.candidates[0].content.parts[0].text;

      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const examData = JSON.parse(jsonMatch[0]);
        logger.info('Exam questions generated successfully', {
          questionCount: examData.questions.length,
          difficulty,
        });
        return examData.questions;
      }

      return [];
    } catch (error) {
      logger.error('Exam generation failed', { error: error.message });
      throw new Error(`Failed to generate exam: ${error.message}`);
    }
  }

  /**
   * Analyze student performance and suggest next difficulty level
   */
  async analyzePerformance(examResults, currentDifficulty) {
    try {
      await this.initialize();

      const prompt = `Analyze this student performance data and suggest the next appropriate difficulty level.

Current Difficulty: ${currentDifficulty}/5
Exam Results: ${JSON.stringify(examResults, null, 2)}

Consider:
- Score percentage
- Time taken per question
- Number of hints used
- Emotional feedback provided
- Pattern of errors

Provide response in JSON format:
{
  "recommendedDifficulty": 2,
  "reasoning": "Explanation of recommendation",
  "strengths": ["area 1", "area 2"],
  "areasForImprovement": ["area 1", "area 2"],
  "suggestions": ["specific suggestion 1", "suggestion 2"],
  "encouragement": "Positive message for the student"
}`;

      logger.info('Analyzing student performance');
      const result = await this.generativeModel.generateContent(prompt);
      const response = result.response;
      const text = response.candidates[0].content.parts[0].text;

      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const analysis = JSON.parse(jsonMatch[0]);
        logger.info('Performance analysis complete', {
          recommendedDifficulty: analysis.recommendedDifficulty,
        });
        return analysis;
      }

      return {
        recommendedDifficulty: currentDifficulty,
        reasoning: 'Continue at current level',
        strengths: [],
        areasForImprovement: [],
        suggestions: [],
        encouragement: 'Keep up the great work!',
      };
    } catch (error) {
      logger.error('Performance analysis failed', { error: error.message });
      throw new Error(`Failed to analyze performance: ${error.message}`);
    }
  }

  /**
   * Generate encouraging feedback based on student's emotional state
   */
  async generateEmotionalSupport(emotionalState, context = '') {
    try {
      await this.initialize();

      const prompt = `Generate encouraging, supportive feedback for a student with Down syndrome.

Student's Current Emotional State: ${emotionalState}
Context: ${context}

Provide warm, positive, and age-appropriate encouragement that:
- Validates their feelings
- Provides reassurance
- Motivates them to continue
- Uses simple language
- Includes appropriate emojis

Keep the message to 1-2 short sentences.`;

      logger.info('Generating emotional support message');
      const result = await this.generativeModel.generateContent(prompt);
      const response = result.response;
      const text = response.candidates[0].content.parts[0].text;

      return text.trim();
    } catch (error) {
      logger.error('Emotional support generation failed', { error: error.message });
      return 'You are doing great! Keep going! 💪😊';
    }
  }
}

module.exports = new VertexAIService();
