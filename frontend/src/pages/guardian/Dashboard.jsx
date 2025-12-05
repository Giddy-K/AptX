import { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  LayoutDashboard,
  Users,
  TrendingUp,
  Bell,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import Button from '../../components/common/Button';
import GuardianOverview from '../../components/guardian/GuardianOverview';
import StudentProgress from '../../components/guardian/StudentProgress';

function GuardianDashboard() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/guardian/dashboard', icon: LayoutDashboard },
    { name: 'My Students', href: '/guardian/students', icon: Users },
    { name: 'Progress', href: '/guardian/progress', icon: TrendingUp },
    { name: 'Notifications', href: '/guardian/notifications', icon: Bell },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <div className="flex items-center">
              <span className="text-2xl mr-2">👨‍👩‍👧</span>
              <span className="text-xl font-bold text-gray-900">AptX</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-success-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-lg">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize">Guardian</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition ${
                    isActive(item.href)
                      ? 'bg-success-50 text-success-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-200">
            <Button variant="ghost" fullWidth icon={LogOut} onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 h-16">
          <div className="flex items-center justify-between h-full px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">
              Guardian Dashboard
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 hidden sm:block">
                {user?.name}
              </span>
            </div>
          </div>
        </header>

        <main className="p-6">
          <Routes>
            <Route index element={<GuardianOverview />} />
            <Route path="dashboard" element={<GuardianOverview />} />
            <Route path="students" element={<div>Students List</div>} />
            <Route path="progress" element={<StudentProgress />} />
            <Route path="notifications" element={<div>Notifications</div>} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default GuardianDashboard;
