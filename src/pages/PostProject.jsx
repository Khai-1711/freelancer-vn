import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function PostProject() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('Thiết kế và lập trình website thương mại điện tử với Next.js & Stripe');
  const [desc, setDesc] = useState('Cần xây dựng website bán lẻ thời trang với các tính năng:\n- Trang chủ giới thiệu sản phẩm\n- Giỏ hàng và quy trình thanh toán tối ưu\n- Quản trị viên Dashboard quản lý đơn hàng\n- Tối ưu SEO và tốc độ tải trang dưới 1.5s');

  return (
    <div>
      <div className="bg-white border-b border-slate-200 py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#151d2a] text-center">Nói cho chúng tôi biết bạn cần làm gì</h1>
          <p className="text-xs sm:text-sm text-slate-600 text-center mt-1">Đăng dự án chỉ mất 2 phút và bắt đầu nhận chào giá từ các chuyên gia hàng đầu.</p>

          {/* Stepper */}
          <div className="flex items-center justify-between max-w-xl mx-auto mt-8 relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-slate-200 -z-0"></div>
            {[
              { num: 1, label: 'Công việc' },
              { num: 2, label: 'Kỹ năng' },
              { num: 3, label: 'Ngân sách' },
              { num: 4, label: 'Hoàn tất' },
            ].map(s => (
              <div key={s.num} className="flex flex-col items-center relative z-10 cursor-pointer" onClick={() => setStep(s.num)}>
                <div className={`w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center ring-4 ring-white ${step >= s.num ? 'bg-[#e60278] text-white' : 'bg-slate-200 text-slate-600'}`}>
                  {s.num}
                </div>
                <span className={`text-[11px] mt-1.5 ${step === s.num ? 'font-bold text-[#e60278]' : 'text-slate-500'}`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-card space-y-8">
          <div>
            <label className="block text-sm font-bold text-[#151d2a] mb-1.5">1. Đặt tên tiêu đề cho dự án của bạn</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-sm bg-[#f8f9fa] border border-slate-300 rounded-lg p-3.5 outline-none focus:border-[#007fed] focus:bg-white font-medium transition" 
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#151d2a] mb-1.5">2. Mô tả chi tiết yêu cầu công việc</label>
            <textarea 
              rows={5} 
              value={desc} 
              onChange={(e) => setDesc(e.target.value)}
              className="w-full text-sm bg-[#f8f9fa] border border-slate-300 rounded-lg p-3.5 outline-none focus:border-[#007fed] focus:bg-white transition leading-relaxed" 
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#151d2a] mb-1.5">3. Kỹ năng yêu cầu</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {['Next.js', 'Tailwind CSS', 'Node.js', 'Stripe'].map(k => (
                <span key={k} className="inline-flex items-center text-xs font-semibold bg-pink-50 text-[#e60278] border border-pink-200 px-3 py-1.5 rounded-lg">
                  {k} ✕
                </span>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <Link to="/" className="text-xs font-semibold text-slate-500 hover:text-slate-800">← Quay lại</Link>
            <button 
              onClick={() => {
                alert('Đã xuất bản dự án thành công!');
                navigate('/jobs');
              }}
              className="font-bold bg-[#e60278] hover:bg-[#c70066] text-white px-8 py-3.5 rounded-lg shadow-sm hover:shadow transition card-transition text-sm"
            >
              Đăng dự án và nhận chào giá ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
