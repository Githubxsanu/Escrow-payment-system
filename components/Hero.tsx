'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, Shield, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.05] text-sm text-cyan-400 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Web3 Escrow Protocol Live
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-bold tracking-tight text-white mb-8 leading-tight"
          >
            The Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500">Secure Payments</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Choose your preferred secure payment method. Guaranteed fund safety for both buyers and sellers, powered by Polygon Smart Contracts and AI-driven UPI Escrow.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto"
          >
            <Link href="/dashboard/create" className="group relative p-6 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 hover:border-cyan-500/50 transition-all hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] text-left">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Crypto Escrow</h3>
              <p className="text-sm text-slate-400 mb-4">Polygon-based smart contracts with multi-coin support.</p>
              <div className="flex items-center gap-2 text-cyan-400 font-medium text-sm">
                Get Started <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            <Link href="/upi-escrow" className="group relative p-6 rounded-3xl bg-gradient-to-br from-violet-500/10 to-purple-600/10 border border-violet-500/20 hover:border-violet-500/50 transition-all hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] text-left">
              <div className="w-12 h-12 rounded-2xl bg-violet-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-violet-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">UPI Escrow</h3>
              <p className="text-sm text-slate-400 mb-4">Instant UPI payments with AI automated verification.</p>
              <div className="flex items-center gap-2 text-violet-400 font-medium text-sm">
                Pay with UPI <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
