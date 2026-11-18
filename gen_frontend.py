import os

frontend_dir = r"c:\Users\khai1\OneDrive\Máy tính\sth\frontend"

# Helper for shared navbar
def get_navbar(active="jobs"):
    return f"""
    <!-- Navbar -->
    <header class="bg-[#131b26] border-b border-[#232d3d] sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <div class="flex items-center space-x-8">
                <a href="index.html" class="flex items-center space-x-2">
                    <span class="text-2xl font-black text-[#1772eb] tracking-tight">freelancer</span>
                </a>
                <nav class="hidden md:flex items-center space-x-6 text-sm font-medium">
                    <a href="jobs.html" class="{'text-[#e60278] font-bold' if active == 'jobs' else 'text-gray-300 hover:text-white'}">Tìm việc</a>
                    <a href="hire.html" class="{'text-[#e60278] font-bold' if active == 'hire' else 'text-gray-300 hover:text-white'}">Thuê Freelancer</a>
                    <a href="post-project.html" class="{'text-[#e60278] font-bold' if active == 'post' else 'text-gray-300 hover:text-white'}">Đăng dự án</a>
                    <a href="onboarding.html" class="{'text-[#e60278] font-bold' if active == 'onboarding' else 'text-gray-300 hover:text-white'}">Quy trình Onboarding (11 bước)</a>
                </nav>
            </div>
            <div class="flex items-center space-x-4">
                <a href="post-project.html" class="bg-[#e60278] hover:bg-[#d0026c] text-white px-4 py-2 rounded-md text-sm font-bold shadow-lg transition">Đăng dự án</a>
                <a href="profile.html" class="flex items-center space-x-2 bg-[#161f2e] border border-[#232d3d] px-3 py-1.5 rounded-full hover:border-[#1772eb] transition">
                    <div class="w-6 h-6 rounded-full bg-[#1772eb] flex items-center justify-center text-xs font-bold text-white">P</div>
                    <span class="text-sm font-medium text-white">@phun4</span>
                    <span class="text-xs font-bold text-emerald-400 ml-1">$0.00</span>
                </a>
            </div>
        </div>
    </header>
    """

def get_footer():
    return """
    <!-- Footer -->
    <footer class="bg-[#08090d] border-t border-[#232d3d] py-12 text-sm text-gray-500">
        <div class="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div class="flex items-center space-x-4">
                <span class="text-xl font-black text-[#1772eb]">freelancer</span>
                <span>© 2026 Freelancer Technology Pty Limited (ACN 142 189 759)</span>
            </div>
            <div class="flex space-x-6">
                <a href="jobs.html" class="hover:text-white">Tìm việc</a>
                <a href="hire.html" class="hover:text-white">Thuê freelancer</a>
                <a href="post-project.html" class="hover:text-white">Đăng dự án</a>
                <a href="onboarding.html" class="hover:text-white">Onboarding Funnel</a>
            </div>
        </div>
    </footer>
    """

# 1. JOBS.HTML
jobs_html = f"""<!DOCTYPE html>
<html lang="vi" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tìm việc làm Freelance | Freelancer Việt Nam</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>body {{ font-family: 'Inter', sans-serif; background-color: #08090d; color: #f5f7fa; }}</style>
</head>
<body class="min-h-screen flex flex-col">
    {get_navbar('jobs')}
    
    <!-- Search Bar Subheader -->
    <section class="bg-[#131b26] border-b border-[#232d3d] py-4">
        <div class="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-4">
            <div class="relative flex-1 w-full">
                <input type="text" placeholder="Tìm kiếm công việc (ví dụ: Python, Graphic Design, Web Scraping)..." class="w-full bg-[#08090d] border border-[#232d3d] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#1772eb]">
            </div>
            <button class="bg-[#1772eb] hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition">Tìm kiếm việc</button>
        </div>
    </section>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 py-8 flex-1 w-full flex flex-col lg:flex-row gap-8">
        <!-- Sidebar Filters -->
        <aside class="w-full lg:w-72 bg-[#161f2e] border border-[#232d3d] rounded-xl p-6 h-fit space-y-6">
            <h2 class="text-base font-bold text-white border-b border-[#232d3d] pb-3">Bộ lọc tìm kiếm</h2>
            
            <!-- Type -->
            <div class="space-y-3">
                <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Loại dự án</h3>
                <label class="flex items-center space-x-2 text-sm text-gray-300 cursor-pointer">
                    <input type="checkbox" checked class="rounded bg-[#08090d] border-[#232d3d] text-[#1772eb]">
                    <span>Dự án giá cố định (Fixed)</span>
                </label>
                <label class="flex items-center space-x-2 text-sm text-gray-300 cursor-pointer">
                    <input type="checkbox" checked class="rounded bg-[#08090d] border-[#232d3d] text-[#1772eb]">
                    <span>Dự án theo giờ (Hourly)</span>
                </label>
            </div>

            <!-- Budget -->
            <div class="space-y-3">
                <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Ngân sách ($ USD)</h3>
                <div class="flex items-center space-x-2">
                    <input type="number" value="10" class="w-1/2 bg-[#08090d] border border-[#232d3d] rounded px-2 py-1 text-sm text-white">
                    <span class="text-gray-500">-</span>
                    <input type="number" value="1500" class="w-1/2 bg-[#08090d] border border-[#232d3d] rounded px-2 py-1 text-sm text-white">
                </div>
            </div>

            <!-- Skills -->
            <div class="space-y-3">
                <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Kỹ năng phổ biến</h3>
                <div class="flex flex-wrap gap-1.5">
                    <span class="bg-[#08090d] border border-[#232d3d] text-xs px-2.5 py-1 rounded text-gray-300 hover:border-[#1772eb] cursor-pointer">Python (412)</span>
                    <span class="bg-[#08090d] border border-[#232d3d] text-xs px-2.5 py-1 rounded text-gray-300 hover:border-[#1772eb] cursor-pointer">Graphic Design (713)</span>
                    <span class="bg-[#08090d] border border-[#232d3d] text-xs px-2.5 py-1 rounded text-gray-300 hover:border-[#1772eb] cursor-pointer">Golang (89)</span>
                    <span class="bg-[#08090d] border border-[#232d3d] text-xs px-2.5 py-1 rounded text-gray-300 hover:border-[#1772eb] cursor-pointer">Excel Entry (308)</span>
                    <span class="bg-[#08090d] border border-[#232d3d] text-xs px-2.5 py-1 rounded text-gray-300 hover:border-[#1772eb] cursor-pointer">React.js (520)</span>
                </div>
            </div>
        </aside>

        <!-- Jobs Feed -->
        <section class="flex-1 space-y-4">
            <div class="flex justify-between items-center pb-2">
                <h1 class="text-lg font-bold text-white">4,453 việc làm freelance có sẵn</h1>
                <span class="text-sm text-gray-400">Sắp xếp: <strong class="text-[#1772eb] cursor-pointer">Mới nhất ▼</strong></span>
            </div>

            <!-- Job 1 -->
            <article class="bg-[#161f2e] border border-[#232d3d] rounded-xl p-6 hover:border-[#1772eb] transition space-y-3">
                <div class="flex justify-between items-start">
                    <div>
                        <a href="project-detail.html" class="text-lg font-bold text-white hover:text-[#1772eb] transition">Part-time Remote Golang Backend Engineer for Web Scraping Pipeline</a>
                        <div class="flex items-center space-x-3 text-xs text-gray-400 mt-1">
                            <span class="text-[#e60278] font-semibold">Giá cố định</span>
                            <span>•</span>
                            <span>Đăng 6 phút trước</span>
                            <span>•</span>
                            <span class="text-[#1772eb]">4 chào giá</span>
                        </div>
                    </div>
                    <span class="text-lg font-bold text-emerald-400">$250 - $750 USD</span>
                </div>
                <p class="text-sm text-gray-300 leading-relaxed">Chúng tôi cần một lập trình viên Golang giàu kinh nghiệm để bảo trì và nâng cấp pipeline thu thập dữ liệu tự động quy mô lớn. Yêu cầu thành thạo Goroutines, Channels, Redis Streams và hệ thống proxy phân tán.</p>
                <div class="flex flex-wrap gap-2 pt-2">
                    <span class="bg-[#08090d] border border-[#232d3d] text-xs px-2.5 py-1 rounded text-gray-400">Golang</span>
                    <span class="bg-[#08090d] border border-[#232d3d] text-xs px-2.5 py-1 rounded text-gray-400">PostgreSQL</span>
                    <span class="bg-[#08090d] border border-[#232d3d] text-xs px-2.5 py-1 rounded text-gray-400">Redis</span>
                    <span class="bg-[#08090d] border border-[#232d3d] text-xs px-2.5 py-1 rounded text-gray-400">Docker</span>
                </div>
            </article>

            <!-- Job 2 -->
            <article class="bg-[#161f2e] border border-[#232d3d] rounded-xl p-6 hover:border-[#1772eb] transition space-y-3">
                <div class="flex justify-between items-start">
                    <div>
                        <a href="project-detail.html" class="text-lg font-bold text-white hover:text-[#1772eb] transition">Excel Data Entry & Cleanup Specialist needed urgently</a>
                        <div class="flex items-center space-x-3 text-xs text-gray-400 mt-1">
                            <span class="text-[#e60278] font-semibold">Giá cố định</span>
                            <span>•</span>
                            <span>Đăng 24 phút trước</span>
                            <span>•</span>
                            <span class="text-[#1772eb]">19 chào giá</span>
                        </div>
                    </div>
                    <span class="text-lg font-bold text-emerald-400">$30 - $250 USD</span>
                </div>
                <p class="text-sm text-gray-300 leading-relaxed">Cần nhập và xử lý làm sạch hơn 10.000 dòng dữ liệu sản phẩm thương mại điện tử từ các tệp Excel rời rạc sang mẫu chuẩn của công ty.</p>
                <div class="flex flex-wrap gap-2 pt-2">
                    <span class="bg-[#08090d] border border-[#232d3d] text-xs px-2.5 py-1 rounded text-gray-400">Excel</span>
                    <span class="bg-[#08090d] border border-[#232d3d] text-xs px-2.5 py-1 rounded text-gray-400">Data Entry</span>
                    <span class="bg-[#08090d] border border-[#232d3d] text-xs px-2.5 py-1 rounded text-gray-400">Data Cleaning</span>
                </div>
            </article>

            <!-- Job 3 -->
            <article class="bg-[#161f2e] border border-[#232d3d] rounded-xl p-6 hover:border-[#1772eb] transition space-y-3">
                <div class="flex justify-between items-start">
                    <div>
                        <a href="project-detail.html" class="text-lg font-bold text-white hover:text-[#1772eb] transition">Thiết kế bộ nhận diện thương hiệu và Landing Page cho Startup AI</a>
                        <div class="flex items-center space-x-3 text-xs text-gray-400 mt-1">
                            <span class="text-[#e60278] font-semibold">Theo giờ</span>
                            <span>•</span>
                            <span>Đăng 1 giờ trước</span>
                            <span>•</span>
                            <span class="text-[#1772eb]">12 chào giá</span>
                        </div>
                    </div>
                    <span class="text-lg font-bold text-emerald-400">$15 - $25 USD / giờ</span>
                </div>
                <p class="text-sm text-gray-300 leading-relaxed">Tìm Designer UI/UX chuyên nghiệp thiết kế toàn diện UI kit và landing page trên Figma cho ứng dụng AI tự động hóa.</p>
                <div class="flex flex-wrap gap-2 pt-2">
                    <span class="bg-[#08090d] border border-[#232d3d] text-xs px-2.5 py-1 rounded text-gray-400">Figma</span>
                    <span class="bg-[#08090d] border border-[#232d3d] text-xs px-2.5 py-1 rounded text-gray-400">UI/UX Design</span>
                    <span class="bg-[#08090d] border border-[#232d3d] text-xs px-2.5 py-1 rounded text-gray-400">Graphic Design</span>
                </div>
            </article>
        </section>
    </main>

    {get_footer()}
</body>
</html>"""

with open(os.path.join(frontend_dir, "jobs.html"), "w", encoding="utf-8") as f:
    f.write(jobs_html)

# 2. PROJECT-DETAIL.HTML
detail_html = f"""<!DOCTYPE html>
<html lang="vi" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chi tiết dự án & Đặt chào giá | Freelancer Việt Nam</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>body {{ font-family: 'Inter', sans-serif; background-color: #08090d; color: #f5f7fa; }}</style>
</head>
<body class="min-h-screen flex flex-col">
    {get_navbar('jobs')}

    <main class="max-w-7xl mx-auto px-4 py-8 flex-1 w-full flex flex-col lg:flex-row gap-8">
        <!-- Main Column: Project details & Place a bid -->
        <div class="flex-1 space-y-6">
            <!-- Project Header Card -->
            <div class="bg-[#161f2e] border border-[#232d3d] rounded-xl p-8 space-y-4">
                <div class="flex justify-between items-start">
                    <h1 class="text-2xl font-bold text-white leading-tight">Part-time Remote Golang Backend Engineer for Web Scraping Pipeline</h1>
                    <span class="text-2xl font-black text-emerald-400">$250 - $750 USD</span>
                </div>
                <div class="flex items-center space-x-4 text-xs text-gray-400">
                    <span class="bg-[#08090d] border border-[#232d3d] px-2.5 py-1 rounded text-white font-medium">Giá cố định</span>
                    <span>Đăng 15 phút trước</span>
                    <span>Dự án ID: 40823818</span>
                </div>
                <hr class="border-[#232d3d]">
                <div class="space-y-4 text-sm text-gray-300 leading-relaxed">
                    <h2 class="text-base font-bold text-white">Mô tả công việc</h2>
                    <p>Chúng tôi đang tìm kiếm một Golang Software Engineer làm việc từ xa bán thời gian (khoảng 20 giờ/tuần) để tham gia phát triển và tối ưu hóa hệ thống backend thu thập dữ liệu trực tuyến.</p>
                    <p class="font-semibold text-white">Yêu cầu năng lực:</p>
                    <ul class="list-disc pl-5 space-y-1">
                        <li>Thành thạo Golang (Goroutines, Channels, Worker Pools).</li>
                        <li>Kinh nghiệm với Redis Streams, PostgreSQL, Docker Compose.</li>
                        <li>Hiểu biết sâu về cơ chế chống bot (Cloudflare, TLS Fingerprinting, Proxy rotation).</li>
                        <li>Giao tiếp tốt và cam kết thời gian hoàn thành.</li>
                    </ul>
                </div>
            </div>

            <!-- Authentic Bid Form -->
            <div class="bg-[#161f2e] border-2 border-[#e60278] rounded-xl p-8 space-y-6">
                <div>
                    <h2 class="text-xl font-bold text-white">Đặt chào giá của bạn (Place a Bid)</h2>
                    <p class="text-sm text-gray-400">Bạn sẽ có cơ hội được khách hàng chọn nếu đưa ra đề xuất rõ ràng và mức giá cạnh tranh.</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-2">
                        <label class="text-sm font-semibold text-white">Giá chào thầu của bạn ($ USD)</label>
                        <div class="relative">
                            <span class="absolute left-3 top-2.5 text-gray-400">$</span>
                            <input type="number" value="350" class="w-full bg-[#08090d] border border-[#232d3d] rounded-lg pl-8 pr-4 py-2.5 text-white font-bold text-lg focus:outline-none focus:border-[#1772eb]">
                        </div>
                        <span class="text-xs text-gray-500">Phí dịch vụ Freelancer: $35.00 (Bạn nhận: $315.00)</span>
                    </div>

                    <div class="space-y-2">
                        <label class="text-sm font-semibold text-white">Giao hàng trong (ngày)</label>
                        <input type="number" value="5" class="w-full bg-[#08090d] border border-[#232d3d] rounded-lg px-4 py-2.5 text-white font-bold text-lg focus:outline-none focus:border-[#1772eb]">
                        <span class="text-xs text-gray-500">Thời gian dự kiến hoàn tất toàn bộ yêu cầu</span>
                    </div>
                </div>

                <div class="space-y-2">
                    <label class="text-sm font-semibold text-white">Miêu tả đề xuất của bạn (Tối thiểu 100 ký tự)</label>
                    <textarea rows="5" class="w-full bg-[#08090d] border border-[#232d3d] rounded-lg p-4 text-sm text-white focus:outline-none focus:border-[#1772eb]" placeholder="Kính chào Quý khách! Tôi là Golang Engineer với hơn 4 năm kinh nghiệm xây dựng hệ thống thu thập dữ liệu quy mô lớn..."></textarea>
                </div>

                <button class="w-full bg-[#e60278] hover:bg-[#d0026c] text-white py-3.5 rounded-lg text-base font-bold shadow-xl transition">Gửi chào giá ngay</button>
            </div>
        </div>

        <!-- Sidebar: Client verification -->
        <aside class="w-full lg:w-80 space-y-6">
            <div class="bg-[#161f2e] border border-[#232d3d] rounded-xl p-6 space-y-4">
                <h3 class="text-base font-bold text-white border-b border-[#232d3d] pb-3">Thông tin nhà tuyển dụng</h3>
                <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white">AU</div>
                    <div>
                        <div class="text-sm font-bold text-white">Melbourne Tech Pty</div>
                        <div class="text-xs text-gray-400">Australia • Đã tham gia 3 năm</div>
                    </div>
                </div>

                <div class="space-y-2 pt-2 text-xs">
                    <div class="flex items-center space-x-2 text-emerald-400">
                        <span>✓</span> <span>Phương thức thanh toán đã xác thực</span>
                    </div>
                    <div class="flex items-center space-x-2 text-emerald-400">
                        <span>✓</span> <span>Email đã xác thực</span>
                    </div>
                    <div class="flex items-center space-x-2 text-emerald-400">
                        <span>✓</span> <span>Số điện thoại đã xác minh</span>
                    </div>
                    <div class="flex items-center space-x-2 text-emerald-400">
                        <span>✓</span> <span>Hồ sơ danh tính được duyệt</span>
                    </div>
                </div>

                <div class="pt-4 border-t border-[#232d3d] text-xs text-gray-400 space-y-1">
                    <div>Tổng số dự án đã đăng: <strong>47 dự án</strong></div>
                    <div>Tỷ lệ thuê thành công: <strong>94%</strong></div>
                    <div>Tổng ngân sách đã chi: <strong>$14,200 USD</strong></div>
                </div>
            </div>
        </aside>
    </main>

    {get_footer()}
</body>
</html>"""

with open(os.path.join(frontend_dir, "project-detail.html"), "w", encoding="utf-8") as f:
    f.write(detail_html)

# 3. POST-PROJECT.HTML
post_html = f"""<!DOCTYPE html>
<html lang="vi" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Đăng dự án & Tuyển Freelancer | Freelancer Việt Nam</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>body {{ font-family: 'Inter', sans-serif; background-color: #08090d; color: #f5f7fa; }}</style>
</head>
<body class="min-h-screen flex flex-col">
    {get_navbar('post')}

    <main class="max-w-4xl mx-auto px-4 py-12 flex-1 w-full">
        <div class="bg-[#161f2e] border border-[#232d3d] rounded-2xl p-8 md:p-12 space-y-8 shadow-2xl">
            <div class="text-center space-y-2">
                <h1 class="text-3xl font-extrabold text-white">Nói cho chúng tôi biết bạn cần làm gì</h1>
                <p class="text-gray-400 text-sm">Nhận chào giá miễn phí từ các Freelancer hàng đầu trong vòng vài phút</p>
            </div>

            <!-- Step 1: Project Name -->
            <div class="space-y-3">
                <label class="text-sm font-bold text-white flex items-center justify-between">
                    <span>1. Chọn tiêu đề cho dự án của bạn</span>
                    <span class="text-xs text-gray-500 font-normal">Ngắn gọn và chính xác</span>
                </label>
                <input type="text" placeholder="Ví dụ: Thiết kế giao diện Website TMĐT thời trang bằng Figma..." class="w-full bg-[#08090d] border border-[#232d3d] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#1772eb]">
            </div>

            <!-- Step 2: Description & Files -->
            <div class="space-y-3">
                <label class="text-sm font-bold text-white">2. Miêu tả chi tiết công việc</label>
                <textarea rows="5" placeholder="Mô tả các yêu cầu, kết quả bàn giao mong muốn và bất kỳ chi tiết quan trọng nào..." class="w-full bg-[#08090d] border border-[#232d3d] rounded-lg p-4 text-sm text-white focus:outline-none focus:border-[#1772eb]"></textarea>
                <div class="border-2 border-dashed border-[#232d3d] hover:border-[#1772eb] rounded-xl p-6 text-center cursor-pointer transition">
                    <p class="text-sm text-gray-400"><strong class="text-[#1772eb]">Kéo thả file vào đây</strong> hoặc bấm để tải lên (Tối đa 25MB)</p>
                </div>
            </div>

            <!-- Step 3: Required Skills -->
            <div class="space-y-3">
                <label class="text-sm font-bold text-white">3. Những kỹ năng nào được yêu cầu?</label>
                <div class="flex flex-wrap gap-2">
                    <span class="bg-[#e60278]/20 border border-[#e60278] text-[#e60278] text-xs px-3 py-1.5 rounded-full flex items-center space-x-1">
                        <span>Figma</span> <button class="ml-1 text-sm">×</button>
                    </span>
                    <span class="bg-[#e60278]/20 border border-[#e60278] text-[#e60278] text-xs px-3 py-1.5 rounded-full flex items-center space-x-1">
                        <span>UI/UX Design</span> <button class="ml-1 text-sm">×</button>
                    </span>
                    <span class="bg-[#e60278]/20 border border-[#e60278] text-[#e60278] text-xs px-3 py-1.5 rounded-full flex items-center space-x-1">
                        <span>Graphic Design</span> <button class="ml-1 text-sm">×</button>
                    </span>
                    <input type="text" placeholder="+ Thêm kỹ năng..." class="bg-[#08090d] border border-[#232d3d] rounded-full px-3 py-1 text-xs text-white focus:outline-none focus:border-[#1772eb]">
                </div>
            </div>

            <!-- Step 4: Budget -->
            <div class="space-y-4">
                <label class="text-sm font-bold text-white">4. Ngân sách dự kiến của bạn</label>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label class="border-2 border-[#e60278] bg-[#08090d] rounded-xl p-5 cursor-pointer block">
                        <div class="flex items-center justify-between mb-2">
                            <span class="font-bold text-white text-base">Thanh toán giá cố định</span>
                            <span class="w-4 h-4 rounded-full bg-[#e60278] flex items-center justify-center text-white text-xs">✓</span>
                        </div>
                        <p class="text-xs text-gray-400">Trả một lần cho toàn bộ dự án khi hoàn thành.</p>
                        <select class="mt-4 w-full bg-[#161f2e] border border-[#232d3d] rounded p-2 text-sm text-white">
                            <option>Dự án nhỏ ($250 - $750 USD)</option>
                            <option>Dự án rất nhỏ ($30 - $250 USD)</option>
                            <option>Dự án lớn ($1,500 - $3,000 USD)</option>
                        </select>
                    </label>

                    <label class="border border-[#232d3d] bg-[#08090d] rounded-xl p-5 cursor-pointer block hover:border-gray-500">
                        <div class="flex items-center justify-between mb-2">
                            <span class="font-bold text-white text-base">Thanh toán theo giờ</span>
                            <span class="w-4 h-4 rounded-full border border-gray-600"></span>
                        </div>
                        <p class="text-xs text-gray-400">Theo dõi giờ làm việc bằng Freelancer Time Tracker.</p>
                        <select class="mt-4 w-full bg-[#161f2e] border border-[#232d3d] rounded p-2 text-sm text-white text-gray-500">
                            <option>Mức tiêu chuẩn ($15 - $25 USD / giờ)</option>
                        </select>
                    </label>
                </div>
            </div>

            <button class="w-full bg-[#e60278] hover:bg-[#d0026c] text-white py-4 rounded-xl text-lg font-bold shadow-2xl transition">Đăng dự án và nhận chào giá ngay lập tức</button>
        </div>
    </main>

    {get_footer()}
</body>
</html>"""

with open(os.path.join(frontend_dir, "post-project.html"), "w", encoding="utf-8") as f:
    f.write(post_html)

# 4. ONBOARDING.HTML (The 11-step visual simulator)
onboarding_html = f"""<!DOCTYPE html>
<html lang="vi" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quy trình Onboarding 11 bước | Freelancer Việt Nam</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>body {{ font-family: 'Inter', sans-serif; background-color: #08090d; color: #f5f7fa; }}</style>
</head>
<body class="min-h-screen flex flex-col">
    {get_navbar('onboarding')}

    <main class="max-w-2xl mx-auto px-4 py-8 flex-1 w-full flex items-center justify-center">
        <!-- Exact Modal Container -->
        <div class="w-full bg-[#161f2e] border border-[#232d3d] rounded-2xl shadow-2xl overflow-hidden">
            <!-- Header bar with Progress Indicator -->
            <div class="bg-[#131b26] border-b border-[#232d3d] px-6 py-4 flex items-center justify-between">
                <div class="flex items-center space-x-3">
                    <span class="text-gray-400 cursor-pointer hover:text-white">‹</span>
                    <h2 class="text-sm font-bold text-white">Bước 4/11: Chọn kỹ năng tốt nhất của bạn</h2>
                </div>
                <span class="text-xs text-[#1772eb] font-semibold">45% hoàn thành</span>
            </div>
            <!-- Progress Line -->
            <div class="w-full bg-[#232d3d] h-1">
                <div class="bg-[#1772eb] h-1 w-[45%]"></div>
            </div>

            <!-- Content Area -->
            <div class="p-8 space-y-6">
                <div>
                    <h1 class="text-xl font-bold text-white">Hãy cho chúng tôi biết các kỹ năng tốt nhất của bạn</h1>
                    <p class="text-sm text-gray-400 mt-1">Việc này giúp chúng tôi khuyến nghị công việc phù hợp cho bạn.</p>
                </div>

                <!-- Search -->
                <div class="relative">
                    <input type="text" placeholder="Tìm kỹ năng..." class="w-full bg-[#08090d] border border-[#232d3d] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#1772eb]">
                </div>

                <!-- Category / Skills List -->
                <div class="space-y-2 max-h-80 overflow-y-auto pr-1">
                    <div class="flex items-center justify-between p-3.5 bg-[#08090d] border border-[#1772eb] rounded-lg cursor-pointer">
                        <span class="text-sm font-medium text-white">Graphic Design <span class="text-xs text-gray-500">(713 công việc)</span></span>
                        <span class="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded">✓ Đã chọn</span>
                    </div>

                    <div class="flex items-center justify-between p-3.5 bg-[#08090d] border border-[#232d3d] hover:border-gray-600 rounded-lg cursor-pointer">
                        <span class="text-sm font-medium text-gray-300">Video Editing <span class="text-xs text-gray-500">(462 công việc)</span></span>
                        <span class="text-sm text-[#1772eb] font-bold">+</span>
                    </div>

                    <div class="flex items-center justify-between p-3.5 bg-[#08090d] border border-[#232d3d] hover:border-gray-600 rounded-lg cursor-pointer">
                        <span class="text-sm font-medium text-gray-300">Website Design <span class="text-xs text-gray-500">(391 công việc)</span></span>
                        <span class="text-sm text-[#1772eb] font-bold">+</span>
                    </div>

                    <div class="flex items-center justify-between p-3.5 bg-[#08090d] border border-[#232d3d] hover:border-gray-600 rounded-lg cursor-pointer">
                        <span class="text-sm font-medium text-gray-300">Video Production <span class="text-xs text-gray-500">(371 công việc)</span></span>
                        <span class="text-sm text-[#1772eb] font-bold">+</span>
                    </div>

                    <div class="flex items-center justify-between p-3.5 bg-[#08090d] border border-[#1772eb] rounded-lg cursor-pointer">
                        <span class="text-sm font-medium text-white">Photoshop <span class="text-xs text-gray-500">(308 công việc)</span></span>
                        <span class="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded">✓ Đã chọn</span>
                    </div>
                </div>

                <!-- Footer Actions -->
                <div class="flex items-center justify-between pt-4 border-t border-[#232d3d]">
                    <button class="px-5 py-2.5 rounded-lg border border-[#232d3d] text-sm font-semibold text-gray-300 hover:text-white">Bỏ qua</button>
                    <a href="profile.html" class="px-6 py-2.5 rounded-lg bg-[#1772eb] hover:bg-blue-600 text-sm font-bold text-white transition">Tiếp theo →</a>
                </div>
            </div>
        </div>
    </main>

    {get_footer()}
</body>
</html>"""

with open(os.path.join(frontend_dir, "onboarding.html"), "w", encoding="utf-8") as f:
    f.write(onboarding_html)

# 5. PROFILE.HTML (@phun4)
profile_html = f"""<!DOCTYPE html>
<html lang="vi" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hồ sơ phu nguyen (@phun4) | Freelancer Việt Nam</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>body {{ font-family: 'Inter', sans-serif; background-color: #08090d; color: #f5f7fa; }}</style>
</head>
<body class="min-h-screen flex flex-col">
    {get_navbar('jobs')}

    <main class="max-w-7xl mx-auto px-4 py-8 flex-1 w-full space-y-6">
        <!-- Profile Banner / Header -->
        <div class="bg-[#161f2e] border border-[#232d3d] rounded-2xl p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div class="flex items-center space-x-6">
                <div class="w-24 h-24 rounded-full bg-[#e60278] flex items-center justify-center text-3xl font-black text-white shadow-xl">P</div>
                <div class="space-y-1">
                    <h1 class="text-2xl font-extrabold text-white">phu nguyen <span class="text-sm font-normal text-gray-400">(@phun4)</span></h1>
                    <p class="text-sm font-semibold text-[#1772eb]">Senior Fullstack & AI Integration Engineer | 5+ Years Exp</p>
                    <p class="text-xs text-gray-400">Đà Nẵng, Việt Nam • Tham gia tháng 11 năm 2026</p>
                </div>
            </div>
            <div class="text-right space-y-2">
                <div class="text-2xl font-black text-emerald-400">$25.00 USD / giờ</div>
                <button class="bg-[#08090d] border border-[#232d3d] hover:border-white text-xs px-4 py-2 rounded-lg text-white font-semibold transition">Chỉnh sửa hồ sơ</button>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left 2 Cols: Bio & Portfolio -->
            <div class="lg:col-span-2 space-y-6">
                <div class="bg-[#161f2e] border border-[#232d3d] rounded-xl p-8 space-y-4">
                    <h2 class="text-lg font-bold text-white">Giới thiệu về tôi</h2>
                    <p class="text-sm text-gray-300 leading-relaxed">Xin chào! Tôi là kỹ sư phần mềm chuyên về kiến trúc hệ thống backend hiệu năng cao với FastAPI, Python, Golang và ứng dụng AI tự động hóa. Tôi cam kết mang lại chất lượng code tối ưu, tài liệu chi tiết và bảo hành lâu dài cho mọi dự án tôi đảm nhiệm trên nền tảng Freelancer.</p>
                    
                    <h3 class="text-sm font-bold text-white pt-4">Kỹ năng hàng đầu</h3>
                    <div class="flex flex-wrap gap-2">
                        <span class="bg-[#08090d] border border-[#232d3d] text-xs px-3 py-1.5 rounded-lg text-gray-300">Python</span>
                        <span class="bg-[#08090d] border border-[#232d3d] text-xs px-3 py-1.5 rounded-lg text-gray-300">FastAPI</span>
                        <span class="bg-[#08090d] border border-[#232d3d] text-xs px-3 py-1.5 rounded-lg text-gray-300">Golang</span>
                        <span class="bg-[#08090d] border border-[#232d3d] text-xs px-3 py-1.5 rounded-lg text-gray-300">PostgreSQL</span>
                        <span class="bg-[#08090d] border border-[#232d3d] text-xs px-3 py-1.5 rounded-lg text-gray-300">Docker</span>
                    </div>
                </div>

                <div class="bg-[#161f2e] border border-[#232d3d] rounded-xl p-8 space-y-4">
                    <h2 class="text-lg font-bold text-white">Đánh giá từ khách hàng</h2>
                    <p class="text-sm text-gray-400 italic">Chưa có đánh giá nào. Hãy chào giá các dự án đầu tiên để xây dựng uy tín!</p>
                </div>
            </div>

            <!-- Right Col: Verifications -->
            <aside class="space-y-6">
                <div class="bg-[#161f2e] border border-[#232d3d] rounded-xl p-6 space-y-4">
                    <h3 class="text-base font-bold text-white border-b border-[#232d3d] pb-3">Xác thực hồ sơ</h3>
                    <div class="space-y-3 text-xs">
                        <div class="flex items-center justify-between text-emerald-400">
                            <span>✓ Email đã xác thực</span>
                            <span class="font-bold">ĐÃ XÁC THỰC</span>
                        </div>
                        <div class="flex items-center justify-between text-emerald-400">
                            <span>✓ Phương thức thanh toán</span>
                            <span class="font-bold">ĐÃ XÁC THỰC</span>
                        </div>
                        <div class="flex items-center justify-between text-amber-400">
                            <span>! Số điện thoại</span>
                            <span class="underline cursor-pointer">Xác thực ngay</span>
                        </div>
                        <div class="flex items-center justify-between text-amber-400">
                            <span>! Căn cước công dân</span>
                            <span class="underline cursor-pointer">Xác thực ngay</span>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    </main>

    {get_footer()}
</body>
</html>"""

with open(os.path.join(frontend_dir, "profile.html"), "w", encoding="utf-8") as f:
    f.write(profile_html)

# 6. HIRE.HTML (Client Persona)
hire_html = f"""<!DOCTYPE html>
<html lang="vi" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thuê Freelancer Hàng Đầu | Freelancer Việt Nam</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>body {{ font-family: 'Inter', sans-serif; background-color: #08090d; color: #f5f7fa; }}</style>
</head>
<body class="min-h-screen flex flex-col">
    {get_navbar('hire')}

    <main class="max-w-7xl mx-auto px-4 py-8 flex-1 w-full space-y-8">
        <div>
            <h1 class="text-2xl font-black text-white">Thuê Freelancer hàng đầu Việt Nam & Quốc tế</h1>
            <p class="text-sm text-gray-400 mt-1">Khám phá hơn 50 triệu chuyên gia sẵn sàng thực hiện mọi ý tưởng của bạn.</p>
        </div>

        <!-- Category Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-[#161f2e] border border-[#232d3d] hover:border-[#1772eb] rounded-xl p-5 text-center cursor-pointer transition">
                <div class="text-base font-bold text-white">Website & IT</div>
                <div class="text-xs text-[#1772eb] mt-1">14,200 chuyên gia</div>
            </div>
            <div class="bg-[#161f2e] border border-[#232d3d] hover:border-[#1772eb] rounded-xl p-5 text-center cursor-pointer transition">
                <div class="text-base font-bold text-white">Thiết kế Đồ họa</div>
                <div class="text-xs text-[#1772eb] mt-1">9,800 chuyên gia</div>
            </div>
            <div class="bg-[#161f2e] border border-[#232d3d] hover:border-[#1772eb] rounded-xl p-5 text-center cursor-pointer transition">
                <div class="text-base font-bold text-white">Viết lách & Dịch thuật</div>
                <div class="text-xs text-[#1772eb] mt-1">7,500 chuyên gia</div>
            </div>
            <div class="bg-[#161f2e] border border-[#232d3d] hover:border-[#1772eb] rounded-xl p-5 text-center cursor-pointer transition">
                <div class="text-base font-bold text-white">Tiếp thị & Bán hàng</div>
                <div class="text-xs text-[#1772eb] mt-1">5,300 chuyên gia</div>
            </div>
        </div>

        <!-- Top Freelancers List -->
        <section class="space-y-4">
            <h2 class="text-lg font-bold text-white">Freelancers được đánh giá cao nhất</h2>

            <div class="bg-[#161f2e] border border-[#232d3d] rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div class="flex items-center space-x-4">
                    <div class="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-lg">TM</div>
                    <div>
                        <div class="flex items-center space-x-2">
                            <span class="text-base font-bold text-white">Tuấn Anh M.</span>
                            <span class="text-xs text-yellow-400 font-bold">★ 5.0 (48 đánh giá)</span>
                        </div>
                        <p class="text-sm text-[#e60278] font-medium">Fullstack Python & AI Engineer</p>
                        <div class="flex gap-1.5 mt-2">
                            <span class="bg-[#08090d] text-xs px-2 py-0.5 rounded text-gray-400">Python</span>
                            <span class="bg-[#08090d] text-xs px-2 py-0.5 rounded text-gray-400">FastAPI</span>
                            <span class="bg-[#08090d] text-xs px-2 py-0.5 rounded text-gray-400">React</span>
                        </div>
                    </div>
                </div>
                <div class="flex items-center space-x-4 w-full md:w-auto justify-between md:justify-end">
                    <span class="text-lg font-bold text-emerald-400">$30.00 / giờ</span>
                    <a href="post-project.html" class="bg-[#e60278] hover:bg-[#d0026c] text-white px-5 py-2.5 rounded-lg text-sm font-bold transition">Thuê ngay</a>
                </div>
            </div>

            <div class="bg-[#161f2e] border border-[#232d3d] rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div class="flex items-center space-x-4">
                    <div class="w-14 h-14 rounded-full bg-pink-600 flex items-center justify-center font-bold text-white text-lg">LN</div>
                    <div>
                        <div class="flex items-center space-x-2">
                            <span class="text-base font-bold text-white">Linh Nguyễn</span>
                            <span class="text-xs text-yellow-400 font-bold">★ 4.9 (112 đánh giá)</span>
                        </div>
                        <p class="text-sm text-[#e60278] font-medium">Senior UI/UX & Mobile App Designer</p>
                        <div class="flex gap-1.5 mt-2">
                            <span class="bg-[#08090d] text-xs px-2 py-0.5 rounded text-gray-400">Figma</span>
                            <span class="bg-[#08090d] text-xs px-2 py-0.5 rounded text-gray-400">UI/UX</span>
                            <span class="bg-[#08090d] text-xs px-2 py-0.5 rounded text-gray-400">Design System</span>
                        </div>
                    </div>
                </div>
                <div class="flex items-center space-x-4 w-full md:w-auto justify-between md:justify-end">
                    <span class="text-lg font-bold text-emerald-400">$22.00 / giờ</span>
                    <a href="post-project.html" class="bg-[#e60278] hover:bg-[#d0026c] text-white px-5 py-2.5 rounded-lg text-sm font-bold transition">Thuê ngay</a>
                </div>
            </div>
        </section>
    </main>

    {get_footer()}
</body>
</html>"""

with open(os.path.join(frontend_dir, "hire.html"), "w", encoding="utf-8") as f:
    f.write(hire_html)

print("Generated all HTML files successfully!")
