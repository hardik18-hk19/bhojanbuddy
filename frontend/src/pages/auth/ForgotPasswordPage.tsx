import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Mail, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError('');
      setMessage('');
      setLoading(true);
      await resetPassword(email);
      setMessage('Check your email for password reset instructions');
    } catch (error) {
      setError('Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 px-4 sm:px-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Leaf className="text-primary-green mr-2" size={32} />
          <h1 className="text-2xl font-bold">
            <span className="text-primary-green">Bhojan</span>Buddy
          </h1>
        </div>
        <p className="text-white/80">Reset your password</p>
      </div>

      <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-primary-green/20">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-sm text-red-200">
              {error}
            </div>
          )}

          {message && (
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-sm text-green-200">
              {message}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-primary-green/20 rounded-lg py-2 pl-10 pr-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary-green/50"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-vibrant-yellow text-forest-green font-semibold py-2 px-4 rounded-lg hover:bg-vibrant-yellow/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Sending...' : 'Reset Password'}
          </button>
        </form>
      </div>

      <div className="mt-4 text-center">
        <Link
          to="/login"
          className="inline-flex items-center text-primary-green hover:text-primary-green/80 transition-colors"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Sign In
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;