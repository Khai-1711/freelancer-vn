import React from 'react';
import { Link } from 'react-router-dom';

export default function Profile() {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-card">
          <div className="h-44 sm:h-56 bg-gradient-to-r from-slate-900 via-[#151d2a] to-slate-800 relative"></div>

          <div className="px-6 sm:px-10 pb-8 relative">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 sm:-mt-20 gap-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-end space-y-3 sm:space-y-0 sm:space-x-6">
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-white overflow-hidden bg-slate-200 shadow-lg shrink-0">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop" className="w-full h-full object-cover" alt="avatar" />
                  <span className="absolute bottom-2 right-2 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center space-x-2.5">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-[#151d2a]">Phú Nguyễn</h1>
                    <span className="text-xs font-semibold text-slate-500">@phun4</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-[#007fed] border border-blue-200">
                      ⚡ Top Rated
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-600">Senior Fullstack Engineer & Distributed Systems</p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                    <span className="text-amber-500 font-bold">⭐ 5.0 (68 nhận xét)</span>
                    <span>📍 Đà Nẵng, Việt Nam</span>
                    <span>🏆 100% Hoàn thành đúng hạn</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 shrink-0">
                <button onClick={() => alert('Đã mở hộp thoại!')} className="text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 transition">
                  Gửi tin nhắn
                </button>
                <button onClick={() => alert('Mời nhận việc!')} className="text-xs sm:text-sm font-bold bg-[#e60278] hover:bg-[#c70066] text-white px-6 py-2.5 rounded-lg shadow-sm hover:shadow transition card-transition">
                  Thuê tôi làm việc
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl text-center">
              <div>
                <span className="text-xs text-slate-500 block font-medium">Mức giá theo giờ</span>
                <span className="text-lg font-black text-[#151d2a]">550.000 VNĐ</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block font-medium">Tổng thu nhập</span>
                <span className="text-lg font-black text-[#059669]">850M+ VNĐ</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block font-medium">Dự án hoàn thành</span>
                <span className="text-lg font-black text-[#151d2a]">74 dự án</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block font-medium">Tỷ lệ được thuê lại</span>
                <span className="text-lg font-black text-[#007fed]">94%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-card space-y-4">
          <h3 className="text-base font-bold text-[#151d2a] pb-3 border-b border-slate-100">Giới thiệu bản thân</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Xin chào! Tôi là Phú Nguyễn, một kỹ sư phần mềm với hơn 7 năm kinh nghiệm chuyên sâu trong việc xây dựng các hệ thống web và mobile hiệu năng cao. Tôi chuyên về kiến trúc Backend Python (FastAPI, Django), cơ sở dữ liệu PostgreSQL / MongoDB và phát triển giao diện hiện đại với React, Next.js, Tailwind CSS.
          </p>
        </div>
      </div>
    </div>
  );
}
