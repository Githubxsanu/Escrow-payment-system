import { ArrowRight, AlertOctagon, CheckCircle, Shield } from 'lucide-react';
import { EscrowStatus } from '@/components/dashboard/StatusBadge';

interface ActionPanelProps {
  status: EscrowStatus;
  onAction: (action: string) => void;
}

export default function ActionPanel({ status, onAction }: ActionPanelProps) {
  return (
    <div className="p-6 rounded-3xl bg-[#131316] border border-white/[0.05] h-full flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <Shield className="w-5 h-5 text-violet-400" />
        <h3 className="text-lg font-display font-semibold text-white">Available Actions</h3>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-4">
        {status === 'Pending' && (
          <>
            <p className="text-sm text-slate-400 mb-2">The escrow has been created. Waiting for the buyer to deposit funds.</p>
            <button 
              onClick={() => onAction('Deposit Funds')}
              className="w-full py-3.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all font-medium flex items-center justify-center gap-2"
            >
              Deposit Funds <ArrowRight className="w-4 h-4" />
            </button>
          </>
        )}

        {status === 'Funded' && (
          <>
            <p className="text-sm text-slate-400 mb-2">Funds are locked securely. The seller should now deliver the product or service.</p>
            <button 
              onClick={() => onAction('Mark as Delivered')}
              className="w-full py-3.5 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20 hover:bg-violet-500/20 hover:shadow-[0_0_20px_rgba(139,92,246,0.2)] transition-all font-medium flex items-center justify-center gap-2"
            >
              Mark as Delivered <CheckCircle className="w-4 h-4" />
            </button>
            <button 
              onClick={() => onAction('Request Refund')}
              className="w-full py-3.5 rounded-xl bg-white/[0.05] text-slate-300 border border-white/[0.1] hover:bg-white/[0.1] transition-all font-medium"
            >
              Request Refund
            </button>
          </>
        )}

        {status === 'Delivered' && (
          <>
            <p className="text-sm text-slate-400 mb-2">The seller has marked the deal as delivered. Please review and release payment.</p>
            <button 
              onClick={() => onAction('Release Payment')}
              className="w-full py-3.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 hover:shadow-[0_0_20px_rgba(52,211,153,0.2)] transition-all font-medium flex items-center justify-center gap-2"
            >
              Release Payment <CheckCircle className="w-4 h-4" />
            </button>
            <button 
              onClick={() => onAction('Open Dispute')}
              className="w-full py-3.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 hover:shadow-[0_0_20px_rgba(244,63,94,0.2)] transition-all font-medium flex items-center justify-center gap-2"
            >
              Open Dispute <AlertOctagon className="w-4 h-4" />
            </button>
          </>
        )}

        {status === 'Completed' && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-emerald-400" />
            </div>
            <h4 className="text-white font-medium mb-2">Escrow Completed</h4>
            <p className="text-sm text-slate-400">The funds have been successfully released to the seller.</p>
          </div>
        )}

        {status === 'Disputed' && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center mb-4">
              <AlertOctagon className="w-8 h-8 text-rose-400" />
            </div>
            <h4 className="text-white font-medium mb-2">Escrow Disputed</h4>
            <p className="text-sm text-slate-400 mb-6">This deal is currently under review by arbitrators.</p>
            <button 
              className="w-full py-3.5 rounded-xl bg-white/[0.05] text-slate-300 border border-white/[0.1] hover:bg-white/[0.1] transition-all font-medium"
            >
              View Dispute Details
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
