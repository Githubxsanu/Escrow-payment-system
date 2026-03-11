import { Plus, List, AlertCircle } from 'lucide-react';
import SummaryStats from '@/components/dashboard/SummaryStats';
import EscrowCard, { EscrowDeal } from '@/components/dashboard/EscrowCard';
import TransactionTable, { Transaction } from '@/components/dashboard/TransactionTable';

const mockEscrows: EscrowDeal[] = [
  {
    id: 'ESC-8921',
    title: 'Web3 Audit Services',
    buyer: '0x71C...976F',
    seller: '0x89A...2B1C',
    amount: '5.5 ETH',
    status: 'Funded',
    date: 'Oct 24, 2026'
  },
  {
    id: 'ESC-8922',
    title: 'NFT Collection Art',
    buyer: '0x32A...119D',
    seller: '0x71C...976F',
    amount: '2.0 ETH',
    status: 'Pending',
    date: 'Oct 25, 2026'
  },
  {
    id: 'ESC-8919',
    title: 'Smart Contract Dev',
    buyer: '0x99B...44E2',
    seller: '0x11C...88F1',
    amount: '12.0 ETH',
    status: 'Delivered',
    date: 'Oct 20, 2026'
  }
];

const mockTransactions: Transaction[] = [
  {
    id: 'tx-1',
    escrowId: 'ESC-8921',
    amount: '5.5 ETH',
    status: 'Funded',
    date: 'Oct 24, 2026 14:30 UTC',
    hash: '0x8f2a9b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1'
  },
  {
    id: 'tx-2',
    escrowId: 'ESC-8919',
    amount: '12.0 ETH',
    status: 'Completed',
    date: 'Oct 22, 2026 09:15 UTC',
    hash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a'
  },
  {
    id: 'tx-3',
    escrowId: 'ESC-8918',
    amount: '1.5 ETH',
    status: 'Disputed',
    date: 'Oct 18, 2026 16:45 UTC',
    hash: '0x9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8'
  }
];

export default function DashboardPage() {
  return (
    <div className="space-y-10 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Dashboard</h1>
          <p className="text-slate-400">Manage your escrow deals and track transactions securely.</p>
        </div>
        
        {/* Quick Actions */}
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded-xl bg-white/[0.05] text-slate-300 border border-white/[0.1] hover:bg-white/[0.1] transition-all text-sm font-medium flex items-center gap-2">
            <List className="w-4 h-4" />
            View All
          </button>
          <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all text-sm font-medium flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Create Escrow
          </button>
        </div>
      </div>

      <SummaryStats />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-display font-semibold text-white">Active Escrows</h2>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {mockEscrows.map((deal) => (
            <EscrowCard key={deal.id} deal={deal} />
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-display font-semibold text-white">Recent Transactions</h2>
        </div>
        <TransactionTable transactions={mockTransactions} />
      </div>
    </div>
  );
}
