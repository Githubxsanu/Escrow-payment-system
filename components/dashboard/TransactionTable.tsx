import { ExternalLink } from 'lucide-react';
import StatusBadge, { EscrowStatus } from './StatusBadge';

export interface Transaction {
  id: string;
  escrowId: string;
  amount: string;
  status: EscrowStatus | 'Failed';
  date: string;
  hash: string;
}

export default function TransactionTable({ transactions }: { transactions: Transaction[] }) {
  const formatHash = (hash: string) => `${hash.substring(0, 8)}...${hash.substring(hash.length - 6)}`;

  return (
    <div className="w-full overflow-x-auto rounded-2xl bg-[#131316] border border-white/[0.05]">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/[0.05] bg-white/[0.02]">
            <th className="p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Transaction Hash</th>
            <th className="p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Escrow ID</th>
            <th className="p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Amount</th>
            <th className="p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
            <th className="p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.05]">
          {transactions.map((tx) => (
            <tr key={tx.id} className="hover:bg-white/[0.02] transition-colors group">
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm text-cyan-400">{formatHash(tx.hash)}</span>
                  <a href={`https://sepolia.etherscan.io/tx/${tx.hash}`} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-cyan-400 transition-colors opacity-0 group-hover:opacity-100">
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </td>
              <td className="p-4 font-mono text-sm text-slate-300">{tx.escrowId}</td>
              <td className="p-4 font-mono text-sm font-medium text-white">{tx.amount}</td>
              <td className="p-4">
                {tx.status === 'Failed' ? (
                  <span className="px-3 py-1 rounded-full text-xs font-medium border bg-rose-500/10 text-rose-400 border-rose-500/20">Failed</span>
                ) : (
                  <StatusBadge status={tx.status as EscrowStatus} />
                )}
              </td>
              <td className="p-4 text-sm text-slate-400">{tx.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
