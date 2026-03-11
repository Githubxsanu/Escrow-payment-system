'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  PlusCircle, 
  List, 
  ArrowRightLeft, 
  AlertTriangle, 
  BarChart3, 
  UserCircle, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { name: 'Create Escrow', icon: PlusCircle, path: '/dashboard/create' },
  { name: 'My Escrows', icon: List, path: '/dashboard/escrows' },
  { name: 'Transactions', icon: ArrowRightLeft, path: '/dashboard/transactions' },
  { name: 'Disputes', icon: AlertTriangle, path: '/dashboard/disputes' },
  { name: 'Analytics', icon: BarChart3, path: '/dashboard/analytics' },
  { name: 'Profile', icon: UserCircle, path: '/dashboard/profile' },
  { name: 'Settings', icon: Settings, path: '/dashboard/settings' },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
}

export default function DashboardSidebar({ isOpen, onClose, isCollapsed, setIsCollapsed }: SidebarProps) {
  const pathname = usePathname();

  // Close mobile sidebar on route change
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#0a0a0c] border-r border-white/[0.05] relative">
      {/* Collapse Toggle (Desktop only) */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden lg:flex absolute -right-3 top-6 w-6 h-6 bg-[#131316] border border-white/[0.1] rounded-full items-center justify-center text-slate-400 hover:text-white hover:border-cyan-500/50 transition-colors z-50"
      >
        {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>

      {/* Mobile Close Button */}
      <div className="flex items-center justify-between p-4 lg:hidden border-b border-white/[0.05]">
        <span className="font-display font-bold text-white">Menu</span>
        <button onClick={onClose} className="p-2 text-slate-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 py-6 overflow-y-auto overflow-x-hidden scrollbar-hide">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => {
            const isActive = pathname === item.path || (pathname?.startsWith(item.path) && item.path !== '/dashboard');
            const Icon = item.icon;
            
            return (
              <li key={item.name}>
                <Link 
                  href={item.path}
                  className={`
                    relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all group
                    ${isActive 
                      ? 'text-cyan-400 bg-cyan-500/10 shadow-[inset_0_0_20px_rgba(6,182,212,0.05)]' 
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.03]'
                    }
                  `}
                  title={isCollapsed ? item.name : undefined}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="active-sidebar-indicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-cyan-400 rounded-r-full shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                    />
                  )}
                  
                  <div className="relative flex-shrink-0">
                    <Icon className={`w-5 h-5 ${isActive ? 'drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]' : ''}`} />
                  </div>
                  
                  <span className={`
                    font-medium whitespace-nowrap transition-all duration-300
                    ${isCollapsed ? 'opacity-0 w-0 hidden lg:block' : 'opacity-100 w-auto'}
                  `}>
                    {item.name}
                  </span>

                  {/* Hover Glow Effect */}
                  {!isActive && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/0 to-violet-500/0 group-hover:from-cyan-500/5 group-hover:to-violet-500/5 transition-colors pointer-events-none" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Bottom section (e.g., Network Status) */}
      <div className={`p-4 border-t border-white/[0.05] transition-all duration-300 ${isCollapsed ? 'items-center flex justify-center' : ''}`}>
         <div className={`flex items-center gap-2 ${isCollapsed ? 'justify-center' : ''}`}>
           <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
           {!isCollapsed && <span className="text-xs text-slate-400 font-medium">Ethereum Mainnet</span>}
         </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <motion.aside
        className={`
          fixed top-0 lg:top-20 bottom-0 left-0 z-50 lg:z-40
          transition-all duration-300 ease-in-out
          ${isCollapsed ? 'lg:w-20' : 'lg:w-64'}
          ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {sidebarContent}
      </motion.aside>
    </>
  );
}
