import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import DisputeStatusBadge, { DisputeStatus } from './DisputeStatusBadge';
import { formatAddress } from '@/utils/wallet';

export interface Dispute {
  id: string;
  escrowId: string;
  buyer: string;
  seller: string;
  amount: string;
  status: DisputeStatus;
  date: string;
}

export default function DisputeCard({ dispute }: { dispute: Dispute }) {
  return (
    <div className="p-6 rounded-2xl bg-[#131316] border border-white/[0.05] hover:border-white/[0.1] transition-all duration-300 group">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-display font-semibold text-white group-hover:text-cyan-400 transition-colors">{dispute.id}</h3>
            <DisputeStatusBadge status={dispute.status} />
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400 font-mono">
            <span>Escrow: {dispute.escrowId}</span>
            <span className="text-slate-600">•</span>
            <span>{dispute.date}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-mono font-bold text-white mb-1">{dispute.amount}</div>
          <div className="text-sm text-slate-500">Disputed Amount</div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-black/40 border border-white/[0.02] mb-6">
        <div>
          <div className="text-xs text-slate-500 mb-1">Buyer</div>
          <div className="flex items-center gap-2 text-sm font-mono text-slate-300">
            {formatAddress(dispute.buyer)}
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-500 mb-1">Seller</div>
          <div className="flex items-center gap-2 text-sm font-mono text-slate-300">
            {formatAddress(dispute.seller)}
          </div>
        </div>
      </div>

      <div className="flex items-center pt-4 border-t border-white/[0.05]">
        <Link 
          href={`/dashboard/disputes/${dispute.id}`}
          className="w-full py-2.5 rounded-xl bg-white/[0.05] text-slate-300 border border-white/[0.1] hover:bg-white/[0.1] hover:text-white transition-all text-sm font-medium flex items-center justify-center gap-2"
        >
          View Dispute Details <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
