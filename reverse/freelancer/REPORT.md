# BÁO CÁO DỊCH NGẢO — vn.freelancer.com

Nguồn: trang chủ `https://www.vn.freelancer.com/` (phiên bản Tiếng Việt, SSR)
Ngày phân tích: 17/06/2026 (theo môi trường)

## 1. THÔNG TIN TỔNG QUAN

| Mục | Chi tiết |
|-----|----------|
| URL | `https://www.vn.freelancer.com/` |
| Loại | Single-Page Application với Server-Side Rendering (Angular Universal) |
| Ngôn ngữ trang | Tiếng Việt (`lang="vi"`), có hreflang đa quốc gia |
| Kích thước HTML SSR | ~1.09 MB (có inline CSS ~563 KB) |
| Bundle JS chính | `main-VF4HHFXO.js` ≈ 3,5 MB (minified, không source map) |
| Polyfill | `polyfills-WUF6LMYT.js` ≈ 108 KB |
| CDN tài nguyên | `https://www.f-cdn.com/assets/main/vi/` |
| PWA | Có (`manifest.webmanifest`, display: standalone, icon 192/512) |

### 1.1 Framework & kỹ thuật
- **Angular 20.3.30** (`ng-version="20.3.30"`, `ng-server-context="other"`)
- Angular Material (MDC) — biến `--mat-button-*`, `--mat-timepicker-*`
- SSR hydration: thẻ `<script id="webapp-state">` chứa `__nghData__` (~19 KB)
- PWA: service worker (`/ngsw/state`), manifest, apple-touch-icons
- CSS: 63 block `<style>` inline trong HTML (~563 KB), biến CSS design tokens
- Font: **Roboto**, **Roboto Flex**, **Barlow**, **Barlow Condensed** (fonts.gstatic.com)
- Cookie auth: `GETAFREE_AUTH_HASH_V2`, `GETAFREE_USER_ID`, `XSRF-TOKEN`, `requires_gdpr`, `referral_signup`
- Header auth: `freelancer-auth-v2`
- reCAPTCHA public key v2: `6Lc1CCcTAAAAABxlulYmWJj_ZNAHHegrhLV3vS2Z`; v3: `6Lfc5-cnAAAAALOb342vomYp_pPkh1Eg_fIv52qX`
- Google Maps API key embedded: `AIzaSyAWB_zZMjdwNlu8-9xZ8RyNRbCERQTWSR8` (chỉ hiển thị bản đồ)
- Firebase: `freelancer-8cd88`, messagingSenderId `517773278714`
- Tracking: GA UA-223765-6, GA4 G-31ZQKFK760, Sentry, Hotjar, FB Pixel, TikTok, LinkedIn, Quora, Outbrain, Reddit, Bing Ads

## 2. CẤU TRÚC DOM (SSR)

HTML được render sẵn ở server. Cây component tóm tắt (độ sâu 4):

```
#root
├─ app-root (Angular root)
│  ├─ app-toast-alerts / fl-toast-alert-container
│  ├─ fl-pwa, fl-seo
│  ├─ router-outlet
│  ├─ app-logged-out-shell
│  │  ├─ app-navigation-logged-out-home
│  │  │  ├─ div.NavigationRoot
│  │  │  │  ├─ fl-container.NavigationContainer
│  │  │  │  │  ├─ fl-button.LogoButton > a > fl-logo > picture
│  │  │  │  │  ├─ app-navigation-logged-out-menu (x3: Thue/Tim viec/Giai phap)
│  │  │  │  │  └─ div.NavigationSections (ngon ngu, link, nut Dang nhap)
│  │  └─ div.MainContent-body
│  │     ├─ router-outlet
│  │     └─ ng-component -> app-home-page
│  │        ├─ app-home-page-hero (Hero + carousel + CTA)
│  │        ├─ app-companies-trust-logo
│  │        ├─ app-home-page-make-it-real (SectionFeature)
│  │        ├─ app-home-page-global-talent (SectionFeature)
│  │        ├─ app-as-seen-on
│  │        ├─ app-home-page-discover-section (Discover)
│  │        ├─ app-home-page-hire-categories (Grid, fl-col data-col)
│  │        ├─ app-home-page-ai-services
│  │        └─ app-home-page-api-enterprise-v5
│  ├─ app-give-get-footer
│  ├─ app-tracking-consent-banner
│  ├─ app-footer > app-footer-freelancer (FooterSection x nhieu fl-col)
│  ├─ fl-file-download-alert, fl-error-tracking, fl-location, fl-modal, fl-notifications, fl-update-native-alert, fl-theme
└─ script#webapp-state, noscript, script x3
```

Tong so phan tu DOM: **2.108**, 98 the khac nhau, 46 phan tu tu bien (`fl-*`, `app-*`).

### Component tu bien chinh
| Component | So luong | Vai tro |
|-----------|----------|---------|
| `fl-link` | 360 | Link tu bien (router/ngoai te) |
| `fl-picture` | 73 | Anh responsive (lazy load, aspect-ratio) |
| `fl-icon` | 58 | Bieu tuong |
| `fl-col` | 52 | Cot grid (data-col = 1..12) |
| `fl-button` | 27 | Nut hanh dong (data-color, data-size, label) |
| `fl-container` | 26 | Container canh giua (max-width responsive) |
| `fl-grid` | 18 | He thong luoi |
| `fl-carousel` / `fl-carousel-item` | 2 / 14 | Carousel hero & danh muc |
| `app-navigation-logged-out-menu` | 3 | Menu dich vu (Thue / Tim viec / Giai phap) |
| `app-home-page-hero` | 1 | Hero section chinh |
| `app-home-page-hire-categories` | 1 | Danh muc thue nhan tai |
| `app-home-page-ai-services` | 1 | Dich vu AI |
| `app-home-page-api-enterprise-v5` | 1 | API doanh nghiep |

## 3. DESIGN SYSTEM (CSS TOKENS)

Tach tu 63 block `<style>` inline trong HTML (tong 563 KB).

### 3.1 Mau sac chinh (semantic)
| Bien | Gia tri | Nghia |
|------|---------|-------|
| `--color-primary` | `#e60278` | Mau thuong hing chinh (hong Freelancer) |
| `--color-primary-foreground` | `#fff` | Chu tren nen primary |
| `--color-secondary` | `#1772eb` | Mau phu (xanh) |
| `--color-secondary-hover` | `#589af0` | Hover secondary |
| `--color-error` | `#eb3730` | Loi |
| `--color-success` | `#058430` | Thanh cong |
| `--color-info` | `#1772eb` | Thong tin |
| `--color-background` | `#fff` | Nen sang |
| `--color-background-raised` | `#fcfcfd` | Nen cao (card) |
| `--color-background-200/300` | `#eef0f4` / `#bcc5d3` | Nen mo |
| `--color-background-600/700` | `#232a35` / `#12151b` | Nen toi |
| `--color-dark` / `--color-foreground` | `#12151b` | Chu chinh |
| `--color-light` | `#fcfcfd` | Chu tren nen toi |
| `--color-bg-brand-navy` | `#082e60` | Xanh navy dam |

### 3.2 Thang khoang cach (spacing)
`--spacing-none:0`, `--spacing-xxxsmall:4px`, `--spacing-xxsmall:8px`, `--spacing-xsmall:12px`, `--spacing-small:16px`, `--spacing-mid:24px`, `--spacing-large:32px`, `--spacing-xlarge:48px`, `--spacing-xxlarge:64px`, `--spacing-xxxlarge:72px`, `--spacing-xxxxlarge:96px`, `--spacing-gutter:16px`, `--spacing-gutter-tablet:12px`.

### 3.3 Breakpoint (media query)
`min-width:768px` (tablet), `960px` (desktop-small), `1200px` (desktop), `1440px` (desktop-large), `1600px` (desktop-xlarge), `1920px`, `2560px`; cung `max-width:767px`, `hover:none/hover:hover`, `pointer:fine/pointer:coarse`, `prefers-reduced-motion`.

### 3.4 Typography
| Font-fam | So lan dung |
|----------|-------------|
| `Roboto` | 54 |
| `Roboto Flex` | 6 |
| `Barlow` | 18 |
| `Barlow Condensed` | 21 |
| `Antisocial Extended` | 1 |

Utility class van ban: `text-left/center/right`, `text-body-12/16/20/24`, `text-title-32/40/60/90`, `font-thin/light/normal/medium/bold/extrabold/black`, `text-primary/secondary/dark/light/foreground/success/error/warning`.

### 3.5 Grid
`[data-col="N"]` -> `flex-basis: N/12 * 100%`, `max-width: N/12 * 100%` (N=1..12). Container `FlexContainer` max-width 1200p (mo rong theo breakpoint len 1920px).

## 4. ROUTE (DUONG DAN)

### 4.1 Route trong bundle JS (37 route)
`/`, `/about`, `/about/privacy`, `/about/terms`, `/admin`, `/api`, `/assets/webapp/`, `/complete-your-profile`, `/components`, `/components/button`, `/components/button/button-link`, `/components/link/default`, `/dashboard`, `/eventsource`, `/firebase-cloud-messaging-push-scope`, `/htmlfile`, `/info`, `/info/codeofconduct`, `/internal/404`, `/internal/auth/callback`, `/internal/blank`, `/internal/ip-blacklist-ban`, `/internal/ip-blacklist-unblock`, `/items`, `/jsonp`, `/jsonp_send`, `/login`, `/messages`, `/new-account`, `/new-carrier`, `/ngsw/state`, `/post-load`, `/privacy-policy`, `/support`, `/terms-of-use`, `/websocket`, `/xhr`, `/xhr_send`, `/xhr_streaming`.

### 4.2 Link tu trang chu (HTML SSR)
Nhom thue (`/hire/*`): graphic-design, website-design, mobile-development, software-development, 3d-design, illustration, web-development, writing, internet-marketing, seo, data-entry, virtual-assistant, translation, finance, manufacturing, logistics-shipping, fashion-design, logo-design, legal, photoshop, wordpress, php, html, css, javascript, android, articles, copywriting, ghostwriting, python, linux.

Nhom tim viec (`/jobs/*`): internet-marketing, web-development, graphic-design, data-entry, mobile-phone, software-development, writing, seo, legal, finance, manufacturing, 3d-animation.

Cac trang chinh: `/freelancers`, `/hire`, `/jobs`, `/contest`, `/local`, `/enterprise`, `/ai`, `/innovation`, `/info/how-it-works`, `/showcase`, `/membership`, `/preferred-freelancer-program`, `/project-management`, `/verified`, `/about/*`, `/careers`, `/dmca`, `/feesandcharges`, `/sitemap`, `/rss.xml`, `/download`, `/post-project`.

Mang xa hoi: facebook.com/fansoffreelancer, x.com/freelancer, youtube.com/freelancerchannel, instagram.com/freelancerofficial.

## 5. CONTRACT API (TU BUNDLE JS)

### 5.1 Base URLs (trong `freelancerHttpConfig`)
| Dich vu | Base URL |
|---------|----------|
| API REST | `https://www.freelancer.com/api` |
| AJAX (legacy PHP) | `https://www.freelancer.com/ajax-api` |
| Auth | `https://www.freelancer.com/auth` |
| File upload | `https://www.freelancer.com/fileservice/v4/upload` |
| Billing | `https://api.freelancerbilling.com` |
| WebSocket thong bao | `wss://notifications.freelancer.com` |
| WebSocket chuyen van | `wss://transcriptions.freelancer.com` |
| Assets CDN | `https://www.f-cdn.com/assets/main/{locale}/assets` |

### 5.2 Header & Cookie xac thuc
- Header: `freelancer-auth-v2`
- Cookie: `GETAFREE_AUTH_HASH_V2` (hash auth), `GETAFREE_USER_ID`, `XSRF-TOKEN` (CSRF), `requires_gdpr`, `referral_signup`
- reCAPTCHA v2/v3 public key da nhung (xem 1.1)

### 5.3 Endpoint REST (phiên ban `x.y` trong bundle)
| Endpoint | Phuong phap (du doan) | Ghi chu |
|----------|----------------------|---------|
| `users/0.1/self` | GET (can auth) | Thong tin user hien tai — probe tra ve **401 Unauthorized** |
| `users/0.1/users` | POST | Tim user theo danh sach ID/username |
| `users/0.1/users/check` | POST | Kiem tra user ton tai (email/password/captcha) |
| `users/0.1/users/apple` | POST | Dang ky/dang nhap Apple |
| `users/0.1/users/facebook` | POST | Dang ky/dang nhap Facebook |
| `users/0.1/users/google` | POST | Dang ky/dang nhap Google |
| `users/0.1/tokens` | POST | Quan ly token |
| `users/0.1/app_installs/` | POST | Cai dat ung dung |
| `users/0.1/self/enterprise_metadata_fields` | GET | Metadata doanh nghiep |
| `abtest/0.1/enrollments/` | POST | Tham gia kiem tra A/B |
| `domains/getDomains.php` | GET/POST | Lay danh sach mien |

### 5.4 Endpoint AJAX legacy (`.php`, qua `ajaxBaseUrl`)
| Endpoint | Ghi chu |
|----------|---------|
| `/auth/login.php` | Dang nhap |
| `/auth/googleLogin.php`, `/auth/facebookLogin.php`, `/auth/appleLogin.php` | SSO |
| `/auth/googleLinkLogin.php`, ... | Lien ket tai khoan |
| `/auth/mfa/backoff.php`, `/auth/send2FAToken.php`, `/auth/verify2FALogin.php` | 2FA |
| `/auth/prompt-two-fa.php`, `/auth/prompt-two-fa/alternatives.php` | |
| `/auth/getCrossDomainSSODomains.php` | SSO cross-domain |
| `/signup/get-quick-login-fence.php` | |
| `/users/resetUserPassword.php`, `/users/resetUserPasswordValidateRequest.php` | Quen mat khau |
| `/user/updateUserPassword.php` | Doi mat khau |
| `/ajax-api/navigation/switchaccount.php` | Chuyen tai khoan |
| `/ajax/project/contract/download-contract.php` | Tai hop dong |
| `/ajax/project/contract/download-ip-contract.php` | Tai hop dong IP |
| `/ajax/project/contract/initialize-freelancer-ip-contract.php` | |
| `/ajax/project/contract/initialize-nda-contract.php` | |
| `/ajax/project/contract/preview-contract.php` | Xem truoc hop dong |
| `/contest/nda_print.php`, `/contest/print-contest-invoice.php` | In contest |
| `/saml_sso/sso.php` | SSO doanh nghiep |
| `/users/kyc/kycKeycodePage.php` | Xac thuc dan nghia |
| `/users/l.php`, `/users/validate.php` | |

> **Luu y:** Cac endpoint REST khac (projects, jobs, contests, skills, categories...) duoc goi thong qua `freelancerHttp` nhung chuoi duong dan hoan chinh duoc xay dong dong thoi runtime (service registry + version), khong xuat hien hang co ro rang trong bundle minified. Viec goi truc tiep can kem cookie auth hop le.

### 5.5 Ket qua probe thue goi cong khai (khong auth)
| URL | Ma phan hoi | Nghia |
|-----|-------------|-------|
| `GET /api/users/0.1/self` | 401 | Can auth |
| `GET /api/projects/0.1/projects/?limit=2` | 400 | Thieu tham so bat buoc / can auth |
| `GET /api/categories/0.1/categories` | 404 | Sai duong dan (phan bam/endpoint khac) |
| `POST /ajax-api/navigation/switchaccount.php` | 401 JSON `{error: UNAUTHORIZED}` | Can auth |

## 6. TRACKING & PARTNER
- Google Analytics: UA-223765-6 (UA), G-31ZQKFK760 (GA4)
- Facebook Pixel: 530993107478103; App ID: 120131118061981
- LinkedIn Pixel: 3045346; Quora Pixel: 6cfaf7caf340413ebf9b12da0deee3a2
- TikTok Pixel: CQ154HJC77U1C0R52830 (AU/NZ), CT6G92RC77U1LMCPR03G (CA/US)
- Sentry DSN: `https://29cfb544702b48e0985e69cd3ef5e84f@sentry.io/1410063`
- Hotjar ID: 1223449
- ThreatMetrix: domain `cdn1.f-cdn.com`, orgId `lar9e74p`
- Firebase project: `freelancer-8cd88`
- Google Maps API key embedded (hien thi ban do tim kiem vi tri)

## 7. CAH SUD DUNG KET QUA DE TAI TAC (REPLICA)

1. **Giao dien:** Su dung HTML SSR (`raw/home.html`) + CSS inline (`analysis/css-inline.css`) lam ban thiet ke chinh xac. Cac component `fl-*`/`app-*` la Web Component / Angular component cua Freelancer — can viet lai bang React/Vue/Angular tu viet.
2. **Design system:** Ap dung bien CSS trong muc 3 (mau, khoang cach, breakpoint, font Roboto/Barlow) de khong pixel.
3. **Grid:** Dung `flex-basis` theo `data-col="1..12"` (chia 12 cot), container max-width 1200px+.
4. **API:** Tai tao cac endpoint muc 5 voi header `freelancer-auth-v2` + cookie `GETAFREE_AUTH_HASH_V2` / `XSRF-TOKEN`. Cac trang cong khong can auth; cac trang ca nhan can dang nhap.
5. **PWA:** Them `manifest.webmanifest` va service worker neu muon cai dat nhu ung dung.

## 8. GIOI HAN & LUU Y PHAP LY
- Chi boc tach tu **cote client** (HTML, CSS, JS da minified) — khong truy cap source code server-side cua Freelancer.
- Bundle JS da minified (ten class/rut gon), nen khong ta nguyen duoc source TypeScript goc chinh xac 100%.
- Cac API yeu cau dang nhap khong the goi duoc khong co tai khoan va cookie hop le.
- Bao chi chi dung cho muc dich **hoc tap, nghien cuu giao dien va kien truc frontend**. Khong khuyen khich sao chep noi dung thue mai hoac vuot qua co che xac thuc/bao ve cua Freelancer.

## 9. TONG QUAN FILE DA LUU
| File | Noi dung |
|------|----------|
| `raw/home.html` | HTML SSR trang chu (1,09 MB) |
| `raw/main-VF4HHFXO.js` | Bundle Angular chinh (3,5 MB) |
| `raw/polyfills-WUF6LMYT.js` | Polyfill |
| `raw/manifest.webmanifest` | PWA manifest |
| `analysis/css-inline.css` | Tat da CSS inline da tach |
| `analysis/dom-tree.json` | Cay DOM component |
| `analysis/content.json` | Heading, button, link |
| `analysis/report.json` | Tong ket colors, media queries, custom elements |
| `analysis/api-probe.json` | Ket qua probe API |
| `analysis/http-endpoints.txt` | 25 endpoint `freelancerHttp.*` |
| `analysis/php-all.txt` | 10 endpoint `.php` |
| `analysis/all-routes.txt` | 37 route trong bundle |
| `analysis/env-block.txt` | Khoi cau hinh moi truong (env config) |

---
*Tiep theo co the: crawl them trang `/login`, `/hire`, `/jobs`, `/post-project` de so sanh cau truc; hoac viet replica don gian bang HTML/Tailwind dap ung design system tren.*