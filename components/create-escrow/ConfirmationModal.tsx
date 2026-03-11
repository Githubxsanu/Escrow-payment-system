import { X, AlertTriangle, Loader2 } from 'lucide-react';
import { formatAddress } from '@/utils/wallet';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  formData: any;
  buyerAddress: string;
  isProcessing?: boolean;
  error?: string;
}

export default function ConfirmationModal({ isOpen, onClose, onConfirm, formData, buyerAddress, isProcessing, error }: ConfirmationModalProps) {
  if (!isOpen) return null;

  // Mock estimated gas
  const estimatedGas = '0.0025 ETH';
  const total = formData.amount ? (parseFloat(formData.amount) + parseFloat(estimatedGas.split(' ')[0])).toFixed(4) : '0.00';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#131316] border border-white/[0.1] rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-white/[0.05]">
          <h3 className="text-xl font-display font-bold text-white">Confirm Escrow</h3>
          <button onClick={onClose} disabled={isProcessing} className="text-slate-400 hover:text-white transition-colors disabled:opacity-50">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
            <p className="text-sm text-amber-400/90 leading-relaxed">
              You are about to lock funds in a smart contract. Please verify the seller address and amount carefully.
            </p>
          </div>

          <div className="space-y-3 bg-black/40 p-4 rounded-xl border border-white/[0.05]">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Buyer</span>
              <span className="font-mono text-slate-300">{buyerAddress ? formatAddress(buyerAddress) : 'Not connected'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Seller</span>
              <span className="font-mono text-slate-300">{formData.sellerAddress ? formatAddress(formData.sellerAddress) : '—'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Amount</span>
              <span className="font-mono text-white">{formData.amount} ETH</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Est. Network Fee</span>
              <span className="font-mono text-slate-400">{estimatedGas}</span>
            </div>
            <div className="pt-3 mt-3 border-t border-white/[0.05] flex justify-between items-center">
              <span className="text-slate-300 font-medium">Total</span>
              <span className="font-mono text-lg font-bold text-cyan-400">{total} ETH</span>
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
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              'Confirm & Lock'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
