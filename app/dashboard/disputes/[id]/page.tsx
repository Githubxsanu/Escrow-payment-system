'use client';

import { useParams } from 'next/navigation';
import { ArrowLeft, MessageSquare, FileText, Download, Scale } from 'lucide-react';
import Link from 'next/link';
import DisputeStatusBadge, { DisputeStatus } from '@/components/disputes/DisputeStatusBadge';
import DisputeTimeline from '@/components/disputes/DisputeTimeline';
import { formatAddress } from '@/utils/wallet';

// Mock Data
const mockDispute = {
  id: 'DSP-1042',
  escrowId: 'ESC-8918',
  buyer: '0x71C...976F',
  seller: '0x89A...2B1C',
  amount: '1.5 ETH',
  status: 'Under Review' as DisputeStatus,
  date: 'Oct 26, 2026',
  reason: 'Item/service not as described',
  description: 'The delivered smart contract code does not match the specifications requested. Several key functions are missing and the gas optimization is poor. I have attached the original spec and the delivered code for comparison.',
  evidence: [
    { name: 'original_spec.pdf', size: '2.4 MB' },
    { name: 'delivered_code.zip', size: '1.1 MB' }
  ],
  messages: [
    { sender: '0x71C...976F', text: 'The code is missing the staking functionality completely.', time: 'Oct 26, 14:30' },
    { sender: '0x89A...2B1C', text: 'Staking was not in the original scope document. It was discussed but not finalized.', time: 'Oct 26, 15:45' },
    { sender: '0x71C...976F', text: 'It is clearly stated in section 3 of the attached spec.', time: 'Oct 26, 16:10' }
  ]
};

export default function DisputeDetailPage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-10">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/disputes" className="p-2 rounded-xl bg-white/[0.05] text-slate-400 hover:text-white hover:bg-white/[0.1] transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Dispute Details</h1>
        </div>
      </div>

      <div className="p-6 rounded-3xl bg-[#131316] border border-white/[0.05] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-500/5 to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-3xl font-display font-bold text-white">{mockDispute.id}</h1>
              <DisputeStatusBadge status={mockDispute.status} />
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <span>Opened on {mockDispute.date}</span>
              <span className="w-1 h-1 rounded-full bg-slate-600" />
              <Link href={`/dashboard/escrow/${mockDispute.escrowId}`} className="text-cyan-400 hover:underline">
                Escrow: {mockDispute.escrowId}
              </Link>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 md:gap-10 p-4 rounded-2xl bg-black/40 border border-white/[0.05]">
            <div>
              <div className="text-xs text-slate-500 mb-1">Buyer</div>
              <div className="text-sm font-mono text-slate-300">{formatAddress(mockDispute.buyer)}</div>
            </div>
            <div className="w-px bg-white/[0.05] hidden sm:block" />
            <div>
              <div className="text-xs text-slate-500 mb-1">Seller</div>
              <div className="text-sm font-mono text-slate-300">{formatAddress(mockDispute.seller)}</div>
            </div>
            <div className="w-px bg-white/[0.05] hidden sm:block" />
            <div>
              <div className="text-xs text-slate-500 mb-1">Disputed Amount</div>
              <div className="text-lg font-mono font-bold text-rose-400">{mockDispute.amount}</div>
            </div>
          </div>
        </div>
      </div>

      <DisputeTimeline status={mockDispute.status} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Dispute Info */}
          <div className="p-6 rounded-3xl bg-[#131316] border border-white/[0.05]">
            <div className="flex items-center gap-2 mb-6">
              <FileText className="w-5 h-5 text-rose-400" />
              <h3 className="text-lg font-display font-semibold text-white">Dispute Information</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <div className="text-sm text-slate-500 mb-1">Reason</div>
                <div className="text-white font-medium">{mockDispute.reason}</div>
              </div>
              <div>
                <div className="text-sm text-slate-500 mb-2">Description</div>
                <p className="text-slate-300 text-sm leading-relaxed">{mockDispute.description}</p>
              </div>
              
              {mockDispute.evidence.length > 0 && (
                <div>
                  <div className="text-sm text-slate-500 mb-3">Submitted Evidence</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {mockDispute.evidence.map((file, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] transition-colors cursor-pointer group">
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                          <div>
                            <div className="text-sm text-slate-300">{file.name}</div>
                            <div className="text-xs text-slate-500">{file.size}</div>
                          </div>
                        </div>
                        <Download className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Messages */}
          <div className="p-6 rounded-3xl bg-[#131316] border border-white/[0.05]">
            <div className="flex items-center gap-2 mb-6">
              <MessageSquare className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-display font-semibold text-white">Conversation</h3>
            </div>
            
            <div className="space-y-6 mb-6">
              {mockDispute.messages.map((msg, i) => {
                const isBuyer = msg.sender === mockDispute.buyer;
                return (
                  <div key={i} className={`flex flex-col ${isBuyer ? 'items-end' : 'items-start'}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-slate-500">{formatAddress(msg.sender)}</span>
                      <span className="text-xs text-slate-600">{msg.time}</span>
                    </div>
                    <div className={`p-4 rounded-2xl max-w-[85%] sm:max-w-[75%] text-sm leading-relaxed ${
                      isBuyer 
                        ? 'bg-cyan-500/10 text-cyan-50 border border-cyan-500/20 rounded-tr-sm' 
                        : 'bg-white/[0.05] text-slate-300 border border-white/[0.1] rounded-tl-sm'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="flex gap-3">
              <input 
                type="text" 
                placeholder="Type a message..." 
                className="flex-1 bg-black/40 border border-white/[0.1] focus:border-cyan-500 focus:ring-cyan-500/20 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 transition-all text-sm"
              />
              <button className="px-6 py-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 transition-all font-medium">
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Resolution Panel */}
        <div>
          <div className="p-6 rounded-3xl bg-[#131316] border border-white/[0.05] sticky top-6">
            <div className="flex items-center gap-2 mb-6">
              <Scale className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-display font-semibold text-white">Resolution Panel</h3>
            </div>
            
            <div className="space-y-4">
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                This dispute is currently under review by an independent arbitrator. The arbitrator will review the evidence and messages to make a final decision.
              </p>
              
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] opacity-50">
                  <div className="font-medium text-white mb-1">Refund to Buyer</div>
                  <div className="text-xs text-slate-500">100% of funds returned to buyer</div>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] opacity-50">
                  <div className="font-medium text-white mb-1">Release to Seller</div>
                  <div className="text-xs text-slate-500">100% of funds released to seller</div>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] opacity-50">
                  <div className="font-medium text-white mb-1">Partial Settlement</div>
                  <div className="text-xs text-slate-500">Funds split based on arbitration</div>
                </div>
              </div>
              
              <div className="pt-6 mt-6 border-t border-white/[0.05]">
                <div className="text-center p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <div className="text-amber-400 font-medium mb-1">Awaiting Decision</div>
                  <div className="text-xs text-amber-400/70">Expected resolution in 2-3 days</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
