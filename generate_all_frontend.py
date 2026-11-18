import os
from template_helper import get_header, get_footer

HEAD_TAG = '''<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>__TITLE__</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            brand: {
              pink: '#e60278',
              pinkHover: '#c70066',
              blue: '#007fed',
              blueHover: '#0067c2',
              emerald: '#059669',
              darkNavy: '#151d2a'
            }
          },
          fontFamily: {
            sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif']
          },
          boxShadow: {
            'card': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
            'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.04)',
            'modal': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
          }
        }
      }
    }
  </script>
  <style>
    body { font-family: 'Inter', sans-serif; background-color: #f8f9fa; color: #151d2a; }
    .card-transition { transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1); }
  </style>
</head>
<body class="min-h-screen flex flex-col bg-[#f8f9fa] text-[#151d2a] antialiased">
'''

def get_head(title):
    return HEAD_TAG.replace('__TITLE__', title)


# 1. INDEX.HTML (HOMEPAGE)
def build_index():
    body = f'''{get_head("Freelancer Việt Nam - Thuê Freelancer & Tìm Việc Làm Trực Tuyến")}
  {get_header("home")}

  <!-- Hero Section -->
  <section class="relative bg-white border-b border-slate-200 overflow-hidden py-16 sm:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <!-- Left Hero Text -->
        <div class="lg:col-span-7 space-y-6">
          <div class="inline-flex items-center space-x-2 bg-pink-50 border border-pink-200 rounded-full px-4 py-1.5 text-xs text-[#e60278] font-bold">
            <span class="w-2 h-2 rounded-full bg-[#e60278] animate-pulse"></span>
            <span>Nền tảng việc làm tự do hàng đầu thế giới</span>
          </div>

          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#151d2a] tracking-tight leading-[1.15]">
            Thuê những <span class="text-[#e60278]">freelancer giỏi nhất</span> cho mọi công việc
          </h1>

          <p class="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
            Hàng triệu doanh nghiệp nhỏ và tập đoàn toàn cầu tin dùng Freelancer để biến ý tưởng thành hiện thực với chi phí tối ưu và chất lượng bảo đảm.
          </p>

          <!-- Search or Action CTA -->
          <div class="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
            <a href="post-project.html" class="inline-flex items-center justify-center font-bold bg-[#e60278] hover:bg-[#c70066] text-white px-8 py-3.5 rounded-lg shadow-sm hover:shadow-md transition card-transition text-base">
              Đăng dự án miễn phí
            </a>
            <a href="jobs.html" class="inline-flex items-center justify-center font-semibold bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 text-slate-800 px-8 py-3.5 rounded-lg transition card-transition text-base">
              Kiếm tiền Freelancer
            </a>
          </div>

          <!-- Quick Stats -->
          <div class="pt-8 grid grid-cols-3 gap-6 border-t border-slate-100">
            <div>
              <div class="text-2xl sm:text-3xl font-extrabold text-[#151d2a]">91M+</div>
              <div class="text-xs text-slate-500 font-medium mt-0.5">Freelancer toàn cầu</div>
            </div>
            <div>
              <div class="text-2xl sm:text-3xl font-extrabold text-[#151d2a]">24M+</div>
              <div class="text-xs text-slate-500 font-medium mt-0.5">Dự án đã hoàn thành</div>
            </div>
            <div>
              <div class="text-2xl sm:text-3xl font-extrabold text-[#059669]">98%</div>
              <div class="text-xs text-slate-500 font-medium mt-0.5">Khách hàng hài lòng</div>
            </div>
          </div>
        </div>

        <!-- Right Hero Interactive Card -->
        <div class="lg:col-span-5 relative">
          <div class="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-card-hover space-y-6">
            <div class="flex items-center justify-between pb-4 border-b border-slate-100">
              <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Dự án mới đăng</span>
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                ● 14 người đang chào giá
              </span>
            </div>

            <div class="space-y-3">
              <h3 class="text-xl font-bold text-[#151d2a] hover:text-[#e60278] transition cursor-pointer">
                Xây dựng Hệ thống Bán vé Trực tuyến & Payment Gateway
              </h3>
              <p class="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                Chúng tôi cần tìm lập trình viên Fullstack có kinh nghiệm về Next.js, Node.js và tích hợp cổng thanh toán (VNPay / Stripe) để hoàn thiện nền tảng trong 30 ngày...
              </p>

              <div class="flex flex-wrap gap-1.5 pt-2">
                <span class="text-xs font-medium bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md">Next.js</span>
                <span class="text-xs font-medium bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md">TypeScript</span>
                <span class="text-xs font-medium bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md">Stripe</span>
                <span class="text-xs font-medium bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md">PostgreSQL</span>
              </div>
            </div>

            <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span class="text-xs text-slate-400 block font-medium">Ngân sách dự kiến</span>
                <span class="text-xl font-black text-[#059669]">30.000.000 VNĐ</span>
              </div>
              <a href="project-detail.html" class="inline-flex items-center text-xs font-bold bg-[#007fed] hover:bg-[#0067c2] text-white px-4 py-2.5 rounded-lg shadow-sm transition">
                Xem & Đặt giá thầu
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Trusted Companies Banner -->
  <section class="bg-[#f8f9fa] border-b border-slate-200 py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <p class="text-center text-xs uppercase tracking-widest font-bold text-slate-400 mb-6">
        Được tin cậy bởi các tổ chức và thương hiệu hàng đầu thế giới
      </p>
      <div class="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-60 grayscale hover:grayscale-0 transition-all">
        <span class="font-extrabold text-xl tracking-tight text-slate-700">Adobe</span>
        <span class="font-extrabold text-xl tracking-tight text-slate-700">Meta</span>
        <span class="font-extrabold text-xl tracking-tight text-slate-700">Deloitte</span>
        <span class="font-extrabold text-xl tracking-tight text-slate-700">IBM</span>
        <span class="font-extrabold text-xl tracking-tight text-slate-700">Airbus</span>
        <span class="font-extrabold text-xl tracking-tight text-slate-700">Google Cloud</span>
      </div>
    </div>
  </section>

  <!-- Popular Categories Section -->
  <section class="py-16 sm:py-20 bg-white border-b border-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-[#e60278]">Danh mục phổ biến</span>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-[#151d2a] mt-1">Cần thực hiện công việc gì?</h2>
        </div>
        <a href="jobs.html" class="mt-3 sm:mt-0 text-sm font-semibold text-[#007fed] hover:text-[#0067c2] flex items-center space-x-1">
          <span>Xem tất cả 2.700+ kỹ năng</span>
          <span>→</span>
        </a>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <!-- Cat 1 -->
        <a href="jobs.html?cat=website" class="bg-[#f8f9fa] hover:bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md rounded-xl p-5 text-center transition card-transition group">
          <div class="w-12 h-12 mx-auto rounded-full bg-blue-50 text-[#007fed] flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition">
            💻
          </div>
          <h4 class="text-sm font-bold text-[#151d2a] group-hover:text-[#e60278] transition">Website & IT</h4>
          <p class="text-xs text-slate-500 mt-1">14.280 dự án</p>
        </a>

        <!-- Cat 2 -->
        <a href="jobs.html?cat=mobile" class="bg-[#f8f9fa] hover:bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md rounded-xl p-5 text-center transition card-transition group">
          <div class="w-12 h-12 mx-auto rounded-full bg-pink-50 text-[#e60278] flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition">
            📱
          </div>
          <h4 class="text-sm font-bold text-[#151d2a] group-hover:text-[#e60278] transition">Ứng dụng Mobile</h4>
          <p class="text-xs text-slate-500 mt-1">6.850 dự án</p>
        </a>

        <!-- Cat 3 -->
        <a href="jobs.html?cat=design" class="bg-[#f8f9fa] hover:bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md rounded-xl p-5 text-center transition card-transition group">
          <div class="w-12 h-12 mx-auto rounded-full bg-purple-50 text-purple-600 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition">
            🎨
          </div>
          <h4 class="text-sm font-bold text-[#151d2a] group-hover:text-[#e60278] transition">Thiết kế & Media</h4>
          <p class="text-xs text-slate-500 mt-1">9.120 dự án</p>
        </a>

        <!-- Cat 4 -->
        <a href="jobs.html?cat=ai" class="bg-[#f8f9fa] hover:bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md rounded-xl p-5 text-center transition card-transition group">
          <div class="w-12 h-12 mx-auto rounded-full bg-emerald-50 text-[#059669] flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition">
            🤖
          </div>
          <h4 class="text-sm font-bold text-[#151d2a] group-hover:text-[#e60278] transition">AI & Dữ liệu</h4>
          <p class="text-xs text-slate-500 mt-1">4.340 dự án</p>
        </a>

        <!-- Cat 5 -->
        <a href="jobs.html?cat=writing" class="bg-[#f8f9fa] hover:bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md rounded-xl p-5 text-center transition card-transition group">
          <div class="w-12 h-12 mx-auto rounded-full bg-amber-50 text-amber-600 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition">
            ✍️
          </div>
          <h4 class="text-sm font-bold text-[#151d2a] group-hover:text-[#e60278] transition">Viết lách & Dịch</h4>
          <p class="text-xs text-slate-500 mt-1">5.190 dự án</p>
        </a>

        <!-- Cat 6 -->
        <a href="jobs.html?cat=marketing" class="bg-[#f8f9fa] hover:bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md rounded-xl p-5 text-center transition card-transition group">
          <div class="w-12 h-12 mx-auto rounded-full bg-rose-50 text-rose-600 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition">
            📈
          </div>
          <h4 class="text-sm font-bold text-[#151d2a] group-hover:text-[#e60278] transition">SEO & Marketing</h4>
          <p class="text-xs text-slate-500 mt-1">3.780 dự án</p>
        </a>
      </div>
    </div>
  </section>

  <!-- How It Works Section -->
  <section class="py-16 sm:py-20 bg-[#f8f9fa] border-b border-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="text-center max-w-2xl mx-auto mb-14">
        <span class="text-xs font-bold uppercase tracking-wider text-[#e60278]">Quy trình đơn giản</span>
        <h2 class="text-2xl sm:text-3xl font-extrabold text-[#151d2a] mt-1">Cách thức hoạt động tại Freelancer</h2>
        <p class="text-sm text-slate-600 mt-2">Từ đăng tin đến nhận sản phẩm hoàn thiện chỉ với 4 bước minh bạch và an toàn.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="bg-white border border-slate-200 rounded-xl p-6 shadow-card hover:shadow-md transition card-transition">
          <div class="w-10 h-10 rounded-lg bg-pink-100 text-[#e60278] font-black flex items-center justify-center text-lg mb-4">1</div>
          <h4 class="font-bold text-[#151d2a] text-base mb-2">Đăng dự án miễn phí</h4>
          <p class="text-xs text-slate-600 leading-relaxed">Mô tả công việc bạn cần làm, thiết lập ngân sách và thời hạn hoàn thành chỉ trong 2 phút.</p>
        </div>

        <div class="bg-white border border-slate-200 rounded-xl p-6 shadow-card hover:shadow-md transition card-transition">
          <div class="w-10 h-10 rounded-lg bg-blue-100 text-[#007fed] font-black flex items-center justify-center text-lg mb-4">2</div>
          <h4 class="font-bold text-[#151d2a] text-base mb-2">Chọn Freelancer phù hợp</h4>
          <p class="text-xs text-slate-600 leading-relaxed">Nhận báo giá từ các chuyên gia hàng đầu. Xem hồ sơ, đánh giá sao và thảo luận trực tiếp.</p>
        </div>

        <div class="bg-white border border-slate-200 rounded-xl p-6 shadow-card hover:shadow-md transition card-transition">
          <div class="w-10 h-10 rounded-lg bg-emerald-100 text-[#059669] font-black flex items-center justify-center text-lg mb-4">3</div>
          <h4 class="font-bold text-[#151d2a] text-base mb-2">Thanh toán an toàn</h4>
          <p class="text-xs text-slate-600 leading-relaxed">Hệ thống Giữ tiền Milestone: Chỉ giải ngân khi bạn đã nghiệm thu và hoàn toàn hài lòng 100%.</p>
        </div>

        <div class="bg-white border border-slate-200 rounded-xl p-6 shadow-card hover:shadow-md transition card-transition">
          <div class="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 font-black flex items-center justify-center text-lg mb-4">4</div>
          <h4 class="font-bold text-[#151d2a] text-base mb-2">Nhận kết quả & Đánh giá</h4>
          <p class="text-xs text-slate-600 leading-relaxed">Nhận bàn giao mã nguồn hoặc file thiết kế gốc, để lại đánh giá uy tín cho freelancer.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Banner Section -->
  <section class="py-16 bg-[#151d2a] text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-6">
      <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight">Sẵn sàng bắt đầu dự án tuyệt vời tiếp theo?</h2>
      <p class="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
        Hàng ngàn freelancer hàng đầu Việt Nam và quốc tế đang sẵn sàng hỗ trợ bạn ngay hôm nay.
      </p>
      <div class="flex items-center justify-center space-x-4 pt-2">
        <a href="post-project.html" class="font-bold bg-[#e60278] hover:bg-[#c70066] text-white px-8 py-3.5 rounded-lg shadow transition">
          Đăng dự án ngay
        </a>
        <a href="jobs.html" class="font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-8 py-3.5 rounded-lg transition">
          Duyệt danh sách việc làm
        </a>
      </div>
    </div>
  </section>

  {get_footer()}
</body>
</html>'''
    return body

with open('frontend/index.html', 'w', encoding='utf-8') as f:
    f.write(build_index())
print("Built frontend/index.html")

# 2. JOBS.HTML (BROWSE JOBS & FILTERS)
def build_jobs():
    body = f'''{get_head("Tìm Việc Làm Freelancer & Dự Án Mới Nhất - Freelancer VN")}
  {get_header("jobs")}

  <!-- Page Breadcrumb & Header -->
  <div class="bg-white border-b border-slate-200 py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <nav class="flex text-xs text-slate-500 mb-1 space-x-2">
            <a href="index.html" class="hover:text-slate-800">Trang chủ</a>
            <span>/</span>
            <span class="text-slate-800 font-medium">Tìm việc làm</span>
          </nav>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-[#151d2a]">Tìm Việc Làm & Dự Án Đang Mở</h1>
          <p class="text-xs sm:text-sm text-slate-600 mt-1">Duyệt qua hàng ngàn dự án freelance mới nhất từ các nhà tuyển dụng tại Việt Nam và toàn cầu.</p>
        </div>

        <!-- Search Bar -->
        <div class="w-full md:w-96">
          <div class="relative">
            <input type="text" placeholder="Tìm theo từ khóa (vd: React, Figma, Python...)" 
              class="w-full bg-[#f8f9fa] border border-slate-300 focus:border-[#007fed] focus:bg-white text-xs sm:text-sm rounded-lg pl-10 pr-4 py-2.5 outline-none transition">
            <span class="absolute left-3.5 top-3 text-slate-400">🔍</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Main Content Layout -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 py-8">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

      <!-- Left Filter Sidebar (lg:col-span-3) -->
      <aside class="lg:col-span-3 bg-white border border-slate-200 rounded-xl p-5 shadow-card space-y-6">
        <div class="flex items-center justify-between pb-3 border-b border-slate-200">
          <h3 class="font-bold text-sm text-[#151d2a]">Bộ lọc tìm kiếm</h3>
          <button class="text-xs text-[#007fed] hover:underline font-semibold">Đặt lại</button>
        </div>

        <!-- Project Type -->
        <div>
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Loại dự án</h4>
          <div class="space-y-2 text-xs">
            <label class="flex items-center space-x-2.5 cursor-pointer">
              <input type="checkbox" checked class="rounded text-[#e60278] focus:ring-[#e60278]">
              <span class="text-slate-700 font-medium">Giá cố định (Fixed Price)</span>
            </label>
            <label class="flex items-center space-x-2.5 cursor-pointer">
              <input type="checkbox" checked class="rounded text-[#e60278] focus:ring-[#e60278]">
              <span class="text-slate-700 font-medium">Theo giờ (Hourly)</span>
            </label>
            <label class="flex items-center space-x-2.5 cursor-pointer">
              <input type="checkbox" class="rounded text-[#e60278] focus:ring-[#e60278]">
              <span class="text-slate-700 font-medium">Cuộc thi thiết kế (Contests)</span>
            </label>
          </div>
        </div>

        <!-- Budget Range -->
        <div>
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Ngân sách (VNĐ)</h4>
          <div class="grid grid-cols-2 gap-2 mb-3">
            <div>
              <span class="text-[10px] text-slate-400 block mb-1">Tối thiểu</span>
              <input type="text" value="500.000" class="w-full text-xs bg-[#f8f9fa] border border-slate-300 rounded px-2.5 py-1.5 font-medium outline-none">
            </div>
            <div>
              <span class="text-[10px] text-slate-400 block mb-1">Tối đa</span>
              <input type="text" value="50.000.000" class="w-full text-xs bg-[#f8f9fa] border border-slate-300 rounded px-2.5 py-1.5 font-medium outline-none">
            </div>
          </div>
          <input type="range" class="w-full accent-[#e60278]">
        </div>

        <!-- Skills Filter -->
        <div>
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Kỹ năng phổ biến</h4>
          <div class="space-y-2 text-xs">
            <label class="flex items-center space-x-2.5 cursor-pointer">
              <input type="checkbox" checked class="rounded text-[#e60278]">
              <span class="text-slate-700">JavaScript / React.js</span>
            </label>
            <label class="flex items-center space-x-2.5 cursor-pointer">
              <input type="checkbox" checked class="rounded text-[#e60278]">
              <span class="text-slate-700">Python / Django / FastAPI</span>
            </label>
            <label class="flex items-center space-x-2.5 cursor-pointer">
              <input type="checkbox" checked class="rounded text-[#e60278]">
              <span class="text-slate-700">Figma / UI/UX Design</span>
            </label>
            <label class="flex items-center space-x-2.5 cursor-pointer">
              <input type="checkbox" class="rounded text-[#e60278]">
              <span class="text-slate-700">Node.js / Express</span>
            </label>
            <label class="flex items-center space-x-2.5 cursor-pointer">
              <input type="checkbox" class="rounded text-[#e60278]">
              <span class="text-slate-700">Flutter / React Native</span>
            </label>
          </div>
        </div>

        <!-- Client Verification -->
        <div>
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Xác minh khách hàng</h4>
          <div class="space-y-2 text-xs">
            <label class="flex items-center space-x-2.5 cursor-pointer">
              <input type="checkbox" checked class="rounded text-[#e60278]">
              <span class="text-slate-700">Đã xác minh thanh toán</span>
            </label>
            <label class="flex items-center space-x-2.5 cursor-pointer">
              <input type="checkbox" class="rounded text-[#e60278]">
              <span class="text-slate-700">Đã nạp cọc Milestone</span>
            </label>
          </div>
        </div>
      </aside>

      <!-- Right Job Listings (lg:col-span-9) -->
      <main class="lg:col-span-9 space-y-4">
        <!-- Control Header -->
        <div class="bg-white border border-slate-200 rounded-xl px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-card">
          <div class="text-xs font-semibold text-slate-700">
            Tìm thấy <span class="text-[#e60278] font-bold">1.482</span> dự án phù hợp
          </div>

          <div class="flex items-center space-x-3 text-xs">
            <span class="text-slate-500">Sắp xếp theo:</span>
            <select class="bg-[#f8f9fa] border border-slate-300 rounded px-3 py-1.5 font-medium outline-none text-slate-700">
              <option>Mới đăng nhất</option>
              <option>Ngân sách cao nhất</option>
              <option>Ít lượt chào giá nhất</option>
              <option>Thời hạn gấp</option>
            </select>
          </div>
        </div>

        <!-- Job Card 1 -->
        <div class="bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-6 shadow-card hover:shadow-card-hover transition card-transition space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div class="space-y-1">
              <div class="flex items-center space-x-2">
                <span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-pink-50 text-[#e60278] border border-pink-200 uppercase">
                  Nổi bật
                </span>
                <span class="text-xs text-slate-400">Đăng 35 phút trước</span>
              </div>
              <h3 class="text-lg font-bold text-[#151d2a] hover:text-[#e60278] transition">
                <a href="project-detail.html">Xây dựng Hệ thống Bán vé Trực tuyến & Cổng Thanh toán VNPay</a>
              </h3>
            </div>

            <div class="text-left sm:text-right">
              <div class="text-xl font-extrabold text-[#059669]">25.000.000 - 35.000.000 VNĐ</div>
              <span class="text-[11px] text-slate-500 font-medium">Giá cố định • Dự kiến 30 ngày</span>
            </div>
          </div>

          <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Chúng tôi đang cần một lập trình viên Fullstack (ưu tiên Next.js, Node.js, PostgreSQL) để phát triển phân hệ bán vé điện tử có sơ đồ chọn chỗ ngồi trực quan, quét mã QR check-in tại quầy và tích hợp cổng thanh toán VNPay / MoMo...
          </p>

          <div class="flex flex-wrap gap-1.5 pt-1">
            <span class="text-xs bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded-md">Next.js</span>
            <span class="text-xs bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded-md">Node.js</span>
            <span class="text-xs bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded-md">PostgreSQL</span>
            <span class="text-xs bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded-md">VNPay API</span>
            <span class="text-xs bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded-md">Tailwind CSS</span>
          </div>

          <div class="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div class="flex items-center space-x-4 text-slate-500">
              <span class="flex items-center space-x-1 text-emerald-600 font-medium">
                <span>✓</span>
                <span>Đã xác minh thanh toán</span>
              </span>
              <span>⭐ 4.9 (18 đánh giá)</span>
              <span>📍 Hà Nội, Việt Nam</span>
              <span>💬 12 chào giá</span>
            </div>

            <a href="project-detail.html" class="inline-flex items-center justify-center font-bold bg-[#e60278] hover:bg-[#c70066] text-white px-5 py-2 rounded-lg transition shadow-sm text-xs">
              Đặt chào giá ngay
            </a>
          </div>
        </div>

        <!-- Job Card 2 -->
        <div class="bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-6 shadow-card hover:shadow-card-hover transition card-transition space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div class="space-y-1">
              <div class="flex items-center space-x-2">
                <span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-[#007fed] border border-blue-200 uppercase">
                  Theo giờ
                </span>
                <span class="text-xs text-slate-400">Đăng 1 giờ trước</span>
              </div>
              <h3 class="text-lg font-bold text-[#151d2a] hover:text-[#e60278] transition">
                <a href="project-detail.html">Thiết kế UI/UX Trọn Bộ Ứng Dụng Tài Chính Fintech trên Figma</a>
              </h3>
            </div>

            <div class="text-left sm:text-right">
              <div class="text-xl font-extrabold text-[#059669]">450.000 - 700.000 VNĐ / giờ</div>
              <span class="text-[11px] text-slate-500 font-medium">Dự án dài hạn • 20 giờ/tuần</span>
            </div>
          </div>

          <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Tìm UI/UX Designer có kinh nghiệm chuyên sâu về Design System, Auto-layout và Responsive Design trong Figma. Cần dựng wireframe và bản thiết kế hoàn chỉnh cho 25+ màn hình Mobile App & Web Dashboard...
          </p>

          <div class="flex flex-wrap gap-1.5 pt-1">
            <span class="text-xs bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded-md">Figma</span>
            <span class="text-xs bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded-md">UI/UX Design</span>
            <span class="text-xs bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded-md">Design System</span>
            <span class="text-xs bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded-md">Mobile App</span>
          </div>

          <div class="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div class="flex items-center space-x-4 text-slate-500">
              <span class="flex items-center space-x-1 text-emerald-600 font-medium">
                <span>✓</span>
                <span>Đã nạp cọc 100%</span>
              </span>
              <span>⭐ 5.0 (42 đánh giá)</span>
              <span>📍 TP. Hồ Chí Minh</span>
              <span>💬 8 chào giá</span>
            </div>

            <a href="project-detail.html" class="inline-flex items-center justify-center font-bold bg-[#e60278] hover:bg-[#c70066] text-white px-5 py-2 rounded-lg transition shadow-sm text-xs">
              Đặt chào giá ngay
            </a>
          </div>
        </div>

        <!-- Job Card 3 -->
        <div class="bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-6 shadow-card hover:shadow-card-hover transition card-transition space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div class="space-y-1">
              <div class="flex items-center space-x-2">
                <span class="text-xs text-slate-400">Đăng 3 giờ trước</span>
              </div>
              <h3 class="text-lg font-bold text-[#151d2a] hover:text-[#e60278] transition">
                <a href="project-detail.html">Viết Tool Cào Dữ Liệu Bất Động Sản Bằng Python & Xuất Excel Realtime</a>
              </h3>
            </div>

            <div class="text-left sm:text-right">
              <div class="text-xl font-extrabold text-[#059669]">8.000.000 VNĐ</div>
              <span class="text-[11px] text-slate-500 font-medium">Giá cố định • Dự kiến 7 ngày</span>
            </div>
          </div>

          <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Yêu cầu code script Python sử dụng Playwright / Scrapy để cào danh sách tin đăng, số điện thoại, giá và diện tích từ 3 website bất động sản lớn tại VN. Dữ liệu làm sạch và lưu tự động vào Google Sheets / PostgreSQL.
          </p>

          <div class="flex flex-wrap gap-1.5 pt-1">
            <span class="text-xs bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded-md">Python</span>
            <span class="text-xs bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded-md">Web Scraping</span>
            <span class="text-xs bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded-md">Playwright</span>
            <span class="text-xs bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded-md">PostgreSQL</span>
          </div>

          <div class="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div class="flex items-center space-x-4 text-slate-500">
              <span class="flex items-center space-x-1 text-emerald-600 font-medium">
                <span>✓</span>
                <span>Đã xác minh thanh toán</span>
              </span>
              <span>⭐ 4.8 (9 đánh giá)</span>
              <span>📍 Đà Nẵng</span>
              <span>💬 21 chào giá</span>
            </div>

            <a href="project-detail.html" class="inline-flex items-center justify-center font-bold bg-[#e60278] hover:bg-[#c70066] text-white px-5 py-2 rounded-lg transition shadow-sm text-xs">
              Đặt chào giá ngay
            </a>
          </div>
        </div>

        <!-- Pagination -->
        <div class="flex items-center justify-center space-x-2 pt-6">
          <button class="w-9 h-9 rounded-lg border border-slate-300 text-slate-400 hover:bg-white text-xs">‹</button>
          <button class="w-9 h-9 rounded-lg bg-[#e60278] text-white font-bold text-xs">1</button>
          <button class="w-9 h-9 rounded-lg border border-slate-300 hover:bg-white text-slate-700 font-medium text-xs">2</button>
          <button class="w-9 h-9 rounded-lg border border-slate-300 hover:bg-white text-slate-700 font-medium text-xs">3</button>
          <span class="px-2 text-slate-400 text-xs">...</span>
          <button class="w-9 h-9 rounded-lg border border-slate-300 hover:bg-white text-slate-700 font-medium text-xs">28</button>
          <button class="w-9 h-9 rounded-lg border border-slate-300 text-slate-700 hover:bg-white text-xs">›</button>
        </div>
      </main>
    </div>
  </div>

  {get_footer()}
</body>
</html>'''
    return body

with open('frontend/jobs.html', 'w', encoding='utf-8') as f:
    f.write(build_jobs())
print("Built frontend/jobs.html")

# 3. PROJECT-DETAIL.HTML (BIDDING FORM & PROJECT DETAILS)
def build_project_detail():
    body = f'''{get_head("Chi Tiết Dự Án & Đặt Giá Thầu - Freelancer VN")}
  {get_header("project")}

  <!-- Page Breadcrumbs -->
  <div class="bg-white border-b border-slate-200 py-4">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <nav class="flex text-xs text-slate-500 space-x-2">
        <a href="index.html" class="hover:text-slate-800">Trang chủ</a>
        <span>/</span>
        <a href="jobs.html" class="hover:text-slate-800">Tìm việc làm</a>
        <span>/</span>
        <span class="text-slate-800 font-medium">Chi tiết dự án #394821</span>
      </nav>
    </div>
  </div>

  <!-- Main Grid -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 py-8">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

      <!-- Left Column: Project Details (lg:col-span-8) -->
      <div class="lg:col-span-8 space-y-6">
        <!-- Main Card -->
        <div class="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-card space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div class="flex items-center space-x-2 mb-2">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  ● Đang nhận hồ sơ
                </span>
                <span class="text-xs text-slate-400">Đăng 42 phút trước</span>
              </div>
              <h1 class="text-2xl sm:text-3xl font-extrabold text-[#151d2a] leading-snug">
                Xây dựng Hệ thống Bán vé Trực tuyến & Cổng Thanh toán VNPay
              </h1>
            </div>

            <div class="sm:text-right shrink-0">
              <span class="text-xs text-slate-400 block font-medium">Ngân sách dự kiến</span>
              <div class="text-2xl sm:text-3xl font-black text-[#059669]">25M - 35M VNĐ</div>
              <span class="text-xs text-slate-500">Giá cố định</span>
            </div>
          </div>

          <!-- Description -->
          <div class="space-y-4 text-sm text-slate-700 leading-relaxed">
            <h3 class="font-bold text-base text-[#151d2a]">Mô tả chi tiết công việc</h3>
            <p>
              Chào các bạn Freelancer, công ty chúng tôi hiện đang cần phát triển một phân hệ Web App bán vé điện tử cho sự kiện âm nhạc và hội thảo với lưu lượng truy cập cao.
            </p>
            <h4 class="font-bold text-sm text-[#151d2a] pt-2">Các tính năng chính yêu cầu:</h4>
            <ul class="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600">
              <li>Thiết kế giao diện mua vé responsive (Next.js 14, Tailwind CSS, TypeScript).</li>
              <li>Sơ đồ chọn vị trí ghế ngồi trực quan (Interactive Seating Map).</li>
              <li>Tích hợp cổng thanh toán VNPay và MoMo chuẩn bảo mật chữ ký số HMAC-SHA512.</li>
              <li>Sinh mã vé điện tử QR Code chống trùng lặp, hỗ trợ app quét mã check-in tại quầy.</li>
              <li>Hệ thống gửi Email / SMS xác nhận đặt vé tự động sau khi giao dịch thành công.</li>
            </ul>

            <h4 class="font-bold text-sm text-[#151d2a] pt-2">Kỹ năng & Chuyên môn bắt buộc:</h4>
            <div class="flex flex-wrap gap-2 pt-1">
              <span class="text-xs bg-slate-100 text-slate-700 font-semibold px-3 py-1.5 rounded-lg border border-slate-200">Next.js</span>
              <span class="text-xs bg-slate-100 text-slate-700 font-semibold px-3 py-1.5 rounded-lg border border-slate-200">Node.js</span>
              <span class="text-xs bg-slate-100 text-slate-700 font-semibold px-3 py-1.5 rounded-lg border border-slate-200">TypeScript</span>
              <span class="text-xs bg-slate-100 text-slate-700 font-semibold px-3 py-1.5 rounded-lg border border-slate-200">PostgreSQL</span>
              <span class="text-xs bg-slate-100 text-slate-700 font-semibold px-3 py-1.5 rounded-lg border border-slate-200">VNPay Gateway</span>
              <span class="text-xs bg-slate-100 text-slate-700 font-semibold px-3 py-1.5 rounded-lg border border-slate-200">Figma UI/UX</span>
            </div>
          </div>

          <!-- Attachments -->
          <div class="pt-6 border-t border-slate-100">
            <h4 class="font-bold text-sm text-[#151d2a] mb-3">Tài liệu đính kèm</h4>
            <div class="flex items-center space-x-3 p-3 bg-slate-50 border border-slate-200 rounded-lg max-w-md">
              <span class="text-2xl">📄</span>
              <div class="flex-1 min-w-0">
                <div class="text-xs font-bold text-slate-800 truncate">Software_Requirement_Specification_v1.2.pdf</div>
                <div class="text-[10px] text-slate-500">2.4 MB • Đã tải lên bởi khách hàng</div>
              </div>
              <button class="text-xs text-[#007fed] font-semibold hover:underline">Tải về</button>
            </div>
          </div>
        </div>

        <!-- Submitted Bids List -->
        <div class="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-card space-y-6">
          <div class="flex items-center justify-between pb-4 border-b border-slate-100">
            <h3 class="font-bold text-base text-[#151d2a]">Danh sách freelancer đã đặt chào giá (14)</h3>
            <span class="text-xs text-slate-500">Giá trung bình: <strong>28.400.000 VNĐ</strong></span>
          </div>

          <!-- Bid 1 -->
          <div class="flex items-start space-x-4 pb-4 border-b border-slate-100">
            <div class="w-12 h-12 rounded-full bg-slate-200 overflow-hidden font-bold text-slate-600 flex items-center justify-center shrink-0">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" class="w-full h-full object-cover">
            </div>
            <div class="flex-1 min-w-0 space-y-1">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <h4 class="text-sm font-bold text-[#151d2a]">Nguyễn Văn Hùng</h4>
                  <span class="text-xs text-emerald-600 font-semibold">✓ Đã xác minh</span>
                </div>
                <div class="text-right">
                  <span class="text-sm font-black text-[#059669]">26.000.000 VNĐ</span>
                  <span class="text-[10px] text-slate-400 block">trong 20 ngày</span>
                </div>
              </div>
              <div class="text-xs text-amber-500 font-medium">⭐ 4.9 (54 đánh giá) • Tỷ lệ hoàn thành 100%</div>
              <p class="text-xs text-slate-600 pt-1 leading-relaxed">
                "Chào bạn, tôi có hơn 5 năm kinh nghiệm lập trình Next.js và đã từng tích hợp cổng thanh toán VNPay và OnePay cho 4 sàn vé tại Việt Nam. Tôi cam kết bàn giao đúng hạn có bảo hành 3 tháng."
              </p>
            </div>
          </div>

          <!-- Bid 2 -->
          <div class="flex items-start space-x-4">
            <div class="w-12 h-12 rounded-full bg-slate-200 overflow-hidden font-bold text-slate-600 flex items-center justify-center shrink-0">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" class="w-full h-full object-cover">
            </div>
            <div class="flex-1 min-w-0 space-y-1">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <h4 class="text-sm font-bold text-[#151d2a]">Trần Minh Trí</h4>
                  <span class="text-xs text-blue-600 font-semibold">⚡ Top Rated Freelancer</span>
                </div>
                <div class="text-right">
                  <span class="text-sm font-black text-[#059669]">28.500.000 VNĐ</span>
                  <span class="text-[10px] text-slate-400 block">trong 25 ngày</span>
                </div>
              </div>
              <div class="text-xs text-amber-500 font-medium">⭐ 5.0 (82 đánh giá) • Tỷ lệ hoàn thành 98%</div>
              <p class="text-xs text-slate-600 pt-1 leading-relaxed">
                "Tôi đã đọc kỹ yêu cầu hệ thống vé và sơ đồ ghế. Đội ngũ chúng tôi sẵn sàng demo hệ thống tương tự đã chạy thực tế ngay hôm nay..."
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Bidding Calculator (lg:col-span-4) -->
      <aside class="lg:col-span-4 space-y-6 sticky top-24">
        <!-- Bid Box -->
        <div class="bg-white border border-slate-200 rounded-xl p-6 shadow-card space-y-5">
          <div class="pb-3 border-b border-slate-100">
            <h3 class="font-extrabold text-base text-[#151d2a]">Đặt giá thầu cho dự án</h3>
            <p class="text-xs text-slate-500 mt-0.5">Bạn còn <strong>6 lượt chào giá</strong> trong tháng này.</p>
          </div>

          <!-- Bid Inputs -->
          <div class="space-y-4">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Mức giá bạn chào (VNĐ)</label>
              <div class="relative">
                <input type="number" id="bidAmount" value="28000000" 
                  class="w-full text-sm font-bold bg-[#f8f9fa] border border-slate-300 rounded-lg px-3 py-2.5 outline-none focus:border-[#007fed] focus:bg-white transition"
                  oninput="updateCalculator()">
                <span class="absolute right-3 top-2.5 text-xs text-slate-400 font-semibold">VNĐ</span>
              </div>
            </div>

            <div class="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-2 text-xs">
              <div class="flex justify-between text-slate-600">
                <span>Phí dịch vụ Freelancer (10%):</span>
                <span id="feeAmount" class="font-semibold text-slate-700">-2.800.000 VNĐ</span>
              </div>
              <div class="flex justify-between text-sm font-bold text-[#151d2a] pt-2 border-t border-slate-200">
                <span>Số tiền bạn thực nhận:</span>
                <span id="netAmount" class="text-base font-extrabold text-[#059669]">25.200.000 VNĐ</span>
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Dự kiến hoàn thành trong (ngày)</label>
              <input type="number" value="20" class="w-full text-sm font-semibold bg-[#f8f9fa] border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-[#007fed] focus:bg-white transition">
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Đề xuất của bạn (Cover Letter)</label>
              <textarea rows="4" placeholder="Mô tả kinh nghiệm, lý do bạn là ứng viên phù hợp nhất và lộ trình thực hiện công việc..."
                class="w-full text-xs bg-[#f8f9fa] border border-slate-300 rounded-lg p-3 outline-none focus:border-[#007fed] focus:bg-white transition"></textarea>
            </div>

            <!-- Upgrades -->
            <div class="space-y-2 pt-2 border-t border-slate-100 text-xs">
              <span class="font-bold text-slate-700 block">Nâng cấp cơ hội trúng thầu:</span>
              <label class="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" class="rounded text-[#e60278]">
                <span class="text-slate-600">Tài trợ thầu nổi bật (Top Bid) (+50.000 VNĐ)</span>
              </label>
              <label class="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" class="rounded text-[#e60278]">
                <span class="text-slate-600">Cam kết bảo mật NDA (+30.000 VNĐ)</span>
              </label>
            </div>

            <!-- Submit Button -->
            <button onclick="alert('Đã gửi đề xuất chào giá thành công!')" 
              class="w-full py-3 px-4 bg-[#e60278] hover:bg-[#c70066] text-white text-sm font-bold rounded-lg shadow-sm hover:shadow transition card-transition transform active:scale-98">
              Gửi Đề Xuất Chào Giá
            </button>
          </div>
        </div>

        <!-- Client Info Card -->
        <div class="bg-white border border-slate-200 rounded-xl p-5 shadow-card space-y-3 text-xs">
          <h4 class="font-bold text-sm text-[#151d2a]">Thông tin khách hàng</h4>
          <div class="space-y-2 text-slate-600">
            <div class="flex items-center space-x-2 text-emerald-600 font-medium">
              <span>✓</span>
              <span>Đã xác minh danh tính</span>
            </div>
            <div class="flex items-center space-x-2 text-emerald-600 font-medium">
              <span>✓</span>
              <span>Đã xác thực phương thức thanh toán</span>
            </div>
            <div class="flex items-center space-x-2 text-emerald-600 font-medium">
              <span>✓</span>
              <span>Đã nạp tiền ký quỹ Milestone</span>
            </div>
            <div class="pt-2 border-t border-slate-100">
              <div class="text-slate-800 font-semibold">Công ty TNHH Giải pháp Số VinaTech</div>
              <div class="text-slate-500">Tham gia từ tháng 8/2023 • 12 dự án đã đăng</div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>

  <script>
    function updateCalculator() {{
      const input = document.getElementById('bidAmount');
      const val = parseFloat(input.value) || 0;
      const fee = val * 0.10;
      const net = val - fee;
      document.getElementById('feeAmount').innerText = '-' + fee.toLocaleString('vi-VN') + ' VNĐ';
      document.getElementById('netAmount').innerText = net.toLocaleString('vi-VN') + ' VNĐ';
    }}
  </script>

  {get_footer()}
</body>
</html>'''
    return body

with open('frontend/project-detail.html', 'w', encoding='utf-8') as f:
    f.write(build_project_detail())
print("Built frontend/project-detail.html")

# 4. POST-PROJECT.HTML (CLIENT 4-STEP POST PROJECT WIZARD)
def build_post_project():
    body = f'''{get_head("Đăng Tin Tuyển Dụng Dự Án Miễn Phí - Freelancer VN")}
  {get_header("post-project")}

  <!-- Wizard Header -->
  <div class="bg-white border-b border-slate-200 py-6">
    <div class="max-w-4xl mx-auto px-4 sm:px-6">
      <h1 class="text-2xl sm:text-3xl font-extrabold text-[#151d2a] text-center">Nói cho chúng tôi biết bạn cần làm gì</h1>
      <p class="text-xs sm:text-sm text-slate-600 text-center mt-1">Đăng dự án chỉ mất 2 phút và bắt đầu nhận chào giá từ các chuyên gia hàng đầu.</p>

      <!-- Step Stepper -->
      <div class="flex items-center justify-between max-w-xl mx-auto mt-8 relative">
        <div class="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-slate-200 -z-0"></div>
        
        <div class="flex flex-col items-center relative z-10">
          <div class="w-8 h-8 rounded-full bg-[#e60278] text-white font-bold text-xs flex items-center justify-center ring-4 ring-white">1</div>
          <span class="text-[11px] font-bold text-[#e60278] mt-1.5">Công việc</span>
        </div>
        <div class="flex flex-col items-center relative z-10">
          <div class="w-8 h-8 rounded-full bg-slate-200 text-slate-600 font-bold text-xs flex items-center justify-center ring-4 ring-white">2</div>
          <span class="text-[11px] font-medium text-slate-500 mt-1.5">Kỹ năng</span>
        </div>
        <div class="flex flex-col items-center relative z-10">
          <div class="w-8 h-8 rounded-full bg-slate-200 text-slate-600 font-bold text-xs flex items-center justify-center ring-4 ring-white">3</div>
          <span class="text-[11px] font-medium text-slate-500 mt-1.5">Ngân sách</span>
        </div>
        <div class="flex flex-col items-center relative z-10">
          <div class="w-8 h-8 rounded-full bg-slate-200 text-slate-600 font-bold text-xs flex items-center justify-center ring-4 ring-white">4</div>
          <span class="text-[11px] font-medium text-slate-500 mt-1.5">Hoàn tất</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Wizard Form Body -->
  <div class="max-w-4xl mx-auto px-4 sm:px-6 py-10">
    <div class="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-card space-y-8">
      
      <!-- Step 1 Section: Title & Description -->
      <div class="space-y-6">
        <div>
          <label class="block text-sm font-bold text-[#151d2a] mb-1.5">
            1. Đặt tên tiêu đề cho dự án của bạn
          </label>
          <input type="text" value="Thiết kế và lập trình website thương mại điện tử với Next.js & Stripe" 
            class="w-full text-sm bg-[#f8f9fa] border border-slate-300 rounded-lg p-3.5 outline-none focus:border-[#007fed] focus:bg-white font-medium transition">
          <span class="text-[11px] text-slate-500 mt-1 block">Một tiêu đề rõ ràng giúp thu hút các ứng viên có kỹ năng phù hợp nhất.</span>
        </div>

        <div>
          <label class="block text-sm font-bold text-[#151d2a] mb-1.5">
            2. Mô tả chi tiết yêu cầu công việc
          </label>
          <textarea rows="5" class="w-full text-sm bg-[#f8f9fa] border border-slate-300 rounded-lg p-3.5 outline-none focus:border-[#007fed] focus:bg-white transition leading-relaxed">Cần xây dựng website bán lẻ thời trang với các tính năng:
- Trang chủ giới thiệu sản phẩm, bộ sưu tập
- Giỏ hàng và quy trình thanh toán tối ưu (Checkout 1 bước)
- Quản trị viên Dashboard quản lý đơn hàng và tồn kho
- Tối ưu SEO và tốc độ tải trang dưới 1.5s</textarea>
        </div>

        <!-- File Upload Box -->
        <div>
          <label class="block text-sm font-bold text-[#151d2a] mb-1.5">
            3. Đính kèm tài liệu hoặc mockup (nếu có)
          </label>
          <div class="border-2 border-dashed border-slate-300 hover:border-[#007fed] rounded-xl p-8 text-center bg-[#f8f9fa] hover:bg-white transition cursor-pointer">
            <span class="text-3xl block mb-2">📁</span>
            <span class="text-xs font-bold text-[#151d2a]">Kéo và thả tài liệu vào đây hoặc <span class="text-[#007fed] underline">Duyệt file từ máy tính</span></span>
            <span class="text-[10px] text-slate-400 block mt-1">Hỗ trợ PDF, PNG, JPG, DOCX, ZIP tối đa 50MB</span>
          </div>
        </div>

        <!-- Skills Selection -->
        <div>
          <label class="block text-sm font-bold text-[#151d2a] mb-1.5">
            4. Những kỹ năng nào được yêu cầu?
          </label>
          <div class="flex flex-wrap gap-2 mb-3">
            <span class="inline-flex items-center text-xs font-semibold bg-pink-50 text-[#e60278] border border-pink-200 px-3 py-1.5 rounded-lg">Next.js ✕</span>
            <span class="inline-flex items-center text-xs font-semibold bg-pink-50 text-[#e60278] border border-pink-200 px-3 py-1.5 rounded-lg">Tailwind CSS ✕</span>
            <span class="inline-flex items-center text-xs font-semibold bg-pink-50 text-[#e60278] border border-pink-200 px-3 py-1.5 rounded-lg">Node.js ✕</span>
            <span class="inline-flex items-center text-xs font-semibold bg-pink-50 text-[#e60278] border border-pink-200 px-3 py-1.5 rounded-lg">Stripe ✕</span>
          </div>
          <input type="text" placeholder="Nhập thêm kỹ năng (ví dụ: PostgreSQL, Docker...)" 
            class="w-full text-xs bg-[#f8f9fa] border border-slate-300 rounded-lg p-3 outline-none focus:border-[#007fed] focus:bg-white transition">
        </div>

        <!-- Payment Model -->
        <div class="pt-4 border-t border-slate-100">
          <label class="block text-sm font-bold text-[#151d2a] mb-3">
            5. Phương thức thanh toán mong muốn
          </label>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label class="border-2 border-[#e60278] bg-pink-50/20 rounded-xl p-4 flex items-start space-x-3 cursor-pointer">
              <input type="radio" name="payType" checked class="mt-1 text-[#e60278] focus:ring-[#e60278]">
              <div>
                <span class="font-bold text-sm text-[#151d2a] block">Thanh toán theo giá cố định</span>
                <span class="text-xs text-slate-500">Thanh toán khi hoàn thành toàn bộ hoặc theo từng mốc Milestone.</span>
              </div>
            </label>

            <label class="border border-slate-200 hover:border-slate-300 rounded-xl p-4 flex items-start space-x-3 cursor-pointer">
              <input type="radio" name="payType" class="mt-1 text-[#e60278]">
              <div>
                <span class="font-bold text-sm text-[#151d2a] block">Thanh toán theo giờ</span>
                <span class="text-xs text-slate-500">Tính giờ làm việc thực tế với phần mềm theo dõi Desktop App.</span>
              </div>
            </label>
          </div>
        </div>

        <!-- Budget Input -->
        <div>
          <label class="block text-sm font-bold text-[#151d2a] mb-1.5">
            6. Dự toán ngân sách của bạn (VNĐ)
          </label>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <span class="text-xs text-slate-500 mb-1 block">Tối thiểu:</span>
              <input type="text" value="15.000.000" class="w-full text-sm font-bold bg-[#f8f9fa] border border-slate-300 rounded-lg p-3 outline-none focus:border-[#007fed] focus:bg-white">
            </div>
            <div>
              <span class="text-xs text-slate-500 mb-1 block">Tối đa:</span>
              <input type="text" value="25.000.000" class="w-full text-sm font-bold bg-[#f8f9fa] border border-slate-300 rounded-lg p-3 outline-none focus:border-[#007fed] focus:bg-white">
            </div>
          </div>
        </div>

        <!-- Submit & Navigation -->
        <div class="pt-6 border-t border-slate-100 flex items-center justify-between">
          <a href="index.html" class="text-xs font-semibold text-slate-500 hover:text-slate-800">← Hủy bỏ</a>
          <button onclick="alert('Đã xuất bản dự án thành công! Dự án của bạn đang hiển thị cho các Freelancer.')" 
            class="font-bold bg-[#e60278] hover:bg-[#c70066] text-white px-8 py-3.5 rounded-lg shadow-sm hover:shadow transition card-transition text-sm">
            Đăng dự án và nhận chào giá ngay
          </button>
        </div>
      </div>
    </div>
  </div>

  {get_footer()}
</body>
</html>'''
    return body

with open('frontend/post-project.html', 'w', encoding='utf-8') as f:
    f.write(build_post_project())
print("Built frontend/post-project.html")

# 5. HIRE.HTML (FIND & HIRE TOP FREELANCERS DIRECTORY)
def build_hire():
    body = f'''{get_head("Thuê Freelancer Hàng Đầu Việt Nam & Quốc Tế - Freelancer VN")}
  {get_header("hire")}

  <!-- Page Header -->
  <div class="bg-white border-b border-slate-200 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <nav class="flex text-xs text-slate-500 mb-1 space-x-2">
            <a href="index.html" class="hover:text-slate-800">Trang chủ</a>
            <span>/</span>
            <span class="text-slate-800 font-medium">Thuê Freelancer</span>
          </nav>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-[#151d2a]">Tìm & Thuê Freelancer Xuất Sắc Nhất</h1>
          <p class="text-xs sm:text-sm text-slate-600 mt-1">Duyệt qua hồ sơ các chuyên gia công nghệ, thiết kế, marketing đã được xác minh danh tính và năng lực.</p>
        </div>

        <!-- Search input -->
        <div class="w-full md:w-96">
          <input type="text" placeholder="Tìm theo tên hoặc kỹ năng..." 
            class="w-full text-xs sm:text-sm bg-[#f8f9fa] border border-slate-300 rounded-lg pl-4 pr-4 py-2.5 outline-none focus:border-[#007fed] focus:bg-white transition">
        </div>
      </div>
    </div>
  </div>

  <!-- Main Directory Layout -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 py-8">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      <!-- Filters Sidebar (lg:col-span-3) -->
      <aside class="lg:col-span-3 bg-white border border-slate-200 rounded-xl p-5 shadow-card space-y-6">
        <h3 class="font-bold text-sm text-[#151d2a] pb-3 border-b border-slate-200">Lọc theo tiêu chí</h3>

        <!-- Hourly Rate -->
        <div>
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Mức giá theo giờ (VNĐ/h)</h4>
          <div class="space-y-2 text-xs">
            <label class="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" checked class="rounded text-[#e60278]">
              <span class="text-slate-700">Dưới 300.000 VNĐ</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" checked class="rounded text-[#e60278]">
              <span class="text-slate-700">300.000 - 800.000 VNĐ</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" class="rounded text-[#e60278]">
              <span class="text-slate-700">Trên 800.000 VNĐ</span>
            </label>
          </div>
        </div>

        <!-- Star Rating -->
        <div>
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Đánh giá tối thiểu</h4>
          <div class="space-y-2 text-xs">
            <label class="flex items-center space-x-2 cursor-pointer">
              <input type="radio" name="rating" checked class="text-[#e60278]">
              <span class="text-slate-700">⭐ 4.8 sao trở lên</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input type="radio" name="rating" class="text-[#e60278]">
              <span class="text-slate-700">⭐ 4.5 sao trở lên</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input type="radio" name="rating" class="text-[#e60278]">
              <span class="text-slate-700">Tất cả đánh giá</span>
            </label>
          </div>
        </div>

        <!-- Location -->
        <div>
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Khu vực</h4>
          <select class="w-full text-xs bg-[#f8f9fa] border border-slate-300 rounded p-2 outline-none">
            <option>Việt Nam (Toàn quốc)</option>
            <option>Hà Nội</option>
            <option>TP. Hồ Chí Minh</option>
            <option>Đà Nẵng</option>
            <option>Quốc tế (Toàn cầu)</option>
          </select>
        </div>
      </aside>

      <!-- Freelancer Cards Grid (lg:col-span-9) -->
      <main class="lg:col-span-9 space-y-4">
        <!-- Freelancer 1: @phun4 -->
        <div class="bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-6 shadow-card hover:shadow-card-hover transition card-transition space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div class="flex items-start space-x-4">
              <div class="relative shrink-0">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop" 
                  class="w-16 h-16 rounded-full object-cover border-2 border-white shadow">
                <span class="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
              </div>
              <div class="space-y-1">
                <div class="flex items-center space-x-2">
                  <h3 class="text-lg font-bold text-[#151d2a]">
                    <a href="profile.html" class="hover:text-[#e60278] transition">Phú Nguyễn (@phun4)</a>
                  </h3>
                  <span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-[#007fed] border border-blue-200">
                    ⚡ Top Rated
                  </span>
                </div>
                <div class="text-xs font-semibold text-slate-600">Senior Fullstack Engineer & Cloud Architect</div>
                <div class="flex items-center space-x-3 text-xs text-slate-500 pt-0.5">
                  <span class="text-amber-500 font-bold">⭐ 5.0 (68 đánh giá)</span>
                  <span>📍 Đà Nẵng, Việt Nam</span>
                  <span>🏆 100% tỷ lệ hoàn thành</span>
                </div>
              </div>
            </div>

            <div class="text-left sm:text-right shrink-0">
              <div class="text-xl font-extrabold text-[#151d2a]">550.000 VNĐ <span class="text-xs font-normal text-slate-500">/ giờ</span></div>
              <span class="text-[11px] text-emerald-600 font-semibold block">Sẵn sàng nhận việc ngay</span>
            </div>
          </div>

          <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Hơn 7 năm kinh nghiệm xây dựng hệ thống web app quy mô lớn, backend FastAPI / Django, kiến trúc Microservices và ứng dụng React/Next.js tốc độ cao. Đã từng làm việc với các khách hàng từ Úc, Mỹ và Singapore.
          </p>

          <div class="flex flex-wrap gap-1.5 pt-1">
            <span class="text-xs bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded-md">Python</span>
            <span class="text-xs bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded-md">FastAPI</span>
            <span class="text-xs bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded-md">React.js</span>
            <span class="text-xs bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded-md">Next.js</span>
            <span class="text-xs bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded-md">PostgreSQL</span>
            <span class="text-xs bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded-md">AWS</span>
          </div>

          <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
            <a href="profile.html" class="text-xs text-[#007fed] hover:underline font-bold">Xem hồ sơ & portfolio đầy đủ →</a>
            <div class="flex space-x-2">
              <button onclick="alert('Đã gửi lời mời trò chuyện!')" class="text-xs font-semibold px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 transition">Nhắn tin</button>
              <a href="profile.html" class="text-xs font-bold bg-[#e60278] hover:bg-[#c70066] text-white px-5 py-2 rounded-lg shadow-sm transition">Thuê ngay</a>
            </div>
          </div>
        </div>

        <!-- Freelancer 2 -->
        <div class="bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-6 shadow-card hover:shadow-card-hover transition card-transition space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div class="flex items-start space-x-4">
              <div class="relative shrink-0">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop" 
                  class="w-16 h-16 rounded-full object-cover border-2 border-white shadow">
                <span class="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
              </div>
              <div class="space-y-1">
                <div class="flex items-center space-x-2">
                  <h3 class="text-lg font-bold text-[#151d2a]">
                    <a href="profile.html" class="hover:text-[#e60278] transition">Lê Hoàng Nam (@namdesign)</a>
                  </h3>
                  <span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-pink-50 text-[#e60278] border border-pink-200">
                    🎨 Design Expert
                  </span>
                </div>
                <div class="text-xs font-semibold text-slate-600">Lead Product Designer & Design System Specialist</div>
                <div class="flex items-center space-x-3 text-xs text-slate-500 pt-0.5">
                  <span class="text-amber-500 font-bold">⭐ 4.9 (94 đánh giá)</span>
                  <span>📍 TP. Hồ Chí Minh</span>
                  <span>🏆 99% tỷ lệ hoàn thành</span>
                </div>
              </div>
            </div>

            <div class="text-left sm:text-right shrink-0">
              <div class="text-xl font-extrabold text-[#151d2a]">450.000 VNĐ <span class="text-xs font-normal text-slate-500">/ giờ</span></div>
              <span class="text-[11px] text-emerald-600 font-semibold block">Sẵn sàng nhận việc</span>
            </div>
          </div>

          <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Chuyên gia thiết kế UI/UX trên Figma, xây dựng Design System từ số 0 cho Fintech, Ecommerce và SaaS. Thiết kế giao diện hiện đại, chuẩn nguyên lý thiết kế và hỗ trợ bàn giao dev cực kỳ chi tiết.
          </p>

          <div class="flex flex-wrap gap-1.5 pt-1">
            <span class="text-xs bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded-md">Figma</span>
            <span class="text-xs bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded-md">UI/UX</span>
            <span class="text-xs bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded-md">Mobile App</span>
            <span class="text-xs bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded-md">Prototyping</span>
            <span class="text-xs bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded-md">Tailwind CSS</span>
          </div>

          <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
            <a href="profile.html" class="text-xs text-[#007fed] hover:underline font-bold">Xem hồ sơ & portfolio đầy đủ →</a>
            <div class="flex space-x-2">
              <button onclick="alert('Đã gửi lời mời trò chuyện!')" class="text-xs font-semibold px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 transition">Nhắn tin</button>
              <a href="profile.html" class="text-xs font-bold bg-[#e60278] hover:bg-[#c70066] text-white px-5 py-2 rounded-lg shadow-sm transition">Thuê ngay</a>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>

  {get_footer()}
</body>
</html>'''
    return body

with open('frontend/hire.html', 'w', encoding='utf-8') as f:
    f.write(build_hire())
print("Built frontend/hire.html")

# 6. PROFILE.HTML (FREELANCER @PHUN4 PROFILE)
def build_profile():
    body = f'''{get_head("Hồ Sơ Freelancer Phú Nguyễn (@phun4) - Freelancer VN")}
  {get_header("profile")}

  <!-- Cover & Header Card -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
    <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-card">
      <!-- Cover Banner -->
      <div class="h-44 sm:h-56 bg-gradient-to-r from-slate-900 via-[#151d2a] to-slate-800 relative">
        <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
      </div>

      <!-- Profile Header Details -->
      <div class="px-6 sm:px-10 pb-8 relative">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 sm:-mt-20 gap-4 mb-6">
          <div class="flex flex-col sm:flex-row sm:items-end space-y-3 sm:space-y-0 sm:space-x-6">
            <div class="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-white overflow-hidden bg-slate-200 shadow-lg shrink-0">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop" class="w-full h-full object-cover">
              <span class="absolute bottom-2 right-2 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>

            <div class="space-y-1">
              <div class="flex items-center space-x-2.5">
                <h1 class="text-2xl sm:text-3xl font-extrabold text-[#151d2a]">Phú Nguyễn</h1>
                <span class="text-xs font-semibold text-slate-500">@phun4</span>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-[#007fed] border border-blue-200">
                  ⚡ Top Rated
                </span>
              </div>
              <p class="text-sm font-semibold text-slate-600">Senior Fullstack Engineer & Distributed Systems</p>
              <div class="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                <span class="text-amber-500 font-bold">⭐ 5.0 (68 nhận xét)</span>
                <span>📍 Đà Nẵng, Việt Nam</span>
                <span>🏆 100% Hoàn thành đúng hạn</span>
                <span>⏱️ Phản hồi trong 1 giờ</span>
              </div>
            </div>
          </div>

          <div class="flex items-center space-x-3 shrink-0">
            <button onclick="alert('Đã mở hộp thoại tin nhắn!')" class="text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 transition">
              Gửi tin nhắn
            </button>
            <button onclick="alert('Mời đặt giá cho dự án của bạn!')" class="text-xs sm:text-sm font-bold bg-[#e60278] hover:bg-[#c70066] text-white px-6 py-2.5 rounded-lg shadow-sm hover:shadow transition card-transition">
              Thuê tôi làm việc
            </button>
          </div>
        </div>

        <!-- Profile Quick Stats Bar -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl text-center">
          <div>
            <span class="text-xs text-slate-500 block font-medium">Mức giá theo giờ</span>
            <span class="text-lg font-black text-[#151d2a]">550.000 VNĐ</span>
          </div>
          <div>
            <span class="text-xs text-slate-500 block font-medium">Tổng thu nhập</span>
            <span class="text-lg font-black text-[#059669]">850M+ VNĐ</span>
          </div>
          <div>
            <span class="text-xs text-slate-500 block font-medium">Dự án hoàn thành</span>
            <span class="text-lg font-black text-[#151d2a]">74 dự án</span>
          </div>
          <div>
            <span class="text-xs text-slate-500 block font-medium">Tỷ lệ được thuê lại</span>
            <span class="text-lg font-black text-[#007fed]">94%</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Profile Content Sections -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 py-8">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      <!-- Left: Bio & Portfolio (lg:col-span-8) -->
      <div class="lg:col-span-8 space-y-6">
        <!-- About Section -->
        <div class="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-card space-y-4">
          <h3 class="text-base font-bold text-[#151d2a] pb-3 border-b border-slate-100">Giới thiệu bản thân</h3>
          <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Xin chào! Tôi là Phú Nguyễn, một kỹ sư phần mềm với hơn 7 năm kinh nghiệm chuyên sâu trong việc xây dựng các hệ thống web và mobile hiệu năng cao. Tôi chuyên về kiến trúc Backend Python (FastAPI, Django), cơ sở dữ liệu PostgreSQL / MongoDB và phát triển giao diện hiện đại với React, Next.js, Tailwind CSS.
          </p>
          <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Tôi luôn ưu tiên mã nguồn sạch (Clean Code), kiểm thử tự động (Unit Test / CI/CD) và tối ưu trải nghiệm người dùng cuối. Tôi đã từng hợp tác thành công với nhiều khách hàng tại Việt Nam, Singapore, Úc và Hoa Kỳ.
          </p>
        </div>

        <!-- Portfolio Showcase -->
        <div class="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-card space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 class="text-base font-bold text-[#151d2a]">Dự án tiêu biểu (Portfolio)</h3>
            <span class="text-xs text-slate-500">6 dự án nổi bật</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="border border-slate-200 rounded-lg overflow-hidden group hover:shadow-md transition card-transition">
              <div class="h-40 bg-slate-100 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop" class="w-full h-full object-cover group-hover:scale-105 transition duration-300">
              </div>
              <div class="p-4 space-y-1">
                <h4 class="text-sm font-bold text-[#151d2a] group-hover:text-[#e60278] transition">Sàn Thương Mại Điện Tử & Đấu Giá Trực Tuyến</h4>
                <p class="text-[11px] text-slate-500">Next.js 14, WebSockets, PostgreSQL, Stripe Payment</p>
              </div>
            </div>

            <div class="border border-slate-200 rounded-lg overflow-hidden group hover:shadow-md transition card-transition">
              <div class="h-40 bg-slate-100 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop" class="w-full h-full object-cover group-hover:scale-105 transition duration-300">
              </div>
              <div class="p-4 space-y-1">
                <h4 class="text-sm font-bold text-[#151d2a] group-hover:text-[#e60278] transition">Hệ Thống CRM & Analytics Cho Doanh Nghiệp</h4>
                <p class="text-[11px] text-slate-500">FastAPI, Celery, Redis, Docker, Tailwind CSS</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Client Reviews -->
        <div class="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-card space-y-6">
          <h3 class="text-base font-bold text-[#151d2a] pb-3 border-b border-slate-100">Đánh giá từ khách hàng gần đây</h3>

          <div class="space-y-4">
            <div class="pb-4 border-b border-slate-100 space-y-2">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <span class="font-bold text-xs text-[#151d2a]">Alex Robertson (Australia)</span>
                  <span class="text-[11px] text-slate-400">• Dự án Web Scraping Pipeline</span>
                </div>
                <span class="text-xs text-amber-500 font-bold">⭐ 5.0</span>
              </div>
              <p class="text-xs text-slate-600 leading-relaxed">
                "Phú hoàn thành công việc xuất sắc vượt mong đợi của tôi. Anh ấy hiểu rõ kiến trúc, giao tiếp tiếng Anh trôi chảy và hoàn thành trước thời hạn 3 ngày. Chắc chắn sẽ tiếp tục thuê lại!"
              </p>
            </div>

            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <span class="font-bold text-xs text-[#151d2a]">Trần Hải Đăng (Việt Nam)</span>
                  <span class="text-[11px] text-slate-400">• Dự án Cổng thanh toán VNPay</span>
                </div>
                <span class="text-xs text-amber-500 font-bold">⭐ 5.0</span>
              </div>
              <p class="text-xs text-slate-600 leading-relaxed">
                "Code rất sạch, có tài liệu hướng dẫn bàn giao cẩn thận. Rất an tâm khi làm việc cùng."
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Verified Skills & Details (lg:col-span-4) -->
      <aside class="lg:col-span-4 space-y-6">
        <!-- Verified Badges -->
        <div class="bg-white border border-slate-200 rounded-xl p-6 shadow-card space-y-4 text-xs">
          <h4 class="font-bold text-sm text-[#151d2a] pb-2 border-b border-slate-100">Xác minh hồ sơ</h4>
          <div class="space-y-2.5">
            <div class="flex items-center justify-between text-slate-700">
              <span class="flex items-center space-x-2">
                <span class="text-emerald-500">✓</span>
                <span>Xác minh danh tính (ID Card)</span>
              </span>
              <span class="text-emerald-600 font-bold">Đã xác minh</span>
            </div>
            <div class="flex items-center justify-between text-slate-700">
              <span class="flex items-center space-x-2">
                <span class="text-emerald-500">✓</span>
                <span>Phương thức thanh toán</span>
              </span>
              <span class="text-emerald-600 font-bold">Đã xác minh</span>
            </div>
            <div class="flex items-center justify-between text-slate-700">
              <span class="flex items-center space-x-2">
                <span class="text-emerald-500">✓</span>
                <span>Email & Số điện thoại</span>
              </span>
              <span class="text-emerald-600 font-bold">Đã xác minh</span>
            </div>
            <div class="flex items-center justify-between text-slate-700">
              <span class="flex items-center space-x-2">
                <span class="text-emerald-500">✓</span>
                <span>Bài kiểm tra Kỹ năng Python Level 3</span>
              </span>
              <span class="text-emerald-600 font-bold">Top 1%</span>
            </div>
          </div>
        </div>

        <!-- Skills Cloud -->
        <div class="bg-white border border-slate-200 rounded-xl p-6 shadow-card space-y-3">
          <h4 class="font-bold text-sm text-[#151d2a] pb-2 border-b border-slate-100">Kỹ năng hàng đầu</h4>
          <div class="flex flex-wrap gap-1.5 pt-1">
            <span class="text-xs bg-slate-100 text-slate-700 font-semibold px-2.5 py-1 rounded-md">Python</span>
            <span class="text-xs bg-slate-100 text-slate-700 font-semibold px-2.5 py-1 rounded-md">FastAPI</span>
            <span class="text-xs bg-slate-100 text-slate-700 font-semibold px-2.5 py-1 rounded-md">React.js</span>
            <span class="text-xs bg-slate-100 text-slate-700 font-semibold px-2.5 py-1 rounded-md">Next.js</span>
            <span class="text-xs bg-slate-100 text-slate-700 font-semibold px-2.5 py-1 rounded-md">PostgreSQL</span>
            <span class="text-xs bg-slate-100 text-slate-700 font-semibold px-2.5 py-1 rounded-md">Redis</span>
            <span class="text-xs bg-slate-100 text-slate-700 font-semibold px-2.5 py-1 rounded-md">Docker</span>
            <span class="text-xs bg-slate-100 text-slate-700 font-semibold px-2.5 py-1 rounded-md">AWS Cloud</span>
          </div>
        </div>
      </aside>
    </div>
  </div>

  {get_footer()}
</body>
</html>'''
    return body

with open('frontend/profile.html', 'w', encoding='utf-8') as f:
    f.write(build_profile())
print("Built frontend/profile.html")

# 7. ONBOARDING.HTML (FREELANCER 11-STEP ONBOARDING PIPELINE)
def build_onboarding():
    body = f'''{get_head("Quy Trình Onboarding Freelancer Mới (11 Bước) - Freelancer VN")}
  {get_header("onboarding")}

  <!-- Page Header -->
  <div class="bg-white border-b border-slate-200 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-2">
      <span class="text-xs font-bold uppercase tracking-wider text-[#e60278]">Dành cho chuyên gia mới</span>
      <h1 class="text-2xl sm:text-3xl font-extrabold text-[#151d2a]">Quy Trình Onboarding Freelancer (11 Bước Chuẩn)</h1>
      <p class="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
        Hoàn thiện 11 bước thiết lập hồ sơ chuyên nghiệp để bắt đầu nhận dự án đầu tiên và gia tăng tỷ lệ trúng thầu lên đến 300%.
      </p>
    </div>
  </div>

  <!-- Stepper Container -->
  <div class="max-w-4xl mx-auto px-4 sm:px-6 py-10">
    <div class="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-card space-y-8">
      
      <!-- Progress Bar -->
      <div class="space-y-2">
        <div class="flex items-center justify-between text-xs font-bold">
          <span class="text-[#151d2a]">Tiến độ hoàn thiện: <span class="text-[#059669]">6 / 11 bước (55%)</span></span>
          <span class="text-slate-500">Ước tính còn 3 phút</span>
        </div>
        <div class="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <div class="h-full bg-gradient-to-r from-[#007fed] to-[#e60278] rounded-full transition-all duration-500" style="width: 55%"></div>
        </div>
      </div>

      <!-- Current Step Card: Step 6 (Hourly Rate & Availability) -->
      <div class="border border-slate-200 rounded-xl p-6 sm:p-8 bg-[#f8f9fa] space-y-6">
        <div class="flex items-center space-x-3">
          <div class="w-9 h-9 rounded-full bg-[#e60278] text-white font-extrabold text-sm flex items-center justify-center shrink-0">6</div>
          <div>
            <h3 class="text-lg font-bold text-[#151d2a]">Bước 6: Thiết lập Mức Giá Theo Giờ & Thời Gian Làm Việc</h3>
            <p class="text-xs text-slate-500">Khách hàng sẽ tham khảo mức giá này khi thuê bạn trực tiếp hoặc xem xét chào giá theo giờ.</p>
          </div>
        </div>

        <div class="space-y-4 pt-2">
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">Mức giá bạn muốn nhận (VNĐ / giờ)</label>
            <div class="relative max-w-xs">
              <input type="number" value="450000" class="w-full text-base font-bold bg-white border border-slate-300 rounded-lg p-3 outline-none focus:border-[#007fed]">
              <span class="absolute right-3 top-3.5 text-xs text-slate-400 font-semibold">VNĐ / h</span>
            </div>
            <span class="text-[11px] text-slate-500 mt-1 block">Tương đương khoảng 18 - 20 USD / giờ đối với khách hàng quốc tế.</span>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 mb-2">Số giờ sẵn sàng làm việc mỗi tuần</label>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label class="border-2 border-[#e60278] bg-pink-50/20 rounded-lg p-3.5 flex items-center space-x-2.5 cursor-pointer">
                <input type="radio" name="hours" checked class="text-[#e60278]">
                <span class="text-xs font-bold text-[#151d2a]">Toàn thời gian (> 30h/tuần)</span>
              </label>
              <label class="border border-slate-200 bg-white rounded-lg p-3.5 flex items-center space-x-2.5 cursor-pointer">
                <input type="radio" name="hours" class="text-[#e60278]">
                <span class="text-xs font-medium text-slate-700">Bán thời gian (< 30h/tuần)</span>
              </label>
              <label class="border border-slate-200 bg-white rounded-lg p-3.5 flex items-center space-x-2.5 cursor-pointer">
                <input type="radio" name="hours" class="text-[#e60278]">
                <span class="text-xs font-medium text-slate-700">Linh hoạt theo dự án</span>
              </label>
            </div>
          </div>
        </div>

        <div class="pt-4 border-t border-slate-200 flex items-center justify-between">
          <button class="text-xs font-semibold text-slate-600 hover:text-slate-900">← Quay lại Bước 5</button>
          <div class="flex space-x-3">
            <button class="text-xs font-semibold px-4 py-2 text-slate-500 hover:text-slate-700">Bỏ qua bước này</button>
            <button onclick="alert('Đã lưu thiết lập! Đang chuyển đến Bước 7: Xác minh danh tính.')" 
              class="font-bold bg-[#e60278] hover:bg-[#c70066] text-white px-6 py-2.5 rounded-lg shadow-sm transition text-xs">
              Lưu & Tiếp tục →
            </button>
          </div>
        </div>
      </div>

      <!-- Overview of All 11 Steps -->
      <div class="space-y-4 pt-4 border-t border-slate-100">
        <h4 class="font-bold text-sm text-[#151d2a]">Lộ trình đầy đủ 11 bước Onboarding:</h4>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div class="flex items-center space-x-3 p-3 bg-emerald-50/50 border border-emerald-200 rounded-lg">
            <span class="w-6 h-6 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center text-xs">✓</span>
            <span class="text-slate-700 font-medium">1. Đăng ký tài khoản & Email xác thực</span>
          </div>
          <div class="flex items-center space-x-3 p-3 bg-emerald-50/50 border border-emerald-200 rounded-lg">
            <span class="w-6 h-6 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center text-xs">✓</span>
            <span class="text-slate-700 font-medium">2. Chọn vai trò (Freelancer kiếm tiền)</span>
          </div>
          <div class="flex items-center space-x-3 p-3 bg-emerald-50/50 border border-emerald-200 rounded-lg">
            <span class="w-6 h-6 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center text-xs">✓</span>
            <span class="text-slate-700 font-medium">3. Chọn danh mục chuyên môn & kỹ năng</span>
          </div>
          <div class="flex items-center space-x-3 p-3 bg-emerald-50/50 border border-emerald-200 rounded-lg">
            <span class="w-6 h-6 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center text-xs">✓</span>
            <span class="text-slate-700 font-medium">4. Tải ảnh đại diện & Thông tin liên hệ</span>
          </div>
          <div class="flex items-center space-x-3 p-3 bg-emerald-50/50 border border-emerald-200 rounded-lg">
            <span class="w-6 h-6 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center text-xs">✓</span>
            <span class="text-slate-700 font-medium">5. Viết tiêu đề hồ sơ & Tóm tắt năng lực</span>
          </div>
          <div class="flex items-center space-x-3 p-3 bg-pink-50 border border-pink-200 rounded-lg">
            <span class="w-6 h-6 rounded-full bg-[#e60278] text-white font-bold flex items-center justify-center text-xs">6</span>
            <span class="text-[#e60278] font-bold">6. Đặt mức giá theo giờ & Sẵn sàng làm việc (Hiện tại)</span>
          </div>
          <div class="flex items-center space-x-3 p-3 bg-slate-50 border border-slate-200 rounded-lg opacity-75">
            <span class="w-6 h-6 rounded-full bg-slate-200 text-slate-600 font-bold flex items-center justify-center text-xs">7</span>
            <span class="text-slate-600">7. Xác minh CCCD / Hộ chiếu (KYC)</span>
          </div>
          <div class="flex items-center space-x-3 p-3 bg-slate-50 border border-slate-200 rounded-lg opacity-75">
            <span class="w-6 h-6 rounded-full bg-slate-200 text-slate-600 font-bold flex items-center justify-center text-xs">8</span>
            <span class="text-slate-600">8. Liên kết tài khoản ngân hàng rút tiền</span>
          </div>
          <div class="flex items-center space-x-3 p-3 bg-slate-50 border border-slate-200 rounded-lg opacity-75">
            <span class="w-6 h-6 rounded-full bg-slate-200 text-slate-600 font-bold flex items-center justify-center text-xs">9</span>
            <span class="text-slate-600">9. Đăng tải sản phẩm mẫu vào Portfolio</span>
          </div>
          <div class="flex items-center space-x-3 p-3 bg-slate-50 border border-slate-200 rounded-lg opacity-75">
            <span class="w-6 h-6 rounded-full bg-slate-200 text-slate-600 font-bold flex items-center justify-center text-xs">10</span>
            <span class="text-slate-600">10. Chọn gói thành viên (Miễn phí / Plus)</span>
          </div>
          <div class="flex items-center space-x-3 p-3 bg-slate-50 border border-slate-200 rounded-lg opacity-75 col-span-1 sm:col-span-2">
            <span class="w-6 h-6 rounded-full bg-slate-200 text-slate-600 font-bold flex items-center justify-center text-xs">11</span>
            <span class="text-slate-600">11. Nhận chứng chỉ chào giá đầu tiên & Bắt đầu kiếm tiền</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  {get_footer()}
</body>
</html>'''
    return body

with open('frontend/onboarding.html', 'w', encoding='utf-8') as f:
    f.write(build_onboarding())
print("Built frontend/onboarding.html")
