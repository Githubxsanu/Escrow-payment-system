'use client';

import { useState, useEffect } from 'react';
import { sha256, toUtf8Bytes, verifyMessage } from 'ethers';
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
import { useWallet } from '@/hooks/useWallet';

// Removed mockEscrow

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
  const rawId = params.id as string;
  const numericId = parseInt(rawId.replace(/^ESC-/, ''), 10);
  
  const { depositFunds, markDelivered, acceptDelivery, confirmDelivery, refundBuyer, openDispute, isReady, getEscrowDetails, getAgent, signer } = useEscrowContract();
  const { address } = useWallet();
  
  const [escrow, setEscrow] = useState<any>(null);
  const [onChainAgent, setOnChainAgent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [simulatedRole, setSimulatedRole] = useState<'real' | 'buyer' | 'seller' | 'agent'>('real');
  
  const [digitalFile, setDigitalFile] = useState<File | null>(null);
  const [deliveredData, setDeliveredData] = useState<any>(null);

  const fetchEscrowDetails = async () => {
    if (!isReady || isNaN(numericId)) return;
    try {
      setIsLoading(true);
      const agentAddr = await getAgent();
      setOnChainAgent(agentAddr);
      const details = await getEscrowDetails(numericId);
      setEscrow({
        id: `ESC-${numericId}`,
        buyer: details.buyer,
        seller: details.seller,
        amount: `${details.amount} ETH`,
        rawAmount: details.amount,
        status: details.status === 'Created' ? 'Pending' : details.status,
        createdAt: new Date(details.createdAt * 1000).toLocaleDateString(),
        deadline: new Date(details.deadline * 1000).toLocaleDateString(),
        description: 'Smart Contract Escrow Deal',
        notes: 'Terms secured by the BlockSafe smart contract.',
        txHash: 'N/A'
      });
      // Fetch related digital delivery if available
      if (details.status === 'Delivered' || details.status === 'Accepted' || details.status === 'Completed') {
        const fileRes = await fetch(`/api/files?id=ESC-${numericId}`);
        const fileData = await fileRes.json();
        if (fileData.success) {
          setDeliveredData(fileData.data);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEscrowDetails();
  }, [isReady, numericId]);

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
      const escrowIdNum = numericId; 

      switch (currentAction) {
        case 'Deposit Funds': {
          const defaultAmt = prompt("Enter amount to deposit in ETH:", "0.1");
          if (!defaultAmt) throw new Error("Deposit cancelled by user");
          await depositFunds(escrowIdNum, defaultAmt); 
          break;
        }
        case 'Mark as Delivered': {
          if (!digitalFile) throw new Error("Please upload a file to deliver.");
          if (!signer) throw new Error("Wallet not connected completely");
          
          // Vercel Serverless Body Limit is 4.5MB. Base64 adds ~33% overhead.
          // We limit to 3MB to be safe.
          if (digitalFile.size > 3 * 1024 * 1024) {
            throw new Error("File too large for this demo. Please use a file smaller than 3MB.");
          }

          const reader = new FileReader();
          reader.readAsDataURL(digitalFile);
          await new Promise(resolve => { reader.onload = resolve; });
          const fileBase64 = reader.result as string;
          
          const fileHash = sha256(toUtf8Bytes(fileBase64));
          const signature = await signer.signMessage(fileHash);
          
          const res = await fetch('/api/files', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              escrowId: `ESC-${numericId}`,
              fileData: fileBase64,
              fileHash,
              signature,
              fileName: digitalFile.name
            })
          });

          if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.error || "Failed to upload file off-chain. This is likely due to Vercel's 4.5MB limit.");
          }
          
          await markDelivered(escrowIdNum);
          break;
        }
        case 'Accept Delivery': {
          if (deliveredData) {
            const computedHash = sha256(toUtf8Bytes(deliveredData.fileData));
            if (computedHash !== deliveredData.fileHash) throw new Error("File integrity check failed: Hash mismatch!");

            const recoveredAddress = verifyMessage(computedHash, deliveredData.signature);
            if (recoveredAddress.toLowerCase() !== escrow.seller.toLowerCase()) {
              throw new Error("Signature verification failed: Not signed by seller!");
            }
          }
          await acceptDelivery(escrowIdNum);
          break;
        }
        case 'Release Payment':
          await confirmDelivery(escrowIdNum);
          break;
        case 'Request Refund':
          await refundBuyer(escrowIdNum);
          break;
        case 'Open Dispute':
          await openDispute(escrowIdNum);
          break;
        case 'Resolve Dispute':
          await refundBuyer(escrowIdNum);
          break;
        default:
          throw new Error("Unknown action");
      }
      
      console.log(`Successfully executed action: ${currentAction}`);
      setIsModalOpen(false);
      await fetchEscrowDetails();
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
        <div className="ml-auto bg-[#131316] border border-white/[0.1] rounded-xl p-2 px-3 flex items-center gap-3">
          <span className="text-sm font-medium text-slate-400">Simulate View:</span>
          <select 
            value={simulatedRole} 
            onChange={(e) => setSimulatedRole(e.target.value as any)}
            className="bg-black/50 border border-white/[0.1] text-sm text-cyan-400 font-medium rounded-lg px-2 py-1 outline-none focus:border-cyan-500/50"
          >
            <option value="real">Real Connected Wallet</option>
            <option value="buyer">Mock as Buyer</option>
            <option value="seller">Mock as Seller</option>
            <option value="agent">Mock as Agent</option>
          </select>
        </div>
      </div>

      {!isLoading && escrow ? (
        <>
          <EscrowHeader escrow={escrow} />

          <EscrowTimeline status={escrow.status} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <DealInfoCard escrow={escrow} />
            </div>
            <div>
              <ActionPanel 
                status={escrow.status} 
                onAction={handleActionClick} 
                isBuyer={simulatedRole === 'real' ? address?.toLowerCase() === escrow?.buyer?.toLowerCase() : simulatedRole === 'buyer'}
                isSeller={simulatedRole === 'real' ? address?.toLowerCase() === escrow?.seller?.toLowerCase() : simulatedRole === 'seller'}
                isAgent={simulatedRole === 'real' ? !!address && !!onChainAgent && address.toLowerCase() === onChainAgent.toLowerCase() : simulatedRole === 'agent'}
                selectedFile={digitalFile}
                onFileSelect={setDigitalFile}
                deliveredData={deliveredData}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="text-white">Loading escrow details...</div>
      )}

      <div className="space-y-6">
        <h2 className="text-xl font-display font-semibold text-white">Transaction History</h2>
        <TransactionHistoryTable history={mockHistory} />
      </div>

      <ActionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={handleConfirmAction}
        action={currentAction}
        escrowId={escrow?.id || 'Unknown'}
        isProcessing={isProcessing}
        error={error}
      />
    </div>
  );
}
