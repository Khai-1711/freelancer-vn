import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Jobs() {
  const [searchTerm, setSearchTerm] = useState('');

  const jobListings = [
    {
      id: 1,
      badge: 'Nổi bật',
      badgeColor: 'bg-pink-50 text-[#e60278] border-pink-200',
      time: 'Đăng 35 phút trước',
      title: 'Xây dựng Hệ thống Bán vé Trực tuyến & Cổng Thanh toán VNPay',
      budget: '25.000.000 - 35.000.000 VNĐ',
      type: 'Giá cố định • Dự kiến 30 ngày',
      desc: 'Chúng tôi đang cần một lập trình viên Fullstack (ưu tiên Next.js, Node.js, PostgreSQL) để phát triển phân hệ bán vé điện tử có sơ đồ chọn chỗ ngồi trực quan, quét mã QR check-in tại quầy và tích hợp cổng thanh toán VNPay / MoMo...',
      skills: ['Next.js', 'Node.js', 'PostgreSQL', 'VNPay API', 'Tailwind CSS'],
      verified: 'Đã xác minh thanh toán',
      rating: '⭐ 4.9 (18 đánh giá)',
      location: '📍 Hà Nội, Việt Nam',
      bids: '💬 12 chào giá',
    },
    {
      id: 2,
      badge: 'Theo giờ',
      badgeColor: 'bg-blue-50 text-[#007fed] border-blue-200',
      time: 'Đăng 1 giờ trước',
      title: 'Thiết kế UI/UX Trọn Bộ Ứng Dụng Tài Chính Fintech trên Figma',
      budget: '450.000 - 700.000 VNĐ / giờ',
      type: 'Dự án dài hạn • 20 giờ/tuần',
      desc: 'Tìm UI/UX Designer có kinh nghiệm chuyên sâu về Design System, Auto-layout và Responsive Design trong Figma. Cần dựng wireframe và bản thiết kế hoàn chỉnh cho 25+ màn hình Mobile App & Web Dashboard...',
      skills: ['Figma', 'UI/UX Design', 'Design System', 'Mobile App'],
      verified: 'Đã nạp cọc 100%',
      rating: '⭐ 5.0 (42 đánh giá)',
      location: '📍 TP. Hồ Chí Minh',
      bids: '💬 8 chào giá',
    },
    {
      id: 3,
      badge: 'Mới đăng',
      badgeColor: 'bg-emerald-50 text-[#059669] border-emerald-200',
      time: 'Đăng 3 giờ trước',
      title: 'Viết Tool Cào Dữ Liệu Bất Động Sản Bằng Python & Xuất Excel Realtime',
      budget: '8.000.000 VNĐ',
      type: 'Giá cố định • Dự kiến 7 ngày',
      desc: 'Yêu cầu code script Python sử dụng Playwright / Scrapy để cào danh sách tin đăng, số điện thoại, giá và diện tích từ 3 website bất động sản lớn tại VN. Dữ liệu làm sạch và lưu tự động vào Google Sheets / PostgreSQL.',
      skills: ['Python', 'Web Scraping', 'Playwright', 'PostgreSQL'],
      verified: 'Đã xác minh thanh toán',
      rating: '⭐ 4.8 (9 đánh giá)',
      location: '📍 Đà Nẵng',
      bids: '💬 21 chào giá',
    }
  ];

  return (
    <div>
      {/* Page Breadcrumb & Header */}
      <div className="bg-white border-b border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <nav className="flex text-xs text-slate-500 mb-1 space-x-2">
                <Link to="/" className="hover:text-slate-800">Trang chủ</Link>
                <span>/</span>
                <span className="text-slate-800 font-medium">Tìm việc làm</span>
              </nav>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#151d2a]">Tìm Việc Làm & Dự Án Đang Mở</h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">Duyệt qua hàng ngàn dự án freelance mới nhất từ các nhà tuyển dụng tại Việt Nam và toàn cầu.</p>
            </div>

            <div className="w-full md:w-96">
              <div className="relative">
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Tìm theo từ khóa (vd: React, Figma, Python...)" 
                  className="w-full bg-[#f8f9fa] border border-slate-300 focus:border-[#007fed] focus:bg-white text-xs sm:text-sm rounded-lg pl-10 pr-4 py-2.5 outline-none transition"
                />
                <span className="absolute left-3.5 top-3 text-slate-400">🔍</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Filter Sidebar */}
          <aside className="lg:col-span-3 bg-white border border-slate-200 rounded-xl p-5 shadow-card space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-sm text-[#151d2a]">Bộ lọc tìm kiếm</h3>
              <button className="text-xs text-[#007fed] hover:underline font-semibold">Đặt lại</button>
            </div>

            {/* Project Type */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Loại dự án</h4>
              <div className="space-y-2 text-xs">
                {['Giá cố định (Fixed Price)', 'Theo giờ (Hourly)', 'Cuộc thi thiết kế (Contests)'].map((t, idx) => (
                  <label key={t} className="flex items-center space-x-2.5 cursor-pointer">
                    <input type="checkbox" defaultChecked={idx < 2} className="rounded text-[#e60278] focus:ring-[#e60278]" />
                    <span className="text-slate-700 font-medium">{t}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Budget Range */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Ngân sách (VNĐ)</h4>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div>
                  <span className="text-[10px] text-slate-400 block mb-1">Tối thiểu</span>
                  <input type="text" defaultValue="500.000" className="w-full text-xs bg-[#f8f9fa] border border-slate-300 rounded px-2.5 py-1.5 font-medium outline-none" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block mb-1">Tối đa</span>
                  <input type="text" defaultValue="50.000.000" className="w-full text-xs bg-[#f8f9fa] border border-slate-300 rounded px-2.5 py-1.5 font-medium outline-none" />
                </div>
              </div>
              <input type="range" className="w-full accent-[#e60278]" />
            </div>

            {/* Skills Filter */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Kỹ năng phổ biến</h4>
              <div className="space-y-2 text-xs">
                {['JavaScript / React.js', 'Python / Django / FastAPI', 'Figma / UI/UX Design', 'Node.js / Express', 'Flutter / React Native'].map(skill => (
                  <label key={skill} className="flex items-center space-x-2.5 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-[#e60278]" />
                    <span className="text-slate-700">{skill}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Verification */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Xác minh khách hàng</h4>
              <div className="space-y-2 text-xs">
                {['Đã xác minh thanh toán', 'Đã nạp cọc Milestone'].map((v, i) => (
                  <label key={v} className="flex items-center space-x-2.5 cursor-pointer">
                    <input type="checkbox" defaultChecked={i === 0} className="rounded text-[#e60278]" />
                    <span className="text-slate-700">{v}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Right Job Listings */}
          <main className="lg:col-span-9 space-y-4">
            <div className="bg-white border border-slate-200 rounded-xl px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-card">
              <div className="text-xs font-semibold text-slate-700">
                Tìm thấy <span className="text-[#e60278] font-bold">1.482</span> dự án phù hợp
              </div>

              <div className="flex items-center space-x-3 text-xs">
                <span className="text-slate-500">Sắp xếp theo:</span>
                <select className="bg-[#f8f9fa] border border-slate-300 rounded px-3 py-1.5 font-medium outline-none text-slate-700">
                  <option>Mới đăng nhất</option>
                  <option>Ngân sách cao nhất</option>
                  <option>Ít lượt chào giá nhất</option>
                  <option>Thời hạn gấp</option>
                </select>
              </div>
            </div>

            {jobListings.map(job => (
              <div key={job.id} className="bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-6 shadow-card hover:shadow-card-hover transition card-transition space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border uppercase ${job.badgeColor}`}>
                        {job.badge}
                      </span>
                      <span className="text-xs text-slate-400">{job.time}</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#151d2a] hover:text-[#e60278] transition">
                      <Link to="/project-detail">{job.title}</Link>
                    </h3>
                  </div>

                  <div className="text-left sm:text-right shrink-0">
                    <div className="text-xl font-extrabold text-[#059669]">{job.budget}</div>
                    <span className="text-[11px] text-slate-500 font-medium">{job.type}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {job.desc}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {job.skills.map(s => (
                    <span key={s} className="text-xs bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded-md">
                      {s}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center space-x-4 text-slate-500">
                    <span className="flex items-center space-x-1 text-emerald-600 font-medium">
                      <span>✓</span>
                      <span>{job.verified}</span>
                    </span>
                    <span>{job.rating}</span>
                    <span>{job.location}</span>
                    <span>{job.bids}</span>
                  </div>

                  <Link 
                    to="/project-detail" 
                    className="inline-flex items-center justify-center font-bold bg-[#e60278] hover:bg-[#c70066] text-white px-5 py-2 rounded-lg transition shadow-sm text-xs"
                  >
                    Đặt chào giá ngay
                  </Link>
                </div>
              </div>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
}
