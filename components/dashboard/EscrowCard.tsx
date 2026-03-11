import { ArrowRight, Copy, ExternalLink } from 'lucide-react';
import StatusBadge, { EscrowStatus } from './StatusBadge';
import Timeline from './Timeline';

export interface EscrowDeal {
  id: string;
  title: string;
  buyer: string;
  seller: string;
  amount: string;
  status: EscrowStatus;
  date: string;
}

export default function EscrowCard({ deal }: { deal: EscrowDeal }) {
  const formatAddress = (addr: string) => `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;

  return (
    <div className="p-6 rounded-2xl bg-[#131316] border border-white/[0.05] hover:border-white/[0.1] transition-all duration-300 group">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-display font-semibold text-white group-hover:text-cyan-400 transition-colors">{deal.title}</h3>
            <StatusBadge status={deal.status} />
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400 font-mono">
            <span>ID: {deal.id}</span>
            <button className="hover:text-cyan-400 transition-colors"><Copy className="w-3 h-3" /></button>
            <span className="text-slate-600">•</span>
            <span>{deal.date}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-mono font-bold text-white mb-1">{deal.amount}</div>
          <div className="text-sm text-slate-500">Locked Amount</div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-black/40 border border-white/[0.02] mb-6">
        <div>
          <div className="text-xs text-slate-500 mb-1">Buyer</div>
          <div className="flex items-center gap-2 text-sm font-mono text-slate-300">
            {formatAddress(deal.buyer)}
            <button className="text-slate-500 hover:text-cyan-400 transition-colors"><ExternalLink className="w-3 h-3" /></button>
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-500 mb-1">Seller</div>
          <div className="flex items-center gap-2 text-sm font-mono text-slate-300">
            {formatAddress(deal.seller)}
            <button className="text-slate-500 hover:text-cyan-400 transition-colors"><ExternalLink className="w-3 h-3" /></button>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <Timeline currentStatus={deal.status} />
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/[0.05]">
        {deal.status === 'Pending' && (
          <button className="px-5 py-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all text-sm font-medium flex items-center gap-2">
            Deposit Funds <ArrowRight className="w-4 h-4" />
          </button>
        )}
        {deal.status === 'Funded' && (
          <button className="px-5 py-2.5 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20 hover:bg-violet-500/20 hover:shadow-[0_0_15px_rgba(139,92,246,0.2)] transition-all text-sm font-medium flex items-center gap-2">
            Confirm Delivery <ArrowRight className="w-4 h-4" />
          </button>
        )}
        {deal.status === 'Delivered' && (
          <>
            <button className="px-5 py-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 hover:shadow-[0_0_15px_rgba(52,211,153,0.2)] transition-all text-sm font-medium flex items-center gap-2">
              Release Payment <ArrowRight className="w-4 h-4" />
            </button>
            <button className="px-5 py-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 hover:shadow-[0_0_15px_rgba(244,63,94,0.2)] transition-all text-sm font-medium">
              Open Dispute
            </button>
          </>
        )}
        {deal.status === 'Completed' && (
          <button className="px-5 py-2.5 rounded-xl bg-white/[0.05] text-slate-300 border border-white/[0.1] hover:bg-white/[0.1] transition-all text-sm font-medium">
            View Receipt
          </button>
        )}
        {deal.status === 'Disputed' && (
          <button className="px-5 py-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 hover:shadow-[0_0_15px_rgba(244,63,94,0.2)] transition-all text-sm font-medium">
            View Dispute Details
          </button>
        )}
      </div>
    </div>
  );
}
