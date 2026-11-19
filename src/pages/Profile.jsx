import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ShieldCheck,
  Star,
  MapPin,
  Clock,
  MessageSquare,
  Briefcase,
  FolderGit2,
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import Avatar from '../components/Avatar';

/**
 * Trang Hồ sơ Chuyên gia (/freelancers/:id hoặc /profile):
 * Hiển thị tổng quan năng lực, bộ chỉ số công việc, danh mục dự án tiêu biểu (Portfolio)
 * và đánh giá từ khách hàng đã từng thuê.
 */
export default function Profile() {
  const { id } = useParams();
  const {
    freelancers,
    currentUser,
    formatMoney,
    openMessageModal,
    openHireModal,
  } = useMarketplace();

  const targetId = id || currentUser?.freelancerId || freelancers[0]?.id;
  const person = freelancers.find((f) => f.id === targetId) || freelancers[0];

  if (!person) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-bold text-slate-50">Không tìm thấy hồ sơ chuyên gia</h1>
        <Link to="/hire" className="inline-flex items-center gap-2 text-sm text-cobalt-400 hover:underline">
          <ArrowLeft className="w-4 h-4" />
          Quay lại danh bạ chuyên gia
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-16">
      {/* Top Breadcrumb */}
      <div className="bg-obsidian-900/60 border-b border-white/[0.08] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 min-w-0">
            <Link to="/" className="hover:text-slate-200 transition-colors shrink-0">
              Trang chủ
            </Link>
            <span aria-hidden="true">/</span>
            <Link to="/hire" className="hover:text-slate-200 transition-colors shrink-0">
              Chuyên gia
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-slate-200 font-medium truncate">{person.name}</span>
          </nav>
          <Link
            to="/onboarding"
            className="text-xs font-medium text-cobalt-400 hover:text-cobalt-300 whitespace-nowrap shrink-0"
          >
            Chỉnh sửa hồ sơ
          </Link>
        </div>
      </div>

      {/* Profile Header Surface */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        <div className="rounded-2xl bg-obsidian-850 border border-white/[0.08] overflow-hidden">
          <div className="h-32 sm:h-40 bg-gradient-to-r from-obsidian-950 via-obsidian-800 to-obsidian-950 border-b border-white/[0.06]" />

          <div className="px-6 sm:px-10 pb-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 -mt-12 sm:-mt-14 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-end gap-5">
                <Avatar
                  src={person.avatar}
                  name={person.name}
                  size="xl"
                  className="ring-4 ring-obsidian-850"
                />
                <div className="space-y-1.5 pb-1">
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-50">
                      {person.name}
                    </h1>
                    <span className="text-sm text-slate-500 tabular-nums-mono">{person.handle}</span>
                    {person.verified && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-cobalt-400">
                        <ShieldCheck className="w-4 h-4" />
                        Chuyên gia xác minh
                      </span>
                    )}
                  </div>

                  <p className="text-sm sm:text-base font-medium text-slate-300">{person.role}</p>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-400 pt-1">
                    <span className="inline-flex items-center gap-1 text-slate-200 font-semibold tabular-nums-mono">
                      <Star className="w-3.5 h-3.5 text-semantic-amber fill-semantic-amber" />
                      {person.rating.toFixed(1)} ({person.reviewCount} nhận xét)
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      {person.location}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      {person.responseTime}
                    </span>
                    <span className={person.available ? 'text-semantic-emerald font-medium' : 'text-slate-500'}>
                      {person.available ? 'Sẵn sàng nhận việc' : 'Đang bận dự án'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => openMessageModal(person)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-obsidian-900 hover:bg-obsidian-800 border border-white/10 text-sm font-semibold text-slate-200 transition-colors whitespace-nowrap"
                >
                  <MessageSquare className="w-4 h-4" />
                  Nhắn tin
                </button>
                <button
                  type="button"
                  onClick={() => openHireModal(person)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cobalt-500 hover:bg-cobalt-600 text-white text-sm font-semibold transition-colors whitespace-nowrap"
                >
                  <Briefcase className="w-4 h-4" />
                  Mời nhận việc
                </button>
              </div>
            </div>

            {/* 4-Column Tabular Metrics Strip */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-white/[0.08]">
              <div>
                <p className="text-xs text-slate-400">Mức giá theo giờ</p>
                <p className="text-xl font-bold text-slate-50 tabular-nums-mono mt-1">
                  {formatMoney(person.hourlyRate)}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Tổng giá trị đã thực hiện</p>
                <p className="text-xl font-bold text-semantic-emerald tabular-nums-mono mt-1">
                  {person.totalEarnings}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Dự án hoàn thành</p>
                <p className="text-xl font-bold text-slate-50 tabular-nums-mono mt-1">
                  {person.completedProjects} dự án
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Tỷ lệ khách hàng thuê lại</p>
                <p className="text-xl font-bold text-cobalt-400 tabular-nums-mono mt-1">
                  {person.rehireRate}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Detail Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Bio, Portfolio, Client Reviews */}
          <div className="lg:col-span-8 space-y-6">
            <section className="p-6 sm:p-8 rounded-xl bg-obsidian-850 border border-white/[0.08] space-y-4">
              <h2 className="text-base font-bold text-slate-100 pb-3 border-b border-white/[0.06]">
                Giới thiệu năng lực chuyên môn
              </h2>
              <p className="text-sm sm:text-[15px] text-slate-300 leading-relaxed">{person.bio}</p>
            </section>

            {/* Portfolio Case Studies */}
            <section className="p-6 sm:p-8 rounded-xl bg-obsidian-850 border border-white/[0.08] space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                <h2 className="text-base font-bold text-slate-100">Dự án tiêu biểu đã triển khai</h2>
                <span className="text-xs text-slate-400 tabular-nums-mono">
                  {person.portfolio.length} dự án
                </span>
              </div>

              {person.portfolio.length === 0 ? (
                <p className="text-sm text-slate-400 py-4">
                  Chuyên gia chưa bổ sung dự án tiêu biểu vào hồ sơ.
                </p>
              ) : (
                <div className="divide-y divide-white/[0.06]">
                  {person.portfolio.map((item, idx) => (
                    <div key={idx} className="py-5 first:pt-0 last:pb-0 space-y-2">
                      <div className="flex items-start gap-2.5">
                        <FolderGit2 className="w-4 h-4 text-cobalt-400 shrink-0 mt-1" />
                        <div className="space-y-1.5">
                          <h3 className="text-sm sm:text-base font-bold text-slate-100">
                            {item.title}
                          </h3>
                          <p className="text-sm text-slate-300 leading-relaxed">{item.outcome}</p>
                          <p className="text-xs text-slate-400 tabular-nums-mono pt-1">
                            {item.stack}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Attributable Client Reviews */}
            <section className="p-6 sm:p-8 rounded-xl bg-obsidian-850 border border-white/[0.08] space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                <h2 className="text-base font-bold text-slate-100">Nhận xét từ doanh nghiệp đã thuê</h2>
                <span className="text-xs text-slate-400 tabular-nums-mono">
                  {person.reviews.length} đánh giá nổi bật
                </span>
              </div>

              {person.reviews.length === 0 ? (
                <p className="text-sm text-slate-400 py-4">Chưa có nhận xét nào được ghi nhận.</p>
              ) : (
                <div className="divide-y divide-white/[0.06]">
                  {person.reviews.map((rev, idx) => (
                    <div key={idx} className="py-5 first:pt-0 last:pb-0 space-y-2.5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div>
                          <p className="text-sm font-bold text-slate-100">{rev.author}</p>
                          <p className="text-xs text-slate-400">{rev.company}</p>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-400 tabular-nums-mono">
                          <span className="inline-flex items-center gap-1 text-semantic-amber font-semibold">
                            <Star className="w-3.5 h-3.5 fill-semantic-amber" />
                            {rev.rating.toFixed(1)}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{rev.date}</span>
                        </div>
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Right Sidebar: Skills & Other Specialists */}
          <aside className="lg:col-span-4 space-y-6">
            <section className="p-6 rounded-xl bg-obsidian-850 border border-white/[0.08] space-y-4">
              <h2 className="text-sm font-bold text-slate-100 pb-3 border-b border-white/[0.06]">
                Kỹ năng cốt lõi
              </h2>
              <div className="flex flex-wrap gap-2">
                {person.skills.map((skill) => (
                  <Link
                    key={skill}
                    to={`/jobs?skill=${encodeURIComponent(skill)}`}
                    className="px-3 py-1.5 rounded-md bg-obsidian-950 border border-white/[0.08] hover:border-cobalt-500/50 text-xs font-medium text-slate-200 hover:text-cobalt-400 transition-colors"
                  >
                    {skill}
                  </Link>
                ))}
              </div>
            </section>

            <section className="p-6 rounded-xl bg-obsidian-850 border border-white/[0.08] space-y-4">
              <h2 className="text-sm font-bold text-slate-100 pb-3 border-b border-white/[0.06]">
                Chuyên gia khác trên ViecTech
              </h2>
              <div className="space-y-3.5">
                {freelancers
                  .filter((other) => other.id !== person.id)
                  .slice(0, 3)
                  .map((other) => (
                    <Link
                      key={other.id}
                      to={`/freelancers/${other.id}`}
                      className="flex items-center gap-3 group"
                    >
                      <Avatar src={other.avatar} name={other.name} size="sm" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-slate-200 group-hover:text-cobalt-400 transition-colors truncate">
                          {other.name}
                        </p>
                        <p className="text-xs text-slate-400 truncate">{other.role}</p>
                      </div>
                    </Link>
                  ))}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
