'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

const testimonials = [
  {
    content: "BlockSafe has completely transformed how we handle freelance payments. The smart contract escrow gives both parties total peace of mind.",
    author: "Sarah Jenkins",
    role: "Web3 Developer",
    avatar: "https://picsum.photos/seed/sarah/100/100",
  },
  {
    content: "The dispute resolution mechanism is fair and transparent. I've never felt more secure conducting high-value transactions online.",
    author: "David Chen",
    role: "Digital Asset Trader",
    avatar: "https://picsum.photos/seed/david/100/100",
  },
  {
    content: "Integration was seamless. The UI is incredibly intuitive for a blockchain product, making it easy for our non-crypto native clients.",
    author: "Elena Rodriguez",
    role: "Agency Director",
    avatar: "https://picsum.photos/seed/elena/100/100",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-display font-bold text-white mb-4"
          >
            Trusted by Pioneers
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400"
          >
            See what our users are saying about the future of secure payments.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors relative group"
            >
              <div className="absolute top-0 left-8 w-12 h-1 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-b-full opacity-50 group-hover:opacity-100 transition-opacity" />
              
              <p className="text-slate-300 mb-8 leading-relaxed">
                &quot;{testimonial.content}&quot;
              </p>
              
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10">
                  <Image 
                    src={testimonial.avatar} 
                    alt={testimonial.author}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="font-display font-medium text-white">{testimonial.author}</h4>
                  <p className="text-sm text-slate-400">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
