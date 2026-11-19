import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Star,
  MapPin,
  ShieldCheck,
  MessageSquare,
  Briefcase,
  RotateCcw,
  X,
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import Avatar from '../components/Avatar';

const SPECIALIZATIONS = [
  'Tất cả',
  'Fullstack & Cloud',
  'UI/UX Design',
  'AI & Data',
  'Mobile & DevOps',
];

/**
 * Trang Danh bạ Chuyên gia (/hire):
 * Cho phép lọc chuyên gia theo nhóm kỹ năng, từ khóa và trạng thái sẵn sàng nhận việc,
 * đồng thời mở Modal nhắn tin hoặc mời hợp tác trực tiếp.
 */
export default function Hire() {
  const { freelancers, formatMoney, openMessageModal, openHireModal } = useMarketplace();

  const [searchTerm, setSearchTerm] = useState('');
  const [specialization, setSpecialization] = useState('Tất cả');
  const [availableOnly, setAvailableOnly] = useState(false);

  const filteredFreelancers = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return freelancers.filter((f) => {
      if (specialization !== 'Tất cả' && f.specialization !== specialization) return false;
      if (availableOnly && !f.available) return false;
      if (q) {
        const hay = [f.name, f.handle, f.role, f.bio, f.location, ...f.skills]
          .join(' ')
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [freelancers, searchTerm, specialization, availableOnly]);

  const resetFilters = () => {
    setSearchTerm('');
    setSpecialization('Tất cả');
    setAvailableOnly(false);
  };

  return (
    <div>
      {/* Header & Search */}
      <div className="bg-obsidian-900/60 border-b border-white/[0.08] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2">
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400">
                <Link to="/" className="hover:text-slate-200 transition-colors">
                  Trang chủ
                </Link>
                <span aria-hidden="true">/</span>
                <span className="text-slate-200 font-medium">Chuyên gia</span>
              </nav>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-50">
                Danh bạ Chuyên gia Công nghệ
              </h1>
              <p className="text-sm text-slate-400 max-w-2xl">
                Duyệt hồ sơ năng lực thực tế, nhắn tin trao đổi trực tiếp hoặc gửi lời mời hợp tác ngay cho dự án của bạn.
              </p>
            </div>

            <div className="w-full lg:w-96 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm theo tên, vị trí hoặc kỹ năng (Figma, AWS...)"
                aria-label="Tìm kiếm chuyên gia"
                className="w-full rounded-lg bg-obsidian-950 border border-white/10 focus:border-cobalt-500 pl-10 pr-9 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition-colors"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white"
                  aria-label="Xóa từ khóa"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Interactive Filter Tabs + Availability Switch */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-lg bg-obsidian-950 border border-white/[0.08] w-fit">
              {SPECIALIZATIONS.map((spec) => (
                <button
                  key={spec}
                  type="button"
                  onClick={() => setSpecialization(spec)}
                  className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                    specialization === spec
                      ? 'bg-cobalt-500 text-white'
                      : 'text-slate-400 hover:text-slate-100'
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>

            <label className="inline-flex items-center gap-2.5 text-sm text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={availableOnly}
                onChange={(e) => setAvailableOnly(e.target.checked)}
                className="w-4 h-4 rounded accent-cobalt-500"
              />
              <span>Chỉ hiển thị chuyên gia sẵn sàng nhận việc</span>
            </label>
          </div>
        </div>
      </div>

      {/* Freelancer Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-5">
        <p className="text-sm text-slate-400">
          Tìm thấy{' '}
          <span className="font-bold text-slate-100 tabular-nums-mono">
            {filteredFreelancers.length}
          </span>{' '}
          chuyên gia phù hợp
        </p>

        {filteredFreelancers.length === 0 ? (
          <div className="p-12 rounded-xl bg-obsidian-850 border border-white/[0.08] text-center space-y-4">
            <p className="text-lg font-bold text-slate-100">Không tìm thấy chuyên gia phù hợp</p>
            <p className="text-sm text-slate-400">
              Thử đổi nhóm chuyên môn hoặc bỏ bộ lọc trạng thái sẵn sàng để xem toàn bộ danh bạ.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cobalt-500 hover:bg-cobalt-600 text-white text-sm font-semibold transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Đặt lại bộ lọc
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFreelancers.map((person) => (
              <article
                key={person.id}
                className="p-6 rounded-xl bg-obsidian-850 border border-white/[0.08] hover:border-white/[0.16] transition-colors space-y-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-4 min-w-0">
                    <Avatar src={person.avatar} name={person.name} size="lg" />
                    <div className="space-y-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                        <h2 className="text-lg font-bold text-slate-50">
                          <Link
                            to={`/freelancers/${person.id}`}
                            className="hover:text-cobalt-400 transition-colors"
                          >
                            {person.name}
                          </Link>
                        </h2>
                        <span className="text-xs text-slate-500 tabular-nums-mono">{person.handle}</span>
                        {person.verified && (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-cobalt-400">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            Xác minh năng lực
                          </span>
                        )}
                      </div>

                      <p className="text-sm font-medium text-slate-300">{person.role}</p>

                      <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1 text-xs text-slate-400 pt-1">
                        <span className="inline-flex items-center gap-1 text-slate-200 font-semibold tabular-nums-mono">
                          <Star className="w-3.5 h-3.5 text-semantic-amber fill-semantic-amber" />
                          {person.rating.toFixed(1)} ({person.reviewCount} đánh giá)
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-500" />
                          {person.location}
                        </span>
                        <span className="tabular-nums-mono">{person.completedProjects} dự án hoàn thành</span>
                      </div>
                    </div>
                  </div>

                  <div className="sm:text-right shrink-0">
                    <div className="text-lg font-bold text-slate-50 tabular-nums-mono">
                      {formatMoney(person.hourlyRate)} / giờ
                    </div>
                    <p
                      className={`text-xs font-medium mt-1 ${
                        person.available ? 'text-semantic-emerald' : 'text-slate-500'
                      }`}
                    >
                      {person.available ? 'Sẵn sàng nhận dự án mới' : 'Đang bận dự án hiện tại'}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">{person.bio}</p>

                <p className="text-xs text-slate-400">{person.skills.join(' · ')}</p>

                <div className="pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <Link
                    to={`/freelancers/${person.id}`}
                    className="text-sm font-medium text-cobalt-400 hover:text-cobalt-300 transition-colors"
                  >
                    Xem hồ sơ &amp; dự án tiêu biểu
                  </Link>

                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => openMessageModal(person)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-obsidian-900 hover:bg-obsidian-800 border border-white/10 text-xs font-semibold text-slate-200 transition-colors whitespace-nowrap"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      Nhắn tin
                    </button>
                    <button
                      type="button"
                      onClick={() => openHireModal(person)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cobalt-500 hover:bg-cobalt-600 text-white text-xs font-semibold transition-colors whitespace-nowrap"
                    >
                      <Briefcase className="w-3.5 h-3.5" />
                      Mời nhận việc
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
