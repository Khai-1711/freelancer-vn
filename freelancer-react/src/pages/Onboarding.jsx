import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Onboarding() {
  const [rate, setRate] = useState(450000);

  return (
    <div>
      <div className="bg-white border-b border-slate-200 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#e60278]">Dành cho chuyên gia mới</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#151d2a]">Quy Trình Onboarding Freelancer (11 Bước Chuẩn)</h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            Hoàn thiện 11 bước thiết lập hồ sơ chuyên nghiệp để bắt đầu nhận dự án đầu tiên và gia tăng tỷ lệ trúng thầu.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-card space-y-8">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-[#151d2a]">Tiến độ hoàn thiện: <span className="text-[#059669]">6 / 11 bước (55%)</span></span>
              <span className="text-slate-500">Ước tính còn 3 phút</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#007fed] to-[#e60278] rounded-full transition-all duration-500 w-[55%]"></div>
            </div>
          </div>

          <div className="border border-slate-200 rounded-xl p-6 sm:p-8 bg-[#f8f9fa] space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-[#e60278] text-white font-extrabold text-sm flex items-center justify-center shrink-0">6</div>
              <div>
                <h3 className="text-lg font-bold text-[#151d2a]">Bước 6: Thiết lập Mức Giá Theo Giờ & Thời Gian Làm Việc</h3>
                <p className="text-xs text-slate-500">Khách hàng sẽ tham khảo mức giá này khi thuê bạn trực tiếp.</p>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mức giá bạn muốn nhận (VNĐ / giờ)</label>
                <div className="relative max-w-xs">
                  <input 
                    type="number" 
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value) || 0)}
                    className="w-full text-base font-bold bg-white border border-slate-300 rounded-lg p-3 outline-none focus:border-[#007fed]" 
                  />
                  <span className="absolute right-3 top-3.5 text-xs text-slate-400 font-semibold">VNĐ / h</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <Link to="/profile" className="text-xs font-semibold text-slate-600 hover:text-slate-900">← Quay lại</Link>
              <button 
                onClick={() => alert('Đã lưu thiết lập Onboarding!')}
                className="font-bold bg-[#e60278] hover:bg-[#c70066] text-white px-6 py-2.5 rounded-lg shadow-sm transition text-xs"
              >
                Lưu & Tiếp tục →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
