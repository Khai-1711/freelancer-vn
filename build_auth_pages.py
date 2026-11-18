from template_helper import get_footer

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
  </style>
</head>
<body class="min-h-screen flex flex-col bg-[#f8f9fa] text-[#151d2a] antialiased">
'''

# 1. LOGIN.HTML
def build_login():
    return f'''{HEAD_TAG.replace('__TITLE__', 'Đăng Nhập Vào Freelancer - Chào Mừng Trở Lại')}
  
  <!-- Minimal Auth Header -->
  <header class="bg-white border-b border-slate-200 py-4 shadow-xs">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
      <a href="index.html" class="flex items-center space-x-2">
        <img src="https://www.f-cdn.com/assets/main/en/assets/freelancer-logo.svg" alt="Freelancer" class="h-8">
      </a>
      <div class="text-xs text-slate-600">
        Chưa có tài khoản? 
        <a href="signup.html" class="font-bold text-[#e60278] hover:underline ml-1">Đăng ký ngay</a>
      </div>
    </div>
  </header>

  <!-- Login Card Container -->
  <main class="flex-1 flex items-center justify-center px-4 py-12">
    <div class="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 shadow-card space-y-6">
      <div class="text-center space-y-2">
        <h1 class="text-2xl font-black text-[#151d2a]">Chào mừng trở lại</h1>
        <p class="text-xs text-slate-500">Đăng nhập để quản lý công việc và dự án của bạn.</p>
      </div>

      <!-- Social Login Buttons -->
      <div class="space-y-3">
        <button type="button" class="w-full flex items-center justify-center space-x-3 py-2.5 px-4 border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 transition">
          <svg class="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
          <span>Tiếp tục với Google</span>
        </button>
        <button type="button" class="w-full flex items-center justify-center space-x-3 py-2.5 px-4 bg-[#1877F2] hover:bg-[#166fe5] rounded-xl text-xs font-semibold text-white transition">
          <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          <span>Tiếp tục với Facebook</span>
        </button>
      </div>

      <div class="relative flex items-center justify-center">
        <div class="w-full border-t border-slate-200"></div>
        <span class="absolute bg-white px-3 text-[11px] uppercase tracking-wider text-slate-400 font-semibold">hoặc email</span>
      </div>

      <!-- Form Inputs -->
      <form onsubmit="event.preventDefault(); alert('Đăng nhập thành công! Chào mừng bạn trở lại.'); window.location.href='index.html';" class="space-y-4">
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">Email hoặc Tên người dùng</label>
          <input type="text" required placeholder="name@example.com hoặc username" value="phun4@example.com"
            class="w-full text-xs bg-[#f8f9fa] border border-slate-300 rounded-lg p-3 outline-none focus:border-[#007fed] focus:bg-white font-medium transition">
        </div>

        <div>
          <div class="flex items-center justify-between mb-1">
            <label class="block text-xs font-bold text-slate-700">Mật khẩu</label>
            <a href="#" class="text-[11px] font-semibold text-[#007fed] hover:underline">Quên mật khẩu?</a>
          </div>
          <input type="password" required value="••••••••••••"
            class="w-full text-xs bg-[#f8f9fa] border border-slate-300 rounded-lg p-3 outline-none focus:border-[#007fed] focus:bg-white font-medium transition">
        </div>

        <div class="flex items-center space-x-2 text-xs">
          <input type="checkbox" id="remember" checked class="rounded text-[#e60278] focus:ring-[#e60278]">
          <label for="remember" class="text-slate-600 cursor-pointer">Ghi nhớ đăng nhập trên thiết bị này</label>
        </div>

        <button type="submit" 
          class="w-full py-3 bg-[#e60278] hover:bg-[#c70066] text-white text-sm font-bold rounded-xl shadow-sm hover:shadow transition transform active:scale-98">
          Đăng nhập vào tài khoản
        </button>
      </form>
    </div>
  </main>

  {get_footer()}
</body>
</html>'''

# 2. SIGNUP.HTML
def build_signup():
    return f'''{HEAD_TAG.replace('__TITLE__', 'Đăng Ký Tài Khoản Freelancer - Miễn Phí')}

  <!-- Minimal Auth Header -->
  <header class="bg-white border-b border-slate-200 py-4 shadow-xs">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
      <a href="index.html" class="flex items-center space-x-2">
        <img src="https://www.f-cdn.com/assets/main/en/assets/freelancer-logo.svg" alt="Freelancer" class="h-8">
      </a>
      <div class="text-xs text-slate-600">
        Đã có tài khoản? 
        <a href="login.html" class="font-bold text-[#e60278] hover:underline ml-1">Đăng nhập</a>
      </div>
    </div>
  </header>

  <!-- Signup Card Container -->
  <main class="flex-1 flex items-center justify-center px-4 py-12">
    <div class="w-full max-w-lg bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 shadow-card space-y-6">
      <div class="text-center space-y-2">
        <h1 class="text-2xl font-black text-[#151d2a]">Tham gia Freelancer hôm nay</h1>
        <p class="text-xs text-slate-500">Đăng ký hoàn toàn miễn phí chỉ trong 30 giây.</p>
      </div>

      <!-- Persona Selector (Khách hàng vs Freelancer) -->
      <div>
        <label class="block text-xs font-bold text-slate-700 mb-2">Bạn tham gia với vai trò chính nào?</label>
        <div class="grid grid-cols-2 gap-3">
          <label class="border-2 border-[#e60278] bg-pink-50/20 rounded-xl p-3.5 flex flex-col items-center text-center cursor-pointer space-y-1">
            <input type="radio" name="role" checked class="text-[#e60278] mb-1">
            <span class="text-xs font-bold text-[#151d2a]">💼 Tôi muốn làm việc</span>
            <span class="text-[10px] text-slate-500">Kiếm tiền với tư cách Freelancer</span>
          </label>

          <label class="border border-slate-200 hover:border-slate-300 rounded-xl p-3.5 flex flex-col items-center text-center cursor-pointer space-y-1">
            <input type="radio" name="role" class="text-[#e60278] mb-1">
            <span class="text-xs font-bold text-[#151d2a]">🏢 Tôi muốn thuê</span>
            <span class="text-[10px] text-slate-500">Đăng dự án và tuyển nhân tài</span>
          </label>
        </div>
      </div>

      <!-- Social Signup -->
      <div class="space-y-3 pt-2">
        <button type="button" class="w-full flex items-center justify-center space-x-3 py-2.5 px-4 border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 transition">
          <svg class="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
          <span>Đăng ký nhanh bằng Google</span>
        </button>
        <button type="button" class="w-full flex items-center justify-center space-x-3 py-2.5 px-4 bg-[#1877F2] hover:bg-[#166fe5] rounded-xl text-xs font-semibold text-white transition">
          <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          <span>Đăng ký bằng Facebook</span>
        </button>
      </div>

      <div class="relative flex items-center justify-center">
        <div class="w-full border-t border-slate-200"></div>
        <span class="absolute bg-white px-3 text-[11px] uppercase tracking-wider text-slate-400 font-semibold">hoặc email</span>
      </div>

      <!-- Registration Form -->
      <form onsubmit="event.preventDefault(); alert('Đăng ký thành công! Chuyển bạn tới bước Onboarding thiết lập hồ sơ.'); window.location.href='onboarding.html';" class="space-y-4">
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">Họ</label>
            <input type="text" required placeholder="Nguyễn" 
              class="w-full text-xs bg-[#f8f9fa] border border-slate-300 rounded-lg p-3 outline-none focus:border-[#007fed] focus:bg-white font-medium transition">
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">Tên</label>
            <input type="text" required placeholder="Văn A" 
              class="w-full text-xs bg-[#f8f9fa] border border-slate-300 rounded-lg p-3 outline-none focus:border-[#007fed] focus:bg-white font-medium transition">
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">Địa chỉ Email</label>
          <input type="email" required placeholder="you@domain.com" 
            class="w-full text-xs bg-[#f8f9fa] border border-slate-300 rounded-lg p-3 outline-none focus:border-[#007fed] focus:bg-white font-medium transition">
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">Mật khẩu (tối thiểu 8 ký tự)</label>
          <input type="password" required placeholder="Nhập mật khẩu an toàn..." 
            class="w-full text-xs bg-[#f8f9fa] border border-slate-300 rounded-lg p-3 outline-none focus:border-[#007fed] focus:bg-white font-medium transition">
        </div>

        <div class="flex items-start space-x-2 text-xs pt-1">
          <input type="checkbox" required id="terms" class="mt-0.5 rounded text-[#e60278] focus:ring-[#e60278]">
          <label for="terms" class="text-slate-600 leading-snug cursor-pointer">
            Tôi đồng ý với <a href="#" class="text-[#007fed] underline">Điều khoản sử dụng</a> và <a href="#" class="text-[#007fed] underline">Chính sách bảo mật</a> của Freelancer.
          </label>
        </div>

        <button type="submit" 
          class="w-full py-3.5 bg-[#e60278] hover:bg-[#c70066] text-white text-sm font-bold rounded-xl shadow-sm hover:shadow transition transform active:scale-98">
          Tham gia Freelancer miễn phí
        </button>
      </form>
    </div>
  </main>

  {get_footer()}
</body>
</html>'''

with open('frontend/login.html', 'w', encoding='utf-8') as f:
    f.write(build_login())
print("Built frontend/login.html")

with open('frontend/signup.html', 'w', encoding='utf-8') as f:
    f.write(build_signup())
print("Built frontend/signup.html")
