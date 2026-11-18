import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  const navLinks = [
    { label: 'Tìm việc làm', path: '/jobs' },
    { label: 'Thuê Freelancer', path: '/hire' },
    { label: 'Chi tiết dự án', path: '/project-detail' },
    { label: 'Hồ sơ cá nhân', path: '/profile' },
    { label: 'Quy trình Onboarding', path: '/onboarding' },
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-2 group">
            <img 
              src="https://www.f-cdn.com/assets/main/en/assets/freelancer-logo.svg" 
              alt="Freelancer" 
              className="h-8 transition transform group-hover:scale-105" 
            />
          </Link>
          <nav className="hidden lg:flex items-center space-x-6">
            {navLinks.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`h-16 flex items-center px-1 text-sm font-medium transition ${
                    isActive 
                      ? 'text-[#e60278] font-semibold border-b-2 border-[#e60278]' 
                      : 'text-slate-600 hover:text-slate-900 hover:border-b-2 hover:border-slate-300'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center space-x-3 sm:space-x-4">
          <Link 
            to="/login" 
            className="text-sm font-semibold text-slate-700 hover:text-slate-900 px-3 py-2 transition"
          >
            Đăng nhập
          </Link>
          <Link 
            to="/signup" 
            className="hidden sm:inline-flex text-sm font-semibold text-slate-700 hover:text-slate-900 border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 px-4 py-2 rounded-lg transition"
          >
            Đăng ký
          </Link>
          <Link 
            to="/post-project" 
            className="inline-flex items-center justify-center text-sm font-bold bg-[#e60278] hover:bg-[#c70066] text-white px-5 py-2.5 rounded-lg shadow-sm hover:shadow transition transform active:scale-95"
          >
            Đăng dự án
          </Link>
        </div>
      </div>
    </header>
  );
}
