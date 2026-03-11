import { ExternalLink } from 'lucide-react';
import { formatAddress } from '@/utils/wallet';

export interface TransactionEvent {
  id: string;
  event: string;
  wallet: string;
  timestamp: string;
  hash: string;
}

export default function TransactionHistoryTable({ history }: { history: TransactionEvent[] }) {
  const formatHash = (hash: string) => `${hash.substring(0, 8)}...${hash.substring(hash.length - 6)}`;

  return (
    <div className="w-full overflow-x-auto rounded-3xl bg-[#131316] border border-white/[0.05]">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/[0.05] bg-white/[0.02]">
            <th className="p-5 text-xs font-medium text-slate-400 uppercase tracking-wider">Event</th>
            <th className="p-5 text-xs font-medium text-slate-400 uppercase tracking-wider">Wallet Address</th>
            <th className="p-5 text-xs font-medium text-slate-400 uppercase tracking-wider">Timestamp</th>
            <th className="p-5 text-xs font-medium text-slate-400 uppercase tracking-wider">Transaction Hash</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.05]">
          {history.map((tx) => (
            <tr key={tx.id} className="hover:bg-white/[0.02] transition-colors group">
              <td className="p-5 font-medium text-white">{tx.event}</td>
              <td className="p-5 font-mono text-sm text-slate-300">{formatAddress(tx.wallet)}</td>
              <td className="p-5 text-sm text-slate-400">{tx.timestamp}</td>
              <td className="p-5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm text-cyan-400">{formatHash(tx.hash)}</span>
                  <a href={`https://sepolia.etherscan.io/tx/${tx.hash}`} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-cyan-400 transition-colors opacity-0 group-hover:opacity-100">
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
