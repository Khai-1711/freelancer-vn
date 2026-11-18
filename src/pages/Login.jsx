import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 shadow-card space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-black text-[#151d2a]">Chào mừng trở lại</h1>
          <p className="text-xs text-slate-500">Đăng nhập để quản lý công việc và dự án của bạn.</p>
        </div>

        <form onSubmit={(e) => {
          e.preventDefault();
          alert('Đăng nhập thành công!');
          navigate('/');
        }} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email hoặc Tên người dùng</label>
            <input 
              type="text" 
              required 
              defaultValue="phun4@example.com"
              className="w-full text-xs bg-[#f8f9fa] border border-slate-300 rounded-lg p-3 outline-none focus:border-[#007fed] focus:bg-white font-medium transition" 
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-slate-700">Mật khẩu</label>
              <a href="#" className="text-[11px] font-semibold text-[#007fed] hover:underline">Quên mật khẩu?</a>
            </div>
            <input 
              type="password" 
              required 
              defaultValue="password123"
              className="w-full text-xs bg-[#f8f9fa] border border-slate-300 rounded-lg p-3 outline-none focus:border-[#007fed] focus:bg-white font-medium transition" 
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-3 bg-[#e60278] hover:bg-[#c70066] text-white text-sm font-bold rounded-xl shadow-sm hover:shadow transition"
          >
            Đăng nhập vào tài khoản
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2">
          Chưa có tài khoản?{' '}
          <Link to="/signup" className="text-[#e60278] font-bold hover:underline">
            Đăng ký ngay
          </Link>
        </div>
      </div>
    </div>
  );
}
