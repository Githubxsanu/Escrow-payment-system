'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWallet } from '@/hooks/useWallet';
import { useEscrowContract } from '@/hooks/useEscrowContract';
import EscrowForm from '@/components/create-escrow/EscrowForm';
import DealSummaryCard from '@/components/create-escrow/DealSummaryCard';
import ConfirmationModal from '@/components/create-escrow/ConfirmationModal';
import { Shield } from 'lucide-react';

export default function CreateEscrowPage() {
  const router = useRouter();
  const { address, network } = useWallet();
  const { createEscrow, depositFunds, isReady } = useEscrowContract();
  
  const [formData, setFormData] = useState({
    sellerAddress: '',
    amount: '',
    description: '',
    deadline: '',
    notes: '',
    currencyType: 'native',
    tokenAddress: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleCreate = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    if (!isReady) {
      setError("Please connect your wallet first.");
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      // 1. Convert deadline to Unix timestamp (seconds)
      const deadlineDate = new Date(formData.deadline);
      const deadlineTimestamp = Math.floor(deadlineDate.getTime() / 1000);

      // 2. Call createEscrow on the smart contract
      console.log('Creating escrow on blockchain...');
      
      const txReceipt = await createEscrow(
        formData.sellerAddress, 
        deadlineTimestamp
      );
      console.log('Escrow created!', txReceipt);
      
      // 3. Close modal and redirect to dashboard
      setIsModalOpen(false);
      router.push('/dashboard');
    } catch (err: any) {
      console.error("Transaction failed:", err);
      setError(err.message || "Transaction failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-display font-bold text-white mb-2">Create New Escrow</h1>
        <p className="text-slate-400 mb-4">Securely lock funds for a product or service. Funds are only released when you are satisfied.</p>
        
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Connected to: <span className="text-white ml-1">{network?.name || 'Local / Unknown Network'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <EscrowForm formData={formData} setFormData={setFormData} onSubmit={handleCreate} />
        </div>
        
        <div className="space-y-8">
          <DealSummaryCard formData={formData} buyerAddress={address || ''} />
          
          {/* Info Section */}
          <div className="p-6 rounded-2xl bg-cyan-500/5 border border-cyan-500/20">
            <h3 className="text-lg font-display font-semibold text-cyan-400 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              How it works
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm text-slate-300">
                <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0 text-cyan-400 font-mono text-xs">1</div>
                <p>Funds will be locked securely in a smart contract.</p>
              </li>
              <li className="flex gap-3 text-sm text-slate-300">
                <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0 text-cyan-400 font-mono text-xs">2</div>
                <p>Seller delivers the agreed product or service.</p>
              </li>
              <li className="flex gap-3 text-sm text-slate-300">
                <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0 text-cyan-400 font-mono text-xs">3</div>
                <p>Buyer reviews and confirms the delivery.</p>
              </li>
              <li className="flex gap-3 text-sm text-slate-300">
                <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0 text-cyan-400 font-mono text-xs">4</div>
                <p>Funds are automatically released to the seller.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <ConfirmationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={handleConfirm}
        formData={formData}
        buyerAddress={address || ''}
        isProcessing={isProcessing}
        error={error}
      />
    </div>
  );
}
