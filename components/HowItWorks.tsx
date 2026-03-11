'use client';

import { motion } from 'motion/react';
import { ArrowRight, Wallet, CheckCircle2, Package, Coins } from 'lucide-react';

const steps = [
  {
    id: '01',
    title: 'Create Escrow',
    description: 'Buyer and seller agree on terms and create a smart contract.',
    icon: Wallet,
  },
  {
    id: '02',
    title: 'Deposit Funds',
    description: 'Buyer deposits crypto into the secure escrow contract.',
    icon: Coins,
  },
  {
    id: '03',
    title: 'Seller Delivers',
    description: 'Seller fulfills the service or delivers the product.',
    icon: Package,
  },
  {
    id: '04',
    title: 'Buyer Confirms',
    description: 'Buyer inspects and approves the delivered work.',
    icon: CheckCircle2,
  },
  {
    id: '05',
    title: 'Funds Released',
    description: 'Smart contract automatically releases funds to the seller.',
    icon: ArrowRight,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/10 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-display font-bold text-white mb-4"
          >
            How It Works
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 max-w-2xl mx-auto"
          >
            A simple, transparent, and automated process powered by smart contracts.
          </motion.p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative flex flex-col items-center text-center group"
                >
                  <div className="w-16 h-16 rounded-full bg-[#0a0a0c] border border-white/10 flex items-center justify-center relative z-10 mb-6 group-hover:border-cyan-500/50 transition-colors shadow-[0_0_30px_rgba(6,182,212,0)] group-hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                    <div className="absolute inset-0 rounded-full bg-cyan-500/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Icon className="w-6 h-6 text-cyan-400 relative z-10" />
                    <div className="absolute -top-3 -right-3 text-[10px] font-mono font-bold text-slate-500 bg-[#0a0a0c] px-1">
                      {step.id}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-display font-semibold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-400">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
