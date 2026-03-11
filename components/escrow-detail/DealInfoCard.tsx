import { ExternalLink, FileText } from 'lucide-react';

interface DealInfoCardProps {
  escrow: {
    description: string;
    notes: string;
    deadline: string;
    txHash: string;
  };
}

export default function DealInfoCard({ escrow }: DealInfoCardProps) {
  const formatHash = (hash: string) => `${hash.substring(0, 10)}...${hash.substring(hash.length - 8)}`;

  return (
    <div className="p-6 rounded-3xl bg-[#131316] border border-white/[0.05] h-full">
      <div className="flex items-center gap-2 mb-6">
        <FileText className="w-5 h-5 text-cyan-400" />
        <h3 className="text-lg font-display font-semibold text-white">Deal Information</h3>
      </div>

      <div className="space-y-6">
        <div>
          <div className="text-sm text-slate-500 mb-2">Description</div>
          <p className="text-slate-300 text-sm leading-relaxed">{escrow.description}</p>
        </div>

        {escrow.notes && (
          <div>
            <div className="text-sm text-slate-500 mb-2">Additional Notes</div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <p className="text-slate-400 text-sm leading-relaxed italic">{escrow.notes}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/[0.05]">
          <div>
            <div className="text-xs text-slate-500 mb-1">Delivery Deadline</div>
            <div className="text-sm text-slate-300 font-medium">{escrow.deadline}</div>
          </div>
          <div>
            <div className="text-xs text-slate-500 mb-1">Creation Transaction</div>
            <a 
              href={`https://sepolia.etherscan.io/tx/${escrow.txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              {formatHash(escrow.txHash)}
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
