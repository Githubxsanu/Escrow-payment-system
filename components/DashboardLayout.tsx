'use client';

import { useState } from 'react';
import DashboardTopNav from './DashboardTopNav';
import DashboardSidebar from './DashboardSidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-300">
      <DashboardTopNav onMenuClick={() => setIsMobileOpen(true)} />
      
      <DashboardSidebar 
        isOpen={isMobileOpen} 
        onClose={() => setIsMobileOpen(false)} 
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      
      <main 
        className={`
          pt-20 transition-all duration-300 ease-in-out min-h-screen
          ${isCollapsed ? 'lg:pl-20' : 'lg:pl-64'}
        `}
      >
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
