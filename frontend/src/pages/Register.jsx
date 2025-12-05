import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/common/Button';
import { UserPlus, Mail, Lock, User, Users } from 'lucide-react';

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'teacher'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    const { confirmPassword, ...registerData } = formData;
    const result = await register(registerData);

    if (result.success) {
      const { role } = result.user;
      // Navigate based on user role
      if (role === 'teacher') navigate('/teacher/dashboard');
      else if (role === 'guardian') navigate('/guardian/dashboard');
      else if (role === 'student') navigate('/student/dashboard');
    } else {
      setError(result.error || 'Registration failed');
    }

    setLoading(false);
  };

  const roles = [
    { value: 'teacher', label: 'Teacher', icon: '👩‍🏫', description: 'Upload and manage curriculum' },
    { value: 'guardian', label: 'Guardian', icon: '👨‍👩‍👧', description: 'Monitor student progress' },
    { value: 'student', label: 'Student', icon: '🧒', description: 'Learn with accessible content' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        {/* Logo/Brand */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-full mb-4">
            <span className="text-3xl">📚</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900">Join AptX</h2>
          <p className="mt-2 text-sm text-gray-600">
            Create your account and start learning
          </p>
        </div>

        {/* Register Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-gray-900 text-center">
              Create Account
            </h3>
            <p className="mt-2 text-center text-sm text-gray-600">
              Fill in your details to get started
            </p>
          </div>

          {error && (
            <div className="mb-4 bg-danger-50 border border-danger-200 text-danger-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="input pl-10"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  autoComplete="name"
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="input pl-10"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="input pl-10"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    className="input pl-10"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    required
                    minLength={6}
                  />
                </div>
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                I am a...
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {roles.map((role) => (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => setFormData({...formData, role: role.value})}
                    className={`p-4 border-2 rounded-lg text-center transition ${
                      formData.role === role.value
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="text-3xl mb-2">{role.icon}</div>
                    <div className="font-semibold text-gray-900">{role.label}</div>
                    <div className="text-xs text-gray-600 mt-1">{role.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start">
              <input
                id="terms"
                type="checkbox"
                className="h-4 w-4 mt-1 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                I agree to the{' '}
                <Link to="/terms" className="text-primary-600 hover:text-primary-500">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-primary-600 hover:text-primary-500">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              loading={loading}
              icon={UserPlus}
              size="lg"
            >
              Create Account
            </Button>
          </form>

          {/* Login Link */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Already have an account?
                </span>
              </div>
            </div>
            <div className="mt-6">
              <Link to="/login">
                <Button variant="outline" fullWidth>
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
