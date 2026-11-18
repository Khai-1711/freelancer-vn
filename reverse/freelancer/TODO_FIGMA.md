# 🎨 TODO-LIST THIẾT KẾ FIGMA — Replica vn.freelancer.com

> Mục tiêu: Thiết kế giao diện replica dựa trên kết quả reverse-engineering đã có (HTML SSR, bundle JS, CSS inline, DOM tree) trong thư mục `analysis/` và `raw/`.
>
> Công cụ: **Figma** (miễn phí)
> Liên kết tài liệu: `REPORT.md`, `analysis/dom-tree.json`, `analysis/css-inline.css`, `analysis/report.json`, `analysis/all-routes.txt`, `analysis/env-block.txt`

---

## 🗂️ CẤU TRÚC FILE FIGMA ĐỀ XUẤT

```
Freelancer Replica (File Figma)
├─ 0. Design System
│   ├─ Colors (Brand, Neutral, Semantic)
│   ├─ Typography (Roboto, Barlow, Barlow Condensed)
│   ├─ Spacing & Grid (12 cột, container 1200px)
│   ├─ Border-radius, Shadows, Elevation
│   └─ Icons (Heroicons / Material)
├─ 1. Components (Atoms, Molecules, Organisms)
├─ 2. Screens (Pages)
│   ├─ Home (/)
│   ├─ Login (/login)
│   ├─ Hire (/hire)
│   ├─ Jobs / Post-project (/jobs, /post-project)
│   ├─ Dashboard (/dashboard)
│   ├─ Messages (/messages)
## 📋 GIAI ĐOẠN 0: THIẾT LẬP FILE & DESIGN SYSTEM (P0)

| ID | Task | Mô tả chi tiết | Tài liệu tham khảo | Output (Figma) | Thời gian |
|:---|:-----|:---------------|:-------------------|:---------------|:----------|
| F0.1 | Tạo file Figma mới | Đặt tên `Freelancer Replica – vn.freelancer.com`, tạo các page như cấu trúc trên | – | File Figma sẵn sàng | 15 phút |
| F0.2 | Thiết lập Local Styles: Colors | Tạo màu sắc từ `analysis/css-inline.css` và `analysis/report.json` (màu chính, màu nền, màu văn bản, màu trạng thái) | `css-inline.css`, `report.json` (top colors) | Color Styles | 45 phút |
| F0.3 | Thiết lập Local Styles: Typography | Font Roboto, Roboto Flex, Barlow, Barlow Condensed; kích thước, trọng số, line-height từ phân tích CSS | `REPORT.md` mục 1.1, `css-inline.css` | Text Styles | 45 phút |
| F0.4 | Thiết lập Grid & Layout | Grid 12 cột (`data-col="1..12"`), container max-width 1200px, gutter, margin | `REPORT.md` mục 7.3, `dom-tree.json` | Grid Styles, Layout Grid | 30 phút |
| F0.5 | Tạo Effects (Shadow, Blur, Radius) | Lấy từ Material Design tokens (`--mat-*`) trong CSS inline | `css-inline.css` (`--mat-button-*`, elevation) | Effect Styles | 30 phút |
| F0.6 | Tạo Icon set | Thu thập icon từ thiết kế gốc (logo, menu, category, action) | `dom-tree.json` (custom elements `fl-icon`, svg) | Icon library | 1 giờ |

## 📋 GIAI ĐOẠN 1: COMPONENT LIBRARY (P0-P1)

| ID | Task | Mô tả chi tiết | Tài liệu tham khảo | Output (Figma Component) | Thời gian |
|:---|:-----|:---------------|:-------------------|:-------------------------|:----------|
| C1.1 | Button (fl-button) | Primary, Outlined, Text, Tonal; các trạng thái: Default, Hover, Active, Disabled, Loading | `--mat-button-*` tokens | `btn/main` (Variants) | 1 giờ |
| C1.2 | Input Field | Text, Email, Password, Select, Textarea; trạng thái focus/error/success | DOM analysis (`input`, `select`) | `input/main` | 1 giờ |
| C1.3 | Card (fl-col / data-col) | Card dịch vụ, card dự án, card công ty tin dùng; các kích thrap 1–12 cột | `app-home-page-hire-categories`, `fl-col` | `card/main`, `card/grid-12` | 1 giờ |
| C1.4 | Navbar (Logged-out) | Logo, menu (Thuê/Tìm việc/Giải pháp), ngôn ngữ, nút Đăng nhập | `app-navigation-logged-out-home` | `navbar/main` | 1 giờ |
| C1.5 | Footer | FooterSection, nhóm link, bản quyền, social | `app-footer > app-footer-freelancer` | `footer/main` | 45 phút |
| C1.6 | Modal / Dialog | Đăng nhập, hợp đồng, thông báo | `fl-modal` trong DOM | `modal/main` | 45 phút |
| C1.7 | Badge / Tag | Categoría skill, status dự án, mức độ ưu tiên | `app-home-page-hire-categories` | `badge/main` | 30 phút |
| C1.8 | Toast / Alert | Thông báo thành công, lỗi, cảnh báo | `app-toast-alerts / fl-toast-alert-container` | `toast/main` | 30 phút |
| C1.9 | Pagination | Trang phân halaman danh sách dự án/công việc | Route analysis | `pagination/main` | 30 phút |
| C1.10 | Avatar | Ảnh đại diện người dùng, freelancer, công ty | `fl-picture` analysis | `avatar/main` | 30 phút |

## 📋 GIAI ĐOẠN 2: WIREFRAME (LOW FIDELITY) (P0)

| ID | Task | Mô tả chi tiết | Tài liệu tham khảo | Output (Figma Frame) | Thời gian |
|:---|:-----|:---------------|:-------------------|:---------------------|:----------|
| W2.1 | Wireframe Home (/) | Header, Hero, Trust logos, Features, Global talent, Discover, Hire categories, AI services, Enterprise, Footer | `raw/home.html`, `dom-tree.json` | `Home – Wireframe` (1440px) | 2 giờ |
| W2.2 | Wireframe Login (/login) | Form đăng nhập, social login (Google/Facebook/Apple), forgot password | `auth/login.php`, `all-routes.txt` | `Login – Wireframe` | 1 giờ |
| W2.3 | Wireframe Hire (/hire) | Trang cho nhà tuyển dụng, tạo dự án mới | `all-routes.txt` | `Hire – Wireframe` | 1 giờ |
| W2.4 | Wireframe Jobs (/jobs) | Danh sách công việc, lọc, tìm kiếm | `all-routes.txt` | `Jobs – Wireframe` | 1 giờ |
| W2.5 | Wireframe Post-project (/post-project) | Form đăng dự án mới (multiple steps) | `all-routes.txt` | `Post-project – Wireframe` | 1.5 giờ |
| W2.6 | Wireframe Dashboard (/dashboard) | Bảng điều khiển người dùng sau đăng nhập | `all-routes.txt` | `Dashboard – Wireframe` | 1.5 giờ |
| W2.7 | Wireframe Messages (/messages) | Danh sách cuộc trò chuyện, chi tiết tin nhắn | `all-routes.txt`, resource `messages` | `Messages – Wireframe` | 1 giờ |
| W2.8 | Wireframe Legal (Privacy, Terms, About) | Trang tĩnh văn bản | `/about/privacy`, `/about/terms` | `Legal – Wireframe` | 45 phút |

## 📋 GIAI ĐOẠN 3: VISUAL DESIGN (HIGH FIDELITY) (P0)

| ID | Task | Mô tả chi tiết | Tài liệu tham khảo | Output (Figma Frame) | Thời gian |
|:---|:-----|:---------------|:-------------------|:---------------------|:----------|
| V3.1 | Visual Home (/) | Áp dụng màu, font, hình ảnh thực tế vào wireframe Home | `css-inline.css`, `home.html` (hình ảnh, banner) | `Home – Final` | 3 giờ |
| V3.2 | Visual Login (/login) | Hoàn thiện form, nút, nút social, validation states | `auth/login.php` | `Login – Final` | 1.5 giờ |
| V3.3 | Visual Hire (/hire) | Hero hire, form tạo dự án nhanh, gói dịch vụ | `all-routes.txt` | `Hire – Final` | 2 giờ |
| V3.4 | Visual Jobs (/jobs) | Danh sách thẻ dự án, bộ lọc chuyên ngành, ngân sách, kinh nghiệm | `all-routes.txt` | `Jobs – Final` | 2 giờ |
| V3.5 | Visual Post-project (/post-project) | Multi-step form: thông tin dự án → ngân sách → kỹ năng → công bố | `all-routes.txt` | `Post-project – Final` | 2 giờ |
| V3.6 | Visual Dashboard (/dashboard) | Sidebar, thống kê, dự án đang進行, thông báo | `all-routes.txt` | `Dashboard – Final` | 2 giờ |
| V3.7 | Visual Messages (/messages) | Danh sách nhắn tin bên trái, chi tiết bên phải, input gửi tin | `messages` resource | `Messages – Final` | 1.5 giờ |
| V3.8 | Visual Legal & About | Typography tập trung, không phân tâm | `/about/privacy`, `/about/terms` | `Legal – Final` | 1 giờ |
| V3.9 | Responsive variants | Tạo phiên bản Mobile (375px), Tablet (768px) cho Home, Login, Jobs | Breakpoints từ `css-inline.css` | `Mobile/Tablet variants` | 3 giờ |

## 📋 GIAI ĐOẠN 4: PROTOTYPE & INTERACTION (P1)

| ID | Task | Mô tả chi tiết | Tài liệu tham khảo | Output (Figma Prototype) | Thời gian |
|:---|:-----|:---------------|:-------------------|:-------------------------|:----------|
| P4.1 | Flow Đăng nhập → Dashboard | Kết nối Login → Dashboard sau khi bấm Đăng nhập | `auth/login.php` | Prototype flow 1 | 45 phút |
| P4.2 | Flow Đăng dự án (Post-project) | Kết nối các bước form multi-step | `all-routes.txt` | Prototype flow 2 | 1 giờ |
| P4.3 | Flow Xem chi tiết công việc | Jobs → Chi tiết dự án → Đấu giá / Ứng tuyển | `all-routes.txt` | Prototype flow 3 | 1 giờ |
| P4.4 | Mobile menu overlay | Click hamburger → menu trượt hiện ra | Navbar analysis | Prototype interaction | 30 phút |
| P4.5 | Modal open/close | Click nút → Modal hiện, click ngoài hoặc X → tắt | `fl-modal` | Prototype interaction | 30 phút |
| P4.6 | Smooth scroll Home | Anchor links giữa các section trên trang chủ | Hero CTA analysis | Prototype interaction | 30 phút |

**Checkpoint P4:** Có thể demo luồng dùng dụng cơ bản trên Figma.

## 📋 GIAI ĐOẠN 5: HANDOFF CHO DEV (P1-P2)

| ID | Task | Mô tả chi tiết | Tài liệu tham khảo | Output | Thời gian |
|:---|:-----|:---------------|:-------------------|:-------|:----------|
| H5.1 | Đặt tên layer chuẩn | Tên layer rõ ràng, nhóm theo frame (ví dụ: `Home/Hero/CTA Button`) | – | File Figma sạch | 30 phút |
| H5.2 | Xuất các đoạn CSS/Tailwind | Lấy màu, khoảng cách, font từ Figma styles, ghi chú cho dev | `css-inline.css` (tham chiếu) | `DESIGN_SPECS.md` | 1 giờ |
## 📅 LỘ TRÌNH ĐỀ XUẤT (1 designer)

| Tuần | Nhiệm vụ |
|:-----|:---------|
| **Tuần 1** | F0 (Design System) + C1 (Component library chính) |
| **Tuần 2** | W2 (Wireframe tất cả màn hình) |
| **Tuần 3** | V3 (Visual design màn hình chính: Home, Login, Jobs, Hire) |
| **Tuần 4** | V3 (Dashboard, Messages, Post-project, Legal) + Responsive |
| **Tuần 5** | P4 (Prototype) + H5 (Handoff specs) |

---

## 🔗 LIÊN KẾT VỚI TÀI LIỆU ĐÃ CÓ TRONG DỰ ÁN

| File | Vai trò trong thiết kế Figma |
|------|------------------------------|
| `REPORT.md` | Thông tin tổng quan, framework, màu sắc, font, cookie, API keys (tham khảo) |
| `analysis/css-inline.css` | Nguồn thiết kế chính: màu, biến CSS, media queries, spacing |
| `analysis/report.json` | Top colors, custom properties, media queries, JS counts |
| `analysis/dom-tree.json` | Cấu trúc DOM, custom elements (`fl-*`, `app-*`) cần thiết kế |
| `analysis/content.json` | Heading, button, link text thực tế để dùng làm dummy content |
| `analysis/all-routes.txt` | Danh sách 37 route cần thiết kế (ưu tiên các route chính) |
| `analysis/env-block.txt` | Cấu hình auth, API base URL, reCAPTCHA public key (tham khảo UX) |
| `raw/home.html` | Nguồn hình ảnh, banner, cấu trúc SSR tham khảo |

---

## ⚠️ LƯU Ý PHÁP LÝ & HỌC TẬP

- Thiết kế chỉ dùng để **học tập, nghiên cứu giao diện & kiến trúc frontend**.
- Không sao chép nội dung thue/mua, không vượt qua cơ chế xác thực/bảo vệ của Freelancer.
- Khi handoff cho frontend, hãy tham khảo `TODO_FRONTEND.md` (nếu có) để đồng bộ kỹ thuật.

---

## ✅ CHECKLIST TIẾN ĐỘ THỰC TẾ

- [x] File Figma cũ đã tạo: [Freelancer Replica – vn.freelancer.com](https://www.figma.com/design/zct6sETZsUlENmrKdPadrH) (File key: `zct6sETZsUlENmrKdPadrH`)
- [x] Color Styles & 24 Design Tokens đã tạo trên Page 0
- [x] Text Styles (Roboto scale) đã tạo trên Page 0
- [x] Component Library (Buttons, Badges, Input Field, Cards) đã tạo trên Page 0
- [x] Wireframe & Visual Screen 1: Home Screen Dark Mode Authentic (`10:2`) đã dựng trên Page 1
- [x] Wireframe & Visual Screen 2: Login Screen (`3:86`) đã dựng trên Page 1
- [x] Wireframe & Visual Screen 3: Jobs Screen (`3:101`) đã dựng trên Page 1
- [x] Wireframe & Visual Screen 4: Dashboard Authenticated (@khain66, `#131b26`) (`13:2`) đã dựng trên Page 1
- [x] Developer Handoff board (Tailwind & FastAPI mapping) (`4:157`) đã dựng trên Page 2
- [x] Đã quét dữ liệu thực tế nhánh `/post-project` (Form tạo việc, trust banner, pricing mode)
- [x] Đã quét dữ liệu thực tế nhánh `/jobs` (4,453 jobs, bộ lọc đa chiều, sort)
- [x] Đã quét dữ liệu thực tế nhánh `/hire` (17 nhóm ngành lớn, 3400+ kỹ năng)
- [ ] Dựng tiếp Post-project, Hire, Messages lên Figma (Đang đợi hạn ngạch Figma Starter reset hoặc nâng cấp)

---

*Nếu bạn đã có file Figma, hãy paste link file vào đây để mình hỗ trợ review cụ thể các màn hình hoặc thiết kế component.*
| H5.3 | Export assets | Hình ảnh, icon, logo định dạng SVG/PNG, kích thước 1x, 2x | `raw/home.html` (ảnh) | Thư mục `/assets` | 1 giờ |
| H5.4 | Ghi chú tương tác (annotation) | Hover state, focus state, error message, validation rules | `auth/login.php`, form analysis | Ghi chú trong Figma | 1 giờ |

**Checkpoint H5:** Dev có thể bắt đầu code frontend trực tiếp từ Figma mà không hỏi lại thiết kế.

---
**Checkpoint V3:** Mọi màn hình có thiết kế đẹp, đầy đủ trạng thái (empty, loading, error, success).

---
**Checkpoint W2:** Cấu trúc layout, vị trí các block chính đã được đặt trên mọi màn hình.

---
**Checkpoint C1:** Component library có Auto Layout, Variants, dùng được cho mọi màn hình.

---
**Checkpoint F0:** Design System hoàn chỉnh, có thể áp dụng cho mọi màn hình.

---
│   └─ Legal / About (/about/privacy, /about/terms)
├─ 3. Prototype (Flow tương tác)
└─ 4. Handoff (Spec cho Dev)

---