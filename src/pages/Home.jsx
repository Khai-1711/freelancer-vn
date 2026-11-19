import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Code2,
  Smartphone,
  Layers,
  Cpu,
  Server,
  TrendingUp,
  ShieldCheck,
  Star,
} from 'lucide-react';
import { CATEGORIES, HERO_MEDIA } from '../data/mockData';
import { useMarketplace } from '../context/MarketplaceContext';
import Avatar from '../components/Avatar';

const ICON_MAP = {
  Code2,
  Smartphone,
  Layers,
  Cpu,
  Server,
  TrendingUp,
};

const WORKFLOW_STEPS = [
  {
    num: '01.',
    title: 'Đăng yêu cầu kỹ thuật rõ ràng',
    desc: 'Mô tả phạm vi sản phẩm, chọn bộ kỹ năng bắt buộc và thiết lập khung ngân sách minh bạch chỉ trong 4 bước ngắn gọn.',
  },
  {
    num: '02.',
    title: 'So sánh đề xuất từ chuyên gia',
    desc: 'Nhận báo giá kèm lộ trình thực hiện từ các kỹ sư và nhà thiết kế đã qua xác minh hồ sơ thực chiến.',
  },
  {
    num: '03.',
    title: 'Ký quỹ theo từng Milestone',
    desc: 'Ngân sách được bảo vệ từng chặng và chỉ giải ngân khi bạn đã nghiệm thu mã nguồn hoặc thiết kế đạt chuẩn.',
  },
  {
    num: '04.',
    title: 'Bàn giao sạch & Đánh giá minh bạch',
    desc: 'Nhận đầy đủ tài liệu kỹ thuật, mã nguồn gốc và ghi nhận đánh giá thực tế giúp hệ sinh thái ngày càng chất lượng.',
  },
];

/**
 * Trang chủ ViecTech:
 * - Hero bất đối xứng kèm dự án nổi bật mới nhất lấy trực tiếp từ state
 * - Dải chỉ số KPI thẳng hàng (tabular-nums)
 * - Danh mục chuyên môn bấm lọc thẳng sang /jobs?category=...
 * - Quy trình hợp tác 4 bước và danh sách chuyên gia xác minh
 */
export default function Home() {
  const { projects, freelancers, formatBudgetRange } = useMarketplace();
  const featuredProjects = projects.slice(0, 3);
  const topProject = projects[0];

  const getCategoryCount = (catId) =>
    projects.filter((p) => p.category === catId).length;

  return (
    <div>
      {/* Hero Section — Balanced Asymmetric Split */}
      <section className="border-b border-white/[0.08] bg-obsidian-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-12 lg:pt-20 lg:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            {/* Left Proposition */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <p className="text-sm font-medium text-cobalt-400">
                  Sàn dự án công nghệ &amp; thiết kế số tại Việt Nam
                </p>

                <h1 className="text-[clamp(2.25rem,4.2vw,3.6rem)] font-extrabold tracking-tight leading-[1.12] text-slate-50 text-balance">
                  Kết nối đúng kỹ sư giỏi cho dự án công nghệ của bạn
                </h1>

                <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
                  ViecTech giúp doanh nghiệp rút ngắn thời gian tuyển dụng nhân sự ngắn hạn và giúp lập trình viên, Product Designer tiếp cận dự án có ngân sách minh bạch, thanh toán bảo vệ theo milestone.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <Link
                  to="/post-project"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-cobalt-500 hover:bg-cobalt-600 text-white text-sm font-semibold transition-colors duration-150 whitespace-nowrap"
                >
                  Đăng dự án miễn phí
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/signup?role=freelancer"
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg bg-obsidian-850 hover:bg-obsidian-800 border border-white/10 text-slate-200 text-sm font-semibold transition-colors duration-150 whitespace-nowrap"
                >
                  Đăng ký tìm việc làm
                </Link>
              </div>
            </div>

            {/* Right Editorial Studio Visual with Measured Scrim */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-obsidian-850 flex-1 min-h-[280px] lg:min-h-full">
                <img
                  src={HERO_MEDIA}
                  alt="Không gian làm việc kỹ thuật phần mềm hiện đại tại TP. Hồ Chí Minh"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover lg:absolute lg:inset-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/95 via-obsidian-950/45 to-transparent" />

                {topProject && (
                  <div className="absolute inset-x-0 bottom-0 p-6 space-y-2.5">
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <span className="text-cobalt-400 font-semibold">Dự án vừa đăng</span>
                      <span aria-hidden="true">·</span>
                      <span>{topProject.postedAt}</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums-mono">{topProject.bids.length} chào giá</span>
                    </div>
                    <Link
                      to={`/projects/${topProject.id}`}
                      className="block text-base sm:text-lg font-bold text-white hover:text-cobalt-400 transition-colors leading-snug"
                    >
                      {topProject.title}
                    </Link>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-sm font-semibold text-semantic-emerald tabular-nums-mono">
                        {formatBudgetRange(topProject, { compact: true })}
                      </span>
                      <Link
                        to={`/projects/${topProject.id}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-200 hover:text-white transition-colors whitespace-nowrap"
                      >
                        Xem chi tiết
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Full-width 4-column KPI strip below Hero Split */}
          <div className="mt-12 pt-10 border-t border-white/[0.08] grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-slate-50 tabular-nums-mono">
                14.800+
              </div>
              <p className="text-sm text-slate-400 mt-1">Chuyên gia công nghệ đã xác minh</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-slate-50 tabular-nums-mono">
                98.4%
              </div>
              <p className="text-sm text-slate-400 mt-1">Tỷ lệ hoàn thành đúng mốc bàn giao</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-semantic-emerald tabular-nums-mono">
                420B+ VNĐ
              </div>
              <p className="text-sm text-slate-400 mt-1">Tổng giá trị hợp đồng qua Milestone</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-slate-50 tabular-nums-mono">
                &lt; 2 giờ
              </div>
              <p className="text-sm text-slate-400 mt-1">Thời gian nhận chào giá đầu tiên</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories — Interactive Filter Links */}
      <section className="py-16 lg:py-20 border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div className="space-y-1.5">
              <p className="text-sm font-medium text-cobalt-400">Lĩnh vực chuyên môn</p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-50 text-balance">
                Khám phá dự án theo nhóm kỹ năng
              </h2>
            </div>
            <Link
              to="/jobs"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-white transition-colors whitespace-nowrap"
            >
              Xem toàn bộ danh sách việc làm
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CATEGORIES.map((cat) => {
              const Icon = ICON_MAP[cat.icon] || Code2;
              const liveCount = getCategoryCount(cat.id);
              return (
                <Link
                  key={cat.id}
                  to={`/jobs?category=${cat.id}`}
                  className="group p-6 rounded-xl bg-obsidian-850 hover:bg-obsidian-800 border border-white/[0.08] hover:border-white/[0.16] transition-colors duration-150 flex flex-col justify-between gap-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="w-10 h-10 rounded-lg bg-obsidian-950 border border-white/[0.08] text-cobalt-400 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs text-slate-400 tabular-nums-mono">
                      {liveCount > 0 ? `${liveCount} dự án mở` : 'Đang cập nhật'}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-100 group-hover:text-cobalt-400 transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Live Projects from State */}
      <section className="py-16 lg:py-20 border-b border-white/[0.08] bg-obsidian-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div className="space-y-1.5">
              <p className="text-sm font-medium text-cobalt-400">Cập nhật trực tiếp</p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-50 text-balance">
                Các dự án công nghệ nổi bật mới đăng
              </h2>
            </div>
            <Link
              to="/jobs"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-white transition-colors whitespace-nowrap"
            >
              Lọc theo kỹ năng &amp; ngân sách
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className="p-6 rounded-xl bg-obsidian-850 border border-white/[0.08] hover:border-white/[0.16] transition-colors flex flex-col justify-between gap-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="text-slate-300 font-medium">{project.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.postedAt}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-100 leading-snug">
                    <Link
                      to={`/projects/${project.id}`}
                      className="hover:text-cobalt-400 transition-colors"
                    >
                      {project.title}
                    </Link>
                  </h3>

                  <p className="text-sm text-slate-400 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>

                  <p className="text-xs text-slate-400 pt-1">
                    {project.skills.slice(0, 4).join(' · ')}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
                  <div>
                    <div className="text-base font-bold text-semantic-emerald tabular-nums-mono">
                      {formatBudgetRange(project, { compact: true })}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-semantic-emerald" />
                      <span>{project.bids.length} chào giá</span>
                    </div>
                  </div>
                  <Link
                    to={`/projects/${project.id}`}
                    className="px-3.5 py-2 rounded-lg bg-obsidian-800 hover:bg-cobalt-500 text-slate-100 hover:text-white text-xs font-semibold border border-white/[0.08] hover:border-cobalt-500 transition-colors whitespace-nowrap"
                  >
                    Đặt giá thầu
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial 4-Step Mechanism + Adjacent Proof */}
      <section className="py-16 lg:py-20 border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12 space-y-2">
            <p className="text-sm font-medium text-cobalt-400">Quy trình hợp tác</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-50 text-balance">
              Từ bản mô tả ban đầu đến sản phẩm bàn giao hoàn thiện
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {WORKFLOW_STEPS.map((step) => (
              <div key={step.num} className="space-y-3 border-t border-white/10 pt-5">
                <span className="text-sm font-semibold text-cobalt-400 tabular-nums-mono block">
                  {step.num}
                </span>
                <h3 className="text-base font-bold text-slate-100">{step.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Adjacent Proof: Verified Specialists */}
          <div className="mt-16 pt-12 border-t border-white/[0.08]">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <h3 className="text-xl font-bold text-slate-100">
                  Chuyên gia tiêu biểu đang sẵn sàng nhận dự án
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  Hồ sơ được kiểm duyệt năng lực thực tế và đánh giá trực tiếp từ doanh nghiệp đã thuê.
                </p>
              </div>
              <Link
                to="/hire"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-cobalt-400 hover:text-cobalt-300 transition-colors whitespace-nowrap"
              >
                Xem toàn bộ chuyên gia
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {freelancers.slice(0, 3).map((person) => (
                <Link
                  key={person.id}
                  to={`/freelancers/${person.id}`}
                  className="p-5 rounded-xl bg-obsidian-850 hover:bg-obsidian-800 border border-white/[0.08] transition-colors flex items-start gap-4"
                >
                  <Avatar src={person.avatar} name={person.name} size="md" />
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-bold text-slate-100 truncate">{person.name}</p>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-semantic-amber tabular-nums-mono shrink-0">
                        <Star className="w-3.5 h-3.5 fill-semantic-amber" />
                        {person.rating.toFixed(1)}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 truncate">{person.role}</p>
                    <p className="text-xs text-slate-500 pt-1">
                      {person.location} · {person.completedProjects} dự án
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Conversion CTA */}
      <section className="py-16 lg:py-20 bg-obsidian-900/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-50 text-balance">
            Bắt đầu triển khai sản phẩm công nghệ ngay hôm nay
          </h2>
          <p className="text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
            Đăng yêu cầu miễn phí để nhận đề xuất kỹ thuật trong vòng 2 giờ, hoặc hoàn thiện hồ sơ chuyên gia để ứng tuyển vào các dự án chất lượng cao.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <Link
              to="/post-project"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-cobalt-500 hover:bg-cobalt-600 text-white text-sm font-semibold transition-colors whitespace-nowrap"
            >
              Đăng dự án ngay
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/signup?role=freelancer"
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-lg bg-obsidian-850 hover:bg-obsidian-800 border border-white/10 text-slate-200 text-sm font-semibold transition-colors whitespace-nowrap"
            >
              Đăng ký tìm việc ngay
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
