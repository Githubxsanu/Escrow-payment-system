export type EscrowStatus = 'Pending' | 'Funded' | 'Delivered' | 'Accepted' | 'Completed' | 'Disputed';

export default function StatusBadge({ status }: { status: EscrowStatus }) {
  const styles = {
    Pending: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
    Funded: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    Delivered: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    Accepted: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    Completed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    Disputed: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  };

  const glowStyles = {
    Pending: '',
    Funded: 'shadow-[0_0_10px_rgba(34,211,238,0.2)]',
    Delivered: 'shadow-[0_0_10px_rgba(139,92,246,0.2)]',
    Accepted: 'shadow-[0_0_10px_rgba(59,130,246,0.2)]',
    Completed: 'shadow-[0_0_10px_rgba(52,211,153,0.2)]',
    Disputed: 'shadow-[0_0_10px_rgba(244,63,94,0.2)]',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status]} ${glowStyles[status]}`}>
      {status}
    </span>
  );
}
