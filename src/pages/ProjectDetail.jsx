import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ShieldCheck,
  FileText,
  Download,
  Star,
  MapPin,
  Bookmark,
  Send,
  CheckCircle2,
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import Avatar from '../components/Avatar';

/**
 * Trang Chi tiết dự án (/projects/:id):
 * Hiển thị đầy đủ yêu cầu kỹ thuật, tài liệu đính kèm, danh sách chào giá
 * và bảng tính phí dịch vụ 10% / thực nhận cho phép gửi chào giá mới ngay lập tức.
 */
export default function ProjectDetail() {
  const { id } = useParams();
  const {
    projects,
    addBid,
    savedJobIds,
    toggleSaveJob,
    formatMoney,
    formatBudgetRange,
    showToast,
  } = useMarketplace();

  const project = projects.find((p) => p.id === id) || projects[0];

  const [bidAmount, setBidAmount] = useState(project ? project.minBudget : 25000000);
  const [days, setDays] = useState(project?.budgetType === 'hourly' ? 14 : 20);
  const [coverLetter, setCoverLetter] = useState('');
  const [formError, setFormError] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  useEffect(() => {
    if (project) {
      setBidAmount(project.minBudget);
      setDays(project.budgetType === 'hourly' ? 14 : 20);
      setCoverLetter('');
      setFormError('');
      setSubmittedSuccess(false);
    }
  }, [project?.id]);

  if (!project) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-bold text-slate-50">Không tìm thấy dự án</h1>
        <Link to="/jobs" className="inline-flex items-center gap-2 text-sm text-cobalt-400 hover:underline">
          <ArrowLeft className="w-4 h-4" />
          Quay lại danh sách việc làm
        </Link>
      </div>
    );
  }

  const fee = Math.round(bidAmount * 0.1);
  const net = Math.max(0, bidAmount - fee);
  const isSaved = savedJobIds.includes(project.id);

  const avgBid =
    project.bids.length > 0
      ? Math.round(project.bids.reduce((sum, b) => sum + b.amount, 0) / project.bids.length)
      : 0;

  const handleSubmitBid = (e) => {
    e.preventDefault();
    if (!bidAmount || bidAmount <= 0) {
      setFormError('Vui lòng nhập mức giá chào hợp lệ lớn hơn 0.');
      return;
    }
    if (!days || days < 1) {
      setFormError('Thời gian hoàn thành tối thiểu là 1 ngày.');
      return;
    }
    if (coverLetter.trim().length < 20) {
      setFormError('Thư đề xuất cần tối thiểu 20 ký tự mô tả kinh nghiệm và cách triển khai.');
      return;
    }
    setFormError('');
    addBid(project.id, { amount: bidAmount, days, coverLetter });
    setCoverLetter('');
    setSubmittedSuccess(true);
  };

  return (
    <div>
      {/* Top Breadcrumb Bar */}
      <div className="bg-obsidian-900/60 border-b border-white/[0.08] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 min-w-0">
            <Link to="/" className="hover:text-slate-200 transition-colors shrink-0">
              Trang chủ
            </Link>
            <span aria-hidden="true">/</span>
            <Link to="/jobs" className="hover:text-slate-200 transition-colors shrink-0">
              Tìm việc làm
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-slate-200 font-medium truncate">Dự án #{project.id}</span>
          </nav>

          <button
            type="button"
            onClick={() => toggleSaveJob(project.id)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap shrink-0 ${
              isSaved
                ? 'bg-cobalt-500/15 border-cobalt-500/40 text-cobalt-400'
                : 'bg-obsidian-850 border-white/10 text-slate-300 hover:text-white'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-cobalt-400' : ''}`} />
            {isSaved ? 'Đã lưu' : 'Lưu dự án'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Specification & Live Bid List */}
          <div className="lg:col-span-8 space-y-6">
            <section className="p-6 sm:p-8 rounded-xl bg-obsidian-850 border border-white/[0.08] space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-white/[0.08]">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-slate-400">
                    <span className="text-semantic-emerald font-semibold">Đang nhận hồ sơ</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.postedAt}</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-50 leading-snug text-balance">
                    {project.title}
                  </h1>
                </div>

                <div className="sm:text-right shrink-0">
                  <span className="text-xs text-slate-400 block">Ngân sách dự kiến</span>
                  <div className="text-xl sm:text-2xl font-bold text-semantic-emerald tabular-nums-mono mt-0.5">
                    {formatBudgetRange(project, { compact: true })}
                  </div>
                  <span className="text-xs text-slate-400 block mt-0.5">{project.durationLabel}</span>
                </div>
              </div>

              {/* Client Summary Line */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-400">
                <span className="text-slate-200 font-semibold">{project.clientName}</span>
                {project.paymentVerified && (
                  <span className="inline-flex items-center gap-1 text-semantic-emerald font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {project.milestoneFunded ? 'Đã nạp cọc Milestone' : 'Đã xác minh thanh toán'}
                  </span>
                )}
                <span className="inline-flex items-center gap-1 text-slate-300 tabular-nums-mono">
                  <Star className="w-3.5 h-3.5 text-semantic-amber fill-semantic-amber" />
                  {project.clientRating.toFixed(1)} ({project.clientReviews} đánh giá)
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  {project.location}
                </span>
              </div>

              {/* Description & Requirements */}
              <div className="space-y-4 text-sm sm:text-[15px] text-slate-300 leading-relaxed">
                <h2 className="text-base font-bold text-slate-100">Mô tả chi tiết công việc</h2>
                <p>{project.description}</p>

                {project.requirements?.length > 0 && (
                  <div className="pt-2 space-y-2.5">
                    <h3 className="text-sm font-bold text-slate-100">Yêu cầu kỹ thuật chính</h3>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-slate-300">
                      {project.requirements.map((req, idx) => (
                        <li key={idx}>{req}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="pt-3 space-y-2">
                  <h3 className="text-sm font-bold text-slate-100">Kỹ năng bắt buộc</h3>
                  <div className="flex flex-wrap items-center gap-2">
                    {project.skills.map((skill) => (
                      <Link
                        key={skill}
                        to={`/jobs?skill=${encodeURIComponent(skill)}`}
                        className="px-3 py-1.5 rounded-md bg-obsidian-950 border border-white/[0.08] hover:border-cobalt-500/50 text-xs font-medium text-slate-200 hover:text-cobalt-400 transition-colors"
                      >
                        {skill}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Attachments */}
              {project.attachments?.length > 0 && (
                <div className="pt-6 border-t border-white/[0.08] space-y-3">
                  <h3 className="text-sm font-bold text-slate-100">Tài liệu đính kèm</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.attachments.map((file) => (
                      <div
                        key={file.name}
                        className="flex items-center justify-between gap-3 px-4 py-3 rounded-lg bg-obsidian-950 border border-white/[0.08]"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <FileText className="w-5 h-5 text-cobalt-400 shrink-0" />
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-slate-200 truncate">{file.name}</p>
                            <p className="text-xs text-slate-500 tabular-nums-mono">{file.size}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => showToast(`Đang chuẩn bị tải xuống ${file.name}...`, 'info')}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-cobalt-400 hover:text-cobalt-300 whitespace-nowrap shrink-0"
                        >
                          <Download className="w-3.5 h-3.5" />
                          Tải về
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* Submitted Bids List */}
            <section className="p-6 sm:p-8 rounded-xl bg-obsidian-850 border border-white/[0.08] space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/[0.08]">
                <h2 className="text-base font-bold text-slate-100">
                  Danh sách đề xuất chào giá ({project.bids.length})
                </h2>
                {avgBid > 0 && (
                  <span className="text-xs text-slate-400">
                    Giá trung bình:{' '}
                    <strong className="text-slate-100 tabular-nums-mono">
                      {formatMoney(avgBid)}
                      {project.budgetType === 'hourly' ? ' / giờ' : ''}
                    </strong>
                  </span>
                )}
              </div>

              {project.bids.length === 0 ? (
                <div className="py-8 text-center space-y-2">
                  <p className="text-sm font-semibold text-slate-200">
                    Chưa có chuyên gia nào đặt chào giá cho dự án này
                  </p>
                  <p className="text-xs text-slate-400">
                    Hãy là người đầu tiên gửi đề xuất kỹ thuật bằng biểu mẫu bên phải.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-white/[0.06]">
                  {project.bids.map((bid) => (
                    <div key={bid.id} className="py-5 first:pt-0 last:pb-0 flex items-start gap-4">
                      <Avatar src={bid.avatar} name={bid.freelancerName} size="md" />
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                          <div>
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                              <Link
                                to={`/freelancers/${bid.freelancerId}`}
                                className="text-sm font-bold text-slate-100 hover:text-cobalt-400 transition-colors"
                              >
                                {bid.freelancerName}
                              </Link>
                              {bid.verified && (
                                <span className="inline-flex items-center gap-1 text-xs text-semantic-emerald font-medium">
                                  <ShieldCheck className="w-3.5 h-3.5" />
                                  Đã xác minh
                                </span>
                              )}
                              <span className="text-xs text-slate-500">· {bid.submittedAt}</span>
                            </div>
                            <p className="text-xs text-slate-400 mt-0.5 tabular-nums-mono">
                              Đánh giá {bid.rating.toFixed(1)} ({bid.reviews}) · Hoàn thành {bid.completionRate}%
                            </p>
                          </div>

                          <div className="sm:text-right shrink-0">
                            <div className="text-base font-bold text-semantic-emerald tabular-nums-mono">
                              {formatMoney(bid.amount)}
                              {project.budgetType === 'hourly' ? ' / giờ' : ''}
                            </div>
                            <span className="text-xs text-slate-400 tabular-nums-mono">
                              Trong {bid.days} ngày
                            </span>
                          </div>
                        </div>

                        <p className="text-sm text-slate-300 leading-relaxed">{bid.coverLetter}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Right Column: Live Bidding Calculator */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24">
            <div className="p-6 rounded-xl bg-obsidian-850 border border-white/[0.08] space-y-5">
              <div className="pb-4 border-b border-white/[0.08]">
                <h2 className="text-base font-bold text-slate-50">Gửi đề xuất chào giá</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Đề xuất của bạn sẽ xuất hiện ngay trong danh sách chào giá của dự án.
                </p>
              </div>

              {submittedSuccess && (
                <div className="p-3.5 rounded-lg bg-semantic-emerald/10 border border-semantic-emerald/30 flex items-start gap-2.5 text-xs text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>Đề xuất của bạn đã được ghi nhận thành công vào danh sách bên trái.</span>
                </div>
              )}

              <form onSubmit={handleSubmitBid} className="space-y-4">
                <div>
                  <label htmlFor="bid-amount" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Mức giá đề xuất ({project.budgetType === 'hourly' ? 'VNĐ / giờ' : 'VNĐ trọn gói'})
                  </label>
                  <input
                    id="bid-amount"
                    type="number"
                    min={100000}
                    step={project.budgetType === 'hourly' ? 50000 : 500000}
                    value={bidAmount}
                    onChange={(e) => setBidAmount(Number(e.target.value) || 0)}
                    className="w-full rounded-lg bg-obsidian-950 border border-white/10 focus:border-cobalt-500 px-3.5 py-2.5 text-sm font-semibold text-slate-100 tabular-nums-mono outline-none transition-colors"
                  />
                </div>

                {/* Live Fee Breakdown */}
                <div className="p-3.5 rounded-lg bg-obsidian-950 border border-white/[0.06] space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Phí bảo vệ Milestone (10%)</span>
                    <span className="text-slate-300 tabular-nums-mono">-{formatMoney(fee)}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-sm font-bold">
                    <span className="text-slate-200">Bạn thực nhận</span>
                    <span className="text-semantic-emerald tabular-nums-mono">{formatMoney(net)}</span>
                  </div>
                </div>

                <div>
                  <label htmlFor="bid-days" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Thời gian hoàn thành dự kiến (ngày)
                  </label>
                  <input
                    id="bid-days"
                    type="number"
                    min={1}
                    max={365}
                    value={days}
                    onChange={(e) => setDays(Number(e.target.value) || 1)}
                    className="w-full rounded-lg bg-obsidian-950 border border-white/10 focus:border-cobalt-500 px-3.5 py-2.5 text-sm font-semibold text-slate-100 tabular-nums-mono outline-none transition-colors"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="bid-cover" className="text-xs font-semibold text-slate-300">
                      Thư đề xuất kỹ thuật
                    </label>
                    <span className="text-xs text-slate-500 tabular-nums-mono">
                      {coverLetter.trim().length}/20+ ký tự
                    </span>
                  </div>
                  <textarea
                    id="bid-cover"
                    rows={4}
                    value={coverLetter}
                    onChange={(e) => {
                      setCoverLetter(e.target.value);
                      if (formError) setFormError('');
                    }}
                    placeholder="Nêu kinh nghiệm với các dự án tương tự, giải pháp kiến trúc đề xuất và các mốc bàn giao..."
                    className="w-full rounded-lg bg-obsidian-950 border border-white/10 focus:border-cobalt-500 px-3.5 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition-colors"
                  />
                </div>

                {formError && <p className="text-xs text-semantic-danger">{formError}</p>}

                <button
                  type="submit"
                  className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 rounded-lg bg-cobalt-500 hover:bg-cobalt-600 text-white text-sm font-semibold transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Gửi đề xuất chào giá
                </button>
              </form>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
