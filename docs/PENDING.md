# Phạm vi PoC và các phần chờ đối chiếu

Người dùng đã cho phép tiếp tục từ nội dung, ảnh và liên kết Figma đã đọc,
đồng thời yêu cầu để chờ những phần chưa chắc cách triển khai.

Quyết định đã chốt: những điều khiển chưa có hành vi trong Figma gốc tiếp tục
chưa có chức năng trong PoC. Không tự bổ sung xử lý hay coi đó là việc bắt buộc
phải hoàn thiện trước buổi demo. Delete và Microphone giữ trạng thái không hoạt động.

| Phần | Trạng thái hiện tại | Cần bổ sung |
| --- | --- | --- |
| Animation giữa các trang | Liên kết đúng đích, hiệu ứng vào trang nhẹ | Đối chiếu PUSH/SLIDE_IN/SMART_ANIMATE nếu cần tái hiện chi tiết |
| Chi tiết thị giác của 15 frame ngoài Sign in | Có nội dung và trang riêng từ metadata/ảnh đã đọc | Đối chiếu spacing, font và các chi tiết chưa lấy được design context |

Màn hình được dựng theo phần đã biết; không khẳng định khớp từng pixel với Figma.
Chỉ Sign in đã lấy được get_design_context đầy đủ trước khi công cụ hết quota.
Ảnh chụp kiểm tra bố cục nằm ở ../qa/results/ trong repo, không dùng làm ảnh nền ứng dụng.

Đã bổ sung assets/microphone.svg từ Mic icon.svg do người dùng xuất từ Figma.
Biểu tượng xuất hiện trong ba trang câu hỏi và phần nền của trang lưu dở;
nút tiếp tục không hoạt động đúng phạm vi PoC.
Đã bổ sung assets/avatar.svg từ bản Avatar.svg đầy đủ do người dùng xuất lại,
dùng cho 14 header và hình lớn trong Profile. Bản Mask group.svg thiếu đầu không được dùng.

Ghi chú nội dung bản gốc:

- Ngày mẫu **29/2/2026** trong Storage là câu đùa có chủ ý của người thiết kế,
  đã được người dùng xác nhận. Giữ nguyên; không phải lỗi hay việc còn chờ sửa.
- Nền của frame Interview loop - interupt có câu hỏi khác câu 1 của luồng chính.
  Demo giữ câu chữ nền gốc; tên buổi được cập nhật theo buổi đang lưu.
  Đây chỉ là khác biệt nội dung nền, không phải lỗi lưu câu trả lời.

Phần AI chấm thật, xác thực, backend, tải nội dung Job description và lưu database
nằm ngoài phạm vi PoC đã thống nhất.

---

## [DONE] Kế hoạch cải thiện nền trang Sign in / Sign up (Landing khi Sign out)

### 1. Vấn đề trước đây
- Phần nền cột thương hiệu (`.auth-brand`) trên `sign-in.html` và `sign-up.html` dùng màu phẳng `--mist` (`#AAD7D9`) kết hợp hai file `assets/decor-top.svg` và `assets/decor-bottom.svg` bị kéo giãn (`preserveAspectRatio="none"`), có mảng hình quạt màu xám đục (`#ACBAC4`, `fill-opacity="1"`) gây cảm giác lỗi hiển thị.
- Phần cột form (`.auth-panel`) bên phải chỉ có màu kem phẳng (`#FBF9F1`), thiếu chiều sâu và sự liên kết thị giác với cột bên trái.

### 2. Giải pháp đã triển khai (Giữ đúng bảng màu `#92C7CF`, `#AAD7D9`, `#FBF9F1`, `#E5E1DA` và chạy 100% offline)
- **Trạng thái: DONE (Đã hoàn thành)**
  - `poc/assets/decor-top.svg` & `poc/assets/decor-bottom.svg`: Đã thay thế toàn bộ bằng SVG sóng âm & vòng cung đồng tâm sắc nét, tỉ lệ chuẩn không méo, loại bỏ màu xám đục lệch chuẩn `#ACBAC4`.
  - `poc/css/styles.css`: Đã cập nhật mesh gradient đa tầng cho `.auth-brand`, quầng sáng nổi bật thương hiệu `.auth-brand-content`, nền họa tiết kỹ thuật tinh tế cho `.auth-panel`, và nâng cấp `.auth-form` thành thẻ nổi (elevated card) với hiệu ứng kính mờ (frosted glass) và đổ bóng mềm mại, đồng bộ responsive trên tablet và mobile.

---

## [DONE] Kế hoạch thiết kế lại bố cục Dashboard theo phong cách Google Showcase (`dashboard.html`)

### 1. Vấn đề trước đây
- Bố cục `.welcome` trên `dashboard.html` chia 2 cột đơn điệu: bên trái xếp chồng 3 nút bấm dọc (`.dashboard-actions`), bên phải lặp lại logo và khẩu hiệu.
- Ba nút bấm xếp chồng thiếu điểm nhấn thị giác, không thể hiện giá trị của từng tính năng và trông rời rạc.

### 2. Giải pháp đã triển khai (Lấy cảm hứng từ bố cục Google DeepMind / Google Showcase)
- **Trạng thái: DONE (Đã hoàn thành)**
  - `poc/dashboard.html`: Đã chuyển đổi hoàn toàn sang bố cục Hero Banner + Centered Editorial Copy + 3 Thẻ Banner tương tác (Feature Cards).
  - `poc/assets/dashboard-hero-banner.svg`: Tạo banner hero lớn trung tâm với quả cầu kính AI phát sáng (Glass Orb), vòng sóng âm và biểu tượng Akagikay.
  - `poc/assets/card-banner-1.svg`: Tạo banner nhỏ minh họa hồ sơ công việc & CV đồng bộ cho thẻ "Create a new interview".
  - `poc/assets/card-banner-2.svg`: Tạo banner nhỏ nền tối tương phản cao với mạng hạt AI & báo cáo phân tích cho thẻ "View your interview".
  - `poc/assets/card-banner-3.svg`: Tạo banner nhỏ minh họa đánh giá sao & phản hồi trải nghiệm cho thẻ "Rate our assistant".
  - `poc/css/styles.css`: Đã bổ sung toàn bộ hệ thống lớp `.dashboard-hero`, `.hero-media-wrapper`, `.hero-banner`, `.hero-eyebrow`, `.hero-title`, `.hero-description`, `.btn-pill`, `.feature-grid`, `.feature-card`, `.feature-card-media`, `.feature-card-icon`, hiệu ứng nhấc thẻ hover và responsive trên desktop, tablet và mobile.
  - Đảm bảo 100% thuộc tính kỹ thuật (`data-username`, `data-new-interview`) và toàn bộ điều hướng khớp với `TRANSITIONS.md`.

---

## [DONE] Kế hoạch tinh chỉnh Hero Banner & Hiệu ứng cuộn trang (Scroll Rise-Up) trên Dashboard

### 1. Yêu cầu thay đổi từ người dùng
1. **Bỏ biểu tượng nút Play trên Hero Banner**:
   - Xóa hoàn toàn hình nút Play giả video trong `assets/dashboard-hero-banner.svg`, giữ lại cụm đồ họa quả cầu kính AI (Glass Orb), sóng âm và biểu tượng `Logo.svg`.
2. **Đưa Tên ứng dụng + Mô tả ngắn vào trong một Big Banner chia 2 bên (Split Hero Banner)**:
   - Gộp thành một **Big Hero Banner** lớn duy nhất chia 2 cột hài hòa:
     - **Một bên (Cột nội dung)**: Hiển thị huy hiệu thương hiệu **Akagikay**, tiêu đề chính và đoạn mô tả ngắn gọn về trợ lý phỏng vấn AI, kèm nút bắt đầu phỏng vấn.
     - **Bên còn lại (Cột đồ họa)**: Tái sử dụng cụm thiết kế quả cầu kính AI, vòng sóng âm đồng tâm và biểu tượng Akagikay (đã bỏ nút Play).
3. **Loại bỏ dòng `Welcome, <username>`**:
   - Xóa phần `Welcome, Eric Arthur Blair` khỏi Dashboard để giao diện tinh gọn, tập trung vào giá trị sản phẩm.
4. **Hiệu ứng "Rise Up" khi cuộn chuột xuống cho 3 Small Banners (`.feature-card`)**:
   - Khi cuộn trang xuống khu vực 3 thẻ tính năng, 3 thẻ sẽ trượt mượt mà từ dưới lên kèm hiệu ứng hiện dần (`opacity: 0; transform: translateY(44px)` → `opacity: 1; transform: translateY(0)`) với độ trễ nối tiếp nhau (`staggered delay`: `0s`, `0.12s`, `0.24s`).

### 2. Trạng thái triển khai
- **Trạng thái: DONE (Đã hoàn thành)**
  - `poc/assets/dashboard-hero-banner.svg`: Đã loại bỏ hoàn toàn nút Play, cân đối lại tâm quả cầu kính và các vòng sóng âm.
  - `poc/dashboard.html`: Đã chuyển đổi sang cấu trúc `.dashboard-hero-banner` chia 2 cột (Content bên trái, Artwork bên phải), bỏ dòng Welcome + username, gắn class `.reveal-on-scroll` cho 3 thẻ tính năng.
  - `poc/css/styles.css`: Đã định nghĩa kiểu dáng `.dashboard-hero-banner`, `.hero-brand-badge`, `.hero-banner-title`, `.hero-banner-description`, và hệ thống hiệu ứng `body.js-scroll-ready .feature-card.reveal-on-scroll` (với staggered delays và giữ nguyên hiệu ứng nhấc thẻ hover khi đã hiện).
  - `poc/js/app.js`: Đã bổ sung `IntersectionObserver` (kèm fallback scroll listener) kích hoạt hiệu ứng trồi lên khi người dùng cuộn tới vị trí 3 thẻ.

---

## [DONE] Loại bỏ huy hiệu `.hero-brand-badge` (Logo + Nền huy hiệu) trên Hero Banner

### 1. Thay đổi
- **Trạng thái: DONE (Đã hoàn thành)**
  - Đã xóa hoàn toàn khối `.hero-brand-badge` (logo nhỏ và nền hình chữ nhật bo tròn) trên `poc/dashboard.html` và `poc/css/styles.css`.
  - Đưa tên ứng dụng trực tiếp vào tiêu đề chính (`Akagikay: Your realistic and interactive AI interview assistant`) đúng theo bố cục tối giản của Google.

---

## [DONE] Xóa các dòng chữ hướng dẫn thừa (`.eyebrow`) & Thiết kế lại Header (`.site-header`)

### 1. Thay đổi đã triển khai
- **Trạng thái: DONE (Đã hoàn thành)**
  - **Xóa toàn bộ `.eyebrow`**: Đã loại bỏ hoàn toàn các nhãn chỉ dẫn thừa như `01 / Set up your interview`, `02 / Practice`, `03 / Review`, `01 / CV` .. `04 / CV`, `Interview AI Assistant` trên toàn bộ 14 trang HTML.
  - **Header dạng Floating Glassmorphic Pill Navbar**:
    - Chuyển thanh header phẳng cũ sang thanh điều hướng nổi dạng viên thuốc bo tròn (`border-radius: 100px`), hiệu ứng kính mờ (`backdrop-filter: blur(16px)`), đổ bóng nhẹ và dính cố định (`position: sticky; top: 14px`).
    - **Vùng trái**: Đặt `Logo.svg` trong khung tròn nhỏ màu xanh đậm tương phản cao đi cùng tên thương hiệu **Akagikay** (chuyển về `dashboard.html`).
    - **Vùng giữa**: Cụm 3 tab điều hướng nhanh tinh gọn gồm **Dashboard**, **Your interview** và **System feedback**, tự động sáng active tương ứng từng trang.
    - **Vùng phải**: Nâng cấp nút Avatar thành Profile Pill với ảnh đại diện sắc nét và tên tài khoản `[data-username]`, loại bỏ huy hiệu `POC DEMO` thừa.
    - Tương thích responsive hoàn hảo trên tablet và mobile.

---

## [DONE] Điều chỉnh lại Header: Trải rộng toàn trang (Full-Width) & Dùng chữ thuần túy (Không đóng khung bo tròn)

### 1. Thay đổi đã triển khai
- **Trạng thái: DONE (Đã hoàn thành)**
  - **Full-Width Header**: Header trải rộng `100%` toàn trang, cố định dính trên cùng (`position: sticky; top: 0; width: 100%`), nền kính mờ sáng sạch (`rgba(255, 255, 255, 0.9)`, `backdrop-filter: blur(16px)`), viền mảnh bên dưới (`border-bottom: 1px solid var(--line)`).
  - **Plain Typography Links (Chữ thuần túy, không đóng khung)**:
    - Loại bỏ hoàn toàn nền và viền bo tròn của `.header-nav` và `.nav-link`.
    - Các liên kết **Dashboard**, **Your interview**, **System feedback** hiển thị dưới dạng chữ thuần túy, giãn cách thoáng (`gap: 36px`), chuyển màu mượt mà khi hover và có gạch chân active tinh tế khi ở trang hiện tại.
    - Cụm Profile bên phải loại bỏ khung bo tròn, hiển thị avatar sắc nét và tên người dùng sạch sẽ, tự nhiên.

---

## [DONE] Cải thiện trang Profile: Mở khóa xem/sửa Mật khẩu & Bổ sung mục Quản lý CV (4 trường văn bản + Tải file PDF)

### 1. Thay đổi đã triển khai
- **Trạng thái: DONE (Đã hoàn thành)**
  - **Account Credentials (`poc/profile.html`, `poc/js/app.js`)**:
    - **Username**: Có thể chỉnh sửa bất cứ lúc nào (bỏ `readonly`). Bấm **Save account** sẽ cập nhật tên ngay lập tức và đồng bộ trên toàn bộ trang (`[data-username]`).
    - **Mật khẩu (Password `"123"`)**:
      - Ban đầu trường `#account-password` ở trạng thái khóa (`readonly`, `type="password"`) hiển thị dấu chấm che `•••` và huy hiệu `🔒 Locked (masked)`.
      - Bổ sung ô xác thực `#verify-password` ("Verify current password to view & edit"). Khi người dùng nhập đúng `"123"` (hoặc mật khẩu mới đã đổi) và bấm **Unlock**:
        - Ô `#account-password` lập tức chuyển sang `type="text"` và bỏ `readonly` để người dùng **nhìn thấy rõ mật khẩu hiện tại (`123`) và có thể gõ mật khẩu mới**.
        - Huy hiệu chuyển sang `🔓 Unlocked (editable)`.
      - Khi bấm **Save account**, lưu lại mật khẩu mới vào `account.password` và tự động khóa bảo mật trở lại (`type="password"`).
  - **Saved Resume / CV Section bên dưới Account Panel (`poc/profile.html`, `poc/css/styles.css`)**:
    - Đặt panel `.profile-cv-panel` ngay bên dưới `.profile-panel`, kết nối tự nhiên với tùy chọn *"Sync my saved CV with this interview"* của `job-profile.html`.
    - **Bộ chuyển đổi 2 chế độ (Mode Switcher Tabs)**: Cho phép chuyển đổi mượt mà giữa **4 Sections** và **Upload PDF**, lưu trạng thái vào `account.cvMode`.
    - **Chế độ 1: 4 trường văn bản (Bố cục Editorial Resume Stack)**:
      - Thay thế hoàn toàn bố cục lưới 2×2 cứng nhắc của `cv.html` bằng bố cục xếp lớp ngang trực quan, sang trọng: mỗi mục (`01. Personal Profile`, `02. Education History`, `03. Work & Research Experience`, `04. Core Skills`) gồm cột trái chứa badge số thứ tự + tên mục + gợi ý ngắn gọn, cột phải là ô `<textarea data-cv="0..3">` rộng rãi, dễ đọc.
      - Tự động lưu (`auto-save`) và có nút **Save CV** đồng bộ 100% dữ liệu với `account.cv`.
    - **Chế độ 2: Tải lên file PDF (`.pdf`)**:
      - Vùng kéo thả / duyệt file `.cv-pdf-dropzone` tương tác trực tiếp (`Drag & drop` hoặc bấm chọn file `.pdf`).
      - Kiểm tra tính hợp lệ của file PDF và hiển thị **Thẻ File PDF (`.cv-pdf-card`)** chứa biểu tượng tài liệu PDF đỏ, tên file, kích thước file, thời gian đính kèm, cùng 2 nút thao tác **Replace** và **Remove**.

---

### 2. Giải pháp thiết kế & Bố cục chi tiết

#### A. Khu vực 1 — Account Section (`poc/profile.html` & `poc/js/app.js`)
Giữ bố cục thẻ `.profile-panel` gọn đẹp hiện tại ở phần trên của `profile.html`, nhưng tách rõ 2 cụm thao tác hợp lý:
1. **Chỉnh sửa Username tự do (Always Editable)**:
   - Trường `Username` (`#profile-username`) luôn cho phép nhập và chỉnh sửa trực tiếp (bỏ `readonly`), đi kèm nút **Save account** (`#save-profile`) luôn sẵn sàng.
   - Khi lưu, cập nhật ngay `account.username`, `state.currentAccount` và đồng bộ tức thì tên hiển thị trên toàn trang (`[data-username]`) kèm thông báo trạng thái tại chỗ (không tự động đá người dùng về `dashboard.html` để họ có thể tiếp tục chỉnh sửa CV bên dưới).
2. **Xem & Đổi Mật khẩu qua bước Xác thực (`Password = "123"`)**:
   - **Trường hiển thị/sửa mật khẩu tài khoản (`#account-password`)**:
     - Mặc định khởi tạo `account.password = account.password || "123"`.
     - Khi đang khóa: hiển thị dưới dạng `type="password"` (`readonly`, giá trị `"123"` được che thành `•••`).
   - **Khu vực mở khóa mật khẩu (`#password-unlock-box`)**:
     - Có một trường nhập riêng biệt: **Current password to unlock** (`#verify-password`, `type="password"`, placeholder: `"Enter current password (default: 123)"`) cùng nút **Unlock to view & edit** (`#unlock-password-btn`).
     - Khi người dùng bấm **Unlock to view & edit**:
       - Nếu nhập sai (khác `account.password`, mặc định là `"123"`): báo lỗi rõ ràng `"Incorrect password. Enter current password (123) to view and edit."`.
       - Nếu nhập đúng `"123"` (hoặc mật khẩu hiện tại của tài khoản):
         - Mở khóa trường `#account-password`: chuyển từ `type="password"` sang `type="text"` và bỏ `readonly`, giúp người dùng **nhìn thấy rõ mật khẩu hiện tại (`123`) và có thể gõ mật khẩu mới** ngay tại ô đó.
         - Ẩn cụm ô xác thực `#password-unlock-box` (hoặc hiển thị trạng thái *"Password unlocked — you can now view and edit your password"*).
         - Khi bấm **Save account**, lưu cả `Username` và mật khẩu mới (`account.password`) vào `localStorage`, đồng thời khóa lại `#account-password` về chế độ che (`type="password"`, `readonly`) để đảm bảo an toàn thị giác.

#### B. Khu vực 2 — Saved CV Section bên dưới Account Section (`poc/profile.html`)
Đặt một panel mới `<section class="panel profile-cv-panel">` ngay bên dưới `.profile-panel` với thanh chuyển đổi chế độ (**Segmented Mode Switcher**) gồm 2 tab rõ ràng:
- **Tab 1: Structured CV Builder (4 trường văn bản — Bố cục Editorial Stack + Section Navigation)**
  - Thay vì chia ô vuông 2×2 chật hẹp như `cv.html`, sử dụng bố cục **Vertical Editorial Resume Stack (hoặc Master-Detail Tabbed Sections)**:
    - Mỗi mục trong 4 mục (*01. Personal Profile*, *02. Education History*, *03. Work / Research Experience*, *04. Core Skills*) được thiết kế như một thẻ mục hồ sơ ngang rộng rãi (Full-width structured section row):
      - Cột trái của mục (hoặc thanh tiêu đề mục): Số thứ tự badge tinh tế, tên mục rõ ràng và dòng gợi ý ngắn (ví dụ: *Summary & career focus*, *Academic background*, *Projects & roles*, *Technical & soft skills*).
      - Cột phải của mục: Ô soạn thảo `<textarea data-cv="0..3">` rộng thoáng, dễ đọc, tự động đồng bộ hai chiều với `account.cv[0..3]`.
    - Có nút **Save CV** và tự động lưu khi nhập (`input` event), giúp dữ liệu CV ở `profile.html` và `cv.html` đồng nhất 100%.
- **Tab 2: Upload PDF Resume (Tải lên file `.pdf`)**
  - Giao diện **Dropzone tải file PDF** hiện đại (`.cv-pdf-dropzone`):
    - Cho phép kéo-thả (Drag & Drop) hoặc bấm chọn file từ máy tính qua `<input id="cv-pdf-input" type="file" accept=".pdf,application/pdf">`.
    - Kiểm tra định dạng `.pdf`: nếu chọn sai định dạng sẽ báo lỗi trực quan.
    - Khi tải file `.pdf` hợp lệ:
      - Lưu thông tin file vào `account.cvPdf = { name, size, updatedAt }` (và lưu chế độ ưu tiên `account.cvMode = "pdf"`).
      - Hiển thị **Thẻ File PDF đã lưu (Uploaded PDF Card)** gồm biểu tượng tài liệu PDF, tên file (ví dụ: `Eric_Blair_Resume.pdf`), dung lượng file (KB/MB), thời gian tải lên, cùng 2 nút thao tác: **Replace PDF** (đổi file khác) và **Remove PDF** (xóa file đính kèm).

---

### 3. Danh sách file sẽ cập nhật khi triển khai
1. **`poc/profile.html`**:
   - Cập nhật form `#profile-form` trong `.profile-panel`: mở khóa sẵn `#profile-username`, tách trường `#account-password` (hiển thị mật khẩu bị che `•••`) và cụm `#verify-password` + nút `#unlock-password-btn` để xác thực mật khẩu `"123"` trước khi xem/sửa.
   - Bổ sung `<section class="panel profile-cv-panel">` bên dưới `.profile-panel` với bộ chuyển đổi 2 chế độ (**Write 4 Sections** / **Upload PDF**) và bố cục CV mới.
2. **`poc/css/styles.css`**:
   - Thêm style cho cụm xác thực/mở khóa mật khẩu (`.password-field-group`, `.unlock-box`, trạng thái badge đã mở khóa).
   - Thêm style cho `.profile-cv-panel`, thanh chuyển tab `.cv-mode-tabs`, bố cục 4 trường CV dạng Editorial Horizontal Rows (`.profile-cv-list`, `.profile-cv-item`), vùng kéo thả `.cv-pdf-dropzone` và thẻ hiển thị file `.cv-pdf-card`.
3. **`poc/js/app.js`**:
   - Khởi tạo mặc định `account.password = account.password || "123"`, `account.cvMode = account.cvMode || "text"`, `account.cvPdf = account.cvPdf || null`.
   - Cập nhật logic trang `profile`:
     - Cho phép lưu `Username` bất kỳ lúc nào.
     - Kiểm tra `#verify-password === account.password` (mặc định `"123"`) khi bấm `#unlock-password-btn` để hiện mật khẩu thật (`type="text"`) và cho phép sửa `#account-password`.
     - Đồng bộ 4 trường `<textarea data-cv="0..3">` và xử lý sự kiện chọn/kéo-thả/xóa file PDF trên `profile.html`.

---

### 4. Trạng thái
- **DONE** — Đã triển khai phiên bản đầu tiên.

---

## [DONE] Tinh chỉnh lại giao diện trang Profile: Lược bỏ chi tiết thừa, cân bằng chiều cao cột Avatar & Gộp chung luồng "Your CV"

### 1. Thay đổi đã triển khai
- **Trạng thái: DONE (Đã hoàn thành)**
  - **Tiêu đề trang & Phần đầu trang (`poc/profile.html`)**:
    - Khôi phục `<title>Profile · Akagikay</title>`.
    - **Loại bỏ hoàn toàn khối `.page-heading`** (tiêu đề và mô tả phụ đầu trang), trang mở ra liền mạch và hiện đại ngay từ thẻ thông tin cá nhân.
  - **Làm sạch Khu vực Account (`poc/profile.html`, `poc/css/styles.css`, `poc/js/app.js`)**:
    - Loại bỏ tiêu đề thừa `"Account Credentials"` và đoạn văn hướng dẫn.
    - Loại bỏ toàn bộ các ghi chú demo thừa (`Demo profile`, `Default demo password is 123.`).
    - Loại bỏ huy hiệu khóa `🔒 Locked (masked)` trên đầu ô mật khẩu, chỉ giữ nhãn `Password` tinh gọn.
    - **Cân bằng chiều cao cột trái và cột phải**: Áp dụng `align-items: stretch` trên `.profile-panel` và căn giữa dọc nội dung cột trái `.profile-summary` (`display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%`), giúp khung xanh nhạt của Avatar kéo dài cân đối 1:1 với cột form bên phải.
  - **Khu vực CV gộp chung ("Your CV" — 4 Sections + PDF Upload)**:
    - Đổi tên thành **`Your CV`**.
    - Loại bỏ thanh chuyển tab: 4 mục CV văn bản (*01. Personal Profile*, *02. Education History*, *03. Work & Research Experience*, *04. Core Skills*) hiển thị ở trên, nối tiếp ngay bên dưới qua vạch ngăn cách **`OR you can upload your CV`** (`.cv-or-divider`) dẫn trực tiếp đến vùng kéo thả / tải file PDF và thanh nút **Save CV**.

---

### 2. Danh sách file sẽ cập nhật khi triển khai
1. **`poc/profile.html`**:
   - Khôi phục `<title>Profile · Akagikay</title>` và xóa `.page-heading`.
   - Trong `.profile-panel`: xóa `<p class="demo-note">Demo profile</p>`, xóa `.profile-form-header`, xóa `#password-lock-badge`, xóa `<p class="unlock-hint">Default demo password is 123.</p>`.
   - Trong `.profile-cv-panel`: đổi tiêu đề thành `<h2>Your CV</h2>`, xóa `.cv-mode-switcher`, đặt khối tải PDF ngay bên dưới 4 mục văn bản qua vạch ngăn cách `<div class="cv-or-divider"><span>OR you can upload your CV</span></div>`.
2. **`poc/css/styles.css`**:
   - Cập nhật `.profile-panel` (`align-items: stretch`) và `.profile-summary` (`display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%`) để cột xanh nhạt bên trái cao bằng cột phải.
   - Thêm style cho vạch ngăn cách `.cv-or-divider` (đường kẻ ngang 2 bên với chữ ở giữa) và dọn dẹp các class tab/badge không còn dùng.
3. **`poc/js/app.js`**:
   - Loại bỏ logic chuyển tab (`switchCvTab`) và cập nhật `#password-lock-badge` đã xóa; giữ nguyên luồng mở khóa xem/sửa mật khẩu khi nhập đúng `"123"`, tự động lưu 4 mục CV và tải/xóa file PDF trên cùng một mặt trang.

---

### 3. Trạng thái
- **DONE** — Đã hoàn thành triển khai phiên bản trước.

---

## [DONE] Thay đổi Thẻ nhỏ số 1 trên Dashboard: Chuyển từ "Create a new interview" sang "Manage your CV" dẫn thẳng tới mục CV trang Profile

### 1. Thay đổi đã triển khai
- **Trạng thái: DONE (Đã hoàn thành)**
  - **Dashboard Card 1 (`poc/dashboard.html`)**:
    - Chuyển đổi từ `Create a new interview` sang **`Manage your CV`**.
    - Cập nhật mô tả: *"Fill in your 4 structured CV sections or upload a PDF resume so it automatically syncs with your interviews."*
    - Đổi link sang `profile.html#your-cv`, loại bỏ trùng lặp với nút chính trên Hero Banner (`Start a new interview →`).
  - **Neo cuộn mượt (`poc/profile.html`, `poc/css/styles.css`)**:
    - Gắn `id="your-cv"` vào `<section class="panel profile-cv-panel">` trên `profile.html`.
    - Bổ sung `scroll-margin-top: 88px` và `html { scroll-behavior: smooth; }` để khi người dùng nhấn thẻ từ Dashboard, trang Profile tự động cuộn mượt xuống thẳng khung **Your CV** với khoảng cách chuẩn xác dưới Sticky Header.

---

### 2. Giải pháp thiết kế & Nội dung chi tiết

1. **Cập nhật Thẻ nhỏ số 1 trên `poc/dashboard.html`**:
   - **Liên kết (`href`)**: Đổi từ `href="job-profile.html" data-new-interview` sang `href="profile.html#your-cv"` (bỏ thuộc tính `data-new-interview`).
   - **Tiêu đề thẻ (`<h3>`)**: **`Manage your CV`** (hoặc **`Input your CV`**).
   - **Mô tả ngắn (`<p>`)**: *"Fill in your 4 structured CV sections or upload a PDF resume so it automatically syncs with your interviews."*
   - **Hình minh họa (`poc/assets/card-banner-1.svg`)**: Giữ nguyên (hoặc tinh chỉnh nhẹ biểu tượng tài liệu CV/PDF trên `card-banner-1.svg` cho khớp hoàn toàn với chủ đề hồ sơ CV & PDF).

2. **Bổ sung Neo định vị (`#your-cv`) trên `poc/profile.html` & Cuộn mượt (`poc/css/styles.css`)**:
   - Thêm `id="your-cv"` vào thẻ `<section id="your-cv" class="panel profile-cv-panel">` trên trang `poc/profile.html`.
   - Trong `poc/css/styles.css`, thêm `scroll-margin-top: 88px;` cho `#your-cv` (và `scroll-behavior: smooth;` trên `html`) để khi người dùng bấm từ Dashboard sang `profile.html#your-cv`, trình duyệt tự động trượt mượt xuống đúng khung **Your CV** mà không bị thanh Sticky Header che khuất.

---

### 3. Danh sách file sẽ cập nhật khi triển khai
1. **`poc/dashboard.html`**: Cập nhật nội dung và đường dẫn của Card 1 sang `profile.html#your-cv`.
2. **`poc/profile.html`**: Gắn `id="your-cv"` cho `<section class="panel profile-cv-panel">`.
3. **`poc/css/styles.css`**: Thêm `scroll-margin-top: 88px` cho `.profile-cv-panel` / `#your-cv` để neo cuộn chuẩn xác dưới thanh header cố định.

---

### 4. Trạng thái
- **DONE** — Đã hoàn thành triển khai và kiểm thử.

---

## [DONE] Gộp trang Input CV vào trang Job Profile: Xóa `cv.html`, tinh gọn tiêu đề & Bổ sung mục mở rộng (Expandable) nhập CV riêng cho buổi phỏng vấn

### 1. Thay đổi đã triển khai
- **Trạng thái: DONE (Đã hoàn thành)**
  - **Xóa trang `poc/cv.html`**: Đã xóa hoàn toàn file `cv.html` và gỡ bỏ đoạn xử lý sự kiện `if (page === "cv")` trong `poc/js/app.js`.
  - **Tinh gọn trang `poc/job-profile.html`**:
    - Loại bỏ khối `.page-heading` rời bên ngoài, đưa tiêu đề sạch đẹp `<h2>Job Profile</h2>` vào ngay đầu thẻ `.panel` (`.panel-header`).
    - Xóa bỏ dòng chú thích demo thừa *"The link is saved for this demo; its contents are not imported."*.
    - Xóa nút `Input CV (Optional)` ở đáy trang, căn phải nút chính **`Continue →`**.
  - **Bổ sung Mục mở rộng tùy chỉnh CV cho buổi phỏng vấn (`#custom-cv-expander`)**:
    - Ngay dưới hộp kiểm `Sync my saved CV with this interview`, bổ sung vạch ngăn cách tinh tế: **`OR customize a CV for this interview`**.
    - Nút đóng/mở `#custom-cv-toggle` với tiêu đề *"Input a custom CV for this interview"* và dòng mô tả *"Expand to enter 4 CV sections or upload a PDF specifically for this session"*.
    - Khi mở rộng: hiển thị đầy đủ bố cục chuẩn của phần **Your CV** (4 mục văn bản xếp lớp ngang: *01 Personal Profile*, *02 Education History*, *03 Work & Research Experience*, *04 Core Skills* + vạch ngăn cách + khu vực tải file PDF riêng cho buổi phỏng vấn).
    - Khi bấm `Continue →`, nếu người dùng mở rộng và nhập CV tùy chỉnh, buổi phỏng vấn mới sẽ tự động lưu và sử dụng bộ CV này.

---

### 2. Giải pháp thiết kế & Bố cục chi tiết

1. **Xóa trang `poc/cv.html` & Dọn dẹp luồng điều hướng**:
   - Xóa file `poc/cv.html`.
   - Xóa nút `<a class="btn btn-secondary" href="cv.html">Input CV (Optional)</a>` ở cuối form `job-profile.html`, đưa nút chính **`Continue →`** sang góc phải (`.form-bottom.align-end`).

2. **Tinh gọn Tiêu đề & Xóa dòng chú thích thừa trên `poc/job-profile.html`**:
   - **Xóa `.page-heading` bên ngoài card**: Bỏ `<div class="page-heading"><h1>Input Job Profile</h1></div>` phía trên panel; thay bằng tiêu đề nội bộ gọn đẹp `<div class="profile-cv-header"><h2>Job Profile</h2></div>` nằm ngay bên trong `.panel` (đồng bộ phong cách với thẻ `Your CV` ở trang Profile).
   - **Xóa dòng ghi chú thừa**: Xóa hoàn toàn `<p class="demo-note">The link is saved for this demo; its contents are not imported.</p>` bên dưới ô `Job description link (optional)`.

3. **Bổ sung Mục mở rộng (Expandable Custom CV Section) bên dưới ô "Sync my saved CV"**:
   - Ngay bên dưới hộp kiểm `Sync my saved CV with this interview`:
     - Đặt thanh dẫn hướng nhỏ gọn đồng bộ phong cách với trang Profile (`.cv-or-divider`):
       **`OR customize a CV for this interview`**
     - Ngay dưới thanh dẫn hướng là **Khối mở rộng (`#custom-cv-expander`)**:
       - **Thanh tiêu đề đóng/mở (Toggle Header Button)**: Hiển thị nhãn **`Input a custom CV for this interview`** kèm dòng mô tả ngắn (*"Expand to enter 4 CV sections or upload a PDF specifically for this session"*) và biểu tượng mũi tên đóng/mở (`▾`).
       - **Nội dung bên trong khi mở rộng (Expanded Panel)**: Sử dụng **cùng bố cục chuẩn của phần Your CV trên trang Profile**:
         1. **4 mục văn bản xếp lớp ngang (`.profile-cv-stack`)**: *01. Personal Profile*, *02. Education History*, *03. Work & Research Experience*, *04. Core Skills* (được điền sẵn bản nháp hoặc cho phép chỉnh sửa riêng cho buổi phỏng vấn này).
         2. **Vạch ngăn cách `.cv-or-divider`**: **`OR you can upload your CV`**.
         3. **Khối tải file PDF (`.cv-pdf-dropzone` & `.cv-pdf-card`)**: Cho phép kéo-thả hoặc chọn file `.pdf` riêng cho buổi phỏng vấn này.
       - **Tương tác thông minh với `Sync my saved CV`**:
         - Khi người dùng bấm mở rộng mục nhập CV riêng, hệ thống có thể tự động bỏ tích `Sync my saved CV` (hoặc khi người dùng sửa CV trong mục mở rộng này, buổi phỏng vấn mới tạo qua `startInterview()` sẽ lấy trực tiếp dữ liệu CV tùy chỉnh của buổi phỏng vấn đó thay vì CV mặc định trong Profile).

---

### 3. Danh sách file sẽ cập nhật khi triển khai
1. **`poc/cv.html`**: Xóa file `poc/cv.html`.
2. **`poc/job-profile.html`**:
   - Xóa `.page-heading` bên ngoài, đưa tiêu đề `<h2>Job Profile</h2>` vào trong `.panel`.
   - Xóa `<p class="demo-note">The link is saved for this demo; its contents are not imported.</p>`.
   - Bổ sung vạch dẫn **`OR customize a CV for this interview`** và khối đóng/mở `#custom-cv-expander` chứa bố cục 4 mục CV + tải file PDF ngay dưới `#sync-cv`.
   - Xóa nút `Input CV (Optional)` ở `.form-bottom`.
3. **`poc/css/styles.css`**:
   - Thêm style cho khối đóng/mở `.custom-cv-expander`, nút `.custom-cv-toggle`, hiệu ứng xoay mũi tên `.expander-chevron` và khung nội dung `.custom-cv-body`.
4. **`poc/js/app.js`**:
   - Gỡ bỏ đoạn xử lý `if (page === "cv")` cũ.
   - Cập nhật `if (page === "job-profile")`: xử lý đóng/mở `#custom-cv-expander`, xử lý tải file PDF riêng cho buổi phỏng vấn, và lưu bộ CV tùy chỉnh vào buổi phỏng vấn mới khi bấm `Continue →`.

---

### 4. Trạng thái
- **DONE** — Đã hoàn thành triển khai phiên bản đầu tiên.

---

## [DONE] Tinh gọn nút mở rộng (Extend Trigger) mục Custom CV trên trang Job Profile: Loại bỏ khung Panel lồng nhau, dùng thanh dẫn tương tác trực tiếp (Interactive Divider / Inline Trigger)

### 1. Thay đổi đã triển khai
- **Trạng thái: DONE (Đã hoàn thành)**
  - **Loại bỏ khung hộp panel lồng nhau (`poc/job-profile.html`, `poc/css/styles.css`)**:
    - Xóa bỏ khối hộp viền `.custom-cv-expander` và 2 dòng tiêu đề rườm rà.
    - Thay thế bằng **thanh phân cách tương tác duy nhất (`.cv-extend-divider`)**:
      `──────────  OR use a custom CV for this interview ▾  ──────────`
    - Nút `.cv-extend-trigger` dạng chữ hoa tinh tế nằm ngay giữa vạch phân cách, đổi màu và xoay mũi tên mượt mà (`▴ / ▾`) khi hover và click.
  - **Trải rộng tự nhiên trên mặt Panel chính**:
    - Khi mở rộng, khung 4 mục CV (*01 Personal Profile*, *02 Education History*, *03 Work & Research Experience*, *04 Core Skills*) và vùng tải PDF mở trực tiếp ngay trên bề mặt của form panel chính, không còn bị bó hẹp trong viền hộp lồng nhau.

---

### 2. Giải pháp thiết kế mới (Tinh gọn, không đóng khung Panel phụ)
Thay vì tách rời vạch chữ hướng dẫn và một khung hộp nút bấm cồng kềnh, **gộp trực tiếp dòng dẫn hướng và nút mở rộng thành một thanh phân cách tương tác duy nhất (Interactive Divider Toggle)**:
1. **Khi đang thu gọn (Collapsed)**:
   - Ngay bên dưới hộp kiểm `Sync my saved CV with this interview`, chỉ hiển thị **một đường kẻ phân cách ngang mảnh mai** (`.cv-extend-divider`) với nút chữ tương tác nằm ngay chính giữa hai đường kẻ (không có khung hộp panel bao quanh):
     `──────────  OR use a custom CV for this interview ▾  ──────────`
   - Khi di chuột vào dòng chữ `OR use a custom CV for this interview ▾`, chữ và mũi tên đổi màu sắc nét (`var(--ink)`), cho biết có thể bấm trực tiếp để mở rộng.
2. **Khi bấm mở rộng (Expanded)**:
   - Mũi tên `▾` xoay nhẹ thành `▴`.
   - Khung nhập **4 mục CV + tải file PDF** mở ra **trực tiếp trên nền `.panel` chính** (loại bỏ hoàn toàn viền hộp `.custom-cv-expander` và nền lồng nhau), giúp 4 mục CV và vùng tải PDF trải rộng tự nhiên, thoáng đãng giống hệt phần **Your CV** trên trang Profile.

---

### 3. Danh sách file sẽ cập nhật khi triển khai
1. **`poc/job-profile.html`**:
   - Xóa bỏ cấu trúc hộp `.custom-cv-expander` và 2 dòng tiêu đề phụ rườm rà.
   - Thay bằng thanh phân cách tương tác gọn nhẹ:
     ```html
     <div class="cv-extend-divider">
       <button type="button" class="cv-extend-trigger" id="custom-cv-toggle" aria-expanded="false" aria-controls="custom-cv-body">
         <span>OR use a custom CV for this interview</span>
         <span class="expander-chevron" aria-hidden="true">▾</span>
       </button>
     </div>
     ```
   - Khối `#custom-cv-body` nằm ngay bên dưới, hiển thị trực tiếp trên mặt panel chính mà không bị đóng khung lồng nhau.
2. **`poc/css/styles.css`**:
   - Thay thế các class `.custom-cv-expander`, `.custom-cv-toggle` cũ bằng `.cv-extend-divider` và `.cv-extend-trigger` (chữ thuần túy kết hợp đường kẻ mảnh 2 bên, hiệu ứng xoay mũi tên mượt mà).

---

### 4. Trạng thái
- **DONE** — Đã hoàn thành triển khai và kiểm thử.

---

## [DONE] Xóa các nhãn & chú thích Demo thừa trên trang Sign In, Sign Up và Footer toàn trang

### 1. Thay đổi đã triển khai
- **Trạng thái: DONE (Đã hoàn thành)**
  - **`poc/sign-in.html`**: Đã xóa hoàn toàn huy hiệu `<span class="badge">POC DEMO</span>` và dòng ghi chú `<p class="demo-note">Sample account prefilled · No real authentication.</p>`.
  - **`poc/sign-up.html`**: Đã xóa hoàn toàn huy hiệu `<span class="badge">POC DEMO</span>` và dòng ghi chú `<p class="demo-note">Demo account only · Passwords are not saved.</p>`.
  - **Footer toàn bộ 13 trang HTML**: Đã xóa hoàn toàn cụm `<span>Local demo · Sample data</span>` trong `<footer class="site-footer">` trên tất cả các trang.

---

## [DONE] Thiết kế lại trang Your Interview (`poc/storage.html`) — Bản cập nhật: Giữ cột Status rõ ràng, lấp đầy không gian lớn bằng bố cục 4 cột cân đối & Xóa nút Back to home

### 1. Thay đổi đã triển khai
- **Trạng thái: DONE (Đã hoàn thành)**
  - **Khôi phục toàn khung (`1120px`) & Xóa nút `Back to home` (`poc/storage.html`)**:
    - Trả lại container chuẩn `.page.storage-page` (`1120px`) giúp giao diện bề thế, tận dụng tối đa không gian màn hình lớn.
    - Xóa bỏ nút phụ `Back to home` ở cuối trang.
  - **Thanh Header tích hợp Thống kê & Nút Tạo Mới (`.storage-header`)**:
    - Hiển thị tiêu đề **`Your Interviews`** kết hợp huy hiệu thống kê động (`#storage-stats`: đếm tổng số buổi, số buổi Finished và In Progress).
    - Bổ sung nút hành động **`+ New interview`** ở góc phải dẫn thẳng tới `job-profile.html`.
  - **Duy trì đủ 4 Cột chuẩn xác (`NAME` | `DATE` | `STATUS` | `ACTIONS`)**:
    - Cột **`STATUS`** đứng độc lập, căn thẳng tắp với nhãn tiêu đề `STATUS` ở thanh header lưới.
    - Phân bổ tỷ lệ cột cân đối (`grid-template-columns: minmax(260px, 2.2fr) minmax(140px, 1.1fr) minmax(150px, 1.1fr) 220px`) cho cả thanh tiêu đề lưới `.storage-grid-head` và từng hàng `.storage-row-card`.
    - Xóa sổ hoàn toàn khoảng trống mênh mông: cột `Actions` co lại vừa vặn `220px` chứa gọn gàng cặp 2 nút đồng bộ chiều cao `38px` (**`View report` / `Continue`** với chiều rộng cố định `114px` + nút **`Delete`** viền mảnh hoạt động thật).
  - **Từng hàng phỏng vấn dạng Card Row (`.storage-row-card`)**:
    - Mỗi buổi phỏng vấn là một hàng thẻ sang trọng, bo góc `14px`, nền dịu `#f8fbfa` có icon đại diện buổi phỏng vấn nổi bật. Tự động hiển thị màn hình trống thân thiện nếu xóa hết dữ liệu.

---

### 2. Giải pháp thiết kế mới (Full-Width 1120px + 4 Cột Rõ Ràng + Hàng Thẻ Nổi Bật)

1. **Xóa nút `Back to home` & Giữ độ rộng toàn khung (`.page`, `max-width: 1120px`)**:
   - Xóa hoàn toàn `<div class="actions"><a class="btn btn-secondary" href="dashboard.html">Back to home</a></div>` ở cuối trang.
   - Trả lại độ rộng chuẩn `.page` (`1120px`) để giao diện bề thế, tận dụng tốt không gian màn hình lớn.

2. **Thanh Header của Panel kết hợp Thống kê & Nút Tạo Mới (`.storage-header`)**:
   - Bên trái: Tiêu đề **`Your Interviews`** kèm dòng mô tả ngắn hoặc bộ đếm số buổi phỏng vấn (ví dụ: huy hiệu `4 sessions` / `3 Finished · 1 Unfinished`).
   - Bên phải: Nút hành động **`+ New interview`** dẫn tới `job-profile.html`, giúp phần đầu bảng đầy đặn, có chiều sâu và hữu ích.

3. **Giữ nguyên 4 Cột rõ ràng (`NAME` | `DATE` | `STATUS` | `ACTIONS`) nhưng phân bổ tỷ lệ cột cân đối**:
   - Sử dụng lưới 4 cột chuẩn xác (`grid-template-columns: minmax(260px, 2.2fr) minmax(150px, 1.1fr) minmax(160px, 1.1fr) 230px`) cho cả **Thanh tiêu đề cột (`.storage-grid-head`)** lẫn **Từng hàng phỏng vấn (`.storage-row-card`)**:
     - **Cột 1 — `INTERVIEW NAME`**: Có icon đại diện buổi phỏng vấn (khung vuông bo góc màu xanh nhạt chứa icon mic/chat) + Tên buổi phỏng vấn in đậm (`Interview 1`) + nhãn phụ (`Mock Interview Session`).
     - **Cột 2 — `DATE`**: Hiển thị ngày tháng rõ ràng (`29/2/2026`).
     - **Cột 3 — `STATUS` (Cột độc lập có tiêu đề `STATUS` phía trên)**: Hiển thị huy hiệu trạng thái `● Finished` (xanh lá) hoặc `● Unfinished` (vàng hổ phách) căn thẳng hàng dọc theo đúng cột `STATUS`.
     - **Cột 4 — `ACTIONS` (`230px` vừa khít 2 nút)**:
       - Nhờ 3 cột `Name`, `Date`, `Status` được giãn đều hợp lý trên mặt bằng `1120px` và cột `Actions` có độ rộng cố định vừa khít cụm 2 nút (`230px`), khoảng cách giữa cột `Status` và 2 nút bấm trở nên cân đối tự nhiên, không còn khoảng trắng thừa.
       - **Thiết kế lại 2 nút đồng bộ, sắc nét**:
         - Nút 1 (**`View report`** / **`Continue`**): Độ rộng đồng nhất (`116px`), chiều cao `38px`, bo góc `10px`, nền màu nhấn rõ ràng để tất cả các hàng thẳng tắp từ trên xuống dưới.
         - Nút 2 (**`Delete`**): Không còn là chữ trôi nổi hay nút bị mờ, mà là nút viền mảnh đồng bộ chiều cao `38px` (`border: 1px solid var(--line)`, bo góc `10px`), khi di chuột vào chuyển sang viền và nền đỏ nhạt (`var(--danger)`), tạo thành một cặp nút song hành cân xứng.
   - **Từng hàng phỏng vấn dạng Card Row (`.storage-row-card`)**:
     - Thay vì các đường gạch mảnh đơn điệu trên nền trắng trống trải, mỗi dòng phỏng vấn là một dải thẻ nổi nhẹ (`background: #f8fbfa`, `border: 1px solid var(--line)`, `border-radius: 14px`, cách nhau `12px`), nổi bật hiệu ứng khi di chuột qua.

---

### 3. Danh sách file sẽ cập nhật khi triển khai
1. **`poc/storage.html`**:
   - Khôi phục `.page` (`1120px`), xóa nút `Back to home`.
   - Thêm `.storage-header` (tiêu đề + thống kê nhanh + nút `+ New interview`) và `.storage-grid-head` với đủ 4 cột `INTERVIEW NAME`, `DATE`, `STATUS`, `ACTIONS`.
2. **`poc/css/styles.css`**:
   - Định nghĩa lưới 4 cột `.storage-grid-head` và `.storage-row-card` (`grid-template-columns: minmax(260px, 2.2fr) minmax(150px, 1.1fr) minmax(160px, 1.1fr) 230px`), style thẻ hàng `.storage-row-card`, icon buổi phỏng vấn `.session-badge-icon`, và cặp nút `.btn-session-action` + `.btn-session-delete` đồng bộ kích thước.
3. **`poc/js/app.js`**:
   - Cập nhật `renderInterviews()` để render đủ 4 cột (`Name + icon`, `Date`, `Status`, `Actions`), cập nhật số lượng thống kê trên header và giữ tính năng xóa trực tiếp khi bấm `Delete`.

---

### 4. Trạng thái
- **DONE** — Đã hoàn thành triển khai phiên bản trước.

---

## [DONE] Tinh chỉnh lại trang Your Interview (`poc/storage.html`): Bỏ các chi tiết thừa, bỏ khung hộp từng dòng & Bo tròn (Pill) cặp nút thao tác

### 1. Các thay đổi đã triển khai
- **Trạng thái: DONE (Đã hoàn thành)**
1. **Loại bỏ các nhãn & nút phụ thừa**:
   - **Trên thanh Header của Panel (`.storage-header`)**:
     - Đã xóa huy hiệu thống kê `#storage-stats` (*"10 sessions · 6 Finished, 4 In Progress"*).
     - Đã xóa nút `+ New interview` ở góc phải, giữ lại tiêu đề **`<h2>Your Interviews</h2>`** tinh gọn, chuẩn xác.
   - **Trên từng dòng phỏng vấn**:
     - Đã xóa dòng chữ phụ `AI Interview Session` (`.session-subtext`) dưới tên buổi phỏng vấn.
     - Đã xóa biểu tượng chat (`.session-icon-badge`) phía trước tên buổi phỏng vấn, chỉ hiển thị trực tiếp tên buổi phỏng vấn (`.session-title`).
     - Đổi tên tiêu đề cột đầu tiên thành `Name`.
2. **Bỏ khung hộp bao quanh từng dòng (`.storage-row-card`)**:
   - Chuyển các dòng từ dạng đóng hộp viền (`background: #f8fbfa; border: 1px solid var(--line); border-radius: 14px`) sang hàng phẳng thanh lịch trên mặt panel trắng (`background: transparent; border-bottom: 1px solid #e8eeea`), đồng bộ padding với tiêu đề cột.
   - Vẫn duy trì hoàn hảo **lưới 4 cột cân xứng** (`grid-template-columns: minmax(260px, 2.2fr) minmax(140px, 1.1fr) minmax(150px, 1.1fr) 220px`).
3. **Bo tròn hoàn toàn (Pill Shape) cho cặp nút thao tác**:
   - Cập nhật cả 2 nút **`.btn-session-action`** (`View report` / `Continue`) và **`.btn-session-delete`** (`Delete`) sang bo cong mềm mại **`border-radius: 999px`**, kết hợp hài hòa với huy hiệu trạng thái `.status`.

---

### 2. Danh sách file đã cập nhật
1. **`poc/storage.html`**: Xóa `#storage-stats` và nút `+ New interview`, đổi nhãn cột đầu thành `Name`.
2. **`poc/js/app.js`**: Bỏ tạo badge icon và subtext trong `renderInterviews()`, loại bỏ thao tác với `#storage-stats`.
3. **`poc/css/styles.css`**: Làm phẳng hàng bảng, xóa border-radius hộp dòng và đặt `border-radius: 999px` cho cặp nút thao tác.

---

### 3. Trạng thái
- **DONE** — Đã hoàn thành triển khai phiên bản trước.

---

## [DONE] Thiết kế lại các trang Interview (`poc/interview-1.html`, `poc/interview-2.html`, `poc/interview-3.html`): Xử lý tiêu đề thừa, xóa ghi chú Demo & Tối ưu bố cục Câu hỏi – Trả lời

### 1. Các thay đổi đã triển khai
- **Trạng thái: DONE (Đã hoàn thành)**
1. **Loại bỏ tiêu đề `<h1>Interview</h1>` ngoài khung & Gom vào Header của Panel (`.interview-header`)**:
   - Đã xóa hoàn toàn khối `<div class="interview-top">` ngoài trang.
   - Bên trong `.interview-panel`, đưa vào thanh **`.interview-header`** tinh gọn: bên trái là tiêu đề câu hỏi **`<h2>Question X</h2>`** kèm huy hiệu `X of 3`, bên phải là thanh tiến trình số **`.step-track`** (`1 — 2 — 3`) căn thẳng hàng ngang hoàn hảo.
2. **Xóa sạch các dòng chú thích Demo thừa**:
   - Đã xóa ghi chú `<small id="mic-note">Not interactive in this PoC</small>` dưới nút Microphone.
   - Đã xóa thông báo `<span class="demo-note" id="answer-status">Answers are saved in this demo.</span>` ở cuối trang và loại bỏ dòng cập nhật tương ứng trong `poc/js/app.js`.
3. **Tối ưu bố cục Câu hỏi & Ô nhập câu trả lời Full-Width**:
   - **Khối Câu hỏi (`.question`)**: Giữ trọn chiều rộng 100%, viền điểm nhấn bên trái màu `var(--aqua)`, bo góc `12px` êm ái và cỡ chữ `17px` dễ đọc.
   - **Khu vực Trả lời (`.answer-section`)**:
     - Tạo thanh tiêu đề `.answer-header`: nhãn **`Your Answer`** bên trái, nút **`Microphone`** (`.btn-mic` bo tròn viên thuốc nhỏ gọn) bên phải.
     - Ô `<textarea>` mở rộng `100%` thẳng hàng tuyệt đối với khối câu hỏi bên trên, không còn bị khuyết một góc trống thừa `146px` như trước.
   - **Thanh điều hướng dưới cùng (`.interview-navigation`)**:
     - Tích hợp nút **`Save and Quit`** (dạng pill đỏ dịu `.btn-danger-subtle`) trực tiếp vào góc trái bên trong panel.
     - Cụm nút chuyển câu (`← Previous Question` và `Next Question →` / `Finalize Interview`) đặt gọn gàng ở góc phải.

---

### 2. Danh sách file đã cập nhật
1. **`poc/interview-1.html`, `poc/interview-2.html`, `poc/interview-3.html`, `poc/interview-interrupt.html`**: Cập nhật cấu trúc Header, Question, Answer và Navigation mới; xóa toàn bộ các ghi chú demo thừa.
2. **`poc/css/styles.css`**: Viết lại hệ thống CSS cho `.interview-header`, `.interview-step-badge`, `.answer-section`, `.btn-mic`, `<textarea>` full-width, `.interview-navigation`, và `.btn-danger-subtle`.
3. **`poc/js/app.js`**: Loại bỏ thao tác cập nhật `#answer-status`.

---

### 3. Trạng thái
- **DONE** — Đã hoàn thành triển khai phiên bản trước.

---

## [DONE] Hợp nhất 3 trang Câu hỏi thành 1 trang `poc/interview.html` duy nhất & Thiết kế lại nút Microphone nổi bật, rõ ràng

### 1. Giải pháp đã triển khai
- **Trạng thái: DONE (Đã hoàn thành)**
1. **Hợp nhất thành 1 trang động duy nhất (`poc/interview.html`)**:
   - Đã tạo `poc/interview.html` và xóa bỏ hoàn toàn 3 file tĩnh dư thừa (`poc/interview-1.html`, `poc/interview-2.html`, `poc/interview-3.html`).
   - Cập nhật toàn bộ liên kết điều hướng từ `poc/job-profile.html` và `poc/storage.html` trỏ về `poc/interview.html`.
   - Trong `poc/js/app.js`: Xây dựng bộ điều khiển phỏng vấn động linh hoạt:
     - Tự động đọc và render câu hỏi từ `window.POC_DATA.questions`.
     - Cho phép nhảy qua lại giữa các câu hỏi bằng nút **`Next Question →`**, **`← Previous Question`**, hoặc **click trực tiếp vào từng bước số `1`, `2`, `3`** trên thanh tiến trình `.step-track`.
     - Tự động lưu câu trả lời vào bộ nhớ và đếm số ký tự trực tiếp (`X characters`).
     - Ở câu hỏi cuối cùng (Question 3), nút tiếp theo tự động đổi thành **`Finalize Interview`** để lưu và hoàn tất phiên phỏng vấn.
2. **Thiết kế lại khu vực Microphone nổi bật, thu hút & tương tác trực tiếp (`.answer-composer` + `.composer-voice-dock`)**:
   - Tích hợp ô nhập chữ và khu vực thu âm thành một khối hộp thống nhất `.answer-composer`.
   - Bổ sung thanh công cụ giọng nói `.composer-voice-dock` với nút **`.btn-mic-hero`** nổi bật:
     - Icon Microphone đặt trong vòng tròn màu xanh teal đậm `40px × 40px` nổi bật.
     - Tiêu đề chữ đậm rõ nét **`Record Answer with Microphone`** kèm phụ đề hướng dẫn.
     - Cụm dải sóng âm `.voice-waveform` chuyển động trực quan.
     - **Hiệu ứng thu âm mô phỏng sống động**: Khi click vào nút Mic, nút chuyển sang trạng thái `.is-recording` (vòng đỏ xung nhịp `mic-pulse`, dải sóng âm nhấp nhô, và tự động điền câu nói mẫu sau 2.4 giây). Bấm lần nữa để dừng thu âm.

---

### 2. Danh sách file đã cập nhật
1. **`poc/interview.html`**: Trang phỏng vấn động duy nhất với đầy đủ cấu trúc composer, voice dock và step buttons.
2. **`poc/interview-1.html`, poc/interview-2.html, poc/interview-3.html`**: Đã xóa bỏ an toàn.
3. **`poc/job-profile.html` & `poc/storage.html`**: Đổi luồng truy cập sang `interview.html`.
4. **`poc/js/app.js`**: Viết bộ điều khiển chuyển đổi câu hỏi động và tương tác microphone.
5. **`poc/css/styles.css`**: Styling cho `.answer-composer`, `.composer-voice-dock`, `.btn-mic-hero`, và hiệu ứng sóng âm/nhịp thở.

---

### 3. Trạng thái
- **DONE** — Đã hoàn thành triển khai phiên bản trước.

---

## [DONE] Tinh chỉnh trang Interview (`poc/interview.html`): Thay vòng tròn bước bằng huy hiệu `1 of 3` bên phải, bỏ nút Save & Quit và tự động bật màn hình Save khi thoát, đồng bộ màu & căn giữa 2 nút Prev/Next

### 1. Các thay đổi đã triển khai
- **Trạng thái: DONE (Đã hoàn thành)**
1. **Thay vòng tròn `1 — 2 — 3` bằng huy hiệu `1 of 3` nằm bên phải Header**:
   - Đã xóa bỏ cụm `.step-track` (`1 — 2 — 3` circles) giúp giao diện co giãn tối ưu khi phỏng vấn có số lượng câu hỏi lớn (kể cả 25+ câu).
   - Đặt tiêu đề `<h2 id="question-title">Question 1</h2>` ở bên trái và huy hiệu `<span class="interview-step-badge" id="question-badge">1 of 3</span>` bo cong tinh tế ở bên phải của `.interview-header`.
2. **Xóa nút `Save and Quit` & Tự động bật màn hình Save and Exit khi người dùng thoát**:
   - Xóa bỏ nút `Save and Quit` khỏi `.interview-navigation`.
   - Mỗi khi người dùng bấm vào các mục điều hướng ở header (Logo, Dashboard, Your interview, System feedback, Profile) hoặc nút Back của trình duyệt, hệ thống tự động lưu câu trả lời hiện tại và hiển thị ngay hộp thoại **Saved Dialog** (`#interview-exit-modal`: *"Your interview has been saved as..."*) kèm nút điều hướng an toàn.
3. **Đồng bộ màu sắc & Căn giữa 2 nút `← Previous Question` và `Next Question →`**:
   - Chuyển 2 nút sang dạng bo tròn hoàn toàn (pill shape `border-radius: 999px`).
   - Sử dụng gam màu trắng tinh tế kết hợp viền xanh lam nhạt (`background: #ffffff; border: 1.5px solid #b8d7dc; color: #245b65`), khi hover chuyển sang sắc xanh băng dịu nhẹ (`background: #f0f8f9`).
   - Căn giữa toàn bộ thanh `.interview-navigation` (`justify-content: center`).

---

### 2. Danh sách file đã cập nhật
1. **`poc/interview.html`**: Đưa `1 of 3` sang phải, xóa `.step-track`, xóa nút `Save and Quit`, tích hợp `#interview-exit-modal`.
2. **`poc/css/styles.css`**: Căn lề `.interview-header` (trái/phải), định dạng badge `1 of 3` lớn rõ, căn giữa `.interview-navigation`.
3. **`poc/js/app.js`**: Cập nhật controller render bước `1 of 3`, tự động bắt sự kiện thoát trang để lưu và bật popup xác nhận đã lưu.

---

### 3. Trạng thái
- **DONE** — Đã hoàn thành triển khai phiên bản trước.

---

## [DONE] Thiết kế lại trang Report (`poc/report.html`) & Hợp nhất trang CV Feedback (`poc/cv-feedback.html`): Làm nổi bật tên buổi phỏng vấn, xóa ghi chú thừa & Thiết kế bố cục CV 2 cột (Trái: 4 mục hoặc PDF / Phải: Nhận xét dạng bài viết)

### 1. Các thay đổi đã triển khai
- **Trạng thái: DONE (Đã hoàn thành)**
1. **Hợp nhất hoàn toàn CV Feedback vào `poc/report.html` & Xóa file `poc/cv-feedback.html`**:
   - Đã xóa an toàn file `poc/cv-feedback.html` và gỡ bỏ nút `View CV feedback` ở cuối trang báo cáo.
   - Toàn bộ kết quả phỏng vấn và đánh giá CV nay được xem tập trung, liền mạch trên một trang báo cáo duy nhất.
2. **Khắc phục vấn đề Tiêu đề & Làm nổi bật Tên Buổi Phỏng Vấn (`#report-name`)**:
   - Xóa bỏ khối tiêu đề `<h1>Report</h1>` trôi nổi kèm subtitle mờ nhạt.
   - Thay thế bằng **Thanh Tiêu Đề Báo Cáo Nổi Bật (`.report-hero-bar`)**:
     - Hiển thị nhãn huy hiệu `INTERVIEW REPORT` phía trên.
     - Tên buổi phỏng vấn (**`<h1 id="report-name">...</h1>`**, ví dụ: `New Interview 6`) trở thành tiêu đề chính cỡ lớn (`26px`, in đậm nổi bật).
     - Phía bên phải hiển thị ngày thực hiện (`#report-date`) và huy hiệu trạng thái `Finished` đồng bộ, sang trọng.
3. **Xóa toàn bộ các dòng ghi chú Demo thừa**:
   - Xóa bỏ banner `<p class="sample-banner">Sample feedback from the design · No AI analysis is performed.</p>`.
   - Xóa bỏ tất cả các nhãn `<span class="sample-tag">Sample</span>` trong các thẻ câu trả lời.
4. **Thiết kế lại bố cục CV Feedback chia 2 cột Trái – Phải (`.cv-report-split`)**:
   - Đặt trong khung `.panel.cv-report-panel` ngay dưới phần Interview Q&A:
     - **Cột Trái — CV của người dùng (`.cv-report-left`)**:
       - Hỗ trợ cả 2 định dạng: **4 Mục có cấu trúc** (`.cv-document-sheet`) hoặc **Bản xem trước tài liệu PDF** (`.cv-pdf-preview-sheet` hiển thị tên file PDF, dung lượng, và trang giấy tài liệu).
       - Có bộ nút chuyển đổi linh hoạt `4 Sections View` / `PDF Document View` ở thanh tiêu đề giúp dễ dàng xem trước cả hai chế độ.
     - **Cột Phải — Đánh giá của hệ thống (`.cv-report-right`)**:
       - Bỏ hoàn toàn các hộp xám `.feedback-block` nặng nề.
       - Trình bày dạng bài viết đánh giá chuyên sâu (`.cv-editorial-feedback`) gồm tiêu đề chính **`Our Feedback`** và các tiểu mục rõ ràng (`<h4>` + đoạn văn `<p>`), giúp trải nghiệm đọc thông suốt và trực quan.

---

### 2. Danh sách file đã cập nhật
1. **`poc/cv-feedback.html`**: Đã xóa bỏ an toàn.
2. **`poc/report.html`**: Tái cấu trúc thanh Hero Bar, xóa ghi chú demo, thêm phần CV Feedback 2 cột (Trái: 4 mục / PDF, Phải: Nhận xét dạng bài viết).
3. **`poc/css/styles.css`**: Styling cho `.report-hero-bar`, `.cv-report-panel`, `.cv-report-split`, `.cv-document-sheet`, `.cv-pdf-preview-sheet`, và `.cv-editorial-feedback`.
4. **`poc/js/app.js`**: Hỗ trợ lưu trữ `cvPdf` khi bắt đầu phỏng vấn, liên kết dữ liệu và bộ chuyển đổi hiển thị CV trên trang Report.

---

### 3. Trạng thái
- **DONE** — Đã hoàn thành triển khai phiên bản trước.

---

## [DONE] Tinh chỉnh trang Report (`poc/report.html`) & Cơ chế Loại Trừ Lẫn Nhau (Mutual Exclusivity) giữa 4 mục CV và tải file PDF trên toàn hệ thống

### 1. Các thay đổi đã triển khai
- **Trạng thái: DONE (Đã hoàn thành)**
1. **Tinh chỉnh trang Report (`poc/report.html`)**:
   - Đã xóa bỏ hoàn toàn 2 nút `Back to home` và `View all interviews` ở cuối trang.
   - Xóa bỏ trạng thái `Status: Finished` trong `.report-hero-bar`, chỉ giữ lại thông tin ngày tháng sạch sẽ.
   - Xóa bỏ các nhãn phụ thừa: `#cv-format-indicator` và `.editorial-subtext` (*AI Comprehensive Assessment*).
   - Xóa bỏ bộ nút chuyển đổi thủ công (`4 Sections View` / `PDF Document View`).
   - Cột bên trái tự động hiển thị đúng định dạng CV mà buổi phỏng vấn đã dùng (PDF hoặc 4 mục văn bản).
2. **Cơ chế Loại Trừ Lẫn Nhau (Mutual Exclusivity) khi nhập CV (Chỉ thay đổi hành vi, giữ nguyên layout)**:
   - **Trên trang Profile (`poc/profile.html` — `#your-cv`)**:
     - Bấm vào nút tải PDF hoặc tải/kéo thả file PDF: Tự động xóa sạch cả 4 ô mục CV văn bản (`account.cv = ["", "", "", ""]`), chuyển chế độ sang PDF và lưu lại.
     - Gõ chữ vào bất kỳ ô nào trong 4 mục CV hoặc bấm `Save CV`: Tự động xóa file PDF đang đính kèm (`account.cvPdf = null`) và chuyển về chế độ văn bản.
   - **Trên trang Job Profile (`poc/job-profile.html` — `#custom-cv-body`)**:
     - Bấm vào nút tải PDF hoặc tải/kéo thả file PDF tùy chỉnh: Tự động xóa sạch cả 4 ô mục CV tùy chỉnh.
     - Gõ chữ vào bất kỳ ô nào trong 4 mục CV tùy chỉnh: Tự động xóa file PDF tùy chỉnh đang đính kèm.
     - Khi bấm bắt đầu phỏng vấn: Lưu chính xác định dạng PDF hoặc 4 mục mà người dùng đã chọn.

---

### 2. Danh sách file đã cập nhật
1. **`poc/report.html`**: Xóa nút điều hướng đáy trang, xóa trạng thái Finished, xóa các nhãn phụ thừa và bộ nút chuyển đổi thủ công.
2. **`poc/css/styles.css`**: Dọn dẹp các class toggle view và format badge trong `.cv-report-header`.
3. **`poc/js/app.js`**: Triển khai cơ chế xóa trắng lẫn nhau giữa 4 mục CV và file PDF trên cả `profile` và `job-profile`; tự động hiển thị định dạng CV tương ứng trên trang `report`.

---

### 3. Trạng thái
- **DONE** — Đã hoàn thành triển khai và kiểm thử.

---

## [DONE] Tinh chỉnh Màn hình Ngắt Phỏng vấn (Interrupt Interview Modal): Làm mờ Toàn Trang (Full-Page Blur) & Đồng bộ Nút `Proceed`

### 1. Các thay đổi đã triển khai
- **Trạng thái: DONE (Đã hoàn thành)**
1. **Làm mờ Toàn Trang (Full-Page Blur Overlay)**:
   - Di chuyển phần tử `.dialog-backdrop` (`#interview-exit-modal`) ra khỏi `<main class="page">` (đặt trực tiếp dưới `<body>`) trên cả `poc/interview.html` và `poc/interview-interrupt.html` để không bị giới hạn vùng hiển thị bởi `transform` của `.page`.
   - Cập nhật `@keyframes page-enter` kết thúc ở `transform: none` thay vì `transform: translateY(0)`.
   - Tăng `z-index` của `.dialog-backdrop` lên `200` (cao hơn `.site-header` có `z-index: 50`), kết hợp `width: 100vw; height: 100vh; backdrop-filter: blur(5px)` giúp làm mờ toàn bộ màn hình (bao gồm cả thanh header, nội dung giữa và footer).
2. **Đồng bộ nhãn nút bấm thành `Proceed` trong mọi trường hợp**:
   - Đổi văn bản mặc định của nút `#exit-modal-confirm-btn` trên `poc/interview.html` và `poc/interview-interrupt.html` từ `Back to home` thành **`Proceed`**.
   - Trong `poc/js/app.js` (`triggerSaveAndExit`), luôn gán `exitModalConfirmBtn.textContent = "Proceed"` bất kể người dùng bấm thoát về Dashboard hay bất kỳ trang nào khác.

---

### 2. Danh sách file đã cập nhật
1. **`poc/interview.html`**: Đưa `#interview-exit-modal` ra cấp `body` và đổi nhãn nút thành `Proceed`.
2. **`poc/interview-interrupt.html`**: Đưa `.dialog-backdrop` ra cấp `body`, đồng bộ giao diện nền và đổi nhãn nút thành `Proceed`.
3. **`poc/css/styles.css`**: Nâng `z-index: 200`, `100vw/100vh`, `backdrop-filter: blur(5px)` cho `.dialog-backdrop` và sửa `@keyframes page-enter` thành `transform: none`.
4. **`poc/js/app.js`**: Luôn hiển thị nhãn `Proceed` cho nút xác nhận thoát phỏng vấn.

---

## [DONE] Sửa lỗi Highlight Header trên trang Report (`poc/report.html`) & Tinh chỉnh Bố cục Hàng Dọc (Polished Vertical Row Layout) trên trang System Feedback (`poc/system-feedback.html`)

### 1. Phân tích yêu cầu điều chỉnh từ người dùng
- **Không dùng lưới 2×2 (4 hộp chia 2 bên)** vì bố cục ngang–dọc đan xen gây rối mắt khi đọc tuần tự 4 câu hỏi khảo sát.
- **Giữ nguyên bố cục hàng dọc truyền thống (1 câu mỗi hàng từ `01` đến `04`)**, nhưng **trau chuốt và làm đẹp (polish)** để trông thoáng đãng, thanh lịch và hiện đại hơn.
- Giữ nguyên các cải tiến đã thống nhất:
  - Xóa highlight/gạch chân thừa của tab `Your interview` khi đang ở trang `report.html`.
  - Xóa tiêu đề thừa `<div class="page-heading"><h1>System Feedback</h1></div>` ngoài panel.
  - Xóa câu ghi chú thừa `<p class="demo-note">Feedback is saved locally for the demo; it is not sent to a server.</p>`.
  - Đưa nút **`Submit feedback →`** ra chính giữa ở cuối khung.

---

### 2. Giải pháp thiết kế & kỹ thuật đề xuất (Polished Row Layout)

#### A. Bố cục Hàng Dọc Tinh Chỉnh (`.survey-list` & `.survey-row`)
- Đặt trong khung `.panel.survey-panel` có độ rộng vừa vặn, dễ đọc (`max-width: 860px`).
- 4 câu hỏi xếp thành **4 hàng dọc nối tiếp từ trên xuống dưới (`.survey-row`)**, ngăn cách nhau bằng đường kẻ mảnh tinh tế (`border-bottom: 1px solid #eef3f0; padding-bottom: 24px; margin-bottom: 24px`, hàng cuối không có đường kẻ):
  1. **Dòng câu hỏi (`<label class="survey-label" for="feedback-0..3">`)**:
     - Bên trái là huy hiệu số thứ tự **`.survey-number`** (`01`, `02`, `03`, `04`) dạng ô vuông bo góc màu xanh aqua dịu (`width: 30px; height: 30px; border-radius: 8px; background: rgba(146, 199, 207, 0.25); color: #245b65; font-weight: 700; font-size: 13px`).
     - Bên cạnh là nội dung câu hỏi khảo sát rõ ràng (`font-size: 15.5px; font-weight: 600; color: var(--ink); line-height: 1.5`) — không thêm bất kỳ tiêu đề phụ/nhãn chủ đề thừa nào.
  2. **Ô nhập câu trả lời (`<div class="survey-field-input"><textarea id="feedback-0..3" rows="3">`)**:
     - Căn lề trái thẳng hàng với chữ câu hỏi phía trên (`padding-left: 42px` trên Desktop để tạo cột lề số thứ tự `01`–`04` tách biệt, thoáng mắt).
     - Ô `<textarea rows="3">` có nền sáng mịn (`background: #fafcfa`), viền êm (`border: 1px solid #c9d7d5; border-radius: 12px; padding: 12px 16px`), khi focus chuyển sang nền trắng kèm viền xanh dịu nhẹ.

#### B. Nút `Submit feedback →` Căn Giữa (`.survey-actions`)
- Đặt ở dưới cùng của form (`display: flex; justify-content: center; margin-top: 28px; padding-top: 24px; border-top: 1px solid var(--line)`).
- Nút **`Submit feedback →`** bo tròn dạng viên thuốc (`border-radius: 999px; min-width: 240px`).

---

### 3. Danh sách file đã cập nhật
1. **`poc/report.html` & `poc/thank-you.html`**: Gỡ bỏ class `is-active` trên thanh điều hướng Header.
2. **`poc/js/app.js`**: Cập nhật `navMap` để chỉ highlight tab khi người dùng ở đúng trang gốc (`dashboard`, `storage`, `system-feedback`, `profile`).
3. **`poc/system-feedback.html`**: Chuyển từ lưới 2×2 về danh sách hàng dọc `.survey-list` gồm 4 `.survey-row` tinh gọn, xóa `<h1>` ngoài khung, xóa hoàn toàn `.demo-note` và căn giữa nút Submit.
4. **`poc/css/styles.css`**: Áp dụng styling bố cục hàng dọc cho `.feedback-page`, `.survey-panel`, `.survey-list`, `.survey-row`, `.survey-label`, `.survey-number`, `.survey-text`, `.survey-field-input`, và `.survey-actions`.

---

### 4. Trạng thái
- **DONE** — Đã hoàn thành triển khai và kiểm thử.
