import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#151d2a] text-slate-400 pt-16 pb-12 mt-auto border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
          <div className="col-span-2 lg:col-span-1 space-y-4">
            <img 
              src="https://www.f-cdn.com/assets/main/en/assets/freelancer-logo-light.svg" 
              alt="Freelancer" 
              className="h-8 opacity-90" 
            />
            <p className="text-xs text-slate-400 leading-relaxed">
              Freelancer.com là thị trường làm việc tự do và dịch vụ cộng đồng lớn nhất thế giới tính theo tổng số người dùng và công việc.
            </p>
            <div className="flex items-center space-x-3 text-slate-400 pt-2">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 hover:bg-[#007fed] hover:text-white transition cursor-pointer text-xs">FB</span>
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 hover:bg-[#007fed] hover:text-white transition cursor-pointer text-xs">TW</span>
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 hover:bg-[#007fed] hover:text-white transition cursor-pointer text-xs">YT</span>
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 hover:bg-[#007fed] hover:text-white transition cursor-pointer text-xs">IN</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">Freelancer</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/jobs" className="hover:text-white transition">Tìm việc theo danh mục</Link></li>
              <li><Link to="/hire" className="hover:text-white transition">Dự án theo quốc gia</Link></li>
              <li><Link to="/jobs" className="hover:text-white transition">Cuộc thi Freelancer</Link></li>
              <li><Link to="/jobs" className="hover:text-white transition">Dự án AI & Machine Learning</Link></li>
              <li><Link to="/hire" className="hover:text-white transition">Doanh nghiệp Enterprise</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">Khám phá</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/" className="hover:text-white transition">Cách thức hoạt động</Link></li>
              <li><Link to="/onboarding" className="hover:text-white transition">Quy trình bắt đầu</Link></li>
              <li><Link to="/post-project" className="hover:text-white transition">Hướng dẫn bảo mật</Link></li>
              <li><Link to="/profile" className="hover:text-white transition">Hồ sơ xác minh</Link></li>
              <li><a href="#" className="hover:text-white transition">Câu chuyện thành công</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">Giới thiệu</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#" className="hover:text-white transition">Về Freelancer</a></li>
              <li><a href="#" className="hover:text-white transition">Bảo mật & Cam kết</a></li>
              <li><a href="#" className="hover:text-white transition">Cơ hội nghề nghiệp</a></li>
              <li><a href="#" className="hover:text-white transition">Tin tức báo chí</a></li>
              <li><a href="#" className="hover:text-white transition">Biểu phí & Lệ phí</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">Điều khoản</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#" className="hover:text-white transition">Chính sách bảo mật</a></li>
              <li><a href="#" className="hover:text-white transition">Điều khoản sử dụng</a></li>
              <li><a href="#" className="hover:text-white transition">Bản quyền & DMCA</a></li>
              <li><a href="#" className="hover:text-white transition">Quy tắc ứng xử</a></li>
              <li><a href="#" className="hover:text-white transition">Chính sách Cookie</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 space-y-4 md:space-y-0">
          <div>
            © 2026 Freelancer Technology Pty Limited. Đã đăng ký bản quyền.
          </div>
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1.5 cursor-pointer hover:text-slate-200">
              <span>🌐</span>
              <span>Tiếng Việt (VN)</span>
            </span>
            <span className="flex items-center space-x-1.5 cursor-pointer hover:text-slate-200">
              <span>💵</span>
              <span>USD / VNĐ</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
