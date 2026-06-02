import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, BookOpen, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { authApi } from '../api/auth.api';
import { FormInput } from '../components/common/FormInput';
import { Button } from '../components/common/Button';

export const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    fullName: '',
    semester: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const payload = {
        ...formData,
        semester: formData.semester ? parseInt(formData.semester, 10) : undefined,
      };
      const response = await authApi.register(payload);
      if (response.success && response.data) {
        login(response.data.token, response.data.user);
        navigate('/dashboard');
      } else {
        setError(response.message || 'Pendaftaran gagal');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Terjadi kesalahan saat mendaftar');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-dark-bg text-white">
      {/* Left Column - Graphic/Marketing (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#1E1E2E] overflow-hidden flex-col justify-between p-12">
        {/* Background Graphic */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
          style={{ backgroundImage: `url('/Container.png')` }}
        />

        {/* Top Header / Logo Area */}
        <div className="relative z-20 flex items-center gap-3">
          <img src="/icon.svg" alt="StudyCircle" className="w-8 h-8" />
          <span className="text-2xl font-bold text-white tracking-tight">StudyCircle</span>
        </div>

        {/* Middle / Bottom Marketing Text */}
        <div className="relative z-20 max-w-lg mt-auto mb-16">
          <p className="text-gray-400 font-medium mb-3">Jejaring Edukasi Kolektif</p>
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-4">
            Mulai perjalanan akademismu bersama kami.
          </h1>
          <p className="text-gray-400 text-lg">
            Bergabung dengan ribuan mahasiswa lainnya dalam grup belajar yang dinamis dan terstruktur.
          </p>
        </div>

        {/* Footer Links */}
        <div className="relative z-20 flex items-center justify-between text-sm text-gray-500 font-medium">
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-300">Ketentuan Layanan</a>
            <a href="#" className="hover:text-gray-300">Kebijakan Privasi</a>
            <a href="#" className="hover:text-gray-300">Kontak</a>
          </div>
          <p>© 2024 StudyCircle.</p>
        </div>
      </div>

      {/* Right Column - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 overflow-y-auto max-h-screen">
        <div className="w-full max-w-md py-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Daftar Akun Baru</h2>
            <p className="text-gray-400">Lengkapi data diri Anda untuk bergabung ke StudyCircle.</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <FormInput
              label="Nama Lengkap"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Masukkan nama lengkap"
              leadingIcon={<User className="w-5 h-5" />}
            />

            <FormInput
              label="Username"
              name="username"
              required
              value={formData.username}
              onChange={handleChange}
              placeholder="pilih_username"
              leadingIcon={<User className="w-5 h-5" />}
            />

            <FormInput
              label="Email"
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="contoh@kampus.ac.id"
              leadingIcon={<Mail className="w-5 h-5" />}
            />

            <FormInput
              label="Semester (Opsional)"
              type="number"
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              placeholder="Contoh: 3"
              leadingIcon={<BookOpen className="w-5 h-5" />}
            />

            <FormInput
              label="Kata Sandi"
              type={showPassword ? "text" : "password"}
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Buat kata sandi baru"
              leadingIcon={<Lock className="w-5 h-5" />}
              trailingIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              }
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 mt-6"
            >
              {isLoading ? 'Mendaftar...' : 'Daftar Sekarang'} <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-400">
            Sudah punya akun?{' '}
            <Link to="/login" className="text-primary-500 hover:text-primary-400 font-medium">
              Masuk di sini
            </Link>
          </p>

          <div className="lg:hidden mt-12 flex flex-col items-center gap-2 text-xs text-gray-600">
            <div className="flex gap-4">
              <a href="#" className="hover:text-gray-400">Ketentuan Layanan</a>
              <a href="#" className="hover:text-gray-400">Kebijakan Privasi</a>
              <a href="#" className="hover:text-gray-400">Kontak</a>
            </div>
            <p>© 2026 StudyCircle</p>
          </div>
        </div>
      </div>
    </div>
  );
};
