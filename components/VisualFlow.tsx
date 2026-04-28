'use client';

import { motion } from 'motion/react';
import { User, CheckCircle } from 'lucide-react';

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
              <motion.div 
                animate={{
                  boxShadow: [
                    "0px 0px 60px rgba(6,182,212,0.5)",
                    "0px 0px 30px rgba(6,182,212,0.15)",
                    "0px 0px 30px rgba(6,182,212,0.15)",
                    "0px 0px 30px rgba(6,182,212,0.15)",
                    "0px 0px 60px rgba(6,182,212,0.5)"
                  ]
                }}
                transition={{ duration: 4, times: [0, 0.1, 0.5, 0.9, 1], repeat: Infinity, ease: "easeInOut" }}
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-cyan-500/30 flex items-center justify-center"
              >
                <User className="w-8 h-8 text-cyan-400" />
              </motion.div>
              <div className="text-center">
                <h4 className="font-display font-semibold text-white">Buyer</h4>
                <p className="text-xs text-slate-400 font-mono mt-1">Crypto or UPI</p>
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
                animate={{ 
                  x: [-10, 30, 60, 60, -10],
                  opacity: [0, 1, 0, 0, 0]
                }}
                transition={{ 
                  duration: 4, 
                  times: [0, 0.125, 0.25, 0.9, 1], 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute left-0"
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
              <motion.div 
                className="w-24 h-24 rounded-2xl bg-gradient-to-br from-violet-600/20 to-purple-600/20 border flex items-center justify-center relative z-10 backdrop-blur-md"
                animate={{ 
                  boxShadow: [
                    "0px 0px 40px rgba(139,92,246,0.2)",
                    "0px 0px 60px rgba(139,92,246,0.6)",
                    "0px 0px 60px rgba(139,92,246,0.6)",
                    "0px 0px 60px rgba(139,92,246,0.6)",
                    "0px 0px 40px rgba(139,92,246,0.2)"
                  ],
                  borderColor: [
                    "rgba(139,92,246,0.4)",
                    "rgba(139,92,246,0.8)",
                    "rgba(139,92,246,0.8)",
                    "rgba(139,92,246,0.8)",
                    "rgba(139,92,246,0.4)"
                  ]
                }}
                transition={{ duration: 4, times: [0, 0.25, 0.75, 0.95, 1], repeat: Infinity, ease: "easeInOut" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-violet-400"
                  style={{ overflow: 'visible' }}
                >
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <motion.path
                    d="M7 11V7a5 5 0 0 1 10 0v4"
                    animate={{
                      y: [-8, 0, 0, 0, -8],
                    }}
                    transition={{
                      duration: 4,
                      times: [0, 0.25, 0.75, 0.95, 1],
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </svg>
              </motion.div>
              <div className="text-center relative z-10">
                <h4 className="font-display font-semibold text-white">Computer Agent</h4>
                <p className="text-xs text-slate-400 font-mono mt-1">Escrows & Verifies</p>
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
                animate={{ 
                  x: [-10, -10, 30, 60, 60],
                  opacity: [0, 0, 1, 0, 0]
                }}
                transition={{ 
                  duration: 4, 
                  times: [0, 0.5, 0.625, 0.75, 1], 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute left-0"
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
              <motion.div 
                animate={{
                  boxShadow: [
                    "0px 0px 30px rgba(16,185,129,0.15)",
                    "0px 0px 30px rgba(16,185,129,0.15)",
                    "0px 0px 30px rgba(16,185,129,0.15)",
                    "0px 0px 60px rgba(16,185,129,0.5)",
                    "0px 0px 30px rgba(16,185,129,0.15)"
                  ]
                }}
                transition={{ duration: 4, times: [0, 0.5, 0.75, 0.85, 1], repeat: Infinity, ease: "easeInOut" }}
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center"
              >
                <CheckCircle className="w-8 h-8 text-emerald-400" />
              </motion.div>
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
