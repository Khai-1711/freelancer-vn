import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Info, AlertCircle, Send, Briefcase } from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import Avatar from './Avatar';

/**
 * Lớp phủ giao diện toàn cục thay thế cho window.alert():
 * - Hàng đợi thông báo Toast ở góc phải dưới
 * - Modal soạn tin nhắn trực tiếp tới chuyên gia
 * - Modal gửi lời mời nhận việc gắn với dự án cụ thể
 */
export default function GlobalOverlays() {
  const {
    toasts,
    dismissToast,
    modalState,
    closeModal,
    sendMessage,
    sendHireInvite,
    projects,
    messages,
    formatMoney,
  } = useMarketplace();

  const [messageText, setMessageText] = useState('');
  const [messageError, setMessageError] = useState('');

  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id || '');
  const [proposedRate, setProposedRate] = useState('');
  const [hireNote, setHireNote] = useState('');
  const [hireError, setHireError] = useState('');

  useEffect(() => {
    if (modalState.type === 'message') {
      setMessageText('');
      setMessageError('');
    }
    if (modalState.type === 'hire' && modalState.freelancer) {
      setSelectedProjectId(projects[0]?.id || '');
      setProposedRate(String(modalState.freelancer.hourlyRate || 500000));
      setHireNote('');
      setHireError('');
    }
  }, [modalState, projects]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && modalState.type) {
        closeModal();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [modalState.type, closeModal]);

  const freelancerHistory = modalState.freelancer
    ? messages.filter((m) => m.freelancerId === modalState.freelancer.id)
    : [];

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (messageText.trim().length < 5) {
      setMessageError('Vui lòng nhập nội dung trao đổi tối thiểu 5 ký tự.');
      return;
    }
    sendMessage(modalState.freelancer, messageText);
  };

  const handleHireSubmit = (e) => {
    e.preventDefault();
    if (hireNote.trim().length < 10) {
      setHireError('Vui lòng mô tả ngắn gọn phạm vi công việc tối thiểu 10 ký tự.');
      return;
    }
    sendHireInvite(modalState.freelancer, {
      projectId: selectedProjectId,
      proposedRate: Number(proposedRate) || modalState.freelancer.hourlyRate,
      note: hireNote,
    });
  };

  return (
    <>
      {/* Toast Notifications Viewport */}
      <div
        aria-live="polite"
        className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-[calc(100vw-2.5rem)] pointer-events-none"
      >
        {toasts.map((toast) => {
          const iconMap = {
            success: <CheckCircle2 className="w-4 h-4 text-semantic-emerald shrink-0" />,
            error: <AlertCircle className="w-4 h-4 text-semantic-danger shrink-0" />,
            info: <Info className="w-4 h-4 text-cobalt-400 shrink-0" />,
          };
          return (
            <div
              key={toast.id}
              className="pointer-events-auto flex items-start gap-3 px-4 py-3.5 rounded-xl bg-obsidian-850 border border-white/10 shadow-modal text-sm text-slate-100"
            >
              <span className="mt-0.5">{iconMap[toast.variant] || iconMap.info}</span>
              <span className="flex-1 leading-snug">{toast.message}</span>
              <button
                type="button"
                onClick={() => dismissToast(toast.id)}
                className="text-slate-400 hover:text-white transition-colors p-0.5"
                aria-label="Đóng thông báo"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Direct Message Modal */}
      {modalState.type === 'message' && modalState.freelancer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="message-modal-title"
        >
          <div className="fixed inset-0 bg-black/75 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative w-full max-w-lg rounded-2xl bg-obsidian-850 border border-white/10 shadow-modal overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-3 min-w-0">
                <Avatar src={modalState.freelancer.avatar} name={modalState.freelancer.name} size="sm" />
                <div className="min-w-0">
                  <h2 id="message-modal-title" className="text-base font-bold text-slate-50 truncate">
                    Nhắn tin cho {modalState.freelancer.name}
                  </h2>
                  <p className="text-xs text-slate-400 truncate">{modalState.freelancer.responseTime}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="w-9 h-9 inline-flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
                aria-label="Đóng hộp thoại"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleMessageSubmit} className="p-6 space-y-5">
              {freelancerHistory.length > 0 && (
                <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                  <p className="text-xs font-medium text-slate-400">Tin nhắn đã gửi trong phiên này</p>
                  {freelancerHistory.map((m) => (
                    <div key={m.id} className="p-3 rounded-lg bg-obsidian-900 border border-white/[0.06] text-xs text-slate-200">
                      <p>{m.text}</p>
                      <span className="text-slate-500 mt-1 block">{m.sentAt}</span>
                    </div>
                  ))}
                </div>
              )}

              <div>
                <label htmlFor="dm-textarea" className="block text-sm font-medium text-slate-200 mb-2">
                  Nội dung tin nhắn
                </label>
                <textarea
                  id="dm-textarea"
                  rows={4}
                  value={messageText}
                  onChange={(e) => {
                    setMessageText(e.target.value);
                    if (messageError) setMessageError('');
                  }}
                  placeholder={`Xin chào ${modalState.freelancer.name}, bên mình đang cần trao đổi về yêu cầu kỹ thuật cho dự án...`}
                  className="w-full rounded-lg bg-obsidian-950 border border-white/10 focus:border-cobalt-500 px-3.5 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition-colors"
                />
                {messageError && <p className="text-xs text-semantic-danger mt-1.5">{messageError}</p>}
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2.5 rounded-lg border border-white/10 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.04] transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cobalt-500 hover:bg-cobalt-600 text-white text-sm font-semibold transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Gửi tin nhắn
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Hire / Invite Modal */}
      {modalState.type === 'hire' && modalState.freelancer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="hire-modal-title"
        >
          <div className="fixed inset-0 bg-black/75 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative w-full max-w-lg rounded-2xl bg-obsidian-850 border border-white/10 shadow-modal overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-3 min-w-0">
                <Avatar src={modalState.freelancer.avatar} name={modalState.freelancer.name} size="sm" />
                <div className="min-w-0">
                  <h2 id="hire-modal-title" className="text-base font-bold text-slate-50 truncate">
                    Mời {modalState.freelancer.name} nhận việc
                  </h2>
                  <p className="text-xs text-slate-400 tabular-nums-mono">
                    Mức tham khảo: {formatMoney(modalState.freelancer.hourlyRate)} / giờ
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="w-9 h-9 inline-flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
                aria-label="Đóng hộp thoại"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleHireSubmit} className="p-6 space-y-4">
              <div>
                <label htmlFor="hire-project" className="block text-sm font-medium text-slate-200 mb-1.5">
                  Chọn dự án muốn mời hợp tác
                </label>
                <select
                  id="hire-project"
                  value={selectedProjectId}
                  onChange={(e) => setSelectedProjectId(e.target.value)}
                  className="w-full rounded-lg bg-obsidian-950 border border-white/10 focus:border-cobalt-500 px-3.5 py-2.5 text-sm text-slate-100 outline-none"
                >
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      #{p.id} — {p.title}
                    </option>
                  ))}
                  <option value="direct-contract">Hợp đồng thuê trực tiếp theo giờ</option>
                </select>
              </div>

              <div>
                <label htmlFor="hire-rate" className="block text-sm font-medium text-slate-200 mb-1.5">
                  Ngân sách hoặc mức giá đề xuất (VNĐ)
                </label>
                <input
                  id="hire-rate"
                  type="number"
                  min={100000}
                  step={50000}
                  value={proposedRate}
                  onChange={(e) => setProposedRate(e.target.value)}
                  className="w-full rounded-lg bg-obsidian-950 border border-white/10 focus:border-cobalt-500 px-3.5 py-2.5 text-sm text-slate-100 tabular-nums-mono outline-none"
                />
              </div>

              <div>
                <label htmlFor="hire-note" className="block text-sm font-medium text-slate-200 mb-1.5">
                  Lời nhắn và mốc thời gian kỳ vọng
                </label>
                <textarea
                  id="hire-note"
                  rows={4}
                  value={hireNote}
                  onChange={(e) => {
                    setHireNote(e.target.value);
                    if (hireError) setHireError('');
                  }}
                  placeholder="Mô tả mục tiêu bàn giao, khung thời gian bắt đầu và hình thức thanh toán milestone..."
                  className="w-full rounded-lg bg-obsidian-950 border border-white/10 focus:border-cobalt-500 px-3.5 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none"
                />
                {hireError && <p className="text-xs text-semantic-danger mt-1.5">{hireError}</p>}
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2.5 rounded-lg border border-white/10 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.04] transition-colors"
                >
                  Đóng
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cobalt-500 hover:bg-cobalt-600 text-white text-sm font-semibold transition-colors"
                >
                  <Briefcase className="w-4 h-4" />
                  Gửi lời mời hợp tác
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
