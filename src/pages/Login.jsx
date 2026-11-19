import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';

/**
 * Trang Đăng nhập (/login):
 * Kiểm tra định dạng email/mật khẩu inline, hỗ trợ ẩn/hiện mật khẩu
 * và cập nhật ngay phiên tài khoản trên thanh Navbar.
 */
export default function Login() {
  const navigate = useNavigate();
  const { login } = useMarketplace();

  const [email, setEmail] = useState('phun4@viectech.vn');
  const [password, setPassword] = useState('viectech2026');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim().includes('@')) {
      setError('Vui lòng nhập địa chỉ email hợp lệ.');
      return;
    }
    if (password.length < 6) {
      setError('Mật khẩu cần tối thiểu 6 ký tự.');
      return;
    }
    setError('');
    login({
      email: email.trim(),
      name: email.trim().toLowerCase().startsWith('phun4') ? 'Phú Nguyễn' : undefined,
      role: 'freelancer',
    });
    navigate('/jobs');
  };

  return (
    <div className="min-h-[calc(100vh-14rem)] flex items-center justify-center px-4 py-14">
      <div className="w-full max-w-md p-8 rounded-2xl bg-obsidian-850 border border-white/[0.08] space-y-6">
        <div className="space-y-1.5">
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-50">
            Đăng nhập ViecTech
          </h1>
          <p className="text-sm text-slate-400">
            Truy cập danh sách dự án đã lưu, gửi chào giá và quản lý hồ sơ của bạn.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="login-email" className="block text-xs font-semibold text-slate-300 mb-1.5">
              Địa chỉ email
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError('');
              }}
              placeholder="ban@congty.vn"
              className="w-full rounded-lg bg-obsidian-950 border border-white/10 focus:border-cobalt-500 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none"
            />
          </div>

          <div>
            <label htmlFor="login-password" className="block text-xs font-semibold text-slate-300 mb-1.5">
              Mật khẩu
            </label>
            <div className="relative">
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Nhập mật khẩu"
                className="w-full rounded-lg bg-obsidian-950 border border-white/10 focus:border-cobalt-500 pl-4 pr-11 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && <p className="text-xs text-semantic-danger">{error}</p>}

          <button
            type="submit"
            className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 rounded-lg bg-cobalt-500 hover:bg-cobalt-600 text-white text-sm font-semibold transition-colors"
          >
            Đăng nhập
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-white/[0.06] text-center text-sm text-slate-400">
          Chưa có tài khoản?{' '}
          <Link to="/signup" className="text-cobalt-400 font-semibold hover:text-cobalt-300">
            Đăng ký miễn phí
          </Link>
        </div>
      </div>
    </div>
  );
}
