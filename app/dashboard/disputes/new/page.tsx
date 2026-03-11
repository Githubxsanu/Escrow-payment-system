'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { useEscrowContract } from '@/hooks/useEscrowContract';
import DisputeForm from '@/components/disputes/DisputeForm';

export default function NewDisputePage() {
  const router = useRouter();
  const { openDispute, isReady } = useEscrowContract();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (data: any) => {
    if (!isReady) {
      setError("Please connect your wallet first.");
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      // In a real app, parse the escrow ID correctly (e.g., extracting the number from "ESC-123")
      // For this demo, we'll just use 1.
      const escrowIdNum = 1;
      
      console.log('Opening dispute on blockchain for:', data);
      await openDispute(escrowIdNum);
      
      router.push('/dashboard/disputes');
    } catch (err: any) {
      console.error("Failed to open dispute:", err);
      setError(err.message || "Failed to open dispute. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/disputes" className="p-2 rounded-xl bg-white/[0.05] text-slate-400 hover:text-white hover:bg-white/[0.1] transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Open a Dispute</h1>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-sm text-rose-400">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <DisputeForm onSubmit={handleSubmit} isProcessing={isProcessing} />
        </div>
        
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-rose-500/5 border border-rose-500/20">
            <h3 className="text-lg font-display font-semibold text-rose-400 mb-4 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5" />
              Dispute Process
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm text-slate-300">
                <div className="w-6 h-6 rounded-full bg-rose-500/20 flex items-center justify-center shrink-0 text-rose-400 font-mono text-xs">1</div>
                <p>Submit your dispute with clear evidence and description.</p>
              </li>
              <li className="flex gap-3 text-sm text-slate-300">
                <div className="w-6 h-6 rounded-full bg-rose-500/20 flex items-center justify-center shrink-0 text-rose-400 font-mono text-xs">2</div>
                <p>Funds remain locked in the smart contract.</p>
              </li>
              <li className="flex gap-3 text-sm text-slate-300">
                <div className="w-6 h-6 rounded-full bg-rose-500/20 flex items-center justify-center shrink-0 text-rose-400 font-mono text-xs">3</div>
                <p>An independent arbitrator reviews the case and evidence.</p>
              </li>
              <li className="flex gap-3 text-sm text-slate-300">
                <div className="w-6 h-6 rounded-full bg-rose-500/20 flex items-center justify-center shrink-0 text-rose-400 font-mono text-xs">4</div>
                <p>Arbitrator makes a final, binding decision on fund distribution.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
