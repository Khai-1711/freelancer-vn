import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Coins } from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';

export default function Footer() {
  const { currency, toggleCurrency } = useMarketplace();

  return (
    <footer className="bg-obsidian-950 border-t border-white/[0.08] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/[0.06]">
          <div className="space-y-3">
            <Link to="/" className="text-lg font-extrabold tracking-tight text-slate-50 inline-block">
              ViecTech
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Sàn kết nối dự án phần mềm, thiết kế sản phẩm và kỹ thuật dữ liệu dành cho doanh nghiệp và chuyên gia công nghệ Việt Nam.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-100 mb-4">Dành cho Freelancer</h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/jobs" className="hover:text-slate-100 transition-colors">
                  Tìm dự án đang mở
                </Link>
              </li>
              <li>
                <Link to="/jobs?category=web-it" className="hover:text-slate-100 transition-colors">
                  Dự án Web &amp; Backend
                </Link>
              </li>
              <li>
                <Link to="/jobs?category=ai-data" className="hover:text-slate-100 transition-colors">
                  Dự án AI &amp; Dữ liệu
                </Link>
              </li>
              <li>
                <Link to="/onboarding" className="hover:text-slate-100 transition-colors">
                  Thiết lập hồ sơ chuyên gia
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-100 mb-4">Dành cho Doanh nghiệp</h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/post-project" className="hover:text-slate-100 transition-colors">
                  Đăng dự án miễn phí
                </Link>
              </li>
              <li>
                <Link to="/hire" className="hover:text-slate-100 transition-colors">
                  Duyệt danh bạ chuyên gia
                </Link>
              </li>
              <li>
                <Link to="/freelancers/phu-nguyen" className="hover:text-slate-100 transition-colors">
                  Hồ sơ chuyên gia xác minh
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-slate-100 transition-colors">
                  Đăng ký tài khoản doanh nghiệp
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-100 mb-4">Tài khoản &amp; Hiển thị</h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/login" className="hover:text-slate-100 transition-colors">
                  Đăng nhập hệ thống
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-slate-100 transition-colors">
                  Tạo tài khoản mới
                </Link>
              </li>
              <li className="pt-1">
                <button
                  type="button"
                  onClick={toggleCurrency}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-obsidian-850 hover:bg-obsidian-800 border border-white/[0.08] text-xs font-medium text-slate-200 transition-colors whitespace-nowrap"
                >
                  <Coins className="w-3.5 h-3.5 text-cobalt-400" />
                  <span>Tiền tệ: {currency === 'VND' ? 'VNĐ (₫)' : 'USD ($)'}</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 ViecTech Vietnam. Bảo lưu mọi quyền.</p>
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1.5 text-slate-400">
              <Globe className="w-3.5 h-3.5" />
              Tiếng Việt (VN)
            </span>
            <button
              type="button"
              onClick={toggleCurrency}
              className="text-slate-400 hover:text-slate-200 transition-colors"
            >
              Chuyển sang {currency === 'VND' ? 'USD' : 'VNĐ'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
