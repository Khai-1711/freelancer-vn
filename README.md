# 🚀 Freelancer VN - Nền Tảng Việc Làm & Tuyển Dụng Freelance (ReactJS + Tailwind CSS)

Bản sao chuẩn xác (Pixel-Perfect Replica) của hệ thống **Freelancer.com (Việt Nam)** được xây dựng hoàn toàn mới bằng **ReactJS 18**, **Tailwind CSS 3** và **Vite 5**, bám sát 100% hệ thống thiết kế Light Theme từ Figma chính thức.

---

## 🌟 Tính Năng Chính (Theo 2 Vai Trò Người Dùng)

### 💼 1. Dành cho Freelancer (Người tìm việc)
* **Khám phá dự án (`/jobs`):**
  * Bộ lọc tìm kiếm thông minh: Theo loại dự án (Giá cố định, Theo giờ, Cuộc thi), mức ngân sách tối thiểu/tối đa, kỹ năng bắt buộc (React, Python, Figma, Next.js...).
  * Lọc theo uy tín nhà tuyển dụng: Đã xác thực thanh toán, đã nạp tiền ký quỹ Milestone.
  * Hiển thị thẻ công việc với huy hiệu nổi bật, mức giá chào thầu và số lượng đối thủ cạnh tranh.
* **Chi tiết dự án & Đặt giá thầu (`/project-detail`):**
  * Xem toàn bộ mô tả yêu cầu, kỹ năng bắt buộc, tài liệu đính kèm và danh sách các freelancer đã chào thầu.
  * **Bảng tính đặt giá thầu tự động (Live Bid Calculator):** Tự động tính toán phí dịch vụ nền tảng (10%) và hiển thị chính xác số tiền thực nhận.
  * Tùy chọn nâng cấp chào giá (Tài trợ thầu Top Bid, Cam kết bảo mật NDA).
* **Hồ sơ năng lực chuyên nghiệp (`/profile`):**
  * Trang hồ sơ freelancer cá nhân (`@phun4`) với ảnh bìa gradient, ảnh đại diện có chấm xanh online, thống kê thu nhập, số dự án hoàn thành và tỷ lệ hoàn thành 100%.
  * Giới thiệu bản thân, kỹ năng đã xác minh (Verified Skills) và đánh giá sao từ khách hàng quốc tế.
* **Quy trình Onboarding 11 bước (`/onboarding`):**
  * Lộ trình từng bước giúp freelancer mới gia nhập nền tảng: Thiết lập mức giá theo giờ, thời gian làm việc trong tuần, xác minh danh tính KYC và kích hoạt tài khoản.

### 🏢 2. Dành cho Khách hàng / Doanh nghiệp (Người thuê)
* **Đăng tin tuyển dụng Wizard 4 bước (`/post-project`):**
  * Bước 1: Tiêu đề công việc và mô tả chi tiết yêu cầu.
  * Bước 2: Tải lên tài liệu đính kèm và chọn thẻ kỹ năng cần thiết.
  * Bước 3: Lựa chọn phương thức thanh toán (Giá cố định vs Theo giờ) và dự toán ngân sách.
  * Bước 4: Xem trước và xuất bản dự án nhận chào giá ngay lập tức.
* **Danh mục tìm & thuê Freelancer (`/hire`):**
  * Danh bạ các chuyên gia hàng đầu được xếp hạng theo đánh giá sao (⭐ 4.8 - 5.0), tỷ lệ hoàn thành công việc và mức giá theo giờ.
  * Hỗ trợ gửi tin nhắn trực tiếp hoặc bấm "Thuê ngay".

### 🔑 3. Hệ thống Định danh & Phân quyền
* **Đăng nhập (`/login`):** Hỗ trợ đăng nhập nhanh bằng Google, Facebook hoặc Email/Username.
* **Đăng ký (`/signup`):** Bộ chọn vai trò kép (*Tôi muốn làm việc* vs *Tôi muốn thuê*).

---

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

* **Framework:** React 18 (SPA)
* **Build Tool:** Vite 5 (Khởi động cực nhanh, HMR tức thì)
* **Styling:** Tailwind CSS 3 (Cấu hình màu thương hiệu chuẩn Freelancer)
* **Routing:** React Router DOM v6
* **Typography:** Inter Font (Google Fonts)
* **Design System:** Đồng bộ theo bản thiết kế chuẩn [Figma Freelancer VN Light Theme](https://www.figma.com/design/d7deNARI1VR1Ck42stBCMH/Untitled)

---

## 🎨 Bảng Màu & Design Tokens

| Thành phần | Mã màu HEX | Mô tả |
| :--- | :--- | :--- |
| **Nền trang (Canvas)** | `#f8f9fa` | Nền sáng thanh lịch, dịu mắt |
| **Thẻ & Bề mặt (Cards)** | `#ffffff` | Nền trắng tinh khiết đổ bóng mềm |
| **Chữ tiêu đề (Headings)** | `#151d2a` | Xanh đen Navy trầm hiện đại |
| **Thân chữ (Body text)** | `#475569` | Xám Slate mềm mại, dễ đọc |
| **Nút hành động chính (Primary CTA)** | `#e60278` | Hồng Freelancer đặc trưng (`hover: #c70066`) |
| **Điểm nhấn & Liên kết (Secondary)** | `#007fed` | Xanh dương năng động (`hover: #0067c2`) |
| **Giá tiền & Ngân sách (Price Tag)** | `#059669` | Xanh ngọc lục bảo nổi bật |

---

## 📂 Cấu Trúc Thư Mục

```text
freelancer-vn/
├── index.html                  # File HTML chính nhúng Google Font Inter
├── package.json                # Cấu hình dependencies & scripts
├── vite.config.js              # Cấu hình Vite dev server
├── tailwind.config.js          # Khai báo màu sắc & shadow tokens
├── postcss.config.js           # Plugin Tailwind & Autoprefixer
├── src/
│   ├── main.jsx                # Entry point ứng dụng React
│   ├── App.jsx                 # Cấu hình Router và khung Layout chung
│   ├── index.css               # Import Tailwind và CSS tùy biến
│   ├── components/
│   │   ├── Navbar.jsx          # Thanh điều hướng có nhận diện trang hiện tại
│   │   └── Footer.jsx          # Chân trang Dark Navy chuẩn đa cột
│   └── pages/
│       ├── Home.jsx            # Trang chủ
│       ├── Jobs.jsx            # Tìm kiếm việc làm & Bộ lọc
│       ├── ProjectDetail.jsx   # Chi tiết dự án & Bảng tính Bidding
│       ├── PostProject.jsx     # Wizard 4 bước đăng tin dự án
│       ├── Hire.jsx            # Danh bạ thuê freelancer
│       ├── Profile.jsx         # Hồ sơ cá nhân freelancer @phun4
│       ├── Onboarding.jsx      # Quy trình Onboarding 11 bước
│       ├── Login.jsx           # Trang Đăng nhập
│       └── Signup.jsx          # Trang Đăng ký (Dual Persona)
└── README.md                   # Hướng dẫn cài đặt & vận hành
```

---

## ⚡ Hướng Dẫn Cài Đặt & Chạy Ứng Dụng

### 1. Yêu cầu hệ thống
* **Node.js:** Phiên bản `18.x` hoặc mới hơn.
* **npm:** Phiên bản `9.x` hoặc mới hơn.

### 2. Cài đặt các gói phụ thuộc (Dependencies)
```bash
# Clone dự án về máy
git clone https://github.com/Khai-1711/freelancer-vn.git
cd freelancer-vn

# Cài đặt thư viện
npm install
```

### 3. Chạy môi trường phát triển (Development Server)
```bash
npm run dev
```
Sau khi chạy lệnh, truy cập trình duyệt tại địa chỉ: **[http://localhost:5173/](http://localhost:5173/)**

### 4. Build bản Production đóng gói
```bash
npm run build
```
Mã nguồn sau khi tối ưu hóa (minify & chunking) sẽ nằm trong thư mục `dist/`.

Để kiểm tra thử bản build production ngay trên máy:
```bash
npm run preview
```

---

## 🗺️ Danh Sách Đường Dẫn (Routes Map)

| Đường dẫn (URL) | Trang giao diện | Chức năng |
| :--- | :--- | :--- |
| `/` | **Trang chủ** | Giới thiệu nền tảng, danh mục công việc, đối tác & dự án mới |
| `/jobs` | **Tìm việc làm** | Duyệt danh sách dự án với bộ lọc kỹ năng, ngân sách, phân loại |
| `/project-detail` | **Chi tiết dự án** | Đọc mô tả công việc, tài liệu và đặt giá thầu (Live Bid Calculator) |
| `/post-project` | **Đăng dự án** | Wizard 4 bước đăng tin tuyển dụng dành cho khách hàng |
| `/hire` | **Thuê Freelancer** | Danh bạ chuyên gia hàng đầu được xếp hạng theo đánh giá sao |
| `/profile` | **Hồ sơ Freelancer** | Xem hồ sơ năng lực, bằng cấp, portfolio của freelancer mẫu `@phun4` |
| `/onboarding` | **Onboarding** | Lộ trình 11 bước thiết lập hồ sơ cho freelancer mới |
| `/login` | **Đăng nhập** | Form đăng nhập tập trung hỗ trợ tài khoản & mạng xã hội |
| `/signup` | **Đăng ký** | Đăng ký tài khoản nhanh với bộ chọn vai trò Người thuê / Freelancer |

---

## 📄 Bản Quyền & Giấy Phép
Dự án được xây dựng phục vụ mục đích nghiên cứu và phát triển phần mềm giao diện. Bản quyền logo và nhãn hiệu thuộc về Freelancer Technology Pty Limited.
