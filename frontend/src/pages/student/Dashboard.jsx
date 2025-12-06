import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { studentApi } from '../../api/studentApi';
import Button from '../../components/common/Button';
import { LogOut, Volume2, Home } from 'lucide-react';
import LessonList from '../../components/student/LessonList';
import LessonViewer from '../../components/student/LessonViewer';
import logo from '../../assets/APTX_logo.png';

function StudentDashboard() {
  const { user, logout } = useAuth();
  const [audioEnabled, setAudioEnabled] = useState(true);

  // Speak function for audio guidance
  const speak = (text) => {
    if (audioEnabled && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8; // Slower speech
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Simple Top Bar */}
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img src={logo} alt="AptX Logo" className="h-12 w-auto" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Hello, {user?.firstName || user?.email?.split('@')[0]}!</h1>
                <p className="text-sm text-gray-600">Ready to learn?</p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-2">
              <Button
                variant={audioEnabled ? 'primary' : 'outline'}
                size="lg"
                icon={Volume2}
                onClick={() => {
                  setAudioEnabled(!audioEnabled);
                  speak(audioEnabled ? 'Audio disabled' : 'Audio enabled');
                }}
                className="accessible-button"
              >
                🔊
              </Button>
              <Button
                variant="ghost"
                size="lg"
                icon={LogOut}
                onClick={logout}
                className="accessible-button"
              >
                Exit
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route
            index
            element={<LessonList speak={speak} audioEnabled={audioEnabled} />}
          />
          <Route
            path="lessons"
            element={<LessonList speak={speak} audioEnabled={audioEnabled} />}
          />
          <Route
            path="lesson/:lessonId"
            element={<LessonViewer speak={speak} audioEnabled={audioEnabled} />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default StudentDashboard;
