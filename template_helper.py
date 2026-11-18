import os

# Common Navigation Header
def get_header(active_nav=""):
    nav_links = [
        ("Tìm việc làm", "jobs.html", "jobs"),
        ("Thuê Freelancer", "hire.html", "hire"),
        ("Chi tiết dự án", "project-detail.html", "project"),
        ("Hồ sơ cá nhân", "profile.html", "profile"),
        ("Quy trình Onboarding", "onboarding.html", "onboarding"),
    ]
    
    links_html = ""
    for label, url, key in nav_links:
        is_active = (key == active_nav)
        active_cls = "text-[#e60278] font-semibold border-b-2 border-[#e60278]" if is_active else "text-slate-600 hover:text-slate-900 hover:border-b-2 hover:border-slate-300"
        links_html += f'<a href="{url}" class="h-16 flex items-center px-1 text-sm font-medium transition {active_cls}">{label}</a>\n'

    return f'''
  <!-- Navigation Header -->
  <header class="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-xs">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
      <div class="flex items-center space-x-8">
        <a href="index.html" class="flex items-center space-x-2 group">
          <img src="https://www.f-cdn.com/assets/main/en/assets/freelancer-logo.svg" alt="Freelancer" class="h-8 transition transform group-hover:scale-105" onerror="this.src=''; this.innerText='freelancer'">
        </a>
        <nav class="hidden lg:flex items-center space-x-6">
          {links_html}
        </nav>
      </div>

      <div class="flex items-center space-x-3 sm:space-x-4">
        <a href="login.html" class="text-sm font-semibold text-slate-700 hover:text-slate-900 px-3 py-2 transition">Đăng nhập</a>
        <a href="signup.html" class="hidden sm:inline-flex text-sm font-semibold text-slate-700 hover:text-slate-900 border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 px-4 py-2 rounded-lg transition">Đăng ký</a>
        <a href="post-project.html" class="inline-flex items-center justify-center text-sm font-bold bg-[#e60278] hover:bg-[#c70066] text-white px-5 py-2.5 rounded-lg shadow-sm hover:shadow transition transform active:scale-95">
          <span>Đăng dự án</span>
        </a>
      </div>
    </div>
  </header>
'''

# Common Footer
def get_footer():
    return '''
  <!-- Footer -->
  <footer class="bg-[#151d2a] text-slate-400 pt-16 pb-12 mt-auto border-t border-slate-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
        <div class="col-span-2 lg:col-span-1 space-y-4">
          <img src="https://www.f-cdn.com/assets/main/en/assets/freelancer-logo-light.svg" alt="Freelancer" class="h-8 opacity-90">
          <p class="text-xs text-slate-400 leading-relaxed">
            Freelancer.com là thị trường làm việc tự do và dịch vụ cộng đồng lớn nhất thế giới tính theo tổng số người dùng và công việc.
          </p>
          <div class="flex items-center space-x-3 text-slate-400 pt-2">
            <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 hover:bg-[#007fed] hover:text-white transition cursor-pointer text-xs">FB</span>
            <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 hover:bg-[#007fed] hover:text-white transition cursor-pointer text-xs">TW</span>
            <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 hover:bg-[#007fed] hover:text-white transition cursor-pointer text-xs">YT</span>
            <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 hover:bg-[#007fed] hover:text-white transition cursor-pointer text-xs">IN</span>
          </div>
        </div>

        <div>
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">Freelancer</h4>
          <ul class="space-y-2.5 text-xs">
            <li><a href="jobs.html" class="hover:text-white transition">Tìm việc theo danh mục</a></li>
            <li><a href="hire.html" class="hover:text-white transition">Dự án theo quốc gia</a></li>
            <li><a href="jobs.html" class="hover:text-white transition">Cuộc thi Freelancer</a></li>
            <li><a href="jobs.html" class="hover:text-white transition">Dự án AI & Machine Learning</a></li>
            <li><a href="hire.html" class="hover:text-white transition">Doanh nghiệp Enterprise</a></li>
          </ul>
        </div>

        <div>
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">Khám phá</h4>
          <ul class="space-y-2.5 text-xs">
            <li><a href="index.html" class="hover:text-white transition">Cách thức hoạt động</a></li>
            <li><a href="onboarding.html" class="hover:text-white transition">Quy trình bắt đầu</a></li>
            <li><a href="post-project.html" class="hover:text-white transition">Hướng dẫn bảo mật</a></li>
            <li><a href="profile.html" class="hover:text-white transition">Hồ sơ xác minh</a></li>
            <li><a href="#" class="hover:text-white transition">Câu chuyện thành công</a></li>
          </ul>
        </div>

        <div>
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">Giới thiệu</h4>
          <ul class="space-y-2.5 text-xs">
            <li><a href="#" class="hover:text-white transition">Về Freelancer</a></li>
            <li><a href="#" class="hover:text-white transition">Bảo mật & Cam kết</a></li>
            <li><a href="#" class="hover:text-white transition">Cơ hội nghề nghiệp</a></li>
            <li><a href="#" class="hover:text-white transition">Tin tức báo chí</a></li>
            <li><a href="#" class="hover:text-white transition">Biểu phí & Lệ phí</a></li>
          </ul>
        </div>

        <div>
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">Điều khoản</h4>
          <ul class="space-y-2.5 text-xs">
            <li><a href="#" class="hover:text-white transition">Chính sách bảo mật</a></li>
            <li><a href="#" class="hover:text-white transition">Điều khoản sử dụng</a></li>
            <li><a href="#" class="hover:text-white transition">Bản quyền & DMCA</a></li>
            <li><a href="#" class="hover:text-white transition">Quy tắc ứng xử</a></li>
            <li><a href="#" class="hover:text-white transition">Chính sách Cookie</a></li>
          </ul>
        </div>
      </div>

      <div class="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 space-y-4 md:space-y-0">
        <div>
          © 2026 Freelancer Technology Pty Limited. Đã đăng ký bản quyền.
        </div>
        <div class="flex items-center space-x-6">
          <span class="flex items-center space-x-1.5 cursor-pointer hover:text-slate-200">
            <span>🌐</span>
            <span>Tiếng Việt (VN)</span>
          </span>
          <span class="flex items-center space-x-1.5 cursor-pointer hover:text-slate-200">
            <span>💵</span>
            <span>USD / VNĐ</span>
          </span>
        </div>
      </div>
    </div>
  </footer>
'''

print("Helper loaded.")
