import { useState } from 'react';
import { isAddress } from 'ethers';
import { motion } from 'motion/react';

interface EscrowFormProps {
  formData: any;
  setFormData: (data: any) => void;
  onSubmit: () => void;
}

export default function EscrowForm({ formData, setFormData, onSubmit }: EscrowFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.sellerAddress) {
      newErrors.sellerAddress = 'Seller address is required';
    } else if (!isAddress(formData.sellerAddress)) {
      newErrors.sellerAddress = 'Invalid Ethereum address';
    }

    if (!formData.amount) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }



    if (!formData.description) {
      newErrors.description = 'Description is required';
    }

    if (!formData.deadline) {
      newErrors.deadline = 'Deadline is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-[#131316] border border-white/[0.05] shadow-[0_0_40px_rgba(0,0,0,0.5)] relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="space-y-6 relative z-10">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Seller Wallet Address</label>
          <input 
            type="text" 
            name="sellerAddress"
            value={formData.sellerAddress}
            onChange={handleChange}
            placeholder="0x..." 
            className={`w-full bg-black/40 border ${errors.sellerAddress ? 'border-rose-500/50 focus:border-rose-500 focus:ring-rose-500/20' : 'border-white/[0.1] focus:border-cyan-500 focus:ring-cyan-500/20'} rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 transition-all font-mono text-sm`}
          />
          {errors.sellerAddress && <p className="mt-1.5 text-xs text-rose-400">{errors.sellerAddress}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Payment Amount</label>
            <div className="relative">
              <input 
                type="text" 
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="0.00" 
                className={`w-full bg-black/40 border ${errors.amount ? 'border-rose-500/50 focus:border-rose-500 focus:ring-rose-500/20' : 'border-white/[0.1] focus:border-cyan-500 focus:ring-cyan-500/20'} rounded-xl pl-4 pr-16 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 transition-all font-mono text-sm`}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
                ETH
              </div>
            </div>
            {errors.amount && <p className="mt-1.5 text-xs text-rose-400">{errors.amount}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Deal Description</label>
          <input 
            type="text" 
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="e.g., Website Redesign, Smart Contract Audit" 
            className={`w-full bg-black/40 border ${errors.description ? 'border-rose-500/50 focus:border-rose-500 focus:ring-rose-500/20' : 'border-white/[0.1] focus:border-cyan-500 focus:ring-cyan-500/20'} rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 transition-all text-sm`}
          />
          {errors.description && <p className="mt-1.5 text-xs text-rose-400">{errors.description}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Delivery Deadline</label>
          <input 
            type="date" 
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className={`w-full bg-black/40 border ${errors.deadline ? 'border-rose-500/50 focus:border-rose-500 focus:ring-rose-500/20' : 'border-white/[0.1] focus:border-cyan-500 focus:ring-cyan-500/20'} rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 transition-all text-sm [color-scheme:dark]`}
          />
          {errors.deadline && <p className="mt-1.5 text-xs text-rose-400">{errors.deadline}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Optional Notes</label>
          <textarea 
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Any additional terms or conditions..." 
            rows={3}
            className="w-full bg-black/40 border border-white/[0.1] focus:border-cyan-500 focus:ring-cyan-500/20 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 transition-all text-sm resize-none"
          />
        </div>

        <div className="pt-4">
          <button 
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all duration-300"
          >
            Review & Create Escrow
          </button>
        </div>
      </div>
    </form>
  );
}
