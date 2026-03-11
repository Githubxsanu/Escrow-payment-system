'use client';

import { motion } from 'motion/react';

const stats = [
  { label: 'Total Escrows', value: '$142M+', suffix: '' },
  { label: 'Transactions Completed', value: '850', suffix: 'K+' },
  { label: 'Active Users', value: '120', suffix: 'K+' },
  { label: 'Dispute Rate', value: '< 0.1', suffix: '%' },
];

export default function Statistics() {
  return (
    <section className="py-20 border-y border-white/[0.05] bg-white/[0.01] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.05)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
              className="text-center"
            >
              <div className="flex items-baseline justify-center gap-1 mb-2">
                <span className="text-4xl md:text-5xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                  {stat.value}
                </span>
                <span className="text-xl md:text-2xl font-display font-bold text-cyan-400">
                  {stat.suffix}
                </span>
              </div>
              <p className="text-sm md:text-base text-slate-400 font-medium tracking-wide uppercase">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
