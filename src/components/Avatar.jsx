import React, { useState } from 'react';

/**
 * Hiển thị ảnh đại diện người dùng kèm cơ chế dự phòng bằng 2 ký tự tên viết tắt
 * khi ảnh chưa có hoặc tải thất bại (đảm bảo không xuất hiện khung ảnh lỗi).
 */
export default function Avatar({ src, name = 'VT', size = 'md', className = '' }) {
  const [failed, setFailed] = useState(false);

  const sizeMap = {
    sm: 'w-9 h-9 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
    xl: 'w-24 h-24 sm:w-28 sm:h-28 text-2xl',
  };

  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(-2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

  if (!src || failed) {
    return (
      <div
        aria-label={name}
        className={`${sizeMap[size] || sizeMap.md} rounded-full bg-obsidian-750 border border-white/10 text-slate-200 font-semibold flex items-center justify-center shrink-0 select-none ${className}`}
      >
        {initials || 'VT'}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={`${sizeMap[size] || sizeMap.md} rounded-full object-cover border border-white/10 bg-obsidian-800 shrink-0 ${className}`}
    />
  );
}
