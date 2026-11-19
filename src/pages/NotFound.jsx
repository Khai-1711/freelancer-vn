import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-14rem)] flex items-center justify-center px-4 py-20">
      <div className="max-w-md text-center space-y-5">
        <p className="text-sm font-semibold text-cobalt-400 tabular-nums-mono">404</p>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-50 text-balance">
          Không tìm thấy trang bạn yêu cầu
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          Đường dẫn có thể đã thay đổi hoặc dự án không còn tồn tại trên hệ thống ViecTech.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-cobalt-500 hover:bg-cobalt-600 text-white text-sm font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Về trang chủ
          </Link>
          <Link
            to="/jobs"
            className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-obsidian-850 hover:bg-obsidian-800 border border-white/10 text-slate-200 text-sm font-semibold transition-colors"
          >
            Xem dự án đang mở
          </Link>
        </div>
      </div>
    </div>
  );
}
