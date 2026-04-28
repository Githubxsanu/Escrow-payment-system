'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'motion/react';
import { Shield, Clock, IndianRupee, User, Info, CheckCircle2, History, AlertCircle, Loader2, Smartphone, Zap } from 'lucide-react';

export default function UPITransactionDetailPage() {
  const { id } = useParams();
  const [record, setRecord] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<'buyer' | 'seller' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    // Load from "permanent record" (simulated with localStorage)
    const storedRecord = localStorage.getItem(id as string);
    if (storedRecord) {
      setRecord(JSON.parse(storedRecord));
    }
    setLoading(false);
  }, [id]);

  const updateRecord = (updates: any) => {
    const newRecord = { ...record, ...updates };
    setRecord(newRecord);
    localStorage.setItem(id as string, JSON.stringify(newRecord));
  };

  const handleAction = (status: string) => {
    setIsProcessing(true);
    setTimeout(() => {
      updateRecord({ status });
      setIsProcessing(false);
    }, 1500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setIsProcessing(true);
      
      // Simulate AI Document Verification logic
      updateRecord({ status: 'Verifying Document...' });
      
      setTimeout(() => {
        updateRecord({ 
          status: 'Funds Released (Completed)',
          deliveryTime: new Date().toISOString(),
          documentHash: 'SHA256-4D2A6B...8F1C'
        });
        setIsProcessing(false);
      }, 5000);
    }
  };

  if (loading) return <div className="min-h-screen bg-[#0a0a0c]" />;

  if (!record) {
    return (
      <main className="min-h-screen bg-[#0a0a0c] flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center text-center p-6">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-white">Record Not Found</h1>
            <p className="text-slate-400">The record address {id} does not exist in our historical logs.</p>
            <button onClick={() => window.location.href = '/'} className="px-6 py-2 bg-white text-black rounded-lg">Go Home</button>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0c] flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Role Filter Simualtion */}
          {!role && (
            <div className="bg-violet-600/10 border border-violet-500/20 rounded-2xl p-6 text-center animate-in fade-in slide-in-from-top-4">
              <h3 className="text-white font-bold mb-4">Who is viewing this record?</h3>
              <div className="flex justify-center gap-4">
                <button onClick={() => setRole('buyer')} className="px-6 py-2 rounded-xl bg-white text-black font-bold">I am the Buyer</button>
                <button onClick={() => setRole('seller')} className="px-6 py-2 rounded-xl bg-violet-600 text-white font-bold">I am the Seller</button>
              </div>
            </div>
          )}

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 text-violet-400 font-mono text-sm mb-2">
                <History className="w-4 h-4" /> Permanent History Record
              </div>
              <h1 className="text-3xl font-display font-bold text-white break-all">{record.id}</h1>
            </div>
            <div className={`px-4 py-2 rounded-full border text-sm font-bold flex items-center gap-2 ${
              record.status.includes('Completed') ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
              record.status.includes('Verifying') ? 'bg-amber-500/10 border-amber-500/20 text-amber-500 animate-pulse' :
              'bg-blue-500/10 border-blue-500/20 text-blue-400'
            }`}>
              <Shield className="w-4 h-4" /> {record.status}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-8 space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-violet-500/20 flex items-center justify-center shrink-0">
                    <Info className="w-6 h-6 text-violet-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Deal Details</h3>
                    <p className="text-slate-400">{record.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Payment Mode</span>
                    <div className="text-white font-medium flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-violet-400" /> {record.paymentMode} Instant
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Timestamp</span>
                    <div className="text-white font-medium flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-400" /> {new Date(record.timestamp).toLocaleString()}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Seller UPI</span>
                    <div className="text-white font-mono break-all">{record.sellerUpi}</div>
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Verification Agent</span>
                    <div className="text-violet-400 font-bold">BlockSafe AI-01</div>
                  </div>
                </div>
              </div>

              {/* Role-Based Actions */}
              {role === 'seller' && (record.status === 'Secured In Escrow') && (
                <div className="bg-white/[0.05] border-2 border-violet-500/30 rounded-3xl p-8 space-y-6 animate-in fade-in zoom-in-95">
                  <div className="flex items-center gap-3 text-violet-400">
                    <AlertCircle className="w-6 h-6" />
                    <h3 className="font-bold text-lg text-white">Action Required: Seller Review</h3>
                  </div>
                  <p className="text-slate-300">You have been requested for this escrow deal. Please review the details above and accept to proceed.</p>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => handleAction('In Progress (Accepted)')}
                      disabled={isProcessing}
                      className="flex-1 py-3 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-500 transition-all flex items-center justify-center gap-2"
                    >
                      {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Accept Contract'}
                    </button>
                    <button 
                      onClick={() => handleAction('Rejected by Seller')}
                      disabled={isProcessing}
                      className="flex-1 py-3 rounded-xl bg-white/5 text-rose-400 border border-rose-500/20 hover:bg-rose-500/10 transition-all"
                    >
                      Reject Deal
                    </button>
                  </div>
                </div>
              )}

              {role === 'seller' && record.status === 'In Progress (Accepted)' && (
                <div className="bg-white/[0.05] border-2 border-blue-500/30 rounded-3xl p-8 space-y-6 animate-in fade-in zoom-in-95">
                  <div className="flex items-center gap-3 text-blue-400">
                    <Smartphone className="w-6 h-6" />
                    <h3 className="font-bold text-lg text-white">Action Required: Deliver Document</h3>
                  </div>
                  <p className="text-slate-300">Upload your digital document or proof of work. The Computer Agent will verify this instantly using SHA-256 encryption.</p>
                  <div className="relative group">
                    <input 
                      type="file" 
                      onChange={handleFileUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                    />
                    <div className="p-10 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center gap-4 group-hover:border-blue-500/50 transition-all group-hover:bg-blue-500/5 text-center">
                      <Zap className="w-10 h-10 text-slate-500 group-hover:text-blue-400" />
                      <div className="text-slate-400">
                        {isProcessing ? 'Agent Verifying File...' : 'Drop digital document here or click to upload'}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Transaction Timeline */}
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-8">
                <h3 className="text-lg font-bold text-white mb-6">Audit Trail</h3>
                <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-white/5">
                  <div className="relative pl-10">
                    <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center z-10">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-white font-medium">Funds Secured in Escrow</div>
                    <div className="text-sm text-slate-500">{new Date(record.timestamp).toLocaleString()}</div>
                  </div>
                  <div className={`relative pl-10 ${record.status.includes('Accepted') || record.status.includes('Completed') ? 'opacity-100' : 'opacity-30'}`}>
                    <div className={`absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center z-10 ${record.status.includes('Accepted') || record.status.includes('Completed') ? 'bg-emerald-500' : 'bg-white/10'}`}>
                      {(record.status.includes('Accepted') || record.status.includes('Completed')) && <CheckCircle2 className="w-4 h-4 text-white" />}
                    </div>
                    <div className={record.status.includes('Accepted') || record.status.includes('Completed') ? 'text-white font-medium' : 'text-slate-400 font-medium'}>
                      {record.status === 'Rejected by Seller' ? 'Contract Rejected by Seller' : 'Contract Accepted by Seller'}
                    </div>
                  </div>
                  <div className={`relative pl-10 ${record.status.includes('Completed') ? 'opacity-100' : 'opacity-30'}`}>
                    <div className={`absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center z-10 ${record.status.includes('Completed') ? 'bg-emerald-500' : 'bg-white/10'}`}>
                      {record.status.includes('Completed') && <CheckCircle2 className="w-4 h-4 text-white" />}
                    </div>
                    <div className={record.status.includes('Completed') ? 'text-white font-medium' : 'text-slate-400 font-medium'}>Work Verified & Funds Released</div>
                    {record.deliveryTime && <div className="text-sm text-slate-500">{new Date(record.deliveryTime).toLocaleString()}</div>}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-violet-600 to-purple-800 rounded-3xl p-8 text-white shadow-[0_0_40px_rgba(139,92,246,0.3)]">
                <div className="flex items-center gap-2 text-violet-200 text-sm font-medium mb-4">
                  <IndianRupee className="w-4 h-4" /> Amount Held
                </div>
                <div className="text-4xl font-bold mb-2">₹{record.amount}</div>
                <div className="text-xs text-violet-200 opacity-70">
                  {record.status.includes('Completed') ? 'Payment released to seller.' : 'Locked securely by AI Computer Agent.'}
                </div>
              </div>

              {record.documentHash && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-3xl p-6 space-y-3">
                  <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> SHA-256 Digital Fingerprint
                  </div>
                  <div className="text-white font-mono text-xs break-all bg-black/20 p-3 rounded-lg border border-white/5">
                    {record.documentHash}
                  </div>
                  <p className="text-[10px] text-slate-500 italic">
                    This document was verified by AI and encrypted before final release.
                  </p>
                </div>
              )}

              <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Buyer Account</div>
                    <div className="text-sm text-white font-mono break-all line-clamp-1">BUYER_{record.id.split('-')[1]}</div>
                  </div>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed italic">
                  *This account is automatically generated based on the payment verification. No external login required.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
