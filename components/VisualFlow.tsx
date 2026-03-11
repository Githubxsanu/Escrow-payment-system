'use client';

import { motion } from 'motion/react';
import { ArrowRight, Lock, User, CheckCircle } from 'lucide-react';

export default function VisualFlow() {
  return (
    <section className="py-12 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="relative p-8 md:p-12 rounded-3xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm">
          
          {/* Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] rounded-3xl" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            
            {/* Buyer */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center gap-4 w-full md:w-1/3"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-cyan-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.15)]">
                <User className="w-8 h-8 text-cyan-400" />
              </div>
              <div className="text-center">
                <h4 className="font-display font-semibold text-white">Buyer</h4>
                <p className="text-xs text-slate-400 font-mono mt-1">Deposits Crypto</p>
              </div>
            </motion.div>

            {/* Arrow 1 */}
            <div className="hidden md:flex items-center justify-center w-16 relative">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute h-0.5 bg-gradient-to-r from-cyan-500/50 to-violet-500/50"
              />
              <motion.div
                animate={{ x: [0, 40, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute"
              >
                <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
              </motion.div>
            </div>

            {/* Smart Contract */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center gap-4 w-full md:w-1/3 relative"
            >
              <div className="absolute inset-0 bg-violet-500/20 blur-[40px] rounded-full" />
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-violet-600/20 to-purple-600/20 border border-violet-500/40 flex items-center justify-center relative z-10 shadow-[0_0_40px_rgba(139,92,246,0.2)] backdrop-blur-md">
                <Lock className="w-10 h-10 text-violet-400" />
              </div>
              <div className="text-center relative z-10">
                <h4 className="font-display font-semibold text-white">Smart Contract</h4>
                <p className="text-xs text-slate-400 font-mono mt-1">Locks & Verifies</p>
              </div>
            </motion.div>

            {/* Arrow 2 */}
            <div className="hidden md:flex items-center justify-center w-16 relative">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute h-0.5 bg-gradient-to-r from-violet-500/50 to-emerald-500/50"
              />
              <motion.div
                animate={{ x: [0, 40, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
                className="absolute"
              >
                <div className="w-2 h-2 rounded-full bg-violet-400 shadow-[0_0_10px_#a78bfa]" />
              </motion.div>
            </div>

            {/* Seller */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col items-center gap-4 w-full md:w-1/3"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.15)]">
                <CheckCircle className="w-8 h-8 text-emerald-400" />
              </div>
              <div className="text-center">
                <h4 className="font-display font-semibold text-white">Seller</h4>
                <p className="text-xs text-slate-400 font-mono mt-1">Receives Funds</p>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
