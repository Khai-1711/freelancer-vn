import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Code2,
  Building2,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle2,
  AlertCircle,
  Search,
  Mail,
  ShieldCheck,
  X,
  Plus,
  RefreshCw,
} from 'lucide-react';
import { CATEGORIES } from '../data/mockData';
import { useMarketplace } from '../context/MarketplaceContext';

const CATEGORY_SKILLS = {
  'web-it': [
    'React.js',
    'Next.js',
    'TypeScript',
    'Node.js',
    'Vue.js',
    'PostgreSQL',
    'MongoDB',
    'FastAPI',
    'VNPay API',
    'Tailwind CSS',
    'GraphQL',
    'Go',
  ],
  mobile: [
    'Flutter',
    'React Native',
    'Swift / iOS',
    'Kotlin / Android',
    'Firebase',
    'REST API',
    'Mobile UI',
  ],
  design: [
    'Figma',
    'UI/UX Design',
    'Design System',
    'Prototyping',
    'Wireframing',
    'UX Research',
    'Motion Design',
    'Branding',
  ],
  'ai-data': [
    'Python',
    'Playwright',
    'Scrapy',
    'LLM / RAG',
    'PyTorch',
    'SQL / ETL',
    'Power BI',
    'Airflow',
  ],
  'cloud-devops': [
    'AWS',
    'Docker',
    'Kubernetes',
    'Terraform',
    'GitHub Actions',
    'Linux',
    'Nginx',
    'Cloudflare',
  ],
  growth: [
    'Technical SEO',
    'Core Web Vitals',
    'Google Analytics 4',
    'Content Strategy',
    'Performance Ads',
    'CRO',
  ],
};

const CATEGORY_TO_SPEC = {
  'web-it': 'Fullstack & Cloud',
  mobile: 'Mobile & DevOps',
  design: 'UI/UX Design',
  'ai-data': 'AI & Data',
  'cloud-devops': 'Mobile & DevOps',
  growth: 'Fullstack & Cloud',
};

const FREELANCER_STEPS = [
  { num: 1, label: 'Tài khoản' },
  { num: 2, label: 'Tên người dùng' },
  { num: 3, label: 'Kỹ năng' },
  { num: 4, label: 'Xác thực' },
];

const CLIENT_STEPS = [
  { num: 1, label: 'Tài khoản' },
  { num: 2, label: 'Tên & Doanh nghiệp' },
];

function getPasswordStrength(pw) {
  if (!pw) return { score: 0, label: '', color: 'bg-obsidian-750' };
  let score = 0;
  if (pw.length >= 6) score += 1;
  if (pw.length >= 10 || (/[A-Z]/.test(pw) && /[0-9]/.test(pw))) score += 1;
  if (/[^A-Za-z0-9]/.test(pw) && pw.length >= 8) score += 1;
  if (score <= 1) return { score: 1, label: 'Yếu', color: 'bg-semantic-danger' };
  if (score === 2) return { score: 2, label: 'Trung bình', color: 'bg-semantic-amber' };
  return { score: 3, label: 'Mạnh', color: 'bg-semantic-emerald' };
}

function normalizeHandle(str) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd')
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, '');
}

/**
 * Trang Đăng ký tài khoản (/signup & /register-freelancer):
 * - Người tìm việc (Freelancer): 4 bước (Tài khoản -> Chọn @username duy nhất ->
 *   Chọn lĩnh vực & kỹ năng 2 cột -> Xác thực OTP email & mức giá giờ).
 * - Doanh nghiệp (Client): 2 bước gọn nhẹ và chuyển thẳng sang Đăng dự án.
 */
export default function Signup() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { projects, signup, checkUsernameAvailable, showToast, formatMoney } = useMarketplace();

  const initialRole = searchParams.get('role') === 'client' ? 'client' : 'freelancer';
  const [role, setRole] = useState(initialRole);
  const [step, setStep] = useState(1);

  // Step 1: Basic Account
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(true);
  const [showTermsNote, setShowTermsNote] = useState(false);

  // Step 2: Unique Username & Company (for client)
  const [username, setUsername] = useState('');
  const [companyName, setCompanyName] = useState('');

  // Step 3 (Freelancer): Category & Skills Picker
  const [activeCategory, setActiveCategory] = useState('web-it');
  const [skillQuery, setSkillQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState(['React.js', 'TypeScript', 'Tailwind CSS']);
  const [customSkill, setCustomSkill] = useState('');

  // Step 4 (Freelancer): Email OTP Verification & Rate
  const [expectedOtp, setExpectedOtp] = useState('842910');
  const [otpInput, setOtpInput] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [hourlyRate, setHourlyRate] = useState(450000);
  const [location, setLocation] = useState('TP. Hồ Chí Minh');
  const [bio, setBio] = useState('');

  // Completion State
  const [createdFreelancerId, setCreatedFreelancerId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const paramRole = searchParams.get('role');
    if (paramRole === 'client' || paramRole === 'freelancer') {
      setRole(paramRole);
      setStep(1);
      setError('');
    }
  }, [searchParams]);

  const steps = role === 'freelancer' ? FREELANCER_STEPS : CLIENT_STEPS;
  const passwordStrength = getPasswordStrength(password);

  const usernameSuggestions = useMemo(() => {
    const base = normalizeHandle(`${firstName}${lastName}`) || normalizeHandle(email.split('@')[0] || 'devvn');
    const cleanBase = /^[a-z]/.test(base) ? base.slice(0, 14) : `vt_${base.slice(0, 11)}`;
    return [`${cleanBase}`, `${cleanBase}_dev`, `${cleanBase}2026`].filter((s) =>
      checkUsernameAvailable(s)
    );
  }, [firstName, lastName, email, checkUsernameAvailable]);

  const usernameValidation = useMemo(() => {
    const trimmed = username.trim().toLowerCase();
    if (!trimmed) return { valid: false, message: '' };
    if (!/^[a-z]/.test(trimmed)) {
      return { valid: false, message: 'Tên người dùng phải bắt đầu bằng chữ cái (a–z).' };
    }
    if (!/^[a-z0-9_]{4,20}$/.test(trimmed)) {
      return { valid: false, message: 'Chỉ dùng chữ thường, số hoặc dấu gạch dưới (4–20 ký tự).' };
    }
    if (!checkUsernameAvailable(trimmed)) {
      return { valid: false, message: `Tên @${trimmed} đã có người sử dụng. Hãy chọn tên khác.` };
    }
    return { valid: true, message: `Tên người dùng @${trimmed} khả dụng.` };
  }, [username, checkUsernameAvailable]);

  const matchedProjectCount = useMemo(() => {
    if (selectedSkills.length === 0) return 0;
    const lower = selectedSkills.map((s) => s.toLowerCase());
    return projects.filter((p) =>
      p.skills.some((sk) => lower.includes(sk.toLowerCase()))
    ).length;
  }, [projects, selectedSkills]);

  const visibleCategorySkills = useMemo(() => {
    const q = skillQuery.trim().toLowerCase();
    if (q) {
      const all = Array.from(new Set(Object.values(CATEGORY_SKILLS).flat()));
      return all.filter((s) => s.toLowerCase().includes(q));
    }
    return CATEGORY_SKILLS[activeCategory] || [];
  }, [activeCategory, skillQuery]);

  const toggleSkill = (skill) => {
    setError('');
    setSelectedSkills((prev) => {
      if (prev.includes(skill)) return prev.filter((s) => s !== skill);
      if (prev.length >= 20) {
        setError('Bạn chỉ có thể chọn tối đa 20 kỹ năng chính.');
        return prev;
      }
      return [...prev, skill];
    });
  };

  const handleAddCustomSkill = (e) => {
    e.preventDefault();
    const cleaned = customSkill.trim();
    if (!cleaned) return;
    if (selectedSkills.length >= 20) {
      setError('Đã đạt giới hạn 20 kỹ năng.');
      return;
    }
    if (!selectedSkills.some((s) => s.toLowerCase() === cleaned.toLowerCase())) {
      setSelectedSkills((prev) => [...prev, cleaned]);
    }
    setCustomSkill('');
    setError('');
  };

  const handleQuickDemoAccount = (providerName) => {
    setFirstName('Nguyễn');
    setLastName('Minh Khôi');
    setEmail('minhkhoi.dev@viectech.vn');
    setPassword('ViecTech@2026');
    setAgreedTerms(true);
    if (!username) setUsername('minhkhoi_dev');
    setError('');
    showToast(`Đã điền thông tin từ ${providerName} (chế độ trình diễn). Tiếp tục chọn tên người dùng.`, 'info');
    setStep(2);
  };

  const handleStep1Next = (e) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) {
      setError('Vui lòng nhập đầy đủ họ và tên.');
      return;
    }
    if (!email.trim().includes('@') || !email.trim().includes('.')) {
      setError('Vui lòng nhập địa chỉ email hợp lệ.');
      return;
    }
    if (password.length < 6) {
      setError('Mật khẩu cần tối thiểu 6 ký tự.');
      return;
    }
    if (!agreedTerms) {
      setError('Bạn cần đồng ý với Điều khoản sử dụng và Chính sách bảo mật để tiếp tục.');
      return;
    }
    if (!username) {
      const auto = normalizeHandle(`${firstName}${lastName}`) || normalizeHandle(email.split('@')[0]);
      setUsername(/^[a-z]/.test(auto) ? auto.slice(0, 16) : `vt_${auto.slice(0, 12)}`);
    }
    setError('');
    setStep(2);
  };

  const handleStep2Next = (e) => {
    e.preventDefault();
    if (!usernameValidation.valid) {
      setError(usernameValidation.message || 'Vui lòng chọn tên người dùng hợp lệ.');
      return;
    }
    if (role === 'client') {
      signup({
        firstName,
        lastName,
        email: email.trim(),
        role: 'client',
        username: username.trim().toLowerCase(),
      });
      navigate('/post-project');
      return;
    }
    setError('');
    setStep(3);
  };

  const handleStep3Next = () => {
    if (selectedSkills.length < 2) {
      setError('Vui lòng chọn ít nhất 2 kỹ năng để hệ thống gợi ý đúng dự án cho bạn.');
      return;
    }
    setError('');
    setStep(4);
  };

  const handleVerifyOtp = () => {
    if (otpInput.trim() !== expectedOtp) {
      setError(`Mã xác thực không khớp. Nhập mã mẫu ${expectedOtp} để hoàn tất xác thực.`);
      return;
    }
    setEmailVerified(true);
    setError('');
    showToast('Xác thực địa chỉ email thành công!', 'success');
  };

  const handleResendOtp = () => {
    const nextCode = String(Math.floor(100000 + Math.random() * 900000));
    setExpectedOtp(nextCode);
    setOtpInput('');
    setEmailVerified(false);
    setError('');
    showToast(`Đã gửi lại mã xác thực mới: ${nextCode}`, 'info');
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    if (!emailVerified) {
      if (otpInput.trim() === expectedOtp) {
        setEmailVerified(true);
      } else {
        setError(`Vui lòng xác thực email bằng mã 6 số (${expectedOtp}) trước khi hoàn tất.`);
        return;
      }
    }
    if (hourlyRate < 100000) {
      setError('Mức giá theo giờ tối thiểu là 100.000 VNĐ.');
      return;
    }
    setError('');
    const newId = signup({
      firstName,
      lastName,
      email: email.trim(),
      role: 'freelancer',
      username: username.trim().toLowerCase(),
      skills: selectedSkills,
      specialization: CATEGORY_TO_SPEC[activeCategory] || 'Fullstack & Cloud',
      hourlyRate,
      location,
      bio,
    });
    setCreatedFreelancerId(newId);
    setStep(5);
  };

  return (
    <div className="min-h-[calc(100vh-14rem)] py-10 sm:py-14 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Progress Header (hidden on final welcome state) */}
        {step <= steps.length && (
          <div className="space-y-5">
            <div className="text-center space-y-2">
              <p className="text-xs font-semibold text-cobalt-400">
                {role === 'freelancer' ? 'Đăng ký dành cho Người tìm việc' : 'Đăng ký dành cho Doanh nghiệp'}
              </p>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-50 text-balance">
                {role === 'freelancer'
                  ? 'Tạo hồ sơ tìm việc & Bắt đầu nhận dự án'
                  : 'Tạo tài khoản doanh nghiệp trên ViecTech'}
              </h1>
            </div>

            <div className="max-w-xl mx-auto">
              <div className={`grid gap-2 ${steps.length === 4 ? 'grid-cols-4' : 'grid-cols-2'}`}>
                {steps.map((s) => {
                  const done = step > s.num;
                  const active = step === s.num;
                  return (
                    <div key={s.num} className="flex flex-col items-center gap-1.5 text-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold tabular-nums-mono transition-colors ${
                          done
                            ? 'bg-semantic-emerald text-obsidian-950'
                            : active
                            ? 'bg-cobalt-500 text-white'
                            : 'bg-obsidian-850 border border-white/10 text-slate-400'
                        }`}
                      >
                        {done ? <Check className="w-4 h-4" /> : s.num}
                      </div>
                      <span
                        className={`text-xs ${
                          active ? 'text-slate-100 font-semibold' : 'text-slate-500'
                        }`}
                      >
                        {s.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Main Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-obsidian-850 border border-white/[0.08]">
          {/* STEP 1: Role + Account Details */}
          {step === 1 && (
            <div className="space-y-6">
              {/* Role Switcher */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setRole('freelancer');
                    setError('');
                  }}
                  className={`p-4 rounded-xl border text-left transition-colors space-y-1.5 ${
                    role === 'freelancer'
                      ? 'bg-cobalt-500/15 border-cobalt-500 text-slate-50'
                      : 'bg-obsidian-950 border-white/[0.08] text-slate-300 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Code2 className={`w-5 h-5 ${role === 'freelancer' ? 'text-cobalt-400' : 'text-slate-400'}`} />
                    {role === 'freelancer' && <CheckCircle2 className="w-4 h-4 text-cobalt-400" />}
                  </div>
                  <p className="text-sm font-bold">Tôi muốn tìm việc (Freelancer)</p>
                  <p className="text-xs text-slate-400">
                    Chọn kỹ năng, đặt chào giá dự án và nhận thu nhập qua Milestone
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setRole('client');
                    setError('');
                  }}
                  className={`p-4 rounded-xl border text-left transition-colors space-y-1.5 ${
                    role === 'client'
                      ? 'bg-cobalt-500/15 border-cobalt-500 text-slate-50'
                      : 'bg-obsidian-950 border-white/[0.08] text-slate-300 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Building2 className={`w-5 h-5 ${role === 'client' ? 'text-cobalt-400' : 'text-slate-400'}`} />
                    {role === 'client' && <CheckCircle2 className="w-4 h-4 text-cobalt-400" />}
                  </div>
                  <p className="text-sm font-bold">Tôi muốn thuê nhân sự</p>
                  <p className="text-xs text-slate-400">
                    Đăng yêu cầu kỹ thuật và kết nối chuyên gia đã xác minh
                  </p>
                </button>
              </div>

              {/* Quick Start Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleQuickDemoAccount('Google')}
                  className="min-h-[44px] px-4 py-2.5 rounded-lg bg-obsidian-950 hover:bg-obsidian-900 border border-white/10 text-sm font-medium text-slate-200 transition-colors flex items-center justify-center gap-2"
                >
                  <span className="font-bold text-cobalt-400">G</span>
                  <span>Tiếp tục nhanh với Google</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemoAccount('GitHub')}
                  className="min-h-[44px] px-4 py-2.5 rounded-lg bg-obsidian-950 hover:bg-obsidian-900 border border-white/10 text-sm font-medium text-slate-200 transition-colors flex items-center justify-center gap-2"
                >
                  <Code2 className="w-4 h-4 text-slate-300" />
                  <span>Tiếp tục nhanh với GitHub</span>
                </button>
              </div>

              <div className="relative flex items-center">
                <div className="flex-1 border-t border-white/[0.08]" />
                <span className="px-3 text-xs text-slate-500">hoặc đăng ký bằng Email</span>
                <div className="flex-1 border-t border-white/[0.08]" />
              </div>

              <form onSubmit={handleStep1Next} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="su-first" className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Họ
                    </label>
                    <input
                      id="su-first"
                      type="text"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                        if (error) setError('');
                      }}
                      placeholder="Nguyễn"
                      className="w-full rounded-lg bg-obsidian-950 border border-white/10 focus:border-cobalt-500 px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="su-last" className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Tên
                    </label>
                    <input
                      id="su-last"
                      type="text"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                        if (error) setError('');
                      }}
                      placeholder="Minh Khôi"
                      className="w-full rounded-lg bg-obsidian-950 border border-white/10 focus:border-cobalt-500 px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="su-email" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Địa chỉ email
                  </label>
                  <input
                    id="su-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="minhkhoi.dev@gmail.com"
                    className="w-full rounded-lg bg-obsidian-950 border border-white/10 focus:border-cobalt-500 px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="su-pass" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Mật khẩu
                  </label>
                  <div className="relative">
                    <input
                      id="su-pass"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (error) setError('');
                      }}
                      placeholder="Tối thiểu 6 ký tự (nên có chữ hoa và số)"
                      className="w-full rounded-lg bg-obsidian-950 border border-white/10 focus:border-cobalt-500 pl-3.5 pr-11 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-200"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {password && (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1 grid grid-cols-3 gap-1.5">
                        {[1, 2, 3].map((lvl) => (
                          <div
                            key={lvl}
                            className={`h-1 rounded-full ${
                              passwordStrength.score >= lvl ? passwordStrength.color : 'bg-obsidian-750'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-slate-400">Độ mạnh: {passwordStrength.label}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2 pt-1">
                  <label className="flex items-start gap-2.5 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreedTerms}
                      onChange={(e) => {
                        setAgreedTerms(e.target.checked);
                        if (error) setError('');
                      }}
                      className="mt-0.5 w-4 h-4 rounded accent-cobalt-500"
                    />
                    <span className="leading-relaxed">
                      Tôi đồng ý với{' '}
                      <button
                        type="button"
                        onClick={() => setShowTermsNote((v) => !v)}
                        className="text-cobalt-400 hover:underline font-medium"
                      >
                        Điều khoản sử dụng &amp; Chính sách bảo mật
                      </button>{' '}
                      của ViecTech.
                    </span>
                  </label>

                  {showTermsNote && (
                    <div className="p-3.5 rounded-lg bg-obsidian-950 border border-white/[0.06] text-xs text-slate-400 leading-relaxed">
                      ViecTech bảo vệ khoản thanh toán theo từng Milestone (phí dịch vụ 10% chỉ tính khi dự án được nghiệm thu). Thông tin cá nhân và email của bạn chỉ dùng cho xác thực tài khoản và trao đổi công việc.
                    </div>
                  )}
                </div>

                {error && <p className="text-xs text-semantic-danger">{error}</p>}

                <button
                  type="submit"
                  className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 rounded-lg bg-cobalt-500 hover:bg-cobalt-600 text-white text-sm font-semibold transition-colors"
                >
                  Tham gia ViecTech
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="pt-4 border-t border-white/[0.06] text-center text-sm text-slate-400">
                Đã có tài khoản?{' '}
                <Link to="/login" className="text-cobalt-400 font-semibold hover:text-cobalt-300">
                  Đăng nhập ngay
                </Link>
              </div>
            </div>
          )}

          {/* STEP 2: Choose Unique Username */}
          {step === 2 && (
            <form onSubmit={handleStep2Next} className="space-y-6">
              <div className="space-y-1.5">
                <h2 className="text-lg font-bold text-slate-50">Chọn tên người dùng (Username)</h2>
                <p className="text-sm text-slate-400">
                  Tên người dùng là định danh công khai gắn với đường dẫn hồ sơ của bạn trên ViecTech và không nên thay đổi về sau.
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="su-username" className="block text-xs font-semibold text-slate-300">
                  Tên người dùng duy nhất
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-500 tabular-nums-mono">
                    @
                  </span>
                  <input
                    id="su-username"
                    type="text"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value.replace(/\s+/g, ''));
                      if (error) setError('');
                    }}
                    placeholder="minhkhoi_dev"
                    className="w-full rounded-lg bg-obsidian-950 border border-white/10 focus:border-cobalt-500 pl-8 pr-4 py-3 text-sm font-semibold text-slate-100 tabular-nums-mono outline-none"
                  />
                </div>

                {username && (
                  <p
                    className={`text-xs flex items-center gap-1.5 ${
                      usernameValidation.valid ? 'text-semantic-emerald' : 'text-semantic-danger'
                    }`}
                  >
                    {usernameValidation.valid ? (
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    ) : (
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    )}
                    <span>{usernameValidation.message}</span>
                  </p>
                )}

                <p className="text-xs text-slate-500 tabular-nums-mono pt-1">
                  Đường dẫn hồ sơ: viectech.vn/freelancers/{username.trim().toLowerCase() || 'ten_cua_ban'}
                </p>
              </div>

              {usernameSuggestions.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs text-slate-400">Gợi ý khả dụng:</p>
                  <div className="flex flex-wrap gap-2">
                    {usernameSuggestions.map((sug) => (
                      <button
                        key={sug}
                        type="button"
                        onClick={() => {
                          setUsername(sug);
                          setError('');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-obsidian-950 border border-white/[0.08] hover:border-cobalt-500/50 text-xs font-medium text-slate-200 hover:text-cobalt-400 tabular-nums-mono transition-colors"
                      >
                        @{sug}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {role === 'client' && (
                <div>
                  <label htmlFor="su-company" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Tên công ty hoặc tổ chức (không bắt buộc)
                  </label>
                  <input
                    id="su-company"
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Ví dụ: TechCraft Vietnam JSC"
                    className="w-full rounded-lg bg-obsidian-950 border border-white/10 focus:border-cobalt-500 px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none"
                  />
                </div>
              )}

              {error && <p className="text-xs text-semantic-danger">{error}</p>}

              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setError('');
                    setStep(1);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-white/10 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.04] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Quay lại
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-cobalt-500 hover:bg-cobalt-600 text-white text-sm font-semibold transition-colors whitespace-nowrap"
                >
                  {role === 'freelancer' ? 'Tiếp tục chọn kỹ năng' : 'Hoàn tất & Đăng dự án'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3 (Freelancer): Category -> Skills 2-Column Picker */}
          {step === 3 && role === 'freelancer' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <div className="space-y-1">
                  <h2 className="text-lg font-bold text-slate-50">
                    Chọn kỹ năng tìm việc của bạn
                  </h2>
                  <p className="text-xs text-slate-400">
                    Hệ thống sẽ gợi ý ngay các dự án phù hợp nhất với bộ kỹ năng bạn chọn.
                  </p>
                </div>
                <div className="text-xs text-slate-300 tabular-nums-mono shrink-0">
                  Đã chọn <strong className="text-cobalt-400">{selectedSkills.length}/20</strong> · Khớp{' '}
                  <strong className="text-semantic-emerald">{matchedProjectCount}</strong> dự án đang mở
                </div>
              </div>

              {/* Search skills */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={skillQuery}
                  onChange={(e) => setSkillQuery(e.target.value)}
                  placeholder="Tìm kiếm kỹ năng (vd: React, Figma, Python, Flutter...)"
                  className="w-full rounded-lg bg-obsidian-950 border border-white/10 focus:border-cobalt-500 pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none"
                />
              </div>

              {/* 2-column Category & Skills selector */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-5 rounded-xl bg-obsidian-950 border border-white/[0.08] p-2 space-y-1">
                  {CATEGORIES.map((cat) => {
                    const active = activeCategory === cat.id && !skillQuery;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          setActiveCategory(cat.id);
                          setSkillQuery('');
                        }}
                        className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                          active
                            ? 'bg-cobalt-500/15 text-cobalt-400 font-semibold'
                            : 'text-slate-300 hover:bg-white/[0.04] hover:text-white'
                        }`}
                      >
                        {cat.title}
                      </button>
                    );
                  })}
                </div>

                <div className="md:col-span-7 rounded-xl bg-obsidian-950 border border-white/[0.08] p-4 space-y-4">
                  <p className="text-xs font-semibold text-slate-400">
                    {skillQuery
                      ? `Kết quả tìm kiếm cho "${skillQuery}"`
                      : CATEGORIES.find((c) => c.id === activeCategory)?.title}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {visibleCategorySkills.length === 0 ? (
                      <p className="text-xs text-slate-500">Không tìm thấy kỹ năng khớp. Bạn có thể tự thêm bên dưới.</p>
                    ) : (
                      visibleCategorySkills.map((skill) => {
                        const isPicked = selectedSkills.includes(skill);
                        return (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => toggleSkill(skill)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                              isPicked
                                ? 'bg-cobalt-500 text-white'
                                : 'bg-obsidian-850 border border-white/[0.08] text-slate-300 hover:border-white/20 hover:text-white'
                            }`}
                          >
                            {skill}
                          </button>
                        );
                      })
                    )}
                  </div>

                  <form onSubmit={handleAddCustomSkill} className="flex gap-2 pt-2 border-t border-white/[0.06]">
                    <input
                      type="text"
                      value={customSkill}
                      onChange={(e) => setCustomSkill(e.target.value)}
                      placeholder="Thêm kỹ năng khác..."
                      className="flex-1 rounded-lg bg-obsidian-850 border border-white/10 focus:border-cobalt-500 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 outline-none"
                    />
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-obsidian-800 hover:bg-obsidian-750 border border-white/10 text-xs font-semibold text-slate-200"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Thêm
                    </button>
                  </form>
                </div>
              </div>

              {/* Selected Skills Summary */}
              {selectedSkills.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-slate-400">Kỹ năng đã chọn:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedSkills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-cobalt-500/15 border border-cobalt-500/30 text-xs font-semibold text-cobalt-400"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => toggleSkill(skill)}
                          aria-label={`Bỏ chọn ${skill}`}
                          className="hover:text-white"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {error && <p className="text-xs text-semantic-danger">{error}</p>}

              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setError('');
                    setStep(2);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-white/10 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.04] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Quay lại
                </button>
                <button
                  type="button"
                  onClick={handleStep3Next}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-cobalt-500 hover:bg-cobalt-600 text-white text-sm font-semibold transition-colors whitespace-nowrap"
                >
                  Tiếp tục xác thực
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4 (Freelancer): Email OTP Verification & Rate */}
          {step === 4 && role === 'freelancer' && (
            <form onSubmit={handleFinalSubmit} className="space-y-6">
              <div className="space-y-1.5">
                <h2 className="text-lg font-bold text-slate-50">
                  Xác thực Email &amp; Thiết lập nhận việc
                </h2>
                <p className="text-sm text-slate-400">
                  Xác thực địa chỉ <strong className="text-slate-200">{email}</strong> để mở khóa quyền đặt chào giá trên toàn sàn.
                </p>
              </div>

              {/* Email Verification Box */}
              <div className="p-5 rounded-xl bg-obsidian-950 border border-white/[0.08] space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-cobalt-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-slate-100">
                        Mã xác thực 6 chữ số đã gửi tới email của bạn
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Mã trình diễn cho phiên này:{' '}
                        <strong className="text-cobalt-400 tabular-nums-mono">{expectedOtp}</strong>
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    className="inline-flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-slate-200 whitespace-nowrap"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Gửi lại
                  </button>
                </div>

                {emailVerified ? (
                  <div className="flex items-center gap-2 text-xs font-semibold text-semantic-emerald">
                    <ShieldCheck className="w-4 h-4" />
                    Địa chỉ email {email} đã được xác thực thành công.
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <input
                      type="text"
                      maxLength={6}
                      value={otpInput}
                      onChange={(e) => {
                        setOtpInput(e.target.value.replace(/\D/g, ''));
                        if (error) setError('');
                      }}
                      placeholder={`Nhập mã ${expectedOtp}`}
                      className="flex-1 rounded-lg bg-obsidian-850 border border-white/10 focus:border-cobalt-500 px-4 py-2.5 text-sm font-bold tracking-widest text-slate-100 tabular-nums-mono outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleVerifyOtp}
                      className="px-4 py-2.5 rounded-lg bg-obsidian-800 hover:bg-obsidian-750 border border-white/10 text-xs font-semibold text-slate-100 transition-colors whitespace-nowrap"
                    >
                      Xác nhận mã
                    </button>
                  </div>
                )}
              </div>

              {/* Rate, Location, Short Bio */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="su-rate" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Mức giá mong muốn (VNĐ / giờ)
                  </label>
                  <input
                    id="su-rate"
                    type="number"
                    min={100000}
                    step={50000}
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(Number(e.target.value) || 0)}
                    className="w-full rounded-lg bg-obsidian-950 border border-white/10 focus:border-cobalt-500 px-3.5 py-2.5 text-sm font-semibold text-slate-100 tabular-nums-mono outline-none"
                  />
                  <p className="text-xs text-slate-500 mt-1 tabular-nums-mono">
                    Hiển thị: {formatMoney(hourlyRate)} / giờ
                  </p>
                </div>

                <div>
                  <label htmlFor="su-loc" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Khu vực làm việc
                  </label>
                  <select
                    id="su-loc"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full rounded-lg bg-obsidian-950 border border-white/10 focus:border-cobalt-500 px-3.5 py-2.5 text-sm text-slate-100 outline-none"
                  >
                    <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                    <option value="Hà Nội, Việt Nam">Hà Nội, Việt Nam</option>
                    <option value="Đà Nẵng, Việt Nam">Đà Nẵng, Việt Nam</option>
                    <option value="Làm việc từ xa (Toàn quốc)">Làm việc từ xa (Toàn quốc)</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="su-bio" className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Giới thiệu ngắn về thế mạnh của bạn (không bắt buộc)
                </label>
                <textarea
                  id="su-bio"
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Ví dụ: 4 năm kinh nghiệm phát triển web React/Next.js và API Node.js, ưu tiên bàn giao đúng hạn..."
                  className="w-full rounded-lg bg-obsidian-950 border border-white/10 focus:border-cobalt-500 px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none"
                />
              </div>

              {error && <p className="text-xs text-semantic-danger">{error}</p>}

              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setError('');
                    setStep(3);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-white/10 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.04] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Quay lại
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-cobalt-500 hover:bg-cobalt-600 text-white text-sm font-semibold transition-colors whitespace-nowrap"
                >
                  <Check className="w-4 h-4" />
                  Hoàn tất đăng ký &amp; Bắt đầu tìm việc
                </button>
              </div>
            </form>
          )}

          {/* STEP 5: Registration Success Welcome Gate */}
          {step === 5 && (
            <div className="py-6 text-center space-y-6">
              <div className="w-12 h-12 rounded-full bg-semantic-emerald/15 border border-semantic-emerald/30 text-semantic-emerald flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <h2 className="text-2xl font-extrabold text-slate-50">
                  Hồ sơ tìm việc của bạn đã sẵn sàng
                </h2>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Tài khoản <strong className="text-slate-200 tabular-nums-mono">@{username}</strong> đã được xác thực email và hiển thị trong danh bạ chuyên gia với{' '}
                  <strong className="text-slate-200">{selectedSkills.length} kỹ năng</strong>.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-obsidian-950 border border-white/[0.08] max-w-md mx-auto text-left space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Dự án đang mở khớp kỹ năng</span>
                  <span className="text-semantic-emerald font-bold tabular-nums-mono">
                    {matchedProjectCount} dự án
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Mức giá tham khảo</span>
                  <span className="text-slate-100 font-semibold tabular-nums-mono">
                    {formatMoney(hourlyRate)} / giờ
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Link
                  to="/jobs"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-cobalt-500 hover:bg-cobalt-600 text-white text-sm font-semibold transition-colors whitespace-nowrap"
                >
                  Xem dự án &amp; Đặt chào giá ngay
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to={`/freelancers/${createdFreelancerId || 'phu-nguyen'}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-lg bg-obsidian-900 hover:bg-obsidian-800 border border-white/10 text-slate-200 text-sm font-semibold transition-colors whitespace-nowrap"
                >
                  Xem hồ sơ công khai của tôi
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
