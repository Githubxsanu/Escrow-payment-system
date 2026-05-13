'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Shield, Bell, User, Menu, Wallet, Copy, ExternalLink, LogOut, AlertTriangle } from 'lucide-react';
import { useWallet } from '@/hooks/useWallet';

interface TopNavProps {
  onMenuClick: () => void;
}

// No longer hardcoding a target chain to allow "any network" support

export default function DashboardTopNav({ onMenuClick }: TopNavProps) {
  const { address, shortAddress, network, isConnecting, error, connect, disconnect } = useWallet();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setIsDropdownOpen(false);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-20 z-50 bg-[#0a0a0c]/80 backdrop-blur-md border-b border-white/[0.05] transition-all">
        <div className="flex items-center justify-between h-full px-4 lg:px-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={onMenuClick}
              className="p-2 -ml-2 text-slate-400 hover:text-white lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-shadow">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-display font-bold text-white tracking-tight">BlockSafe</span>
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="/" className="hover:text-cyan-400 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-all">Home</a>
            <a href="#" className="hover:text-cyan-400 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-all">How Escrow Works</a>
            <a href="#" className="hover:text-cyan-400 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-all">Marketplace</a>
            <a href="#" className="hover:text-cyan-400 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-all">Documentation</a>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <button className="p-2 text-slate-400 hover:text-cyan-400 transition-colors relative group">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-violet-500 rounded-full border border-[#0a0a0c]"></span>
              <div className="absolute inset-0 bg-cyan-400/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            
            <button className="p-2 text-slate-400 hover:text-cyan-400 transition-colors relative group hidden sm:block">
              <User className="w-5 h-5" />
              <div className="absolute inset-0 bg-cyan-400/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            {address ? (
              <div className="relative" ref={dropdownRef}>
                <button 
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-mono font-medium shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:bg-cyan-500/20 transition-colors"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                  {shortAddress}
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[#131316] border border-white/[0.05] shadow-xl overflow-hidden z-50">
                    <div className="p-2 border-b border-white/[0.05]">
                      <div className="text-xs text-slate-500 font-medium px-2 py-1 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                        {network?.name || 'Any Chain'}
                      </div>
                    </div>
                    <div className="p-1">
                      <button 
                        onClick={handleCopyAddress}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/[0.05] rounded-lg transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                        Copy Address
                      </button>
                      <a 
                        href={`https://sepolia.etherscan.io/address/${address}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/[0.05] rounded-lg transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Explorer
                      </a>
                      <button 
                        onClick={() => {
                          disconnect();
                          setIsDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Disconnect
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative flex flex-col items-end">
                <button 
                  onClick={connect}
                  disabled={isConnecting}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <Wallet className="w-4 h-4" />
                  <span className="hidden sm:inline">{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
                  <span className="sm:hidden">{isConnecting ? '...' : 'Connect'}</span>
                </button>
                {error && (
                  <div className="absolute top-full mt-2 right-0 w-max max-w-xs bg-red-500/10 border border-red-500/20 text-red-400 text-xs px-3 py-2 rounded-lg shadow-lg">
                    {error}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
