# ViecTech — Sàn Dự Án & Chuyên Gia Công Nghệ Việt Nam

Ứng dụng web nền tảng kết nối doanh nghiệp công nghệ với các kỹ sư phần mềm, chuyên gia UI/UX và dữ liệu tại Việt Nam. Được xây dựng bằng **React 18**, **Tailwind CSS 3**, **React Router v6** và **Vite 5** theo phong cách **Obsidian Dark Tech** hiện đại, quản lý toàn bộ luồng nghiệp vụ tương tác trực tiếp trên bộ nhớ (in-memory state).

---

## Tính năng chính

### 1. Dành cho Người tìm việc (Freelancer)
* **Đăng ký người tìm việc 4 bước (`/signup?role=freelancer`, `/register-freelancer`)**:
  * **Bước 1 (Tài khoản)**: Chọn vai trò, đăng ký nhanh mẫu (Google/GitHub) hoặc bằng email kèm thanh đo độ mạnh mật khẩu và xác nhận Điều khoản sử dụng.
  * **Bước 2 (Tên người dùng `@username`)**: Kiểm tra hợp lệ và kiểm tra trùng theo thời gian thực với danh bạ hiện có, tự động gợi ý các `@username` khả dụng.
  * **Bước 3 (Kỹ năng tìm việc 2 cột)**: Duyệt kỹ năng theo 6 lĩnh vực chuyên môn, tìm kiếm/thêm kỹ năng tự do (tối đa 20 kỹ năng) và đếm số dự án đang mở khớp với bộ kỹ năng vừa chọn.
  * **Bước 4 (Xác thực Email OTP & Mức giá)**: Xác thực mã 6 chữ số (có nút gửi lại mã), thiết lập mức giá theo giờ và đồng bộ hồ sơ ngay lập tức lên danh bạ chuyên gia.
* **Tìm kiếm & Lọc dự án thời gian thực (`/jobs`)**:
  * Lọc đồng thời theo từ khóa, lĩnh vực, hình thức thanh toán (Giá cố định / Theo giờ), ngưỡng ngân sách tối thiểu, kỹ năng, trạng thái xác minh thanh toán/Milestone và danh sách dự án đã lưu.
  * Hỗ trợ sắp xếp (Mới nhất, Ngân sách cao/thấp, Ít chào giá nhất), bộ lọc dạng ngăn kéo (Drawer) trên di động và trạng thái trống (Empty State) kèm nút đặt lại nhanh.
* **Chi tiết dự án & Đặt chào giá trực tiếp (`/projects/:id`)**:
  * Định tuyến động theo mã dự án, hiển thị yêu cầu kỹ thuật, kỹ năng, tài liệu đính kèm và danh sách chào giá.
  * Bảng tính chào giá trực tiếp tự động tính phí bảo vệ Milestone (10%) và số tiền thực nhận; gửi chào giá sẽ thêm ngay vào danh sách và cập nhật mức giá trung bình.
* **Thiết lập hồ sơ chuyên gia 5 bước (`/onboarding`)**:
  * Di chuyển linh hoạt giữa 5 bước (Chuyên môn → Kỹ năng → Mức giá & ước tính thu nhập tháng → Giới thiệu → Hoàn tất) và đồng bộ trực tiếp sang trang hồ sơ công khai.

### 2. Dành cho Doanh nghiệp / Khách hàng
* **Đăng dự án Wizard 4 bước (`/post-project`)**:
  * Bước 1: Tiêu đề, lĩnh vực, mô tả chi tiết (có nút điền nhanh dữ liệu mẫu và kiểm tra hợp lệ).
  * Bước 2: Quản lý thẻ kỹ năng yêu cầu (chọn gợi ý, thêm kỹ năng tùy chỉnh, xóa từng kỹ năng).
  * Bước 3: Chọn Giá cố định hoặc Theo giờ, nhập khoảng ngân sách, thời gian triển khai, địa điểm và cam kết Milestone.
  * Bước 4: Xem trước thẻ dự án và xuất bản ngay lên đầu danh sách `/jobs`.
* **Danh bạ Chuyên gia & Hồ sơ động (`/hire`, `/freelancers/:id`)**:
  * Tìm kiếm và lọc chuyên gia theo nhóm chuyên môn và trạng thái sẵn sàng nhận việc.
  * Xem hồ sơ riêng từng chuyên gia gồm số liệu công việc, dự án tiêu biểu (Portfolio) và đánh giá từ khách hàng.
  * Mở **Modal Nhắn tin trực tiếp** hoặc **Modal Mời nhận việc** (chọn dự án cụ thể và đề xuất ngân sách) thay thế hoàn toàn `window.alert()`.

### 3. Trải nghiệm giao diện & Tiện ích chung
* **Responsive hoàn chỉnh**: Thanh điều hướng 3 vùng gọn gàng kèm Mobile Slide-Over Drawer trên màn hình `< 1024px`.
* **Chuyển đổi tiền tệ trực tiếp**: Nút chuyển đổi `VNĐ ↔ USD` ở chân trang tự động quy đổi toàn bộ giá dự án, chào giá và mức giá theo giờ trên toàn ứng dụng.
* **Hệ thống thông báo Toast & Modal toàn cục**: Mọi thao tác đều có phản hồi trực quan không chặn luồng tương tác, tự động cuộn lên đầu trang khi chuyển route và có trang `404` riêng.

---

## Công nghệ sử dụng

* **Framework**: React 18 (Functional Components & Hooks)
* **Routing**: React Router DOM v6 (Dynamic Routes & Query Params)
* **Styling**: Tailwind CSS 3 (Custom Obsidian Dark Tech Tokens)
* **Icons**: `lucide-react` (100% vector icon, không dùng emoji)
* **Build Tool**: Vite 5 (cổng phát triển `3000`)
* **Typography**: `Plus Jakarta Sans` (hiển thị & nội dung) kết hợp `JetBrains Mono` (`tabular-nums` cho toàn bộ số liệu và tiền tệ)

---

## Bảng màu & Design Tokens

| Thành phần | Token Tailwind | Mã màu HEX | Mục đích sử dụng |
| :--- | :--- | :--- | :--- |
| **Nền trang chính** | `obsidian-950` | `#090C12` | Canvas nền tối dịu mắt |
| **Bề mặt thẻ / Sidebar** | `obsidian-850` | `#111622` | Phân cấp nội dung với viền `1px` mờ |
| **Bề mặt tương tác / Hover** | `obsidian-800` | `#161D2C` | Trạng thái hover cho thẻ & menu |
| **Điểm nhấn chính (CTA)** | `cobalt-500` | `#3B82F6` | Nút hành động chính & trạng thái đang chọn |
| **Xác minh & Ngân sách** | `semantic-emerald` | `#10B981` | Giá tiền, thực nhận, xác minh Milestone |
| **Đánh giá sao / Cảnh báo** | `semantic-amber` | `#F59E0B` | Điểm đánh giá chuyên gia & độ mạnh mật khẩu |
| **Thông báo lỗi** | `semantic-danger` | `#EF4444` | Validation form & cảnh báo thao tác |

---

## Cấu trúc thư mục

```text
freelancer-vn/
├── index.html                        # HTML gốc, nhúng Plus Jakarta Sans & JetBrains Mono
├── package.json                      # Dependencies và scripts npm
├── vite.config.js                    # Cấu hình Vite dev server (port 3000)
├── tailwind.config.js                # Khai báo bảng màu Obsidian / Cobalt & font chữ
├── postcss.config.js                 # Cấu hình PostCSS & Autoprefixer
├── src/
│   ├── main.jsx                      # Điểm khởi chạy React DOM
│   ├── App.jsx                       # Cấu hình Router động, Layout chung & Provider
│   ├── index.css                     # Biến CSS nền tối, scrollbar & focus-visible
│   ├── assets/images/                # Ảnh studio Hero và ảnh chân dung chuyên gia
│   ├── data/
│   │   └── mockData.js               # Dữ liệu mẫu tập trung (dự án, chuyên gia, danh mục)
│   ├── context/
│   │   └── MarketplaceContext.jsx    # Quản lý state tập trung trong bộ nhớ (auth, bids, modals, toast)
│   ├── components/
│   │   ├── Avatar.jsx                # Ảnh đại diện có dự phòng ký tự đầu khi ảnh lỗi
│   │   ├── Navbar.jsx                # Thanh điều hướng 3 vùng + Mobile Drawer
│   │   ├── Footer.jsx                # Chân trang kèm nút đổi tiền tệ VNĐ/USD
│   │   ├── GlobalOverlays.jsx        # Hệ thống Toast, Modal Nhắn tin & Modal Mời việc
│   │   └── ScrollToTop.jsx           # Tự động cuộn đầu trang khi đổi route
│   └── pages/
│       ├── Home.jsx                  # Trang chủ Hero bất đối xứng, KPI & dự án nổi bật
│       ├── Jobs.jsx                  # Tìm việc & bộ lọc thời gian thực
│       ├── ProjectDetail.jsx         # Chi tiết dự án & bảng tính đặt chào giá
│       ├── PostProject.jsx           # Wizard 4 bước đăng dự án mới
│       ├── Hire.jsx                  # Danh bạ & bộ lọc chuyên gia
│       ├── Profile.jsx               # Hồ sơ chuyên gia động (Portfolio & đánh giá)
│       ├── Onboarding.jsx            # Quy trình thiết lập hồ sơ 5 bước
│       ├── Login.jsx                 # Đăng nhập tài khoản
│       ├── Signup.jsx                # Đăng ký 4 bước cho Người tìm việc & Doanh nghiệp
│       └── NotFound.jsx              # Trang 404 khi không tìm thấy tuyến đường
└── README.md                         # Tài liệu dự án
```

---

## Cài đặt & Chạy dự án

### Yêu cầu môi trường
* Node.js `18.x` trở lên
* npm `9.x` trở lên

### Các lệnh cơ bản
```bash
# Cài đặt thư viện
npm install

# Khởi chạy môi trường phát triển tại http://localhost:3000
npm run dev

# Đóng gói bản production vào thư mục dist/
npm run build

# Xem trước bản build production
npm run preview
```

---

## Bản đồ đường dẫn (Routes)

| Đường dẫn | Trang | Mô tả |
| :--- | :--- | :--- |
| `/` | Trang chủ | Giới thiệu ViecTech, danh mục kỹ năng, dự án mới đăng và chuyên gia tiêu biểu |
| `/jobs` | Tìm việc làm | Lọc & sắp xếp dự án theo thời gian thực (hỗ trợ query `?category=`, `?skill=`) |
| `/projects/:id` | Chi tiết dự án | Xem yêu cầu kỹ thuật, danh sách chào giá và gửi đề xuất chào giá mới |
| `/post-project` | Đăng dự án | Quy trình 4 bước xuất bản dự án mới trực tiếp lên sàn |
| `/hire` | Chuyên gia | Tìm kiếm, lọc chuyên gia và mở modal nhắn tin / mời nhận việc |
| `/freelancers/:id` | Hồ sơ chuyên gia | Hồ sơ năng lực chi tiết, dự án đã làm và đánh giá từ doanh nghiệp |
| `/onboarding` | Thiết lập hồ sơ | Quy trình 5 bước cập nhật kỹ năng, mức giá và giới thiệu bản thân |
| `/signup` | Đăng ký | Luồng đăng ký 4 bước cho Người tìm việc (`?role=freelancer`) và Doanh nghiệp (`?role=client`) |
| `/register-freelancer` | Đăng ký tìm việc | Đường dẫn trực tiếp tới luồng đăng ký dành cho người tìm việc |
| `/login` | Đăng nhập | Đăng nhập phiên làm việc và cập nhật trạng thái tài khoản trên Navbar |
