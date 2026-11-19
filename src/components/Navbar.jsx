import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, LogOut, User, Sliders, Plus } from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import Avatar from './Avatar';

// Danh sách 4 mục điều hướng cốt lõi trên thanh Top Bar
const NAV_LINKS = [
  { label: 'Tìm việc', path: '/jobs' },
  { label: 'Chuyên gia', path: '/hire' },
  { label: 'Đăng dự án', path: '/post-project' },
  { label: 'Thiết lập hồ sơ', path: '/onboarding' },
];

/**
 * Thanh điều hướng chính theo bố cục 3 vùng (Thương hiệu — Liên kết — Tài khoản)
 * kết hợp Mobile Slide-Over Drawer cho màn hình nhỏ hơn 1024px.
 */
export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useMarketplace();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMobileOpen(false);
    setAccountMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        setAccountMenuOpen(false);
      }
    };
    const handleOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setAccountMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKey);
    document.addEventListener('mousedown', handleOutside);
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.removeEventListener('mousedown', handleOutside);
    };
  }, []);

  const isLinkActive = (path) => {
    if (path === '/jobs') {
      return location.pathname === '/jobs' || location.pathname.startsWith('/projects');
    }
    if (path === '/hire') {
      return location.pathname === '/hire' || location.pathname.startsWith('/freelancers');
    }
    return location.pathname === path;
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-obsidian-950/90 backdrop-blur-md border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-element clean brand wordmark */}
          <Link
            to="/"
            className="text-lg font-extrabold tracking-tight text-slate-50 hover:text-cobalt-400 transition-colors duration-150 whitespace-nowrap shrink-0"
          >
            ViecTech
          </Link>

          {/* Zone 2: 4 single-line navigation links */}
          <nav
            aria-label="Điều hướng chính"
            className="hidden lg:flex items-center gap-7"
          >
            {NAV_LINKS.map((item) => {
              const active = isLinkActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative py-2 text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 ${
                    active
                      ? 'text-slate-50'
                      : 'text-slate-400 hover:text-slate-100'
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute inset-x-0 -bottom-[17px] h-[2px] bg-cobalt-500" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Single primary action / Account trigger + Mobile hamburger */}
          <div className="flex items-center gap-3 shrink-0">
            {currentUser ? (
              <div className="hidden lg:block relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setAccountMenuOpen((o) => !o)}
                  className="flex items-center gap-2.5 pl-1.5 pr-3 py-1.5 rounded-lg bg-obsidian-850 hover:bg-obsidian-800 border border-white/[0.08] text-sm font-medium text-slate-100 transition-colors duration-150 whitespace-nowrap shrink-0"
                  aria-expanded={accountMenuOpen}
                  aria-haspopup="menu"
                >
                  <Avatar src={currentUser.avatar} name={currentUser.name} size="sm" className="w-7 h-7" />
                  <span className="max-w-[140px] truncate">{currentUser.name}</span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {accountMenuOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 mt-2 w-56 rounded-xl bg-obsidian-850 border border-white/10 shadow-modal py-1.5 z-50"
                  >
                    <div className="px-3.5 py-2.5 border-b border-white/[0.06]">
                      <p className="text-sm font-semibold text-slate-100 truncate">{currentUser.name}</p>
                      <p className="text-xs text-slate-400 truncate mt-0.5">{currentUser.email}</p>
                    </div>
                    <Link
                      to={`/freelancers/${currentUser.freelancerId || 'phu-nguyen'}`}
                      role="menuitem"
                      className="flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/[0.04] transition-colors"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      Hồ sơ cá nhân
                    </Link>
                    <Link
                      to="/onboarding"
                      role="menuitem"
                      className="flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/[0.04] transition-colors"
                    >
                      <Sliders className="w-4 h-4 text-slate-400" />
                      Cập nhật kỹ năng & giá
                    </Link>
                    <Link
                      to="/post-project"
                      role="menuitem"
                      className="flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/[0.04] transition-colors"
                    >
                      <Plus className="w-4 h-4 text-slate-400" />
                      Đăng dự án mới
                    </Link>
                    <div className="my-1 border-t border-white/[0.06]" />
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        logout();
                        navigate('/');
                      }}
                      className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-rose-400 hover:bg-rose-500/10 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-4">
                <Link
                  to="/login"
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-150 whitespace-nowrap shrink-0"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/signup?role=freelancer"
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-cobalt-500 hover:bg-cobalt-600 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0"
                >
                  Đăng ký
                </Link>
              </div>
            )}

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg bg-obsidian-850 border border-white/[0.08] text-slate-200 hover:text-white hover:bg-obsidian-800 transition-colors"
              aria-label="Mở menu điều hướng"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Over Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu điều hướng">
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-obsidian-900 border-l border-white/10 shadow-modal flex flex-col">
            <div className="flex items-center justify-between px-5 h-16 border-b border-white/[0.08]">
              <span className="text-lg font-extrabold tracking-tight text-slate-50">ViecTech</span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center w-11 h-11 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors"
                aria-label="Đóng menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 px-4 py-5 space-y-1 overflow-y-auto">
              {NAV_LINKS.map((item) => {
                const active = isLinkActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-4 min-h-[46px] rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? 'bg-cobalt-500/15 text-cobalt-400'
                        : 'text-slate-300 hover:bg-white/[0.04] hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <Link
                to={`/freelancers/${currentUser?.freelancerId || 'phu-nguyen'}`}
                className="flex items-center px-4 min-h-[46px] rounded-lg text-sm font-medium text-slate-300 hover:bg-white/[0.04] hover:text-white transition-colors"
              >
                Hồ sơ chuyên gia
              </Link>
            </nav>

            <div className="p-4 border-t border-white/[0.08] space-y-2.5">
              {currentUser ? (
                <>
                  <div className="flex items-center gap-3 px-2 py-2">
                    <Avatar src={currentUser.avatar} name={currentUser.name} size="sm" />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-100 truncate">{currentUser.name}</p>
                      <p className="text-xs text-slate-400 truncate">{currentUser.email}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setMobileOpen(false);
                      navigate('/');
                    }}
                    className="w-full min-h-[44px] flex items-center justify-center gap-2 rounded-lg border border-rose-500/30 bg-rose-500/10 text-rose-400 text-sm font-semibold hover:bg-rose-500/20 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Đăng xuất
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="w-full min-h-[44px] flex items-center justify-center rounded-lg bg-cobalt-500 hover:bg-cobalt-600 text-white text-sm font-semibold transition-colors"
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    to="/signup"
                    className="w-full min-h-[44px] flex items-center justify-center rounded-lg border border-white/10 bg-obsidian-850 hover:bg-obsidian-800 text-slate-200 text-sm font-semibold transition-colors"
                  >
                    Tạo tài khoản miễn phí
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
