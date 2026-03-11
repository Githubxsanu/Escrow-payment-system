export type DisputeStatus = 'Open' | 'Under Review' | 'Resolved' | 'Closed';

export default function DisputeStatusBadge({ status }: { status: DisputeStatus }) {
  const styles = {
    Open: 'bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_10px_rgba(251,191,36,0.2)]',
    'Under Review': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20 shadow-[0_0_10px_rgba(34,211,238,0.2)]',
    Resolved: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(52,211,153,0.2)]',
    Closed: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
      {status}
    </span>
  );
}
