import React, { createContext, useContext, useState, useCallback } from 'react';
import { INITIAL_PROJECTS, INITIAL_FREELANCERS } from '../data/mockData';

/**
 * Context quản lý toàn bộ trạng thái ứng dụng trong bộ nhớ (in-memory store):
 * - Danh sách dự án, chào giá và dự án đã lưu
 * - Danh bạ chuyên gia, tin nhắn và lời mời hợp tác
 * - Phiên đăng nhập người dùng và tiến trình Onboarding
 * - Quy đổi tiền tệ VNĐ/USD, hàng đợi Toast và trạng thái Modal toàn cục
 */
const MarketplaceContext = createContext(null);

// Tỷ giá tham khảo dùng khi chuyển đổi hiển thị tiền tệ giữa VNĐ và USD
const VND_PER_USD = 25000;

export function MarketplaceProvider({ children }) {
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [freelancers, setFreelancers] = useState(INITIAL_FREELANCERS);
  const [currentUser, setCurrentUser] = useState(null);
  const [savedJobIds, setSavedJobIds] = useState(['394821']);
  const [currency, setCurrency] = useState('VND'); // 'VND' | 'USD'
  const [toasts, setToasts] = useState([]);
  const [modalState, setModalState] = useState({ type: null, freelancer: null });
  const [messages, setMessages] = useState([]);
  const [invitations, setInvitations] = useState([]);

  const [onboarding, setOnboarding] = useState({
    currentStep: 1,
    roleTitle: 'Senior Fullstack Engineer & Cloud Architect',
    specialization: 'Fullstack & Cloud',
    skills: ['React.js', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL'],
    hourlyRate: 500000,
    weeklyHours: '30 - 40 giờ / tuần',
    location: 'TP. Hồ Chí Minh',
    bio: 'Kỹ sư phát triển sản phẩm web hiện đại, ưu tiên hiệu năng cao, trải nghiệm mượt mà và mã nguồn dễ bảo trì cho doanh nghiệp công nghệ.',
    completed: false,
  });

  // Đóng thông báo Toast theo id
  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Hiển thị thông báo Toast góc phải dưới và tự ẩn sau 3.8 giây
  const showToast = useCallback((message, variant = 'success') => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setToasts((prev) => [...prev, { id, message, variant }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  }, []);

  const formatMoney = useCallback(
    (amountVnd, options = {}) => {
      const { compact = false } = options;
      if (currency === 'USD') {
        const usd = Math.round(amountVnd / VND_PER_USD);
        return `$${usd.toLocaleString('en-US')}`;
      }
      if (compact && amountVnd >= 1000000) {
        const millions = amountVnd / 1000000;
        const formatted = Number.isInteger(millions) ? millions : millions.toFixed(1);
        return `${formatted}M VNĐ`;
      }
      return `${Math.round(amountVnd).toLocaleString('vi-VN')} VNĐ`;
    },
    [currency]
  );

  const formatBudgetRange = useCallback(
    (project, options = {}) => {
      const suffix = project.budgetType === 'hourly' ? ' / giờ' : '';
      if (project.minBudget === project.maxBudget) {
        return `${formatMoney(project.minBudget, options)}${suffix}`;
      }
      if (currency === 'USD') {
        const minUsd = Math.round(project.minBudget / VND_PER_USD);
        const maxUsd = Math.round(project.maxBudget / VND_PER_USD);
        return `$${minUsd.toLocaleString('en-US')} – $${maxUsd.toLocaleString('en-US')}${suffix}`;
      }
      if (options.compact && project.minBudget >= 1000000) {
        const minM = project.minBudget / 1000000;
        const maxM = project.maxBudget / 1000000;
        const fMin = Number.isInteger(minM) ? minM : minM.toFixed(1);
        const fMax = Number.isInteger(maxM) ? maxM : maxM.toFixed(1);
        return `${fMin}M – ${fMax}M VNĐ${suffix}`;
      }
      return `${project.minBudget.toLocaleString('vi-VN')} – ${project.maxBudget.toLocaleString('vi-VN')} VNĐ${suffix}`;
    },
    [currency, formatMoney]
  );

  const toggleCurrency = useCallback(() => {
    setCurrency((prev) => {
      const next = prev === 'VND' ? 'USD' : 'VND';
      showToast(
        next === 'USD'
          ? 'Đã chuyển hiển thị tiền tệ sang USD (1 USD ≈ 25.000 VNĐ)'
          : 'Đã chuyển hiển thị tiền tệ sang VNĐ',
        'info'
      );
      return next;
    });
  }, [showToast]);

  const toggleSaveJob = useCallback(
    (projectId) => {
      setSavedJobIds((prev) => {
        const exists = prev.includes(projectId);
        showToast(exists ? 'Đã bỏ lưu dự án khỏi danh sách theo dõi' : 'Đã lưu dự án vào danh sách theo dõi', 'info');
        return exists ? prev.filter((id) => id !== projectId) : [...prev, projectId];
      });
    },
    [showToast]
  );

  // Thêm dự án mới từ Wizard Đăng dự án lên đầu danh sách việc làm
  const addProject = useCallback(
    (newProjectData) => {
      const newId = String(394830 + projects.length + 1);
      const created = {
        id: newId,
        title: newProjectData.title.trim(),
        category: newProjectData.category,
        categoryLabel: newProjectData.categoryLabel,
        budgetType: newProjectData.budgetType,
        minBudget: Number(newProjectData.minBudget),
        maxBudget: Number(newProjectData.maxBudget),
        durationLabel: newProjectData.durationLabel,
        postedAt: 'Vừa đăng xong',
        postedMinutesAgo: 0,
        featured: true,
        description: newProjectData.description.trim(),
        requirements: newProjectData.requirements?.length
          ? newProjectData.requirements
          : ['Hoàn thiện đầy đủ các hạng mục theo mô tả dự án và bàn giao mã nguồn sạch.'],
        skills: newProjectData.skills,
        paymentVerified: true,
        milestoneFunded: Boolean(newProjectData.milestoneFunded),
        clientName: currentUser ? currentUser.name : 'Doanh nghiệp của bạn',
        clientRating: 5.0,
        clientReviews: 1,
        location: newProjectData.location || 'TP. Hồ Chí Minh',
        attachments: [],
        bids: [],
      };
      setProjects((prev) => [created, ...prev]);
      showToast('Đã xuất bản dự án mới lên sàn ViecTech!', 'success');
      return newId;
    },
    [projects.length, currentUser, showToast]
  );

  // Ghi nhận đề xuất chào giá mới vào đúng dự án đang xem
  const addBid = useCallback(
    (projectId, { amount, days, coverLetter }) => {
      const bidderName = currentUser ? currentUser.name : 'Nguyễn Minh Khôi (Bạn)';
      const newBid = {
        id: `bid-${Date.now()}`,
        freelancerId: currentUser?.freelancerId || 'phu-nguyen',
        freelancerName: bidderName,
        avatar: currentUser?.avatar || freelancers[0]?.avatar,
        verified: true,
        rating: 5.0,
        reviews: currentUser ? 12 : 68,
        completionRate: 100,
        amount: Number(amount),
        days: Number(days),
        submittedAt: 'Vừa gửi xong',
        coverLetter: coverLetter.trim(),
      };

      setProjects((prev) =>
        prev.map((proj) =>
          proj.id === projectId ? { ...proj, bids: [newBid, ...proj.bids] } : proj
        )
      );
      showToast('Đã gửi đề xuất chào giá thành công!', 'success');
    },
    [currentUser, freelancers, showToast]
  );

  const login = useCallback(
    ({ email, name, role = 'freelancer' }) => {
      const displayName =
        name ||
        email
          .split('@')[0]
          .replace(/[._-]/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase());
      const userObj = {
        name: displayName,
        email,
        role,
        freelancerId: 'phu-nguyen',
        avatar: freelancers[0]?.avatar,
      };
      setCurrentUser(userObj);
      showToast(`Chào mừng ${displayName} quay trở lại ViecTech!`, 'success');
    },
    [freelancers, showToast]
  );

  // Kiểm tra tên người dùng (@username) đã tồn tại trong danh bạ hay chưa
  const checkUsernameAvailable = useCallback(
    (rawUsername) => {
      const normalized = `@${rawUsername.trim().toLowerCase().replace(/^@/, '')}`;
      return !freelancers.some((f) => f.handle.toLowerCase() === normalized);
    },
    [freelancers]
  );

  // Tạo tài khoản mới; nếu là người tìm việc sẽ tự khởi tạo hồ sơ trong danh bạ và đồng bộ Onboarding
  const signup = useCallback(
    ({
      firstName,
      lastName,
      email,
      role,
      username,
      skills,
      specialization,
      hourlyRate,
      location,
      bio,
    }) => {
      const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
      const cleanUser = (username || email.split('@')[0])
        .toLowerCase()
        .replace(/^@/, '')
        .replace(/[^a-z0-9_]/g, '');
      const handle = `@${cleanUser || 'member'}`;
      const newFreelancerId = cleanUser || `member-${Date.now()}`;
      const chosenSkills = skills?.length ? skills : onboarding.skills;
      const chosenSpec = specialization || onboarding.specialization;
      const chosenRate = Number(hourlyRate) || onboarding.hourlyRate;
      const chosenLocation = location || onboarding.location;
      const chosenBio =
        bio?.trim() ||
        `Chuyên gia ${chosenSpec} sẵn sàng nhận dự án thực chiến với các kỹ năng ${chosenSkills.slice(0, 4).join(', ')}.`;

      if (role === 'freelancer') {
        const newProfile = {
          id: newFreelancerId,
          name: fullName,
          handle,
          role: `Chuyên gia ${chosenSpec}`,
          specialization: chosenSpec,
          hourlyRate: chosenRate,
          rating: 5.0,
          reviewCount: 0,
          completedProjects: 0,
          rehireRate: 100,
          totalEarnings: 'Mới tham gia',
          location: chosenLocation,
          available: true,
          verified: true,
          responseTime: 'Phản hồi nhanh',
          avatar: freelancers[0]?.avatar,
          bio: chosenBio,
          skills: chosenSkills,
          portfolio: [],
          reviews: [],
        };
        setFreelancers((prev) => [newProfile, ...prev]);
        setOnboarding((prev) => ({
          ...prev,
          roleTitle: `Chuyên gia ${chosenSpec}`,
          specialization: chosenSpec,
          skills: chosenSkills,
          hourlyRate: chosenRate,
          location: chosenLocation,
          bio: chosenBio,
          completed: true,
          currentStep: 5,
        }));
      }

      setCurrentUser({
        name: fullName,
        email,
        handle,
        role,
        freelancerId: role === 'freelancer' ? newFreelancerId : 'phu-nguyen',
        avatar: freelancers[0]?.avatar,
      });
      showToast(
        role === 'freelancer'
          ? `Chào mừng ${fullName} (${handle})! Hồ sơ người tìm việc của bạn đã sẵn sàng nhận dự án.`
          : `Tạo tài khoản doanh nghiệp cho ${fullName} thành công!`,
        'success'
      );
      return newFreelancerId;
    },
    [freelancers, onboarding, showToast]
  );

  const logout = useCallback(() => {
    setCurrentUser(null);
    showToast('Bạn đã đăng xuất khỏi phiên làm việc.', 'info');
  }, [showToast]);

  const updateOnboarding = useCallback((patch) => {
    setOnboarding((prev) => ({ ...prev, ...patch }));
  }, []);

  const completeOnboarding = useCallback(() => {
    setOnboarding((prev) => ({ ...prev, completed: true, currentStep: 5 }));
    const targetId = currentUser?.freelancerId || 'phu-nguyen';
    setFreelancers((prev) =>
      prev.map((f) =>
        f.id === targetId
          ? {
              ...f,
              role: onboarding.roleTitle,
              specialization: onboarding.specialization,
              skills: onboarding.skills,
              hourlyRate: Number(onboarding.hourlyRate),
              location: onboarding.location,
              bio: onboarding.bio,
              available: true,
            }
          : f
      )
    );
    showToast('Đã lưu và đồng bộ toàn bộ hồ sơ chuyên gia!', 'success');
  }, [currentUser, onboarding, showToast]);

  const openMessageModal = useCallback((freelancer) => {
    setModalState({ type: 'message', freelancer });
  }, []);

  const openHireModal = useCallback((freelancer) => {
    setModalState({ type: 'hire', freelancer });
  }, []);

  const closeModal = useCallback(() => {
    setModalState({ type: null, freelancer: null });
  }, []);

  const sendMessage = useCallback(
    (freelancer, text) => {
      const entry = {
        id: `msg-${Date.now()}`,
        freelancerId: freelancer.id,
        freelancerName: freelancer.name,
        text: text.trim(),
        sentAt: 'Vừa gửi',
      };
      setMessages((prev) => [entry, ...prev]);
      showToast(`Đã gửi tin nhắn tới ${freelancer.name}`, 'success');
      closeModal();
    },
    [showToast, closeModal]
  );

  const sendHireInvite = useCallback(
    (freelancer, { projectId, note, proposedRate }) => {
      const project = projects.find((p) => p.id === projectId);
      const entry = {
        id: `inv-${Date.now()}`,
        freelancerId: freelancer.id,
        freelancerName: freelancer.name,
        projectTitle: project ? project.title : 'Dự án hợp tác trực tiếp',
        proposedRate,
        note: note.trim(),
        sentAt: 'Vừa gửi',
      };
      setInvitations((prev) => [entry, ...prev]);
      showToast(`Đã gửi lời mời hợp tác tới ${freelancer.name}`, 'success');
      closeModal();
    },
    [projects, showToast, closeModal]
  );

  return (
    <MarketplaceContext.Provider
      value={{
        projects,
        freelancers,
        currentUser,
        savedJobIds,
        currency,
        toasts,
        modalState,
        messages,
        invitations,
        onboarding,
        showToast,
        dismissToast,
        formatMoney,
        formatBudgetRange,
        toggleCurrency,
        toggleSaveJob,
        addProject,
        addBid,
        login,
        signup,
        checkUsernameAvailable,
        logout,
        updateOnboarding,
        completeOnboarding,
        openMessageModal,
        openHireModal,
        closeModal,
        sendMessage,
        sendHireInvite,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  const ctx = useContext(MarketplaceContext);
  if (!ctx) {
    throw new Error('useMarketplace must be used inside MarketplaceProvider');
  }
  return ctx;
}
