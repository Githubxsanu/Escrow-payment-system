import { Copy, ExternalLink } from 'lucide-react';
import StatusBadge, { EscrowStatus } from '@/components/dashboard/StatusBadge';
import { formatAddress } from '@/utils/wallet';

interface EscrowHeaderProps {
  escrow: {
    id: string;
    buyer: string;
    seller: string;
    amount: string;
    status: EscrowStatus;
    createdAt: string;
    deadline: string;
  };
}

export default function EscrowHeader({ escrow }: EscrowHeaderProps) {
  return (
    <div className="p-6 rounded-3xl bg-[#131316] border border-white/[0.05] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-violet-500/5 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-3xl font-display font-bold text-white">{escrow.id}</h1>
            <StatusBadge status={escrow.status} />
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <span>Created on {escrow.createdAt}</span>
            <span className="w-1 h-1 rounded-full bg-slate-600" />
            <span className="text-amber-400/90">Deadline: {escrow.deadline}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 md:gap-10 p-4 rounded-2xl bg-black/40 border border-white/[0.05]">
          <div>
            <div className="text-xs text-slate-500 mb-1">Buyer</div>
            <div className="flex items-center gap-2 text-sm font-mono text-slate-300">
              {formatAddress(escrow.buyer)}
              <button className="text-slate-500 hover:text-cyan-400 transition-colors"><Copy className="w-3 h-3" /></button>
            </div>
          </div>
          <div className="w-px bg-white/[0.05] hidden sm:block" />
          <div>
            <div className="text-xs text-slate-500 mb-1">Seller</div>
            <div className="flex items-center gap-2 text-sm font-mono text-slate-300">
              {formatAddress(escrow.seller)}
              <button className="text-slate-500 hover:text-cyan-400 transition-colors"><Copy className="w-3 h-3" /></button>
            </div>
          </div>
          <div className="w-px bg-white/[0.05] hidden sm:block" />
          <div>
            <div className="text-xs text-slate-500 mb-1">Locked Amount</div>
            <div className="text-lg font-mono font-bold text-cyan-400">{escrow.amount}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
