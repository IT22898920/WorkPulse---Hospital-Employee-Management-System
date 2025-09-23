import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Building2, Mail, Lock, AlertCircle, Users, Shield, UserCheck, User } from 'lucide-react';
import { mockLogin } from '../utils/mockAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  const handleQuickLogin = async (role) => {
    console.log('🚀 Quick login initiated for role:', role);
    const { user, token } = mockLogin(role);
    setError('');

    // Use the regular login function to properly set auth state
    // This ensures AuthContext gets updated properly
    try {
      // Simulate the login response format
      const mockLoginResponse = {
        success: true,
        token: token,
        user: user
      };

      // Call the login function with empty credentials since we already have the token
      // We'll modify the login function to handle mock tokens
      const result = await login('', '', mockLoginResponse);

      if (result.success) {
        // Navigate based on role
        const targetPath = role === 'admin' ? '/admin' :
                          role === 'hr' ? '/hr' :
                          role === 'manager' ? '/manager' :
                          role === 'employee' ? '/employee' : '/';

        console.log('🎯 Target path:', targetPath);
        navigate(targetPath);
      }
    } catch (error) {
      console.error('Quick login error:', error);
      // Fallback: trigger the localStorage event and navigate directly
      window.dispatchEvent(new Event('localStorage-changed'));
      setTimeout(() => {
        const targetPath = role === 'admin' ? '/admin' :
                          role === 'hr' ? '/hr' :
                          role === 'manager' ? '/manager' :
                          role === 'employee' ? '/employee' : '/';
        navigate(targetPath);
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
        <div className="text-center">
          <div className="mx-auto w-80 h-24 mb-6 p-3 bg-white rounded-xl shadow-lg border border-gray-100">
            <img
              src="/Logo.png?v=1"
              alt="WorkPulse Logo"
              className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                console.error('Logo failed to load:', e);
                e.target.style.display = 'none';
              }}
            />
          </div>
          <p className="mt-2 text-sm text-gray-600">Hospital Employee Management System</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                id="remember"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm text-blue-600 hover:text-blue-500 transition-colors">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>


        <div className="text-center text-sm text-gray-500 pt-4 border-t border-gray-200">
          Need help? Contact your HR department
        </div>
      </div>
    </div>
  );
};

export default Login;