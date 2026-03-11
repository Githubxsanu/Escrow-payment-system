import { Shield, Lock, CheckCircle, AlertOctagon } from 'lucide-react';

export default function SummaryStats() {
  const stats = [
    { label: 'Active Escrows', value: '12', icon: Shield, color: 'text-cyan-400', bg: 'bg-cyan-400/10', border: 'border-cyan-400/20', shadow: 'group-hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]' },
    { label: 'Funds Locked', value: '45.2 ETH', icon: Lock, color: 'text-violet-400', bg: 'bg-violet-400/10', border: 'border-violet-400/20', shadow: 'group-hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]' },
    { label: 'Completed Deals', value: '148', icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20', shadow: 'group-hover:shadow-[0_0_30px_rgba(52,211,153,0.15)]' },
    { label: 'Disputed Deals', value: '2', icon: AlertOctagon, color: 'text-rose-400', bg: 'bg-rose-400/10', border: 'border-rose-400/20', shadow: 'group-hover:shadow-[0_0_30px_rgba(244,63,94,0.15)]' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div key={i} className={`p-6 rounded-2xl bg-[#131316] border ${stat.border} relative overflow-hidden group transition-all duration-300 ${stat.shadow}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
            <h3 className="text-3xl font-display font-bold text-white mb-1 relative z-10">{stat.value}</h3>
            <p className="text-sm text-slate-400 relative z-10">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
}
