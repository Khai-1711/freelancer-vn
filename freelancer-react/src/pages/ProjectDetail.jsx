import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProjectDetail() {
  const [bidAmount, setBidAmount] = useState(28000000);
  const [days, setDays] = useState(20);

  const fee = bidAmount * 0.10;
  const net = bidAmount - fee;

  return (
    <div>
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex text-xs text-slate-500 space-x-2">
            <Link to="/" className="hover:text-slate-800">Trang chủ</Link>
            <span>/</span>
            <Link to="/jobs" className="hover:text-slate-800">Tìm việc làm</Link>
            <span>/</span>
            <span className="text-slate-800 font-medium">Chi tiết dự án #394821</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Left Project Details */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-card space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      ● Đang nhận hồ sơ
                    </span>
                    <span className="text-xs text-slate-400">Đăng 42 phút trước</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#151d2a] leading-snug">
                    Xây dựng Hệ thống Bán vé Trực tuyến & Cổng Thanh toán VNPay
                  </h1>
                </div>

                <div className="sm:text-right shrink-0">
                  <span className="text-xs text-slate-400 block font-medium">Ngân sách dự kiến</span>
                  <div className="text-2xl sm:text-3xl font-black text-[#059669]">25M - 35M VNĐ</div>
                  <span className="text-xs text-slate-500">Giá cố định</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
                <h3 className="font-bold text-base text-[#151d2a]">Mô tả chi tiết công việc</h3>
                <p>
                  Chào các bạn Freelancer, công ty chúng tôi hiện đang cần phát triển một phân hệ Web App bán vé điện tử cho sự kiện âm nhạc và hội thảo với lưu lượng truy cập cao.
                </p>
                <h4 className="font-bold text-sm text-[#151d2a] pt-2">Các tính năng chính yêu cầu:</h4>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600">
                  <li>Thiết kế giao diện mua vé responsive (Next.js 14, Tailwind CSS, TypeScript).</li>
                  <li>Sơ đồ chọn vị trí ghế ngồi trực quan (Interactive Seating Map).</li>
                  <li>Tích hợp cổng thanh toán VNPay và MoMo chuẩn bảo mật chữ ký số HMAC-SHA512.</li>
                  <li>Sinh mã vé điện tử QR Code chống trùng lặp, hỗ trợ app quét mã check-in tại quầy.</li>
                  <li>Hệ thống gửi Email / SMS xác nhận đặt vé tự động sau khi giao dịch thành công.</li>
                </ul>

                <h4 className="font-bold text-sm text-[#151d2a] pt-2">Kỹ năng & Chuyên môn bắt buộc:</h4>
                <div className="flex flex-wrap gap-2 pt-1">
                  {['Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'VNPay Gateway', 'Figma UI/UX'].map(tag => (
                    <span key={tag} className="text-xs bg-slate-100 text-slate-700 font-semibold px-3 py-1.5 rounded-lg border border-slate-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Attachments */}
              <div className="pt-6 border-t border-slate-100">
                <h4 className="font-bold text-sm text-[#151d2a] mb-3">Tài liệu đính kèm</h4>
                <div className="flex items-center space-x-3 p-3 bg-slate-50 border border-slate-200 rounded-lg max-w-md">
                  <span className="text-2xl">📄</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-slate-800 truncate">Software_Requirement_Specification_v1.2.pdf</div>
                    <div className="text-[10px] text-slate-500">2.4 MB • Đã tải lên bởi khách hàng</div>
                  </div>
                  <button className="text-xs text-[#007fed] font-semibold hover:underline">Tải về</button>
                </div>
              </div>
            </div>

            {/* Submitted Bids */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-card space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h3 className="font-bold text-base text-[#151d2a]">Danh sách freelancer đã đặt chào giá (14)</h3>
                <span className="text-xs text-slate-500">Giá trung bình: <strong>28.400.000 VNĐ</strong></span>
              </div>

              <div className="flex items-start space-x-4 pb-4 border-b border-slate-100">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" 
                  className="w-12 h-12 rounded-full object-cover shrink-0" 
                  alt="avatar" 
                />
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-bold text-[#151d2a]">Nguyễn Văn Hùng</h4>
                      <span className="text-xs text-emerald-600 font-semibold">✓ Đã xác minh</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-black text-[#059669]">26.000.000 VNĐ</span>
                      <span className="text-[10px] text-slate-400 block">trong 20 ngày</span>
                    </div>
                  </div>
                  <div className="text-xs text-amber-500 font-medium">⭐ 4.9 (54 đánh giá) • Tỷ lệ hoàn thành 100%</div>
                  <p className="text-xs text-slate-600 pt-1 leading-relaxed">
                    "Chào bạn, tôi có hơn 5 năm kinh nghiệm lập trình Next.js và đã từng tích hợp cổng thanh toán VNPay và OnePay cho 4 sàn vé tại Việt Nam. Tôi cam kết bàn giao đúng hạn có bảo hành 3 tháng."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Bidding Calculator */}
          <aside className="lg:col-span-4 space-y-6 sticky top-24">
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-card space-y-5">
              <div className="pb-3 border-b border-slate-100">
                <h3 className="font-extrabold text-base text-[#151d2a]">Đặt giá thầu cho dự án</h3>
                <p className="text-xs text-slate-500 mt-0.5">Bạn còn <strong>6 lượt chào giá</strong> trong tháng này.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mức giá bạn chào (VNĐ)</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={bidAmount}
                      onChange={(e) => setBidAmount(Number(e.target.value) || 0)}
                      className="w-full text-sm font-bold bg-[#f8f9fa] border border-slate-300 rounded-lg px-3 py-2.5 outline-none focus:border-[#007fed] focus:bg-white transition"
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-semibold">VNĐ</span>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Phí dịch vụ Freelancer (10%):</span>
                    <span className="font-semibold text-slate-700">-{fee.toLocaleString('vi-VN')} VNĐ</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-[#151d2a] pt-2 border-t border-slate-200">
                    <span>Số tiền bạn thực nhận:</span>
                    <span className="text-base font-extrabold text-[#059669]">{net.toLocaleString('vi-VN')} VNĐ</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Dự kiến hoàn thành trong (ngày)</label>
                  <input 
                    type="number" 
                    value={days}
                    onChange={(e) => setDays(Number(e.target.value) || 1)}
                    className="w-full text-sm font-semibold bg-[#f8f9fa] border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-[#007fed] focus:bg-white transition" 
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Đề xuất của bạn (Cover Letter)</label>
                  <textarea 
                    rows={4} 
                    placeholder="Mô tả kinh nghiệm, lý do bạn là ứng viên phù hợp nhất và lộ trình thực hiện công việc..."
                    className="w-full text-xs bg-[#f8f9fa] border border-slate-300 rounded-lg p-3 outline-none focus:border-[#007fed] focus:bg-white transition"
                  />
                </div>

                <button 
                  onClick={() => alert('Đã gửi đề xuất chào giá thành công!')}
                  className="w-full py-3 px-4 bg-[#e60278] hover:bg-[#c70066] text-white text-sm font-bold rounded-lg shadow-sm hover:shadow transition card-transition transform active:scale-98"
                >
                  Gửi Đề Xuất Chào Giá
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
