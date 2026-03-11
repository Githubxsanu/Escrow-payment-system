import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import EvidenceUpload from './EvidenceUpload';

interface DisputeFormProps {
  onSubmit: (data: any) => void;
  isProcessing?: boolean;
}

export default function DisputeForm({ onSubmit, isProcessing }: DisputeFormProps) {
  const [formData, setFormData] = useState({
    escrowId: '',
    reason: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-[#131316] border border-white/[0.05] shadow-[0_0_40px_rgba(0,0,0,0.5)] relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="space-y-6 relative z-10">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Escrow ID</label>
          <input 
            type="text" 
            name="escrowId"
            value={formData.escrowId}
            onChange={handleChange}
            placeholder="e.g., ESC-8921" 
            disabled={isProcessing}
            className="w-full bg-black/40 border border-white/[0.1] focus:border-cyan-500 focus:ring-cyan-500/20 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 transition-all font-mono text-sm disabled:opacity-50"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Reason for Dispute</label>
          <select 
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            disabled={isProcessing}
            className="w-full bg-black/40 border border-white/[0.1] focus:border-cyan-500 focus:ring-cyan-500/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 transition-all text-sm appearance-none disabled:opacity-50"
            required
          >
            <option value="" disabled className="text-slate-600">Select a reason...</option>
            <option value="non_delivery">Non-delivery of goods/services</option>
            <option value="not_as_described">Item/service not as described</option>
            <option value="unresponsive">Seller is unresponsive</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Detailed Description</label>
          <textarea 
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Please provide as much detail as possible about the issue..." 
            rows={5}
            disabled={isProcessing}
            className="w-full bg-black/40 border border-white/[0.1] focus:border-cyan-500 focus:ring-cyan-500/20 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 transition-all text-sm resize-none disabled:opacity-50"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Evidence Upload</label>
          <EvidenceUpload />
        </div>

        <div className="pt-4">
          <button 
            type="submit"
            disabled={isProcessing}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 text-white font-medium hover:shadow-[0_0_30px_rgba(244,63,94,0.4)] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              'Submit Dispute'
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
