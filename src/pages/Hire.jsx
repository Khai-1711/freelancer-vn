import React from 'react';
import { Link } from 'react-router-dom';

export default function Hire() {
  const freelancers = [
    {
      id: 1,
      name: 'Phú Nguyễn (@phun4)',
      role: 'Senior Fullstack Engineer & Cloud Architect',
      rate: '550.000 VNĐ / giờ',
      rating: '⭐ 5.0 (68 đánh giá)',
      location: '📍 Đà Nẵng, Việt Nam',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop',
      bio: 'Hơn 7 năm kinh nghiệm xây dựng hệ thống web app quy mô lớn, backend FastAPI / Django, kiến trúc Microservices và ứng dụng React/Next.js tốc độ cao.',
      skills: ['Python', 'FastAPI', 'React.js', 'Next.js', 'PostgreSQL', 'AWS'],
    },
    {
      id: 2,
      name: 'Lê Hoàng Nam (@namdesign)',
      role: 'Lead Product Designer & Design System Specialist',
      rate: '450.000 VNĐ / giờ',
      rating: '⭐ 4.9 (94 đánh giá)',
      location: '📍 TP. Hồ Chí Minh',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop',
      bio: 'Chuyên gia thiết kế UI/UX trên Figma, xây dựng Design System từ số 0 cho Fintech, Ecommerce và SaaS. Thiết kế giao diện hiện đại, chuẩn nguyên lý thiết kế.',
      skills: ['Figma', 'UI/UX', 'Mobile App', 'Prototyping', 'Tailwind CSS'],
    }
  ];

  return (
    <div>
      <div className="bg-white border-b border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex text-xs text-slate-500 mb-1 space-x-2">
            <Link to="/" className="hover:text-slate-800">Trang chủ</Link>
            <span>/</span>
            <span className="text-slate-800 font-medium">Thuê Freelancer</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#151d2a]">Tìm & Thuê Freelancer Xuất Sắc Nhất</h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">Duyệt qua hồ sơ các chuyên gia công nghệ, thiết kế, marketing đã được xác minh danh tính và năng lực.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-12 space-y-4">
            {freelancers.map(f => (
              <div key={f.id} className="bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-6 shadow-card hover:shadow-card-hover transition card-transition space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start space-x-4">
                    <img src={f.avatar} className="w-16 h-16 rounded-full object-cover border-2 border-white shadow shrink-0" alt="avatar" />
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-bold text-[#151d2a]">
                          <Link to="/profile" className="hover:text-[#e60278] transition">{f.name}</Link>
                        </h3>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-[#007fed] border border-blue-200">
                          ⚡ Top Rated
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-slate-600">{f.role}</div>
                      <div className="flex items-center space-x-3 text-xs text-slate-500 pt-0.5">
                        <span className="text-amber-500 font-bold">{f.rating}</span>
                        <span>{f.location}</span>
                        <span>🏆 100% tỷ lệ hoàn thành</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-left sm:text-right shrink-0">
                    <div className="text-xl font-extrabold text-[#151d2a]">{f.rate}</div>
                    <span className="text-[11px] text-emerald-600 font-semibold block">Sẵn sàng nhận việc</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{f.bio}</p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {f.skills.map(s => (
                    <span key={s} className="text-xs bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded-md">
                      {s}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link to="/profile" className="text-xs text-[#007fed] hover:underline font-bold">Xem hồ sơ đầy đủ →</Link>
                  <div className="flex space-x-2">
                    <button onClick={() => alert('Đã gửi tin nhắn!')} className="text-xs font-semibold px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 transition">
                      Nhắn tin
                    </button>
                    <Link to="/profile" className="text-xs font-bold bg-[#e60278] hover:bg-[#c70066] text-white px-5 py-2 rounded-lg shadow-sm transition">
                      Thuê ngay
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
}
