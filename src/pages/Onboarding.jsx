import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Plus, X, CheckCircle2 } from 'lucide-react';
import { POPULAR_SKILLS } from '../data/mockData';
import { useMarketplace } from '../context/MarketplaceContext';

const ONBOARDING_STEPS = [
  { num: 1, label: 'Chuyên môn' },
  { num: 2, label: 'Kỹ năng' },
  { num: 3, label: 'Mức giá' },
  { num: 4, label: 'Giới thiệu' },
  { num: 5, label: 'Hoàn tất' },
];

const SPECIALIZATION_OPTIONS = [
  'Fullstack & Cloud',
  'UI/UX Design',
  'AI & Data',
  'Mobile & DevOps',
];

/**
 * Quy trình thiết lập hồ sơ chuyên gia 5 bước (/onboarding):
 * Lưu tiến trình từng bước, ước tính thu nhập thực nhận hàng tháng
 * và đồng bộ toàn bộ thông tin sang trang Hồ sơ công khai khi hoàn tất.
 */
export default function Onboarding() {
  const navigate = useNavigate();
  const {
    onboarding,
    updateOnboarding,
    completeOnboarding,
    currentUser,
    formatMoney,
  } = useMarketplace();

  const [step, setStep] = useState(onboarding.currentStep || 1);
  const [customSkill, setCustomSkill] = useState('');
  const [error, setError] = useState('');

  const progressPercent = Math.round((step / ONBOARDING_STEPS.length) * 100);
  const estimatedMonthlyHours = onboarding.weeklyHours.includes('40')
    ? 140
    : onboarding.weeklyHours.includes('20')
    ? 80
    : 40;
  const estimatedMonthlyNet = Math.round(onboarding.hourlyRate * estimatedMonthlyHours * 0.9);

  const toggleSkill = (skill) => {
    const exists = onboarding.skills.includes(skill);
    const next = exists
      ? onboarding.skills.filter((s) => s !== skill)
      : [...onboarding.skills, skill];
    updateOnboarding({ skills: next });
    setError('');
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    const cleaned = customSkill.trim();
    if (!cleaned) return;
    if (!onboarding.skills.some((s) => s.toLowerCase() === cleaned.toLowerCase())) {
      updateOnboarding({ skills: [...onboarding.skills, cleaned] });
    }
    setCustomSkill('');
    setError('');
  };

  const validateCurrentStep = () => {
    if (step === 1 && onboarding.roleTitle.trim().length < 5) {
      setError('Vui lòng nhập chức danh chuyên môn rõ ràng (tối thiểu 5 ký tự).');
      return false;
    }
    if (step === 2 && onboarding.skills.length < 3) {
      setError('Vui lòng chọn tối thiểu 3 kỹ năng chính để hệ thống gợi ý đúng dự án.');
      return false;
    }
    if (step === 3 && onboarding.hourlyRate < 100000) {
      setError('Mức giá theo giờ tối thiểu là 100.000 VNĐ.');
      return false;
    }
    if (step === 4 && onboarding.bio.trim().length < 25) {
      setError('Phần giới thiệu bản thân cần tối thiểu 25 ký tự.');
      return false;
    }
    setError('');
    return true;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) return;
    const nextStep = Math.min(5, step + 1);
    setStep(nextStep);
    updateOnboarding({ currentStep: nextStep });
  };

  const handlePrev = () => {
    setError('');
    const prevStep = Math.max(1, step - 1);
    setStep(prevStep);
    updateOnboarding({ currentStep: prevStep });
  };

  const handleFinish = () => {
    completeOnboarding();
    const targetId = currentUser?.freelancerId || 'phu-nguyen';
    navigate(`/freelancers/${targetId}`);
  };

  return (
    <div>
      {/* Header & Progress Bar */}
      <div className="bg-obsidian-900/60 border-b border-white/[0.08] py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="text-center space-y-2">
            <p className="text-xs font-semibold text-cobalt-400">Thiết lập hồ sơ chuyên gia</p>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-50">
              Hoàn thiện hồ sơ trong 5 bước chuẩn
            </h1>
            <p className="text-sm text-slate-400">
              Thông tin bạn cập nhật ở đây sẽ đồng bộ ngay lập tức sang trang Hồ sơ công khai của bạn.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-200 tabular-nums-mono">
                Bước {step} / {ONBOARDING_STEPS.length} ({progressPercent}%)
              </span>
              <span className="text-slate-400">
                {ONBOARDING_STEPS[step - 1].label}
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-obsidian-800 overflow-hidden">
              <div
                className="h-full bg-cobalt-500 rounded-full transition-all duration-200"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="grid grid-cols-5 gap-2 pt-2">
              {ONBOARDING_STEPS.map((s) => (
                <button
                  key={s.num}
                  type="button"
                  onClick={() => {
                    if (s.num < step || validateCurrentStep()) {
                      setStep(s.num);
                      updateOnboarding({ currentStep: s.num });
                    }
                  }}
                  className={`py-2 px-1 rounded-lg text-xs font-medium transition-colors text-center ${
                    step === s.num
                      ? 'bg-cobalt-500/15 text-cobalt-400 font-semibold'
                      : step > s.num
                      ? 'text-semantic-emerald hover:bg-white/[0.04]'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {s.num}. {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Step Container */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <div className="p-6 sm:p-8 rounded-2xl bg-obsidian-850 border border-white/[0.08] space-y-6">
          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-lg font-bold text-slate-50">01. Vai trò &amp; Chuyên môn chính</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Định vị rõ vị trí nghề nghiệp để doanh nghiệp dễ tìm thấy bạn trong danh bạ.
                </p>
              </div>

              <div>
                <label htmlFor="ob-role" className="block text-sm font-semibold text-slate-200 mb-1.5">
                  Chức danh chuyên môn
                </label>
                <input
                  id="ob-role"
                  type="text"
                  value={onboarding.roleTitle}
                  onChange={(e) => {
                    updateOnboarding({ roleTitle: e.target.value });
                    if (error) setError('');
                  }}
                  placeholder="Ví dụ: Senior Frontend Engineer (React / TypeScript)"
                  className="w-full rounded-lg bg-obsidian-950 border border-white/10 focus:border-cobalt-500 px-4 py-3 text-sm text-slate-100 outline-none"
                />
              </div>

              <div className="space-y-2">
                <p className="text-sm font-semibold text-slate-200">Nhóm chuyên môn chính</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SPECIALIZATION_OPTIONS.map((spec) => (
                    <button
                      key={spec}
                      type="button"
                      onClick={() => updateOnboarding({ specialization: spec })}
                      className={`p-3.5 rounded-xl border text-left text-sm font-semibold transition-colors ${
                        onboarding.specialization === spec
                          ? 'bg-cobalt-500/15 border-cobalt-500 text-cobalt-400'
                          : 'bg-obsidian-950 border-white/[0.08] text-slate-300 hover:border-white/20'
                      }`}
                    >
                      {spec}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-lg font-bold text-slate-50">02. Chọn kỹ năng cốt lõi</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Chọn ít nhất 3 kỹ năng mạnh nhất bạn trực tiếp sử dụng trong dự án thực tế.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {onboarding.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cobalt-500/15 border border-cobalt-500/30 text-xs font-semibold text-cobalt-400"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      aria-label={`Bỏ kỹ năng ${skill}`}
                      className="hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>

              <form onSubmit={handleAddSkill} className="flex gap-2.5">
                <input
                  type="text"
                  value={customSkill}
                  onChange={(e) => setCustomSkill(e.target.value)}
                  placeholder="Thêm kỹ năng khác (vd: Rust, Svelte, GraphQL...)"
                  className="flex-1 rounded-lg bg-obsidian-950 border border-white/10 focus:border-cobalt-500 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-obsidian-800 hover:bg-obsidian-750 border border-white/10 text-sm font-semibold text-slate-100"
                >
                  <Plus className="w-4 h-4" />
                  Thêm
                </button>
              </form>

              <div className="flex flex-wrap gap-2 pt-2">
                {POPULAR_SKILLS.map((skill) => {
                  const active = onboarding.skills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        active
                          ? 'bg-cobalt-500 text-white'
                          : 'bg-obsidian-950 border border-white/[0.08] text-slate-300 hover:border-white/20'
                      }`}
                    >
                      {skill}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-lg font-bold text-slate-50">03. Mức giá theo giờ &amp; Thời gian làm việc</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Doanh nghiệp sẽ tham khảo mức giá này khi gửi lời mời hợp tác trực tiếp cho bạn.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="ob-rate" className="block text-sm font-semibold text-slate-200 mb-1.5">
                    Mức giá mong muốn (VNĐ / giờ)
                  </label>
                  <input
                    id="ob-rate"
                    type="number"
                    min={100000}
                    step={50000}
                    value={onboarding.hourlyRate}
                    onChange={(e) => {
                      updateOnboarding({ hourlyRate: Number(e.target.value) || 0 });
                      if (error) setError('');
                    }}
                    className="w-full rounded-lg bg-obsidian-950 border border-white/10 focus:border-cobalt-500 px-4 py-3 text-base font-bold text-slate-100 tabular-nums-mono outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="ob-hours" className="block text-sm font-semibold text-slate-200 mb-1.5">
                    Quỹ thời gian sẵn sàng mỗi tuần
                  </label>
                  <select
                    id="ob-hours"
                    value={onboarding.weeklyHours}
                    onChange={(e) => updateOnboarding({ weeklyHours: e.target.value })}
                    className="w-full rounded-lg bg-obsidian-950 border border-white/10 focus:border-cobalt-500 px-4 py-3 text-sm text-slate-100 outline-none"
                  >
                    <option value="10 - 15 giờ / tuần">Bán thời gian (10 – 15 giờ / tuần)</option>
                    <option value="20 - 25 giờ / tuần">Linh hoạt (20 – 25 giờ / tuần)</option>
                    <option value="30 - 40 giờ / tuần">Toàn thời gian (30 – 40 giờ / tuần)</option>
                  </select>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-obsidian-950 border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <p className="text-xs text-slate-400">Ước tính thu nhập thực nhận hàng tháng (sau phí 10%)</p>
                  <p className="text-xs text-slate-500 mt-0.5 tabular-nums-mono">
                    Tính theo ~{estimatedMonthlyHours} giờ/tháng
                  </p>
                </div>
                <p className="text-xl font-bold text-semantic-emerald tabular-nums-mono">
                  {formatMoney(estimatedMonthlyNet)}
                </p>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-lg font-bold text-slate-50">04. Giới thiệu bản thân &amp; Địa điểm</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Tóm tắt ngắn gọn kinh nghiệm nổi bật và phong cách làm việc của bạn.
                </p>
              </div>

              <div>
                <label htmlFor="ob-location" className="block text-sm font-semibold text-slate-200 mb-1.5">
                  Thành phố hiện tại
                </label>
                <select
                  id="ob-location"
                  value={onboarding.location}
                  onChange={(e) => updateOnboarding({ location: e.target.value })}
                  className="w-full rounded-lg bg-obsidian-950 border border-white/10 focus:border-cobalt-500 px-4 py-3 text-sm text-slate-100 outline-none"
                >
                  <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                  <option value="Hà Nội, Việt Nam">Hà Nội, Việt Nam</option>
                  <option value="Đà Nẵng, Việt Nam">Đà Nẵng, Việt Nam</option>
                  <option value="Làm việc từ xa (Việt Nam)">Làm việc từ xa (Việt Nam)</option>
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="ob-bio" className="text-sm font-semibold text-slate-200">
                    Tóm tắt kinh nghiệm
                  </label>
                  <span className="text-xs text-slate-500 tabular-nums-mono">
                    {onboarding.bio.trim().length} ký tự
                  </span>
                </div>
                <textarea
                  id="ob-bio"
                  rows={5}
                  value={onboarding.bio}
                  onChange={(e) => {
                    updateOnboarding({ bio: e.target.value });
                    if (error) setError('');
                  }}
                  className="w-full rounded-lg bg-obsidian-950 border border-white/10 focus:border-cobalt-500 px-4 py-3 text-sm text-slate-100 outline-none leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* STEP 5 */}
          {step === 5 && (
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-semantic-emerald shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-lg font-bold text-slate-50">05. Sẵn sàng đồng bộ hồ sơ chuyên gia</h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Kiểm tra tóm tắt dưới đây và bấm hoàn tất để cập nhật trực tiếp lên hồ sơ của bạn.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-obsidian-950 border border-white/[0.08] space-y-3 text-sm">
                <div className="flex justify-between gap-4 border-b border-white/[0.06] pb-3">
                  <span className="text-slate-400">Chức danh</span>
                  <span className="text-slate-100 font-semibold text-right">{onboarding.roleTitle}</span>
                </div>
                <div className="flex justify-between gap-4 border-b border-white/[0.06] pb-3">
                  <span className="text-slate-400">Nhóm chuyên môn</span>
                  <span className="text-slate-100 font-medium">{onboarding.specialization}</span>
                </div>
                <div className="flex justify-between gap-4 border-b border-white/[0.06] pb-3">
                  <span className="text-slate-400">Mức giá theo giờ</span>
                  <span className="text-semantic-emerald font-bold tabular-nums-mono">
                    {formatMoney(onboarding.hourlyRate)} / giờ
                  </span>
                </div>
                <div className="flex justify-between gap-4 border-b border-white/[0.06] pb-3">
                  <span className="text-slate-400">Địa điểm</span>
                  <span className="text-slate-100">{onboarding.location}</span>
                </div>
                <div className="pt-1">
                  <span className="text-slate-400 block mb-1">Kỹ năng ({onboarding.skills.length})</span>
                  <p className="text-xs text-slate-200">{onboarding.skills.join(' · ')}</p>
                </div>
              </div>
            </div>
          )}

          {error && <p className="text-xs text-semantic-danger">{error}</p>}

          {/* Bottom Controls */}
          <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={handlePrev}
              disabled={step === 1}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-white/10 text-sm font-medium transition-colors ${
                step === 1
                  ? 'opacity-40 cursor-not-allowed text-slate-500'
                  : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Quay lại
            </button>

            {step < 5 ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-cobalt-500 hover:bg-cobalt-600 text-white text-sm font-semibold transition-colors whitespace-nowrap"
              >
                Lưu &amp; Tiếp tục
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinish}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-cobalt-500 hover:bg-cobalt-600 text-white text-sm font-semibold transition-colors whitespace-nowrap"
              >
                <Check className="w-4 h-4" />
                Hoàn tất &amp; Xem hồ sơ
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
