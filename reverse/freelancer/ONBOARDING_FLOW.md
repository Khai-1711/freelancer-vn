# 🧭 CHI TIẾT LUỒNG ONBOARDING ĐĂNG KÝ FREELANCER (REVERSE-ENGINEERED)

## Bước 1: Màn hình Đăng ký ban đầu (`/signup`)
- Đăng ký qua Social OAuth (Google, Facebook) hoặc Form truyền thống.
- Các trường: Tên, Họ, Email, Mật khẩu, Checkbox chấp thuận điều khoản.
- Nút CTA: "Tham gia Freelancer".

---

## Bước 2: Chọn tên đăng nhập (Username Selection)
- **Tiêu đề chính**: *"Chọn một tên đăng nhập"*
- **Nút Back**: Icon mũi tên `<` quay lại bước trước.
- **Logo**: Logo Freelancer Origami chim xanh + chữ thương hiệu.
- **Cảnh báo quan trọng**: *"Lưu ý rằng không thể thay đổi tên người dùng sau khi đã chọn."*
- **Ô nhập liệu**:
  - Input text tự động sinh gợi ý dựa trên tên email (VD: `phun4`).
- **Gợi ý tên khả dụng (Username Suggestions)**:
  - *"Gợi ý: phun4 / phun6 / phun7"* (Mỗi gợi ý là một liên kết màu xanh `#1772eb`, click vào tự điền vào ô input).
- **Nút hành động chính**:
  - Nút lớn màu xanh dương `#1772eb`, chữ trắng bold: **"Tiếp theo"**.

---

## Bước 3: Chọn loại tài khoản (Role Selection)
- **Tiêu đề chính**: *"Chọn loại tài khoản"*
- **Mô tả trấn an người dùng**: *"Đừng lo, thông tin này có thể thay đổi lại sau."*
- **2 Thẻ lựa chọn vai trò (Large Option Cards)**:
  1. **Thẻ 1 - Dành cho Người tìm việc (Freelancer)**:
     - Biểu tượng: Màn hình máy tính kèm hình đại diện người dùng màu xanh dương.
     - Tiêu đề thẻ: **"Kiếm tiền từ việc làm freelance"** (I want to work).
     - Hành vi khi click: Chuyển sang luồng chọn kỹ năng, thiết lập mức giá $/giờ, tìm việc.
  2. **Thẻ 2 - Dành cho Nhà tuyển dụng (Client / Employer)**:
     - Biểu tượng: Khung cửa sổ web có danh thiếp nhân sự màu xanh dương.
     - Tiêu đề thẻ: **"Thuê một freelancer"** (I want to hire).
     - Hành vi khi click: Chuyển sang luồng đăng dự án hoặc nạp tiền thuê.

## Bước 4: Chọn kỹ năng tốt nhất của bạn (`/new-freelancer/skills`)
- **Top Header Bar**:
  - Nền đen `#131b26`, chữ trắng: **"Kỹ năng"**.
  - Thanh tiến trình ngang (Progress Bar): Xanh dương `#1772eb` (khoảng 20%).
- **Tiêu đề chính**: *"Hãy cho chúng tôi biết các kỹ năng tốt nhất của bạn"*
- **Mô tả phụ**: *"Việc này giúp chúng tôi khuyến nghị công việc phù hợp cho bạn."*
- **Thanh tìm kiếm kỹ năng nhanh**:
  - Ô input hình viên thuốc (Pill search box), icon kính lúp, placeholder: *"Tìm kỹ năng"*.
- **Dải phân cách**: *"—— HOẶC ——"*
- **Danh sách chuyên mục (Categories Accordion List)**:
  - *"Chọn lĩnh vực"*
  - 💻 *Websites, IT & Software* `>`
  - ✒️ *Writing & Content* `>`
  - 🛠️ *Design, Media & Architecture* `>`
  - ⌨️ *Data Entry & Admin* `>`
  - ⚗️ *Engineering & Science* `>`
  - 📈 *Sales & Marketing* `>`
  - 🏛️ *Business, Accounting, Human Resources & Legal* `>`
- **Thanh tác vụ cố định dưới đáy (Bottom Sticky Footer)**:
  - Bên trái: Bộ đếm số lượng: **"Đã chọn 0 kỹ năng"** (Màu xanh dương `#1772eb`).
  - Bên phải: Nút hành động chính: **"Tiếp theo"** (Màu xanh dương `#1772eb`).

### Chi tiết Bước 4.1: Danh sách kỹ năng con & Trạng thái lỗi Validation
- **Nút quay lại danh mục cha**: `< [Tên chuyên mục, ví dụ: Design, Media & Architecture]`
- **Cấu trúc từng dòng kỹ năng (Skill Item Row)**:
  - Tên kỹ năng + Số lượng công việc thực tế đang mở:
    - *Graphic Design (713 công việc)* `+`
    - *Video Editing (462 công việc)* `+`
    - *Website Design (391 công việc)* `+`
    - *Video Production (371 công việc)* `+`
    - *After Effects (312 công việc)* `+`
    - *Photoshop (308 công việc)* `+`
  - Nút thêm `+` màu xanh dương bên phải mỗi dòng. Khi click, dấu `+` chuyển thành dấu tích `✓` hoặc badge đã chọn.
- **Trạng thái thông báo lỗi (Validation Error)**:
  - Khi người dùng chưa chọn kỹ năng nào mà bấm "Tiếp theo":
  - Dòng text cảnh báo màu đỏ: *"Vui lòng chọn ít nhất một kỹ năng."* hiển thị ở góc trái thanh Bottom Sticky Bar.

## Bước 5: Liên kết tài khoản mạng xã hội (`/new-freelancer/linked-accounts`)
- **Top Header Bar**:
  - Nút Back `<` kèm tiêu đề: **"Các tài khoản liên kết"**.
  - Thanh tiến trình (Progress Bar): Đạt mức ~35%.
- **Biểu tượng trung tâm**:
  - Icon mạng lưới kết nối 3 nút tròn màu xanh dương.
- **Tiêu đề chính**: *"Liên kết tài khoản của bạn"*
- **Mô tả lợi ích**: *"Tiết kiệm thời gian hoàn thành hồ sơ của bạn và xây dựng lòng tin bằng cách liên kết các tài khoản của bạn."*
- **Danh sách liên kết mạng xã hội**:
  - 🔵 **Facebook**: *"Tải hình ảnh, tên và địa chỉ email của bạn"* `+`
  - 🟦 **LinkedIn**: *"Tải hình ảnh, tên và địa chỉ email của bạn"* `+`
- **Thanh tác vụ dưới cùng (Bottom Buttons)**:
  - Nút bên trái: **"Bỏ qua"** (Nút Outlined viền xám mỏng, nền trắng).
  - Nút bên phải: **"Tiếp theo"** (Trạng thái disabled nếu chưa liên kết tài khoản nào).

## Bước 6: Ảnh hồ sơ & Họ tên thật
- **Tiêu đề**: *"Ảnh hồ sơ"*
- **Mô tả**: *"Việc tải lên một bức ảnh hồ sơ chất lượng sẽ giúp bạn tạo ấn tượng tốt và xây dựng niềm tin với các khách hàng tiềm năng."*
- **Khung Avatar Upload**: Vùng vuông nét mảnh có icon avatar mặc định, nút icon máy ảnh màu xanh góc dưới để tải ảnh lên.
- **Form nhập danh tính**:
  - *"Tên của bạn là gì?"*
  - *"Hãy sử dụng tên thật của bạn vì thông tin này được yêu cầu để xác thực danh tính."*
  - Trường: `Tên` (First Name)
  - Trường: `Họ` (Last Name)
- **Nút CTA**: *"Tiếp theo"*.

---

## Bước 7: Tiêu đề nghề nghiệp & Mô tả bản thân
- **Tiêu đề**: *"Hãy cho chúng tôi biết một chút về bạn"*
- **Mô tả**: *"Hãy điền vào hồ sơ để khách hàng hiểu rõ hơn về các dịch vụ của bạn."*
- **Form chi tiết**:
  - **Chức danh (Headline)**: *"Bạn làm công việc gì?"* — `placeholder="vd. Khoa học dữ liệu"`
  - **Mô tả chi tiết (Bio / Textarea)**: *"Mô tả về bạn"* — `placeholder="Hãy mô tả các kỹ năng hàng đầu, các điểm mạnh và kinh nghiệm của bạn. Hãy mô tả chi tiết về các dịch vụ mà bạn cung cấp..."`
- **Nút CTA**: *"Tiếp theo"* (Disable khi để trống).

---

## Bước 8: Ngôn ngữ & Ngày sinh
- **Tiêu đề**: *"Bạn nói những thứ tiếng nào?"*
- **Mô tả**: *"Chúng tôi sẽ dùng nó để giúp khớp bạn với các khách hàng nói những ngôn ngữ này."*
- **Thẻ tag ngôn ngữ**: Ô chọn tag ngôn ngữ đa lựa chọn (VD: `한국어 ✕`, `Tiếng Việt`, `English`).
- **Ngày sinh**:
  - Tiêu đề: *"Ngày sinh của bạn"*
  - Ràng buộc: *"Bạn cần phải đủ 16 tuổi để sử dụng Freelancer. Thông tin này sẽ được dùng để xác thực và giữ bảo mật."*
  - Ô chọn ngày: `DD/MM/Y` kèm icon lịch.
- **Nút CTA**: *"Tiếp theo"*.

---

## Bước 9: Xác thực Email (`/verify-email`)
- **Icon**: Phong bì thư xanh.
- **Tiêu đề**: *"Sắp xong rồi, [Tên]. Hãy kiểm tra email của bạn để xác thực tài khoản."*
- **Email hiển thị**: Địa chỉ email người dùng đã đăng ký.
- **Liên kết hỗ trợ**:
  - *"Gửi lại email"*
  - *"Thay đổi email"*

---

## Bước 10: Xác thực phương thức thanh toán (`/new-freelancer/payment-verification`)
- **Icon**: Ổ khóa bảo mật xanh.
- **Tiêu đề**: *"Xác thực phương thức thanh toán"*
- **Mô tả**: *"Phương thức thanh toán của bạn được sử dụng để xác thực danh tính và giúp xây dựng lòng tin."*
- **Nút chính**: Nút xanh: **"Xác thực phương thức thanh toán"**.
- **3 Lợi ích cam kết**:
  - ⚡ **Được thanh toán nhanh hơn**: Thời gian kiểm tra bảo mật thấp hơn và giới hạn rút tiền hàng tháng cao hơn.
  - 🎖️ **Xếp hạng cao hơn**: Tăng cơ hội được xếp hạng cao hơn trong danh sách chào giá.
  - 🕊️ **Dùng thử gói thành viên miễn phí**: Nhận 1 tháng dùng thử gói thành viên Plus.
- **Nút bỏ qua**: Chữ xanh mộc mạc ở đáy màn hình: **"Bỏ qua"**.

## Bước 11: Form Thêm phương thức thanh toán (`/verify`)
- **Top Header**: Nút Back `<` kèm *"Thêm phương thức thanh toán đã xác thực"*.
- **Accordion Lợi ích**:
  - 💲 *Thúc đẩy uy tín của bạn*
  - 💻 *Tập trung vào thành công*
- **Hình thức thanh toán (Payment Methods)**:
  - ◉ **Thẻ ghi nợ hoặc tín dụng** (Credit / Debit Card):
    - Trường: `Số thẻ` (Card Number)
    - Trường: `Tên chủ thẻ` (Cardholder Name)
    - Trường: `Ngày hết hạn` (MM / YY)
    - Trường: `CVC/CVV`
    - Huy hiệu hỗ trợ: VISA, Mastercard, American Express, JCB.
  - ○ **Google Pay** (Tích hợp GPay 1-click).
- **Chọn loại tiền tệ thẻ (Card Currency)**: Dropdown chọn tiền tệ (VD: `🇺🇸 US Dollar`).
- **Nút CTA**: *"Xác thực phương thức thanh toán"*.
- **Trạng thái từ chối / Lỗi giao dịch (Payment Rejection State)**:
  - Hộp cảnh báo viền đỏ, nền đỏ nhạt:
    - Tiêu đề: *"Your payment has been rejected."*
    - Thông báo: *"Thông tin thẻ không chính xác; vui lòng kiểm tra số thẻ hoặc tên chủ thẻ trước khi thử lại."*
    - Mã sự kiện hệ thống: `Event Id: [id]`
- **Chứng chỉ bảo mật chân trang**: Secure SSL Encryption, PCI DSS Compliant, Mastercard SecureCode, VISA Secure.

### Chi tiết Bước 11.1: Màn hình Yêu cầu Xác thực Ngân hàng (3D-Secure)
- **Header**: Nút quay lại `<` và nút đóng `✕`.
- **Biểu tượng**: Icon trụ sở ngân hàng 🏛️ màu xanh dương.
- **Thông báo**: *"Ngân hàng của bạn yêu cầu xác thực bổ sung. Để hoàn tất thanh toán, hãy nhấn nút bên dưới."*
- **Nút hành động**: *"Hoàn tất thanh toán"* (Nút xanh dương `#1772eb`).
- **Footer**: Bản quyền Freelancer Technology Pty Limited và các liên kết pháp lý.
