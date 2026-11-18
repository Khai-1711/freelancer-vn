import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const categories = [
    { title: 'Website & IT', count: '14.280 dự án', icon: '💻', bg: 'bg-blue-50', text: 'text-[#007fed]' },
    { title: 'Ứng dụng Mobile', count: '6.850 dự án', icon: '📱', bg: 'bg-pink-50', text: 'text-[#e60278]' },
    { title: 'Thiết kế & Media', count: '9.120 dự án', icon: '🎨', bg: 'bg-purple-50', text: 'text-purple-600' },
    { title: 'AI & Dữ liệu', count: '4.340 dự án', icon: '🤖', bg: 'bg-emerald-50', text: 'text-[#059669]' },
    { title: 'Viết lách & Dịch', count: '5.190 dự án', icon: '✍️', bg: 'bg-amber-50', text: 'text-amber-600' },
    { title: 'SEO & Marketing', count: '3.780 dự án', icon: '📈', bg: 'bg-rose-50', text: 'text-rose-600' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-white border-b border-slate-200 overflow-hidden py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Text */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-pink-50 border border-pink-200 rounded-full px-4 py-1.5 text-xs text-[#e60278] font-bold">
                <span className="w-2 h-2 rounded-full bg-[#e60278] animate-pulse"></span>
                <span>Nền tảng việc làm tự do hàng đầu thế giới</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#151d2a] tracking-tight leading-[1.15]">
                Thuê những <span className="text-[#e60278]">freelancer giỏi nhất</span> cho mọi công việc
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
                Hàng triệu doanh nghiệp nhỏ và tập đoàn toàn cầu tin dùng Freelancer để biến ý tưởng thành hiện thực với chi phí tối ưu và chất lượng bảo đảm.
              </p>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
                <Link 
                  to="/post-project" 
                  className="inline-flex items-center justify-center font-bold bg-[#e60278] hover:bg-[#c70066] text-white px-8 py-3.5 rounded-lg shadow-sm hover:shadow-md transition card-transition text-base"
                >
                  Đăng dự án miễn phí
                </Link>
                <Link 
                  to="/jobs" 
                  className="inline-flex items-center justify-center font-semibold bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 text-slate-800 px-8 py-3.5 rounded-lg transition card-transition text-base"
                >
                  Kiếm tiền Freelancer
                </Link>
              </div>

              <div className="pt-8 grid grid-cols-3 gap-6 border-t border-slate-100">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#151d2a]">91M+</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">Freelancer toàn cầu</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#151d2a]">24M+</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">Dự án đã hoàn thành</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#059669]">98%</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">Khách hàng hài lòng</div>
                </div>
              </div>
            </div>

            {/* Right Hero Interactive Card */}
            <div className="lg:col-span-5 relative">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-card-hover space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Dự án mới đăng</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    ● 14 người đang chào giá
                  </span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-[#151d2a] hover:text-[#e60278] transition cursor-pointer">
                    <Link to="/project-detail">
                      Xây dựng Hệ thống Bán vé Trực tuyến & Payment Gateway
                    </Link>
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    Chúng tôi cần tìm lập trình viên Fullstack có kinh nghiệm về Next.js, Node.js và tích hợp cổng thanh toán (VNPay / Stripe) để hoàn thiện nền tảng trong 30 ngày...
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'].map(tag => (
                      <span key={tag} className="text-xs font-medium bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Ngân sách dự kiến</span>
                    <span className="text-xl font-black text-[#059669]">30.000.000 VNĐ</span>
                  </div>
                  <Link 
                    to="/project-detail" 
                    className="inline-flex items-center text-xs font-bold bg-[#007fed] hover:bg-[#0067c2] text-white px-4 py-2.5 rounded-lg shadow-sm transition"
                  >
                    Xem & Đặt giá thầu
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Companies */}
      <section className="bg-[#f8f9fa] border-b border-slate-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-center text-xs uppercase tracking-widest font-bold text-slate-400 mb-6">
            Được tin cậy bởi các tổ chức và thương hiệu hàng đầu thế giới
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-60 grayscale hover:grayscale-0 transition-all">
            {['Adobe', 'Meta', 'Deloitte', 'IBM', 'Airbus', 'Google Cloud'].map(name => (
              <span key={name} className="font-extrabold text-xl tracking-tight text-slate-700">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#e60278]">Danh mục phổ biến</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#151d2a] mt-1">Cần thực hiện công việc gì?</h2>
            </div>
            <Link to="/jobs" className="mt-3 sm:mt-0 text-sm font-semibold text-[#007fed] hover:text-[#0067c2] flex items-center space-x-1">
              <span>Xem tất cả 2.700+ kỹ năng</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, i) => (
              <Link 
                key={i} 
                to="/jobs" 
                className="bg-[#f8f9fa] hover:bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md rounded-xl p-5 text-center transition card-transition group"
              >
                <div className={`w-12 h-12 mx-auto rounded-full ${cat.bg} ${cat.text} flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition`}>
                  {cat.icon}
                </div>
                <h4 className="text-sm font-bold text-[#151d2a] group-hover:text-[#e60278] transition">{cat.title}</h4>
                <p className="text-xs text-slate-500 mt-1">{cat.count}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 sm:py-20 bg-[#f8f9fa] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#e60278]">Quy trình đơn giản</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#151d2a] mt-1">Cách thức hoạt động tại Freelancer</h2>
            <p className="text-sm text-slate-600 mt-2">Từ đăng tin đến nhận sản phẩm hoàn thiện chỉ với 4 bước minh bạch và an toàn.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { num: '1', title: 'Đăng dự án miễn phí', desc: 'Mô tả công việc bạn cần làm, thiết lập ngân sách và thời hạn hoàn thành chỉ trong 2 phút.', color: 'bg-pink-100 text-[#e60278]' },
              { num: '2', title: 'Chọn Freelancer phù hợp', desc: 'Nhận báo giá từ các chuyên gia hàng đầu. Xem hồ sơ, đánh giá sao và thảo luận trực tiếp.', color: 'bg-blue-100 text-[#007fed]' },
              { num: '3', title: 'Thanh toán an toàn', desc: 'Hệ thống Giữ tiền Milestone: Chỉ giải ngân khi bạn đã nghiệm thu và hoàn toàn hài lòng 100%.', color: 'bg-emerald-100 text-[#059669]' },
              { num: '4', title: 'Nhận kết quả & Đánh giá', desc: 'Nhận bàn giao mã nguồn hoặc file thiết kế gốc, để lại đánh giá uy tín cho freelancer.', color: 'bg-purple-100 text-purple-600' },
            ].map(step => (
              <div key={step.num} className="bg-white border border-slate-200 rounded-xl p-6 shadow-card hover:shadow-md transition card-transition">
                <div className={`w-10 h-10 rounded-lg ${step.color} font-black flex items-center justify-center text-lg mb-4`}>
                  {step.num}
                </div>
                <h4 className="font-bold text-[#151d2a] text-base mb-2">{step.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#151d2a] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Sẵn sàng bắt đầu dự án tuyệt vời tiếp theo?</h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
            Hàng ngàn freelancer hàng đầu Việt Nam và quốc tế đang sẵn sàng hỗ trợ bạn ngay hôm nay.
          </p>
          <div className="flex items-center justify-center space-x-4 pt-2">
            <Link to="/post-project" className="font-bold bg-[#e60278] hover:bg-[#c70066] text-white px-8 py-3.5 rounded-lg shadow transition">
              Đăng dự án ngay
            </Link>
            <Link to="/jobs" className="font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-8 py-3.5 rounded-lg transition">
              Duyệt danh sách việc làm
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
