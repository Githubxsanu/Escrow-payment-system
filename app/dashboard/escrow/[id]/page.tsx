'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useEscrowContract } from '@/hooks/useEscrowContract';
import EscrowHeader from '@/components/escrow-detail/EscrowHeader';
import EscrowTimeline from '@/components/escrow-detail/EscrowTimeline';
import DealInfoCard from '@/components/escrow-detail/DealInfoCard';
import ActionPanel from '@/components/escrow-detail/ActionPanel';
import TransactionHistoryTable, { TransactionEvent } from '@/components/escrow-detail/TransactionHistoryTable';
import ActionModal from '@/components/escrow-detail/ActionModal';
import { EscrowStatus } from '@/components/dashboard/StatusBadge';

// Mock Data
const mockEscrow = {
  id: 'ESC-8921',
  buyer: '0x71C...976F',
  seller: '0x89A...2B1C',
  amount: '5.5 ETH',
  status: 'Delivered' as EscrowStatus,
  createdAt: 'Oct 24, 2026',
  deadline: 'Oct 31, 2026',
  description: 'Web3 Audit Services for DeFi Protocol',
  notes: 'Audit report must include gas optimization suggestions and vulnerability assessment. Final report should be delivered as a PDF.',
  txHash: '0x8f2a9b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1',
};

const mockHistory: TransactionEvent[] = [
  {
    id: 'evt-1',
    event: 'Escrow Created',
    wallet: '0x71C...976F',
    timestamp: 'Oct 24, 2026 14:30 UTC',
    hash: '0x8f2a9b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1'
  },
  {
    id: 'evt-2',
    event: 'Funds Deposited',
    wallet: '0x71C...976F',
    timestamp: 'Oct 24, 2026 14:35 UTC',
    hash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a'
  },
  {
    id: 'evt-3',
    event: 'Marked as Delivered',
    wallet: '0x89A...2B1C',
    timestamp: 'Oct 28, 2026 09:15 UTC',
    hash: '0x9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8'
  }
];

export default function EscrowDetailPage() {
  const params = useParams();
  const id = params.id as string;
  
  const { depositFunds, markDelivered, confirmDelivery, refundBuyer, openDispute, isReady } = useEscrowContract();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleActionClick = (action: string) => {
    setCurrentAction(action);
    setIsModalOpen(true);
  };

  const handleConfirmAction = async () => {
    if (!isReady) {
      setError("Please connect your wallet first.");
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      // In a real app, you would parse the ID correctly. Here we just use 1 as a mock ID.
      const escrowIdNum = 1; 

      switch (currentAction) {
        case 'Deposit Funds':
          await depositFunds(escrowIdNum, '5.5'); // Mock amount
          break;
        case 'Mark as Delivered':
          await markDelivered(escrowIdNum);
          break;
        case 'Release Payment':
          await confirmDelivery(escrowIdNum);
          break;
        case 'Request Refund':
          await refundBuyer(escrowIdNum);
          break;
        case 'Open Dispute':
          await openDispute(escrowIdNum);
          break;
        default:
          throw new Error("Unknown action");
      }
      
      console.log(`Successfully executed action: ${currentAction}`);
      setIsModalOpen(false);
      // In a real app, you would refresh the escrow details here
    } catch (err: any) {
      console.error("Transaction failed:", err);
      setError(err.message || "Transaction failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-10">
      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="p-2 rounded-xl bg-white/[0.05] text-slate-400 hover:text-white hover:bg-white/[0.1] transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Escrow Details</h1>
        </div>
      </div>

      <EscrowHeader escrow={mockEscrow} />

      <EscrowTimeline status={mockEscrow.status} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <DealInfoCard escrow={mockEscrow} />
        </div>
        <div>
          <ActionPanel status={mockEscrow.status} onAction={handleActionClick} />
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-display font-semibold text-white">Transaction History</h2>
        <TransactionHistoryTable history={mockHistory} />
      </div>

      <ActionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={handleConfirmAction}
        action={currentAction}
        escrowId={id || mockEscrow.id}
        isProcessing={isProcessing}
        error={error}
      />
    </div>
  );
}
