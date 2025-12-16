import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { FaLock, FaEnvelope } from 'react-icons/fa';
import toast from 'react-hot-toast';

const schema = yup.object({
  email: yup.string().email('Email tidak valid').required('Email wajib diisi'),
  password: yup.string().min(6, 'Password minimal 6 karakter').required('Password wajib diisi')
}).required();

export default function Login() {
  const navigate = useNavigate();
  const { signIn, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    const result = await signIn(data.email, data.password);

    if (result.success) {
      toast.success('Login berhasil!', {
        duration: 1200,
        icon: '✅',
      });
      // Navigate after short delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 1200);
    } else {
      toast.error(result.error || 'Login gagal. Periksa email dan password Anda.', {
        duration: 4000,
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="framer-card p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 dark:bg-white rounded-2xl mb-4">
              <FaLock className="text-white dark:text-black text-2xl" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Dashboard Login
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Masuk untuk mengelola konten portfolio
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  {...register('email')}
                  type="email"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all text-gray-900 dark:text-white"
                  placeholder="admin@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  {...register('password')}
                  type="password"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all text-gray-900 dark:text-white"
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="framer-btn framer-btn-primary w-full justify-center"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Memproses...</span>
                </div>
              ) : (
                'Masuk ke Dashboard'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Demo: admin@example.com / password123
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
