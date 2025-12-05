import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { studentApi } from '../../api/studentApi';
import Button from '../common/Button';
import { Volume2, ArrowLeft, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

function LessonViewer({ speak, audioEnabled }) {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    startLesson();
    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, [lessonId]);

  const startLesson = async () => {
    try {
      await studentApi.startLesson(lessonId);
      const response = await studentApi.getLesson(lessonId);
      setLesson(response.data);

      if (response.data.audioUrl) {
        const audioElement = new Audio(response.data.audioUrl);
        setAudio(audioElement);
      }

      if (audioEnabled) {
        speak(`Welcome to ${response.data.title}. Let's start learning!`);
      }
    } catch (error) {
      toast.error('Failed to load lesson');
      navigate('/student/lessons');
    } finally {
      setLoading(false);
    }
  };

  const playAudio = () => {
    if (audio) {
      audio.play();
    } else if (audioEnabled) {
      speak(lesson.simplifiedContent || lesson.title);
    }
  };

  const completeLesson = async () => {
    try {
      await studentApi.completeLesson(lessonId, {
        timeSpent: 300,
        comprehensionScore: 85,
      });
      toast.success('🎉 Great job! Lesson completed!');
      if (audioEnabled) {
        speak('Great job! You completed the lesson!');
      }
      setTimeout(() => navigate('/student/lessons'), 2000);
    } catch (error) {
      toast.error('Failed to complete lesson');
    }
  };

  const goToNextCard = () => {
    if (currentCardIndex < (lesson.visualCards?.length || 0) - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      const nextCard = lesson.visualCards[currentCardIndex + 1];
      if (audioEnabled && nextCard) {
        speak(nextCard.title + '. ' + nextCard.description);
      }
    }
  };

  const goToPrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      const prevCard = lesson.visualCards[currentCardIndex - 1];
      if (audioEnabled && prevCard) {
        speak(prevCard.title + '. ' + prevCard.description);
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">⏳</div>
        <p className="text-2xl font-semibold text-gray-900">Loading lesson...</p>
      </div>
    );
  }

  if (!lesson) {
    return <div className="text-center py-20">Lesson not found</div>;
  }

  const currentCard = lesson.visualCards?.[currentCardIndex];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back Button */}
      <Button
        size="lg"
        variant="outline"
        icon={ArrowLeft}
        onClick={() => navigate('/student/lessons')}
        className="accessible-button"
      >
        Back to Lessons
      </Button>

      {/* Lesson Title */}
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="text-7xl mb-4">{lesson.emoji || '📖'}</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{lesson.title}</h1>
        <p className="text-xl text-gray-600">{lesson.subject}</p>
      </div>

      {/* Audio Control */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <Button
          size="xl"
          fullWidth
          icon={Volume2}
          onClick={playAudio}
          className="accessible-button text-2xl"
        >
          🔊 Play Audio
        </Button>
      </div>

      {/* Lesson Content */}
      {lesson.simplifiedContent && (
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">📝 Lesson Content</h2>
          <div className="text-2xl leading-relaxed text-gray-800 space-y-4">
            {lesson.simplifiedContent.split('\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      )}

      {/* Visual Cards */}
      {lesson.visualCards && lesson.visualCards.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              🎴 Learning Card {currentCardIndex + 1} of {lesson.visualCards.length}
            </h2>
          </div>

          {currentCard && (
            <div className="text-center space-y-6">
              <div className="text-9xl">{currentCard.emoji || '📌'}</div>
              <h3 className="text-4xl font-bold text-primary-600">
                {currentCard.title}
              </h3>
              <p className="text-2xl text-gray-700 leading-relaxed">
                {currentCard.description}
              </p>
            </div>
          )}

          {/* Navigation */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            <Button
              size="xl"
              variant="outline"
              onClick={goToPrevCard}
              disabled={currentCardIndex === 0}
              className="accessible-button text-xl"
            >
              ⬅️ Previous
            </Button>
            <Button
              size="xl"
              variant="outline"
              onClick={goToNextCard}
              disabled={currentCardIndex === lesson.visualCards.length - 1}
              className="accessible-button text-xl"
            >
              Next ➡️
            </Button>
          </div>
        </div>
      )}

      {/* Complete Button */}
      <div className="bg-gradient-to-r from-success-500 to-success-600 rounded-2xl shadow-lg p-8">
        <Button
          size="xl"
          fullWidth
          variant="success"
          icon={CheckCircle}
          onClick={completeLesson}
          className="accessible-button bg-white text-success-600 hover:bg-gray-50 text-2xl"
        >
          ✅ I Finished This Lesson!
        </Button>
      </div>
    </div>
  );
}

export default LessonViewer;
