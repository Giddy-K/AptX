import { useState, useEffect } from 'react';
import { guardianApi } from '../../api/guardianApi';
import Card from '../common/Card';
import { TrendingUp, CheckCircle, Clock } from 'lucide-react';

function StudentProgress() {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [progress, setProgress] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    if (selectedStudent) {
      fetchProgress();
    }
  }, [selectedStudent]);

  const fetchStudents = async () => {
    try {
      const response = await guardianApi.getStudents();
      const studentList = response.data || [];
      setStudents(studentList);
      if (studentList.length > 0) {
        setSelectedStudent(studentList[0].id);
      }
    } catch (error) {
      console.error('Failed to fetch students:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProgress = async () => {
    try {
      const response = await guardianApi.getStudentProgress(selectedStudent);
      setProgress(response.data);
    } catch (error) {
      console.error('Failed to fetch progress:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (students.length === 0) {
    return (
      <Card className="text-center py-12">
        <p className="text-gray-600">No students assigned yet</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Student Progress</h2>
        <p className="text-gray-600">Track learning achievements and milestones</p>
      </div>

      {/* Student Selector */}
      <Card>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Student
        </label>
        <select
          className="input"
          value={selectedStudent}
          onChange={(e) => setSelectedStudent(e.target.value)}
        >
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name}
            </option>
          ))}
        </select>
      </Card>

      {/* Progress Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-success-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Completed Lessons</p>
              <p className="text-2xl font-bold text-gray-900">
                {progress?.completedLessons?.length || 0}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-primary-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Time Spent</p>
              <p className="text-2xl font-bold text-gray-900">
                {progress?.totalTimeSpent || 0} min
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <TrendingUp className="w-8 h-8 text-warning-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Overall Progress</p>
              <p className="text-2xl font-bold text-gray-900">
                {progress?.overallProgress || 0}%
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center py-3 border-b border-gray-200 last:border-0">
              <CheckCircle className="w-5 h-5 text-success-600 mr-3" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Completed Math Lesson {i}</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
              <span className="badge badge-success">Completed</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default StudentProgress;
