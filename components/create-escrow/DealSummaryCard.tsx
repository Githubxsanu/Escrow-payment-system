import { formatAddress } from '@/utils/wallet';

interface DealSummaryCardProps {
  formData: any;
  buyerAddress: string;
}

export default function DealSummaryCard({ formData, buyerAddress }: DealSummaryCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-[#131316] border border-white/[0.05] relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <h3 className="text-lg font-display font-semibold text-white mb-6 relative z-10">Deal Summary</h3>
      
      <div className="space-y-4 relative z-10">
        <div className="flex justify-between items-start pb-4 border-b border-white/[0.05]">
          <span className="text-sm text-slate-400">Buyer</span>
          <span className="text-sm font-mono text-cyan-400">{buyerAddress ? formatAddress(buyerAddress) : 'Not connected'}</span>
        </div>
        
        <div className="flex justify-between items-start pb-4 border-b border-white/[0.05]">
          <span className="text-sm text-slate-400">Seller</span>
          <span className="text-sm font-mono text-slate-300">{formData.sellerAddress ? formatAddress(formData.sellerAddress) : '—'}</span>
        </div>
        
        <div className="flex justify-between items-start pb-4 border-b border-white/[0.05]">
          <span className="text-sm text-slate-400">Amount</span>
          <span className="text-sm font-mono font-medium text-white">
            {formData.amount ? `${formData.amount} ${formData.currencyType === 'erc20' ? 'TOKEN' : 'MATIC'}` : '—'}
          </span>
        </div>
        
        <div className="flex justify-between items-start pb-4 border-b border-white/[0.05]">
          <span className="text-sm text-slate-400">Deadline</span>
          <span className="text-sm text-slate-300">{formData.deadline || '—'}</span>
        </div>
        
        <div className="flex justify-between items-start pt-2">
          <span className="text-sm text-slate-400">Total to Lock</span>
          <span className="text-xl font-mono font-bold text-cyan-400">
            {formData.amount ? `${formData.amount} ${formData.currencyType === 'erc20' ? 'TOKEN' : 'MATIC'}` : '0.00 MATIC'}
          </span>
        </div>
      </div>
    </div>
  );
}
