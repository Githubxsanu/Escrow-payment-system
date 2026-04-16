'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-cyan-950/50 to-violet-950/50 border border-white/10 p-12 md:p-20 text-center"
        >
          {/* Background Glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/20 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Ready to secure your next transaction?
            </h2>
            <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
              Join thousands of users who trust BlockSafe for their high-value digital transactions. Create your first smart contract escrow in minutes.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/dashboard" className="px-8 py-4 rounded-full bg-white text-slate-900 font-semibold hover:bg-slate-100 transition-colors flex items-center justify-center gap-2 group">
                Start Using BlockSafe
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="https://github.com/xsanu/Escrow-payment-system" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-full bg-white/[0.05] border border-white/[0.1] text-white font-medium hover:bg-white/[0.1] transition-all flex items-center justify-center">
                Read Documentation
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
