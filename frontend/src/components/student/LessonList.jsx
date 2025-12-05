import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { studentApi } from '../../api/studentApi';
import Button from '../common/Button';
import { BookOpen, Play, CheckCircle } from 'lucide-react';

function LessonList({ speak, audioEnabled }) {
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLessons();
    if (audioEnabled) {
      speak('Here are your lessons. Tap on any lesson to start learning!');
    }
  }, []);

  const fetchLessons = async () => {
    try {
      const response = await studentApi.getLessons();
      setLessons(response.data || []);
    } catch (error) {
      console.error('Failed to fetch lessons:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLessonClick = (lesson) => {
    if (audioEnabled) {
      speak(`Starting ${lesson.title}`);
    }
    navigate(`/student/lesson/${lesson.id}`);
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">⏳</div>
        <p className="text-2xl font-semibold text-gray-900">Loading your lessons...</p>
      </div>
    );
  }

  if (lessons.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-8xl mb-6">📚</div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">No Lessons Yet</h2>
        <p className="text-xl text-gray-600">
          Your teacher will add lessons soon!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">My Lessons</h2>
        <p className="text-xl text-gray-600">Choose a lesson to start learning</p>
      </div>

      {/* Lessons Grid - Large Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {lessons.map((lesson, index) => (
          <button
            key={lesson.id}
            onClick={() => handleLessonClick(lesson)}
            onMouseEnter={() => audioEnabled && speak(lesson.title)}
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition transform hover:scale-105 text-left border-4 border-transparent hover:border-primary-400"
          >
            {/* Lesson Number */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-6xl">{lesson.emoji || '📖'}</span>
              {lesson.completed && (
                <CheckCircle className="w-12 h-12 text-success-600" />
              )}
            </div>

            {/* Lesson Info */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-primary-600 font-bold text-xl">
                  Lesson {index + 1}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                {lesson.title}
              </h3>
              <p className="text-gray-600 text-lg">
                {lesson.duration || 15} minutes
              </p>
            </div>

            {/* Action Button */}
            <div className="mt-6">
              <div className="flex items-center justify-center space-x-2 accessible-button bg-primary-600 text-white rounded-xl py-4">
                <Play className="w-6 h-6" />
                <span className="font-bold text-xl">
                  {lesson.completed ? 'Review Again' : 'Start Learning'}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Progress Summary */}
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="text-5xl mb-4">🎯</div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Progress</h3>
        <p className="text-xl text-gray-600 mb-4">
          You've completed {lessons.filter(l => l.completed).length} out of {lessons.length} lessons
        </p>
        <div className="w-full bg-gray-200 rounded-full h-6">
          <div
            className="bg-success-600 h-6 rounded-full transition-all duration-500"
            style={{
              width: `${(lessons.filter(l => l.completed).length / lessons.length) * 100}%`
            }}
          />
        </div>
        <p className="text-lg font-semibold text-success-600 mt-2">
          {Math.round((lessons.filter(l => l.completed).length / lessons.length) * 100)}% Complete
        </p>
      </div>
    </div>
  );
}

export default LessonList;
