'use client';

import { motion } from 'motion/react';
import { Shield, Lock, Eye, Scale } from 'lucide-react';

const features = [
  {
    title: 'Secure Payments',
    description: 'Funds are locked in a decentralized smart contract until all conditions are met.',
    icon: Shield,
    color: 'from-blue-500 to-cyan-400',
  },
  {
    title: 'Smart Contract Protection',
    description: 'Immutable code guarantees execution without relying on third-party intermediaries.',
    icon: Lock,
    color: 'from-purple-500 to-violet-400',
  },
  {
    title: 'Transparent Transactions',
    description: 'Every step of the escrow process is verifiable on the public blockchain.',
    icon: Eye,
    color: 'from-cyan-400 to-teal-400',
  },
  {
    title: 'Dispute Resolution',
    description: 'Built-in decentralized arbitration mechanisms for handling disagreements fairly.',
    icon: Scale,
    color: 'from-violet-500 to-fuchsia-400',
  },
];

export default function Features() {
  return (
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-display font-bold text-white mb-4"
          >
            Unbreakable Trust by Design
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400"
          >
            Our platform leverages the power of blockchain to eliminate counterparty risk and ensure seamless transactions.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative rounded-2xl bg-white/[0.02] border border-white/[0.05] p-6 hover:bg-white/[0.04] transition-colors overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 ease-out pointer-events-none" />
                
                <div className={`w-12 h-12 rounded-xl mb-6 flex items-center justify-center bg-gradient-to-br ${feature.color} bg-opacity-10 relative`}>
                  <div className="absolute inset-0 bg-white/20 rounded-xl blur-sm" />
                  <Icon className="w-6 h-6 text-white relative z-10 drop-shadow-md" />
                </div>
                
                <h3 className="text-xl font-display font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
