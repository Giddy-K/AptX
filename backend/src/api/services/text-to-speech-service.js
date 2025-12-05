const { initializeTextToSpeech } = require('../../config/google-cloud');
const { uploadToCloudStorage, buckets } = require('../../config/google-cloud');
const logger = require('../../utils/logger');
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

/**
 * Text-to-Speech Service
 * Handles audio generation using Google Cloud Text-to-Speech
 */
class TextToSpeechService {
  constructor() {
    this.client = null;
    this.defaultVoice = {
      languageCode: process.env.TTS_LANGUAGE_CODE || 'en-US',
      name: process.env.TTS_VOICE_NAME || 'en-US-Neural2-C',
      ssmlGender: 'NEUTRAL',
    };
    this.defaultAudioConfig = {
      audioEncoding: process.env.TTS_AUDIO_ENCODING || 'MP3',
      speakingRate: 0.85, // Slightly slower for better comprehension
      pitch: 0,
      volumeGainDb: 0,
    };
  }

  /**
   * Initialize Text-to-Speech client
   */
  async initialize() {
    if (!this.client) {
      this.client = initializeTextToSpeech();
    }
  }

  /**
   * Convert text to speech and upload to Cloud Storage
   */
  async textToSpeech(text, options = {}) {
    try {
      await this.initialize();

      const {
        voice = this.defaultVoice,
        speakingRate = 0.85,
        pitch = 0,
        fileName = `audio-${uuidv4()}.mp3`,
      } = options;

      // Prepare request
      const request = {
        input: { text },
        voice: {
          languageCode: voice.languageCode,
          name: voice.name,
          ssmlGender: voice.ssmlGender,
        },
        audioConfig: {
          audioEncoding: this.defaultAudioConfig.audioEncoding,
          speakingRate,
          pitch,
          volumeGainDb: this.defaultAudioConfig.volumeGainDb,
        },
      };

      logger.info('Generating audio with Text-to-Speech', {
        textLength: text.length,
        voice: voice.name,
      });

      // Generate audio
      const [response] = await this.client.synthesizeSpeech(request);

      // Save temporarily
      const tempDir = path.join(process.cwd(), 'uploads', 'temp');
      await fs.mkdir(tempDir, { recursive: true });
      const tempFilePath = path.join(tempDir, fileName);

      await fs.writeFile(tempFilePath, response.audioContent, 'binary');

      // Upload to Cloud Storage
      const destination = `audio/${fileName}`;
      const audioUrl = await uploadToCloudStorage(
        buckets.MEDIA,
        tempFilePath,
        destination,
        { contentType: 'audio/mpeg' }
      );

      // Clean up temp file
      await fs.unlink(tempFilePath);

      logger.info('Audio generated and uploaded successfully', { audioUrl });

      return {
        audioUrl,
        duration: this.estimateDuration(text, speakingRate),
        fileName: destination,
      };
    } catch (error) {
      logger.error('Text-to-speech generation failed', { error: error.message });
      throw new Error(`Failed to generate audio: ${error.message}`);
    }
  }

  /**
   * Generate audio for lesson content
   */
  async generateLessonAudio(lessonContent, lessonId) {
    try {
      const fileName = `lesson-${lessonId}-${Date.now()}.mp3`;

      const result = await this.textToSpeech(lessonContent, {
        fileName,
        speakingRate: 0.85, // Slower for better comprehension
      });

      logger.info('Lesson audio generated', { lessonId, audioUrl: result.audioUrl });
      return result;
    } catch (error) {
      logger.error('Lesson audio generation failed', { lessonId, error: error.message });
      throw error;
    }
  }

  /**
   * Generate audio for visual cards
   */
  async generateCardAudio(cardText, cardId) {
    try {
      const fileName = `card-${cardId}-${Date.now()}.mp3`;

      const result = await this.textToSpeech(cardText, {
        fileName,
        speakingRate: 0.9,
      });

      logger.info('Card audio generated', { cardId, audioUrl: result.audioUrl });
      return result;
    } catch (error) {
      logger.error('Card audio generation failed', { cardId, error: error.message });
      throw error;
    }
  }

  /**
   * Generate audio for exam questions
   */
  async generateQuestionAudio(questionText, questionId) {
    try {
      const fileName = `question-${questionId}-${Date.now()}.mp3`;

      // Add SSML for better pronunciation and pauses
      const ssmlText = this.wrapWithSSML(questionText);

      const request = {
        input: { ssml: ssmlText },
        voice: this.defaultVoice,
        audioConfig: {
          audioEncoding: this.defaultAudioConfig.audioEncoding,
          speakingRate: 0.85,
          pitch: 0,
        },
      };

      await this.initialize();

      logger.info('Generating question audio', { questionId });
      const [response] = await this.client.synthesizeSpeech(request);

      // Save and upload
      const tempDir = path.join(process.cwd(), 'uploads', 'temp');
      await fs.mkdir(tempDir, { recursive: true });
      const tempFilePath = path.join(tempDir, fileName);

      await fs.writeFile(tempFilePath, response.audioContent, 'binary');

      const destination = `audio/questions/${fileName}`;
      const audioUrl = await uploadToCloudStorage(
        buckets.MEDIA,
        tempFilePath,
        destination,
        { contentType: 'audio/mpeg' }
      );

      await fs.unlink(tempFilePath);

      logger.info('Question audio generated', { questionId, audioUrl });

      return {
        audioUrl,
        duration: this.estimateDuration(questionText, 0.85),
        fileName: destination,
      };
    } catch (error) {
      logger.error('Question audio generation failed', { questionId, error: error.message });
      throw error;
    }
  }

  /**
   * Generate audio for feedback messages
   */
  async generateFeedbackAudio(feedbackText, isPositive = true) {
    try {
      const fileName = `feedback-${Date.now()}.mp3`;

      // Adjust pitch and speaking rate based on feedback type
      const speakingRate = isPositive ? 1.0 : 0.9;
      const pitch = isPositive ? 2 : 0;

      const result = await this.textToSpeech(feedbackText, {
        fileName,
        speakingRate,
        pitch,
      });

      logger.info('Feedback audio generated', { isPositive });
      return result;
    } catch (error) {
      logger.error('Feedback audio generation failed', { error: error.message });
      throw error;
    }
  }

  /**
   * Generate audio for instructions
   */
  async generateInstructionAudio(instructionText, instructionId) {
    try {
      const fileName = `instruction-${instructionId}-${Date.now()}.mp3`;

      const result = await this.textToSpeech(instructionText, {
        fileName,
        speakingRate: 0.8, // Slower for instructions
      });

      logger.info('Instruction audio generated', { instructionId });
      return result;
    } catch (error) {
      logger.error('Instruction audio generation failed', { error: error.message });
      throw error;
    }
  }

  /**
   * Wrap text with SSML for better speech control
   */
  wrapWithSSML(text) {
    return `<speak>
      <prosody rate="slow" pitch="medium">
        ${text}
      </prosody>
      <break time="500ms"/>
    </speak>`;
  }

  /**
   * Estimate audio duration based on text length and speaking rate
   * Average speaking rate: ~150 words per minute at normal speed
   */
  estimateDuration(text, speakingRate = 1.0) {
    const wordCount = text.split(/\s+/).length;
    const baseWordsPerMinute = 150;
    const adjustedWordsPerMinute = baseWordsPerMinute * speakingRate;
    const durationMinutes = wordCount / adjustedWordsPerMinute;
    const durationSeconds = Math.ceil(durationMinutes * 60);

    return durationSeconds;
  }

  /**
   * Batch generate audio for multiple texts
   */
  async batchGenerateAudio(texts, options = {}) {
    try {
      const results = [];

      for (const [index, text] of texts.entries()) {
        const fileName = options.fileNamePrefix
          ? `${options.fileNamePrefix}-${index}-${Date.now()}.mp3`
          : `batch-${index}-${Date.now()}.mp3`;

        const result = await this.textToSpeech(text, {
          ...options,
          fileName,
        });

        results.push(result);
      }

      logger.info('Batch audio generation complete', { count: results.length });
      return results;
    } catch (error) {
      logger.error('Batch audio generation failed', { error: error.message });
      throw error;
    }
  }
}

module.exports = new TextToSpeechService();
