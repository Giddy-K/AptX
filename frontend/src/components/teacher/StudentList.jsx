import { useState, useEffect } from 'react';
import { teacherApi } from '../../api/teacherApi';
import Card from '../common/Card';
import { Users, Mail } from 'lucide-react';
import toast from 'react-hot-toast';

function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await teacherApi.getStudents();
      setStudents(response.data || []);
    } catch (error) {
      toast.error('Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">My Students</h2>
        <p className="text-gray-600">View and manage assigned students</p>
      </div>

      {students.length === 0 ? (
        <Card className="text-center py-12">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Students Yet</h3>
          <p className="text-gray-600">Students will appear here once assigned</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((student) => (
            <Card key={student.id} hover>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold text-lg">
                    {student.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{student.name}</h3>
                  <p className="text-sm text-gray-500 flex items-center">
                    <Mail className="w-3 h-3 mr-1" />
                    {student.email}
                  </p>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                Progress: {student.progressPercentage || 0}%
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default StudentList;
