import { useState, useEffect } from 'react';
import { teacherApi } from '../../api/teacherApi';
import Card from '../common/Card';
import { BookOpen, Users, Clock, TrendingUp } from 'lucide-react';

function TeacherOverview() {
  const [stats, setStats] = useState({
    curricula: 0,
    students: 0,
    lessons: 0,
    engagement: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch curricula count
        const curriculaResponse = await teacherApi.getCurricula();
        const studentsResponse = await teacherApi.getStudents();

        setStats({
          curricula: curriculaResponse.data?.length || 0,
          students: studentsResponse.data?.length || 0,
          lessons: curriculaResponse.data?.reduce((acc, curr) => acc + (curr.lessonsCount || 0), 0) || 0,
          engagement: 85 // TODO: Calculate from analytics
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Total Curriculum',
      value: stats.curricula,
      icon: BookOpen,
      color: 'bg-primary-500',
      change: '+2 this month'
    },
    {
      title: 'Active Students',
      value: stats.students,
      icon: Users,
      color: 'bg-success-500',
      change: '+5 this month'
    },
    {
      title: 'Total Lessons',
      value: stats.lessons,
      icon: Clock,
      color: 'bg-warning-500',
      change: '+12 this month'
    },
    {
      title: 'Engagement Rate',
      value: `${stats.engagement}%`,
      icon: TrendingUp,
      color: 'bg-blue-500',
      change: '+3% this month'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Overview</h2>
        <p className="text-gray-600">Monitor your teaching activities and student progress</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} hover>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className="text-sm text-success-600 mt-2">{stat.change}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition text-center">
            <BookOpen className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="font-medium text-gray-900">Upload Curriculum</p>
            <p className="text-sm text-gray-500 mt-1">Add new learning materials</p>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="font-medium text-gray-900">Manage Students</p>
            <p className="text-sm text-gray-500 mt-1">View and assign students</p>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="font-medium text-gray-900">View Analytics</p>
            <p className="text-sm text-gray-500 mt-1">Track performance metrics</p>
          </button>
        </div>
      </Card>

      {/* Recent Activity */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center py-3 border-b border-gray-200 last:border-0">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-gray-600" />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-900">Math Curriculum Processed</p>
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

export default TeacherOverview;
