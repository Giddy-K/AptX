import { useState, useEffect } from 'react';
import { teacherApi } from '../../api/teacherApi';
import Card from '../common/Card';
import Button from '../common/Button';
import { BookOpen, Trash2, Eye, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

function CurriculumList() {
  const [curricula, setCurricula] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCurricula();
  }, []);

  const fetchCurricula = async () => {
    try {
      const response = await teacherApi.getCurricula();
      setCurricula(response.data || []);
    } catch (error) {
      toast.error('Failed to load curricula');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this curriculum?')) return;

    try {
      await teacherApi.deleteCurriculum(id);
      toast.success('Curriculum deleted');
      fetchCurricula();
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      processing: 'badge badge-warning',
      ready: 'badge badge-success',
      error: 'badge badge-danger',
    };
    return badges[status] || 'badge';
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Curriculum</h2>
          <p className="text-gray-600">Manage your uploaded learning materials</p>
        </div>
        <Button icon={RefreshCw} onClick={fetchCurricula}>
          Refresh
        </Button>
      </div>

      {curricula.length === 0 ? (
        <Card className="text-center py-12">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Curriculum Yet</h3>
          <p className="text-gray-600 mb-4">Upload your first curriculum to get started</p>
          <Button>Upload Curriculum</Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {curricula.map((curriculum) => (
            <Card key={curriculum.id} hover>
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{curriculum.title}</h3>
                    <p className="text-sm text-gray-500">{curriculum.subject}</p>
                  </div>
                  <span className={getStatusBadge(curriculum.status)}>
                    {curriculum.status}
                  </span>
                </div>

                <p className="text-sm text-gray-600 line-clamp-2">
                  {curriculum.description || 'No description'}
                </p>

                <div className="text-xs text-gray-500">
                  Grade: {curriculum.gradeLevel} • {curriculum.lessonsCount || 0} lessons
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <Button size="sm" variant="outline" icon={Eye} fullWidth>
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    icon={Trash2}
                    onClick={() => handleDelete(curriculum.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default CurriculumList;
