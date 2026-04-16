import { ArrowRight, AlertOctagon, CheckCircle, Shield } from 'lucide-react';
import { EscrowStatus } from '@/components/dashboard/StatusBadge';
import Link from 'next/link';

interface ActionPanelProps {
  status: EscrowStatus;
  onAction: (action: string) => void;
  isBuyer: boolean;
  isSeller: boolean;
  isAgent: boolean;
  selectedFile?: File | null;
  onFileSelect?: (file: File | null) => void;
  deliveredData?: any;
}

export default function ActionPanel({ status, onAction, isBuyer, isSeller, isAgent, selectedFile, onFileSelect, deliveredData }: ActionPanelProps) {
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
            {isBuyer && (
              <button 
                onClick={() => onAction('Deposit Funds')}
                className="w-full py-3.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all font-medium flex items-center justify-center gap-2"
              >
                Deposit Funds <ArrowRight className="w-4 h-4" />
              </button>
            )}
            {!isBuyer && (
              <p className="text-sm text-amber-500/80 bg-amber-500/10 p-3 rounded-xl border border-amber-500/20">Waiting for buyer to deposit funds.</p>
            )}
          </>
        )}

        {status === 'Funded' && (
          <>
            <p className="text-sm text-slate-400 mb-2">Funds are locked securely. The seller should now deliver the product or service.</p>
            {isSeller && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-300 mb-2">Upload Digital Product</label>
                <input 
                  type="file" 
                  onChange={(e) => onFileSelect?.(e.target.files?.[0] || null)}
                  className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-violet-500/10 file:text-violet-400 hover:file:bg-violet-500/20"
                />
              </div>
            )}
            {isSeller && (
              <button 
                onClick={() => onAction('Mark as Delivered')}
                disabled={!selectedFile}
                className={`w-full py-3.5 rounded-xl transition-all font-medium flex items-center justify-center gap-2 ${selectedFile ? 'bg-violet-500/10 text-violet-400 border border-violet-500/20 hover:bg-violet-500/20 hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]' : 'bg-white/[0.02] text-slate-600 border border-white/[0.05] cursor-not-allowed'}`}
              >
                Sign & Mark Delivered <CheckCircle className="w-4 h-4" />
              </button>
            )}
            {(isBuyer || isSeller) && (
              <button 
                onClick={() => onAction('Request Refund')}
                className="w-full py-3.5 rounded-xl bg-white/[0.05] text-slate-300 border border-white/[0.1] hover:bg-white/[0.1] transition-all font-medium"
              >
                Request Refund
              </button>
            )}
          </>
        )}

        {status === 'Delivered' && (
          <>
            <p className="text-sm text-slate-400 mb-2">The seller has marked the deal as delivered. Waiting for the buyer to accept the delivery, or either party can open a dispute.</p>
            
            {deliveredData && (
              <div className="mb-4 p-4 rounded-xl bg-black/40 border border-white/[0.05]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">{deliveredData.fileName}</span>
                  <a href={deliveredData.fileData} download={deliveredData.fileName} className="text-xs text-blue-400 hover:underline">Download File</a>
                </div>
                <div className="text-[10px] sm:text-xs font-mono text-slate-500 break-all bg-black/50 p-2 rounded-lg border border-white/[0.05]">
                  Hash: {deliveredData.fileHash.substring(0, 32)}...
                </div>
              </div>
            )}

            {isBuyer && (
              <button 
                onClick={() => onAction('Accept Delivery')}
                className="w-full py-3.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all font-medium flex items-center justify-center gap-2"
              >
                Verify Hash & Accept <Shield className="w-4 h-4" />
              </button>
            )}
            <button 
              onClick={() => onAction('Open Dispute')}
              className="w-full py-3.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 hover:shadow-[0_0_20px_rgba(244,63,94,0.2)] transition-all font-medium flex items-center justify-center gap-2 mt-2"
            >
              Open Dispute <AlertOctagon className="w-4 h-4" />
            </button>
          </>
        )}

        {status === 'Accepted' && (
          <>
            <p className="text-sm text-slate-400 mb-2">The buyer has accepted the delivery. The agent must now release the payment to the seller.</p>
            {isAgent && (
              <button 
                onClick={() => onAction('Release Payment')}
                className="w-full py-3.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 hover:shadow-[0_0_20px_rgba(52,211,153,0.2)] transition-all font-medium flex items-center justify-center gap-2"
              >
                Release Payment <CheckCircle className="w-4 h-4" />
              </button>
            )}
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
            {isAgent && (
              <button 
                onClick={() => onAction('Resolve Dispute')}
                className="w-full py-3.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 hover:shadow-[0_0_20px_rgba(52,211,153,0.2)] transition-all font-medium flex items-center justify-center gap-2 mb-3"
              >
                Resolve & Revert Payment <CheckCircle className="w-4 h-4" />
              </button>
            )}
            <Link href="/dashboard/disputes" className="w-full">
              <button 
                className="w-full py-3.5 rounded-xl bg-white/[0.05] text-slate-300 border border-white/[0.1] hover:bg-white/[0.1] transition-all font-medium"
              >
                View Dispute Details
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
