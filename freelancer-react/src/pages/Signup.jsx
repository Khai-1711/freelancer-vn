import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const [role, setRole] = useState('freelancer');

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 shadow-card space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-black text-[#151d2a]">Tham gia Freelancer hôm nay</h1>
          <p className="text-xs text-slate-500">Đăng ký hoàn toàn miễn phí chỉ trong 30 giây.</p>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-2">Bạn tham gia với vai trò chính nào?</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRole('freelancer')}
              className={`rounded-xl p-3.5 flex flex-col items-center text-center cursor-pointer space-y-1 transition ${
                role === 'freelancer' ? 'border-2 border-[#e60278] bg-pink-50/20' : 'border border-slate-200 hover:border-slate-300'
              }`}
            >
              <span className="text-xs font-bold text-[#151d2a]">💼 Tôi muốn làm việc</span>
              <span className="text-[10px] text-slate-500">Kiếm tiền với tư cách Freelancer</span>
            </button>

            <button
              type="button"
              onClick={() => setRole('client')}
              className={`rounded-xl p-3.5 flex flex-col items-center text-center cursor-pointer space-y-1 transition ${
                role === 'client' ? 'border-2 border-[#e60278] bg-pink-50/20' : 'border border-slate-200 hover:border-slate-300'
              }`}
            >
              <span className="text-xs font-bold text-[#151d2a]">🏢 Tôi muốn thuê</span>
              <span className="text-[10px] text-slate-500">Đăng dự án và tuyển nhân tài</span>
            </button>
          </div>
        </div>

        <form onSubmit={(e) => {
          e.preventDefault();
          alert('Đăng ký thành công!');
          navigate('/onboarding');
        }} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <input type="text" required placeholder="Họ" className="text-xs bg-[#f8f9fa] border border-slate-300 rounded-lg p-3 outline-none" />
            <input type="text" required placeholder="Tên" className="text-xs bg-[#f8f9fa] border border-slate-300 rounded-lg p-3 outline-none" />
          </div>
          <input type="email" required placeholder="Địa chỉ email" className="w-full text-xs bg-[#f8f9fa] border border-slate-300 rounded-lg p-3 outline-none" />
          <input type="password" required placeholder="Mật khẩu" className="w-full text-xs bg-[#f8f9fa] border border-slate-300 rounded-lg p-3 outline-none" />

          <button 
            type="submit" 
            className="w-full py-3.5 bg-[#e60278] hover:bg-[#c70066] text-white text-sm font-bold rounded-xl shadow-sm hover:shadow transition"
          >
            Tham gia Freelancer miễn phí
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2">
          Đã có tài khoản?{' '}
          <Link to="/login" className="text-[#e60278] font-bold hover:underline">
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
}
