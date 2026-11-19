import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Search,
  SlidersHorizontal,
  X,
  Bookmark,
  ShieldCheck,
  Star,
  MapPin,
  MessageSquare,
  RotateCcw,
  ArrowUpRight,
} from 'lucide-react';
import { CATEGORIES, POPULAR_SKILLS } from '../data/mockData';
import { useMarketplace } from '../context/MarketplaceContext';

const DEFAULT_FILTERS = {
  category: 'all',
  types: ['fixed', 'hourly'],
  minBudget: 0,
  skills: [],
  verifiedOnly: false,
  milestoneOnly: false,
  savedOnly: false,
};

/**
 * Trang Tìm việc làm (/jobs):
 * Hỗ trợ tìm kiếm từ khóa, lọc đồng thời theo danh mục, hình thức thanh toán,
 * ngưỡng ngân sách tối thiểu, kỹ năng, trạng thái xác minh, dự án đã lưu và sắp xếp.
 */
export default function Jobs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { projects, savedJobIds, toggleSaveJob, formatBudgetRange, formatMoney } = useMarketplace();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'all');
  const [selectedTypes, setSelectedTypes] = useState(DEFAULT_FILTERS.types);
  const [minBudget, setMinBudget] = useState(0);
  const [selectedSkills, setSelectedSkills] = useState(() => {
    const skillParam = searchParams.get('skill');
    return skillParam ? [skillParam] : [];
  });
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [milestoneOnly, setMilestoneOnly] = useState(false);
  const [savedOnly, setSavedOnly] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    const paramCat = searchParams.get('category');
    const paramSkill = searchParams.get('skill');
    if (paramCat) setCategory(paramCat);
    if (paramSkill) setSelectedSkills([paramSkill]);
  }, [searchParams]);

  const toggleType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleSkill = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleReset = () => {
    setSearchTerm('');
    setCategory('all');
    setSelectedTypes(DEFAULT_FILTERS.types);
    setMinBudget(0);
    setSelectedSkills([]);
    setVerifiedOnly(false);
    setMilestoneOnly(false);
    setSavedOnly(false);
    setSortBy('newest');
    setSearchParams({});
  };

  const activeFilterCount =
    (category !== 'all' ? 1 : 0) +
    (selectedTypes.length < 2 ? 1 : 0) +
    (minBudget > 0 ? 1 : 0) +
    selectedSkills.length +
    (verifiedOnly ? 1 : 0) +
    (milestoneOnly ? 1 : 0) +
    (savedOnly ? 1 : 0);

  const filteredProjects = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();

    const list = projects.filter((job) => {
      if (category !== 'all' && job.category !== category) return false;
      if (selectedTypes.length > 0 && !selectedTypes.includes(job.budgetType)) return false;
      if (minBudget > 0 && job.maxBudget < minBudget) return false;
      if (verifiedOnly && !job.paymentVerified) return false;
      if (milestoneOnly && !job.milestoneFunded) return false;
      if (savedOnly && !savedJobIds.includes(job.id)) return false;

      if (selectedSkills.length > 0) {
        const jobSkillsLower = job.skills.map((s) => s.toLowerCase());
        const hasMatch = selectedSkills.some((sk) => jobSkillsLower.includes(sk.toLowerCase()));
        if (!hasMatch) return false;
      }

      if (q) {
        const haystack = [
          job.title,
          job.description,
          job.categoryLabel,
          job.location,
          job.clientName,
          ...job.skills,
        ]
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      return true;
    });

    const sorted = [...list];
    if (sortBy === 'newest') {
      sorted.sort((a, b) => a.postedMinutesAgo - b.postedMinutesAgo);
    } else if (sortBy === 'budget-desc') {
      sorted.sort((a, b) => b.maxBudget - a.maxBudget);
    } else if (sortBy === 'budget-asc') {
      sorted.sort((a, b) => a.minBudget - b.minBudget);
    } else if (sortBy === 'bids-asc') {
      sorted.sort((a, b) => a.bids.length - b.bids.length);
    }
    return sorted;
  }, [
    projects,
    searchTerm,
    category,
    selectedTypes,
    minBudget,
    selectedSkills,
    verifiedOnly,
    milestoneOnly,
    savedOnly,
    savedJobIds,
    sortBy,
  ]);

  const filterPanelContent = (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
        <h2 className="text-sm font-bold text-slate-100">Bộ lọc tìm kiếm</h2>
        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1 text-xs font-medium text-cobalt-400 hover:text-cobalt-300 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Đặt lại ({activeFilterCount})
          </button>
        )}
      </div>

      {/* Category Select */}
      <div className="space-y-2.5">
        <label htmlFor="filter-category" className="block text-xs font-semibold text-slate-400">
          Danh mục chuyên môn
        </label>
        <select
          id="filter-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-lg bg-obsidian-950 border border-white/10 focus:border-cobalt-500 px-3 py-2.5 text-sm text-slate-100 outline-none"
        >
          <option value="all">Tất cả lĩnh vực</option>
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>
      </div>

      {/* Project Type */}
      <div className="space-y-2.5">
        <p className="text-xs font-semibold text-slate-400">Hình thức thanh toán</p>
        <div className="space-y-2">
          {[
            { id: 'fixed', label: 'Giá cố định (Fixed Price)' },
            { id: 'hourly', label: 'Tính theo giờ (Hourly)' },
          ].map((item) => (
            <label key={item.id} className="flex items-center gap-2.5 cursor-pointer py-1 text-sm text-slate-300 hover:text-white">
              <input
                type="checkbox"
                checked={selectedTypes.includes(item.id)}
                onChange={() => toggleType(item.id)}
                className="w-4 h-4 rounded border-white/20 bg-obsidian-950 accent-cobalt-500"
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Minimum Budget Slider */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-400">Ngân sách tối thiểu</span>
          <span className="text-slate-200 font-semibold tabular-nums-mono">
            {minBudget === 0 ? 'Bất kỳ' : formatMoney(minBudget, { compact: true })}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={40000000}
          step={2000000}
          value={minBudget}
          onChange={(e) => setMinBudget(Number(e.target.value))}
          className="w-full accent-cobalt-500 cursor-pointer"
          aria-label="Ngân sách tối thiểu"
        />
        <div className="flex justify-between text-xs text-slate-500 tabular-nums-mono">
          <span>0</span>
          <span>20M</span>
          <span>40M VNĐ</span>
        </div>
      </div>

      {/* Skills Interactive Buttons */}
      <div className="space-y-2.5">
        <p className="text-xs font-semibold text-slate-400">Lọc theo kỹ năng</p>
        <div className="flex flex-wrap gap-1.5">
          {POPULAR_SKILLS.slice(0, 10).map((skill) => {
            const active = selectedSkills.includes(skill);
            return (
              <button
                key={skill}
                type="button"
                onClick={() => toggleSkill(skill)}
                className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                  active
                    ? 'bg-cobalt-500 text-white'
                    : 'bg-obsidian-950 text-slate-300 border border-white/[0.08] hover:border-white/20 hover:text-white'
                }`}
              >
                {skill}
              </button>
            );
          })}
        </div>
      </div>

      {/* Trust & Saved Filters */}
      <div className="space-y-2.5 pt-2 border-t border-white/[0.06]">
        <p className="text-xs font-semibold text-slate-400">Tiêu chí xác minh</p>
        <label className="flex items-center gap-2.5 cursor-pointer py-1 text-sm text-slate-300 hover:text-white">
          <input
            type="checkbox"
            checked={verifiedOnly}
            onChange={(e) => setVerifiedOnly(e.target.checked)}
            className="w-4 h-4 rounded border-white/20 bg-obsidian-950 accent-cobalt-500"
          />
          <span>Đã xác minh thanh toán</span>
        </label>
        <label className="flex items-center gap-2.5 cursor-pointer py-1 text-sm text-slate-300 hover:text-white">
          <input
            type="checkbox"
            checked={milestoneOnly}
            onChange={(e) => setMilestoneOnly(e.target.checked)}
            className="w-4 h-4 rounded border-white/20 bg-obsidian-950 accent-cobalt-500"
          />
          <span>Đã nạp cọc Milestone</span>
        </label>
        <label className="flex items-center gap-2.5 cursor-pointer py-1 text-sm text-slate-300 hover:text-white">
          <input
            type="checkbox"
            checked={savedOnly}
            onChange={(e) => setSavedOnly(e.target.checked)}
            className="w-4 h-4 rounded border-white/20 bg-obsidian-950 accent-cobalt-500"
          />
          <span>Dự án đã lưu ({savedJobIds.length})</span>
        </label>
      </div>
    </div>
  );

  return (
    <div>
      {/* Header & Live Search */}
      <div className="bg-obsidian-900/60 border-b border-white/[0.08] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2">
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400">
                <Link to="/" className="hover:text-slate-200 transition-colors">
                  Trang chủ
                </Link>
                <span aria-hidden="true">/</span>
                <span className="text-slate-200 font-medium">Tìm việc làm</span>
              </nav>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-50">
                Dự án công nghệ đang tuyển
              </h1>
              <p className="text-sm text-slate-400 max-w-2xl">
                Lọc trực tiếp theo lĩnh vực, kỹ năng, ngân sách và đặt chào giá ngay trên hệ thống.
              </p>
            </div>

            <div className="w-full lg:w-[420px] flex items-center gap-2.5">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Tìm theo từ khóa (Next.js, Figma, Python...)"
                  aria-label="Tìm kiếm dự án"
                  className="w-full rounded-lg bg-obsidian-950 border border-white/10 focus:border-cobalt-500 pl-10 pr-9 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition-colors"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white"
                    aria-label="Xóa từ khóa tìm kiếm"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden inline-flex items-center gap-2 px-4 min-h-[44px] rounded-lg bg-obsidian-850 border border-white/10 text-sm font-medium text-slate-200 hover:bg-obsidian-800 whitespace-nowrap shrink-0"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Lọc{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-24 p-6 rounded-xl bg-obsidian-850 border border-white/[0.08]">
            {filterPanelContent}
          </aside>

          {/* Job List Area */}
          <div className="lg:col-span-9 space-y-4">
            {/* Results Toolbar */}
            <div className="px-5 py-3.5 rounded-xl bg-obsidian-850 border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p className="text-sm text-slate-300">
                Hiển thị{' '}
                <span className="font-bold text-slate-50 tabular-nums-mono">
                  {filteredProjects.length}
                </span>{' '}
                / {projects.length} dự án phù hợp
              </p>

              <div className="flex items-center gap-2.5 text-sm">
                <label htmlFor="sort-jobs" className="text-xs text-slate-400 whitespace-nowrap">
                  Sắp xếp:
                </label>
                <select
                  id="sort-jobs"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-lg bg-obsidian-950 border border-white/10 focus:border-cobalt-500 px-3 py-1.5 text-xs font-medium text-slate-200 outline-none"
                >
                  <option value="newest">Mới đăng nhất</option>
                  <option value="budget-desc">Ngân sách cao nhất</option>
                  <option value="budget-asc">Ngân sách thấp nhất</option>
                  <option value="bids-asc">Ít lượt chào giá nhất</option>
                </select>
              </div>
            </div>

            {/* Empty State */}
            {filteredProjects.length === 0 ? (
              <div className="p-12 rounded-xl bg-obsidian-850 border border-white/[0.08] text-center space-y-4">
                <p className="text-lg font-bold text-slate-100">
                  Không tìm thấy dự án phù hợp với bộ lọc hiện tại
                </p>
                <p className="text-sm text-slate-400 max-w-md mx-auto">
                  Hãy thử nới rộng ngưỡng ngân sách, đổi từ khóa tìm kiếm hoặc đặt lại toàn bộ bộ lọc để xem các dự án đang mở.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cobalt-500 hover:bg-cobalt-600 text-white text-sm font-semibold transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Đặt lại tất cả bộ lọc
                </button>
              </div>
            ) : (
              filteredProjects.map((job) => {
                const isSaved = savedJobIds.includes(job.id);
                return (
                  <article
                    key={job.id}
                    className="p-6 rounded-xl bg-obsidian-850 border border-white/[0.08] hover:border-white/[0.16] transition-colors space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="space-y-1.5 min-w-0">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-400">
                          <span className="text-cobalt-400 font-semibold">{job.categoryLabel}</span>
                          <span aria-hidden="true">·</span>
                          <span>{job.budgetType === 'fixed' ? 'Giá cố định' : 'Theo giờ'}</span>
                          <span aria-hidden="true">·</span>
                          <span>{job.postedAt}</span>
                        </div>
                        <h2 className="text-lg sm:text-xl font-bold text-slate-50 leading-snug">
                          <Link
                            to={`/projects/${job.id}`}
                            className="hover:text-cobalt-400 transition-colors"
                          >
                            {job.title}
                          </Link>
                        </h2>
                      </div>

                      <div className="sm:text-right shrink-0">
                        <div className="text-lg font-bold text-semantic-emerald tabular-nums-mono">
                          {formatBudgetRange(job, { compact: true })}
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">{job.durationLabel}</p>
                      </div>
                    </div>

                    <p className="text-sm text-slate-300 leading-relaxed">{job.description}</p>

                    {/* Clean unboxed skill links */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-slate-400 pt-1">
                      {job.skills.map((skill, idx) => (
                        <React.Fragment key={skill}>
                          <button
                            type="button"
                            onClick={() => toggleSkill(skill)}
                            className={`transition-colors ${
                              selectedSkills.includes(skill)
                                ? 'text-cobalt-400 font-semibold'
                                : 'text-slate-300 hover:text-white'
                            }`}
                          >
                            {skill}
                          </button>
                          {idx < job.skills.length - 1 && (
                            <span aria-hidden="true" className="text-slate-600">
                              ·
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400">
                        {job.paymentVerified && (
                          <span className="inline-flex items-center gap-1 text-semantic-emerald font-medium">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            {job.milestoneFunded ? 'Đã nạp cọc Milestone' : 'Đã xác minh thanh toán'}
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1 text-slate-300 tabular-nums-mono">
                          <Star className="w-3.5 h-3.5 text-semantic-amber fill-semantic-amber" />
                          {job.clientRating.toFixed(1)} ({job.clientReviews})
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-500" />
                          {job.location}
                        </span>
                        <span className="inline-flex items-center gap-1 tabular-nums-mono">
                          <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                          {job.bids.length} chào giá
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => toggleSaveJob(job.id)}
                          aria-label={isSaved ? 'Bỏ lưu dự án' : 'Lưu dự án'}
                          className={`inline-flex items-center justify-center w-10 h-10 rounded-lg border transition-colors ${
                            isSaved
                              ? 'bg-cobalt-500/15 border-cobalt-500/40 text-cobalt-400'
                              : 'bg-obsidian-900 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                          }`}
                        >
                          <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-cobalt-400' : ''}`} />
                        </button>
                        <Link
                          to={`/projects/${job.id}`}
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-cobalt-500 hover:bg-cobalt-600 text-white text-xs font-semibold transition-colors whitespace-nowrap"
                        >
                          Xem &amp; Chào giá
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Bộ lọc tìm kiếm">
          <div className="fixed inset-0 bg-black/75" onClick={() => setMobileFilterOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-obsidian-900 border-r border-white/10 p-6 overflow-y-auto flex flex-col justify-between gap-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-base font-bold text-slate-50">Bộ lọc dự án</span>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-10 h-10 inline-flex items-center justify-center rounded-lg text-slate-400 hover:text-white"
                  aria-label="Đóng bộ lọc"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {filterPanelContent}
            </div>
            <button
              type="button"
              onClick={() => setMobileFilterOpen(false)}
              className="w-full min-h-[44px] rounded-lg bg-cobalt-500 hover:bg-cobalt-600 text-white text-sm font-semibold"
            >
              Xem {filteredProjects.length} dự án phù hợp
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
