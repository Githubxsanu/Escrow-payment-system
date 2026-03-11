import { Plus, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import DisputeCard, { Dispute } from '@/components/disputes/DisputeCard';

const mockDisputes: Dispute[] = [
  {
    id: 'DSP-1042',
    escrowId: 'ESC-8918',
    buyer: '0x71C...976F',
    seller: '0x89A...2B1C',
    amount: '1.5 ETH',
    status: 'Under Review',
    date: 'Oct 26, 2026'
  },
  {
    id: 'DSP-1039',
    escrowId: 'ESC-8890',
    buyer: '0x32A...119D',
    seller: '0x71C...976F',
    amount: '4.2 ETH',
    status: 'Open',
    date: 'Oct 22, 2026'
  },
  {
    id: 'DSP-0981',
    escrowId: 'ESC-8755',
    buyer: '0x71C...976F',
    seller: '0x11C...88F1',
    amount: '0.8 ETH',
    status: 'Resolved',
    date: 'Oct 10, 2026'
  }
];

export default function DisputesPage() {
  return (
    <div className="space-y-10 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Dispute Resolution</h1>
          <p className="text-slate-400">Manage and track your active disputes and resolutions.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Link 
            href="/dashboard/disputes/new"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-[0_0_15px_rgba(244,63,94,0.3)] hover:shadow-[0_0_25px_rgba(244,63,94,0.5)] transition-all text-sm font-medium flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Open Dispute
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {mockDisputes.map((dispute) => (
          <DisputeCard key={dispute.id} dispute={dispute} />
        ))}
        {mockDisputes.length === 0 && (
          <div className="col-span-full py-12 flex flex-col items-center justify-center text-center bg-[#131316] rounded-3xl border border-white/[0.05]">
            <div className="w-16 h-16 rounded-full bg-white/[0.02] flex items-center justify-center mb-4">
              <AlertTriangle className="w-8 h-8 text-slate-500" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No Active Disputes</h3>
            <p className="text-slate-400 max-w-sm">You don&apos;t have any open disputes at the moment. All your escrow transactions are running smoothly.</p>
          </div>
        )}
      </div>
    </div>
  );
}
