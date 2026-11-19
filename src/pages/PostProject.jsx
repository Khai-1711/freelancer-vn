import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Plus, X, ShieldCheck } from 'lucide-react';
import { CATEGORIES, POPULAR_SKILLS } from '../data/mockData';
import { useMarketplace } from '../context/MarketplaceContext';

const STEPS = [
  { num: 1, label: 'Công việc' },
  { num: 2, label: 'Kỹ năng' },
  { num: 3, label: 'Ngân sách' },
  { num: 4, label: 'Xác nhận' },
];

/**
 * Trang Đăng dự án (/post-project) gồm quy trình 4 bước có kiểm tra hợp lệ từng chặng:
 * 1. Thông tin công việc -> 2. Kỹ năng bắt buộc -> 3. Ngân sách & Thời hạn -> 4. Xem lại & Xuất bản.
 */
export default function PostProject() {
  const navigate = useNavigate();
  const { addProject, formatMoney } = useMarketplace();

  const [step, setStep] = useState(1);
  const [error, setError] = useState('');

  // Step 1
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('web-it');
  const [description, setDescription] = useState('');

  // Step 2
  const [skills, setSkills] = useState(['React.js', 'TypeScript', 'Node.js']);
  const [customSkill, setCustomSkill] = useState('');

  // Step 3
  const [budgetType, setBudgetType] = useState('fixed');
  const [minBudget, setMinBudget] = useState(15000000);
  const [maxBudget, setMaxBudget] = useState(25000000);
  const [durationDays, setDurationDays] = useState(21);
  const [location, setLocation] = useState('TP. Hồ Chí Minh');
  const [milestoneFunded, setMilestoneFunded] = useState(true);

  const selectedCategoryObj = CATEGORIES.find((c) => c.id === category) || CATEGORIES[0];

  const handleAddCustomSkill = (e) => {
    e.preventDefault();
    const cleaned = customSkill.trim();
    if (!cleaned) return;
    if (!skills.some((s) => s.toLowerCase() === cleaned.toLowerCase())) {
      setSkills((prev) => [...prev, cleaned]);
    }
    setCustomSkill('');
    setError('');
  };

  const toggleSuggestedSkill = (skill) => {
    setSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
    setError('');
  };

  const removeSkill = (skill) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
  };

  const validateStep = (targetStep) => {
    if (targetStep === 1) {
      if (title.trim().length < 10) {
        setError('Tiêu đề dự án cần ít nhất 10 ký tự mô tả rõ công việc.');
        return false;
      }
      if (description.trim().length < 30) {
        setError('Mô tả chi tiết cần tối thiểu 30 ký tự để chuyên gia ước lượng chính xác.');
        return false;
      }
    }
    if (targetStep === 2) {
      if (skills.length < 1) {
        setError('Vui lòng chọn hoặc thêm ít nhất 1 kỹ năng yêu cầu.');
        return false;
      }
    }
    if (targetStep === 3) {
      if (minBudget <= 0 || maxBudget < minBudget) {
        setError('Ngân sách tối đa phải lớn hơn hoặc bằng ngân sách tối thiểu.');
        return false;
      }
    }
    setError('');
    return true;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((s) => Math.min(4, s + 1));
    }
  };

  const handleJumpStep = (target) => {
    if (target < step) {
      setError('');
      setStep(target);
      return;
    }
    if (validateStep(step)) {
      setStep(target);
    }
  };

  const handlePublish = () => {
    const newId = addProject({
      title,
      category,
      categoryLabel: selectedCategoryObj.title,
      budgetType,
      minBudget,
      maxBudget,
      durationLabel:
        budgetType === 'fixed'
          ? `Dự kiến ${durationDays} ngày`
          : `Theo giờ · Dự kiến ${durationDays} ngày`,
      description,
      skills,
      location,
      milestoneFunded,
    });
    navigate(`/projects/${newId}`);
  };

  const fillSampleProject = () => {
    setTitle('Xây dựng Hệ thống Quản lý Đơn hàng & Dashboard Doanh thu React + FastAPI');
    setCategory('web-it');
    setDescription(
      'Cần xây dựng web app nội bộ cho chuỗi bán lẻ gồm: quản lý tồn kho theo chi nhánh, đồng bộ đơn hàng từ Shopee/Lazada, phân quyền nhân viên và biểu đồ doanh thu theo thời gian thực.'
    );
    setError('');
  };

  return (
    <div>
      {/* Header & Interactive Stepper */}
      <div className="bg-obsidian-900/60 border-b border-white/[0.08] py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-50">
              Đăng dự án mới lên ViecTech
            </h1>
            <p className="text-sm text-slate-400">
              Hoàn thiện 4 bước rõ ràng để dự án hiển thị ngay lập tức trong bảng việc làm.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-4 pt-2">
            {STEPS.map((s) => {
              const isCompleted = step > s.num;
              const isCurrent = step === s.num;
              return (
                <button
                  key={s.num}
                  type="button"
                  onClick={() => handleJumpStep(s.num)}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold tabular-nums-mono transition-colors ${
                      isCompleted
                        ? 'bg-semantic-emerald text-obsidian-950'
                        : isCurrent
                        ? 'bg-cobalt-500 text-white'
                        : 'bg-obsidian-850 border border-white/10 text-slate-400 group-hover:border-white/20'
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4" /> : s.num}
                  </div>
                  <span
                    className={`text-xs font-medium ${
                      isCurrent ? 'text-slate-50 font-semibold' : 'text-slate-400'
                    }`}
                  >
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Step Content Card */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <div className="p-6 sm:p-8 rounded-2xl bg-obsidian-850 border border-white/[0.08] space-y-6">
          {/* STEP 1: Scope & Description */}
          {step === 1 && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/[0.06]">
                <div>
                  <h2 className="text-lg font-bold text-slate-50">01. Thông tin công việc</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Tiêu đề rõ ràng và mô tả chi tiết giúp bạn thu hút đúng chuyên gia ngay từ đầu.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={fillSampleProject}
                  className="text-xs font-medium text-cobalt-400 hover:text-cobalt-300 text-left sm:text-right whitespace-nowrap"
                >
                  Điền nhanh nội dung mẫu
                </button>
              </div>

              <div>
                <label htmlFor="proj-title" className="block text-sm font-semibold text-slate-200 mb-1.5">
                  Tiêu đề dự án
                </label>
                <input
                  id="proj-title"
                  type="text"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Ví dụ: Xây dựng Website Thương mại Điện tử Next.js & Tích hợp VNPay"
                  className="w-full rounded-lg bg-obsidian-950 border border-white/10 focus:border-cobalt-500 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none"
                />
              </div>

              <div>
                <label htmlFor="proj-category" className="block text-sm font-semibold text-slate-200 mb-1.5">
                  Lĩnh vực chuyên môn
                </label>
                <select
                  id="proj-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-lg bg-obsidian-950 border border-white/10 focus:border-cobalt-500 px-4 py-3 text-sm text-slate-100 outline-none"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="proj-desc" className="text-sm font-semibold text-slate-200">
                    Mô tả chi tiết yêu cầu
                  </label>
                  <span className="text-xs text-slate-500 tabular-nums-mono">
                    {description.trim().length} ký tự
                  </span>
                </div>
                <textarea
                  id="proj-desc"
                  rows={5}
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Liệt kê mục tiêu sản phẩm, các tính năng chính, nền tảng công nghệ mong muốn và tiêu chí bàn giao..."
                  className="w-full rounded-lg bg-obsidian-950 border border-white/10 focus:border-cobalt-500 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* STEP 2: Skills Manager */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-white/[0.06]">
                <h2 className="text-lg font-bold text-slate-50">02. Kỹ năng bắt buộc</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Chọn kỹ năng từ danh sách gợi ý hoặc tự nhập thêm công nghệ đặc thù của dự án.
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-400 mb-2.5">
                  Kỹ năng đã chọn ({skills.length})
                </p>
                {skills.length === 0 ? (
                  <p className="text-sm text-slate-500 py-3">Chưa có kỹ năng nào được chọn.</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cobalt-500/15 border border-cobalt-500/30 text-xs font-semibold text-cobalt-400"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          aria-label={`Xóa kỹ năng ${skill}`}
                          className="hover:text-white transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <form onSubmit={handleAddCustomSkill} className="flex items-center gap-2.5">
                <input
                  type="text"
                  value={customSkill}
                  onChange={(e) => setCustomSkill(e.target.value)}
                  placeholder="Nhập thêm kỹ năng (vd: Go, GraphQL, Redis...)"
                  className="flex-1 rounded-lg bg-obsidian-950 border border-white/10 focus:border-cobalt-500 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-obsidian-800 hover:bg-obsidian-750 border border-white/10 text-sm font-semibold text-slate-100 transition-colors whitespace-nowrap"
                >
                  <Plus className="w-4 h-4" />
                  Thêm
                </button>
              </form>

              <div className="space-y-2.5">
                <p className="text-xs font-semibold text-slate-400">Kỹ năng phổ biến</p>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SKILLS.map((skill) => {
                    const selected = skills.includes(skill);
                    return (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => toggleSuggestedSkill(skill)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          selected
                            ? 'bg-cobalt-500 text-white'
                            : 'bg-obsidian-950 border border-white/[0.08] text-slate-300 hover:border-white/20 hover:text-white'
                        }`}
                      >
                        {skill}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Budget & Timeline */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-white/[0.06]">
                <h2 className="text-lg font-bold text-slate-50">03. Ngân sách &amp; Thời hạn</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Chọn phương thức thanh toán phù hợp với tính chất công việc của bạn.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    id: 'fixed',
                    title: 'Giá cố định (Fixed Price)',
                    desc: 'Phù hợp khi phạm vi và hạng mục bàn giao đã xác định rõ.',
                    defaultMin: 15000000,
                    defaultMax: 25000000,
                  },
                  {
                    id: 'hourly',
                    title: 'Tính theo giờ (Hourly)',
                    desc: 'Phù hợp cho dự án linh hoạt, phát triển tính năng liên tục.',
                    defaultMin: 400000,
                    defaultMax: 650000,
                  },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setBudgetType(opt.id);
                      setMinBudget(opt.defaultMin);
                      setMaxBudget(opt.defaultMax);
                    }}
                    className={`p-4 rounded-xl text-left border transition-colors ${
                      budgetType === opt.id
                        ? 'bg-cobalt-500/10 border-cobalt-500 text-slate-50'
                        : 'bg-obsidian-950 border-white/[0.08] text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <p className="text-sm font-bold">{opt.title}</p>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{opt.desc}</p>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="min-budget" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Ngân sách tối thiểu ({budgetType === 'hourly' ? 'VNĐ / giờ' : 'VNĐ'})
                  </label>
                  <input
                    id="min-budget"
                    type="number"
                    min={100000}
                    step={budgetType === 'hourly' ? 50000 : 1000000}
                    value={minBudget}
                    onChange={(e) => setMinBudget(Number(e.target.value) || 0)}
                    className="w-full rounded-lg bg-obsidian-950 border border-white/10 focus:border-cobalt-500 px-4 py-2.5 text-sm font-semibold text-slate-100 tabular-nums-mono outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="max-budget" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Ngân sách tối đa ({budgetType === 'hourly' ? 'VNĐ / giờ' : 'VNĐ'})
                  </label>
                  <input
                    id="max-budget"
                    type="number"
                    min={100000}
                    step={budgetType === 'hourly' ? 50000 : 1000000}
                    value={maxBudget}
                    onChange={(e) => setMaxBudget(Number(e.target.value) || 0)}
                    className="w-full rounded-lg bg-obsidian-950 border border-white/10 focus:border-cobalt-500 px-4 py-2.5 text-sm font-semibold text-slate-100 tabular-nums-mono outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="duration-days" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Thời gian triển khai dự kiến (ngày)
                  </label>
                  <input
                    id="duration-days"
                    type="number"
                    min={1}
                    max={365}
                    value={durationDays}
                    onChange={(e) => setDurationDays(Number(e.target.value) || 1)}
                    className="w-full rounded-lg bg-obsidian-950 border border-white/10 focus:border-cobalt-500 px-4 py-2.5 text-sm font-semibold text-slate-100 tabular-nums-mono outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="proj-location" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Địa điểm doanh nghiệp
                  </label>
                  <select
                    id="proj-location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full rounded-lg bg-obsidian-950 border border-white/10 focus:border-cobalt-500 px-4 py-2.5 text-sm text-slate-100 outline-none"
                  >
                    <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                    <option value="Làm việc từ xa (Toàn quốc)">Làm việc từ xa (Toàn quốc)</option>
                  </select>
                </div>
              </div>

              <label className="flex items-start gap-3 p-4 rounded-xl bg-obsidian-950 border border-white/[0.08] cursor-pointer">
                <input
                  type="checkbox"
                  checked={milestoneFunded}
                  onChange={(e) => setMilestoneFunded(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-cobalt-500"
                />
                <div className="text-sm">
                  <span className="font-semibold text-slate-100 block">
                    Cam kết nạp cọc bảo vệ theo Milestone
                  </span>
                  <span className="text-xs text-slate-400">
                    Dự án có cam kết Milestone thường nhận được lượng chào giá chất lượng cao hơn 2 lần.
                  </span>
                </div>
              </label>
            </div>
          )}

          {/* STEP 4: Review & Publish */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-white/[0.06]">
                <h2 className="text-lg font-bold text-slate-50">04. Xem lại &amp; Xuất bản</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Kiểm tra lại thông tin trước khi hiển thị công khai trên sàn ViecTech.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-obsidian-950 border border-white/[0.08] space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <p className="text-xs text-cobalt-400 font-semibold">
                      {selectedCategoryObj.title} · {budgetType === 'fixed' ? 'Giá cố định' : 'Theo giờ'}
                    </p>
                    <h3 className="text-lg font-bold text-slate-50 mt-1">{title}</h3>
                  </div>
                  <div className="sm:text-right shrink-0">
                    <p className="text-base font-bold text-semantic-emerald tabular-nums-mono">
                      {formatMoney(minBudget, { compact: true })} – {formatMoney(maxBudget, { compact: true })}
                      {budgetType === 'hourly' ? ' / giờ' : ''}
                    </p>
                    <p className="text-xs text-slate-400">Dự kiến {durationDays} ngày</p>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                  {description}
                </p>

                <p className="text-xs text-slate-400">{skills.join(' · ')}</p>

                <div className="pt-3 border-t border-white/[0.06] flex flex-wrap items-center gap-4 text-xs text-slate-400">
                  <span>{location}</span>
                  {milestoneFunded && (
                    <span className="inline-flex items-center gap-1 text-semantic-emerald font-medium">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Bảo vệ thanh toán Milestone
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {error && <p className="text-xs text-semantic-danger">{error}</p>}

          {/* Footer Navigation Controls */}
          <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between gap-4">
            {step === 1 ? (
              <Link
                to="/jobs"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-slate-100 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Hủy bỏ
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setError('');
                  setStep((s) => s - 1);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-white/10 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.04] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Bước trước
              </button>
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-cobalt-500 hover:bg-cobalt-600 text-white text-sm font-semibold transition-colors whitespace-nowrap"
              >
                Tiếp tục
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handlePublish}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cobalt-500 hover:bg-cobalt-600 text-white text-sm font-semibold transition-colors whitespace-nowrap"
              >
                <Check className="w-4 h-4" />
                Xuất bản dự án ngay
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
