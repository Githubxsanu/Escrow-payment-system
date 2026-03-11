import { X, AlertTriangle, Loader2 } from 'lucide-react';

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  action: string;
  escrowId: string;
  isProcessing?: boolean;
  error?: string;
}

export default function ActionModal({ isOpen, onClose, onConfirm, action, escrowId, isProcessing, error }: ActionModalProps) {
  if (!isOpen) return null;

  const getActionDetails = () => {
    switch (action) {
      case 'Deposit Funds':
        return {
          title: 'Deposit Funds',
          description: 'You are about to lock the agreed funds into the smart contract. Once deposited, funds cannot be withdrawn unless the seller fails to deliver or a dispute is resolved in your favor.',
          buttonText: 'Confirm Deposit',
          colorClass: 'cyan',
          bgClass: 'bg-cyan-500/10',
          borderClass: 'border-cyan-500/20',
          textClass: 'text-cyan-400',
          btnClass: 'bg-gradient-to-r from-cyan-500 to-cyan-600 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]'
        };
      case 'Mark as Delivered':
        return {
          title: 'Confirm Delivery',
          description: 'You are marking this deal as delivered. The buyer will be notified to review the delivery and release the funds.',
          buttonText: 'Mark Delivered',
          colorClass: 'violet',
          bgClass: 'bg-violet-500/10',
          borderClass: 'border-violet-500/20',
          textClass: 'text-violet-400',
          btnClass: 'bg-gradient-to-r from-violet-500 to-violet-600 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]'
        };
      case 'Release Payment':
        return {
          title: 'Release Payment',
          description: 'You are about to release the locked funds to the seller. This action is irreversible. Only proceed if you are fully satisfied with the delivery.',
          buttonText: 'Release Funds',
          colorClass: 'emerald',
          bgClass: 'bg-emerald-500/10',
          borderClass: 'border-emerald-500/20',
          textClass: 'text-emerald-400',
          btnClass: 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]'
        };
      case 'Request Refund':
        return {
          title: 'Request Refund',
          description: 'You are requesting a refund. If the deadline has passed without delivery, the funds will be returned to you.',
          buttonText: 'Request Refund',
          colorClass: 'amber',
          bgClass: 'bg-amber-500/10',
          borderClass: 'border-amber-500/20',
          textClass: 'text-amber-400',
          btnClass: 'bg-gradient-to-r from-amber-500 to-amber-600 hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]'
        };
      case 'Open Dispute':
        return {
          title: 'Open Dispute',
          description: 'You are opening a dispute for this escrow. The funds will remain locked until an arbitrator resolves the issue.',
          buttonText: 'Submit Dispute',
          colorClass: 'rose',
          bgClass: 'bg-rose-500/10',
          borderClass: 'border-rose-500/20',
          textClass: 'text-rose-400',
          btnClass: 'bg-gradient-to-r from-rose-500 to-rose-600 hover:shadow-[0_0_20px_rgba(244,63,94,0.4)]'
        };
      default:
        return {
          title: 'Confirm Action',
          description: 'Are you sure you want to proceed with this action?',
          buttonText: 'Confirm',
          colorClass: 'cyan',
          bgClass: 'bg-cyan-500/10',
          borderClass: 'border-cyan-500/20',
          textClass: 'text-cyan-400',
          btnClass: 'bg-gradient-to-r from-cyan-500 to-cyan-600 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]'
        };
    }
  };

  const details = getActionDetails();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#131316] border border-white/[0.1] rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-white/[0.05]">
          <h3 className="text-xl font-display font-bold text-white">{details.title}</h3>
          <button onClick={onClose} disabled={isProcessing} className="text-slate-400 hover:text-white transition-colors disabled:opacity-50">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div className={`p-4 rounded-xl ${details.bgClass} border ${details.borderClass} flex gap-3`}>
            <AlertTriangle className={`w-5 h-5 ${details.textClass} shrink-0`} />
            <p className={`text-sm ${details.textClass} opacity-90 leading-relaxed`}>
              {details.description}
            </p>
          </div>

          <div className="space-y-3 bg-black/40 p-4 rounded-xl border border-white/[0.05]">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Escrow ID</span>
              <span className="font-mono text-slate-300">{escrowId}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Action</span>
              <span className="font-medium text-white">{action}</span>
            </div>
          </div>
          
          {error && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-sm text-rose-400">
              {error}
            </div>
          )}
        </div>

        <div className="p-6 pt-0 flex gap-3">
          <button 
            onClick={onClose}
            disabled={isProcessing}
            className="flex-1 py-3 rounded-xl bg-white/[0.05] text-white font-medium hover:bg-white/[0.1] transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            disabled={isProcessing}
            className={`flex-1 py-3 rounded-xl text-white font-medium transition-all disabled:opacity-50 flex items-center justify-center gap-2 ${details.btnClass}`}
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              details.buttonText
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
