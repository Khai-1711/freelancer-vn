import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MarketplaceProvider } from './context/MarketplaceContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import GlobalOverlays from './components/GlobalOverlays';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import ProjectDetail from './pages/ProjectDetail';
import PostProject from './pages/PostProject';
import Hire from './pages/Hire';
import Profile from './pages/Profile';
import Onboarding from './pages/Onboarding';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';

/**
 * Thành phần gốc của ứng dụng ViecTech.
 * Bao bọc toàn bộ cây component trong MarketplaceProvider để đồng bộ dữ liệu
 * (dự án, chào giá, chuyên gia, tài khoản, tiền tệ, thông báo) giữa mọi trang.
 */
export default function App() {
  return (
    <MarketplaceProvider>
      <BrowserRouter>
        {/* Tự động cuộn lên đầu trang mỗi khi người dùng chuyển tuyến đường */}
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-obsidian-950 text-slate-100">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
              <Route path="/project-detail" element={<Navigate to="/projects/394821" replace />} />
              <Route path="/post-project" element={<PostProject />} />
              <Route path="/hire" element={<Hire />} />
              <Route path="/freelancers/:id" element={<Profile />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/register-freelancer" element={<Signup />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <GlobalOverlays />
        </div>
      </BrowserRouter>
    </MarketplaceProvider>
  );
}
