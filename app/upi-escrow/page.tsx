'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Shield, CheckCircle, Smartphone, ArrowRight, Loader2, AlertCircle, User, History } from 'lucide-react';

export default function UPIEscrowPage() {
  const [step, setStep] = useState(0); // 0: Login, 1: Action Selection, 2: Setup/Join, 3: QR, 4: Success
  const [isJoinMode, setIsJoinMode] = useState(false);
  const [loginData, setLoginData] = useState({ upiId: '', otp: '' });
  const [formData, setFormData] = useState({
    amount: '',
    sellerUpi: '',
    description: '',
    buyerName: '',
    contractId: ''
  });
  const [isVerifying, setIsVerifying] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpSent) {
      setOtpSent(true);
      return;
    }
    // OTP Verified (Simulated)
    setStep(1);
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate finding contract and requiring OTP
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      const stored = localStorage.getItem(formData.contractId);
      if (stored) {
        window.location.href = `/upi-escrow/${formData.contractId}`;
      } else {
        alert("Contract address not found!");
      }
    }, 2000);
  };

  const handlePaid = () => {
    setIsVerifying(true);
    // Simulate AI Agent Verification
    setTimeout(() => {
      setIsVerifying(false);
      setStep(4);
      // Generate a unique permanent record "address"
      const recordAddress = 'BSXP-' + Math.random().toString(36).substr(2, 12).toUpperCase();
      setTransactionId(recordAddress);
      
      // Save to "permanent record" (simulated with localStorage)
      const record = {
        id: recordAddress,
        amount: formData.amount,
        sellerUpi: formData.sellerUpi,
        buyerUpi: loginData.upiId,
        description: formData.description,
        timestamp: new Date().toISOString(),
        status: 'Secured In Escrow',
        paymentMode: 'UPI'
      };
      localStorage.setItem(recordAddress, JSON.stringify(record));
    }, 4000);
  };

  const upiUrl = `upi://pay?pa=${formData.sellerUpi}&pn=BlockSafe&am=${formData.amount}&cu=INR&tn=${formData.description}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiUrl)}`;

  return (
    <main className="min-h-screen bg-[#0a0a0c] flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          
          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-4 mb-12">
            {[0, 1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  step >= s ? 'bg-violet-500 text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]' : 'bg-white/5 text-slate-500 border border-white/10'
                }`}>
                  {step > s ? <CheckCircle className="w-5 h-5" /> : s + 1}
                </div>
                {s < 4 && <div className={`w-8 h-0.5 rounded-full ${step > s ? 'bg-violet-500' : 'bg-white/5'}`} />}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="login"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-md mx-auto space-y-8"
              >
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-6">
                    <User className="w-8 h-8 text-violet-400" />
                  </div>
                  <h1 className="text-3xl font-display font-bold text-white mb-2">UPI Secure Login</h1>
                  <p className="text-slate-400">Login with your UPI ID to access the escrow portal.</p>
                </div>

                <form onSubmit={handleLogin} className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-8 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">UPI ID / VPA</label>
                    <input 
                      required
                      disabled={otpSent}
                      type="text"
                      placeholder="username@upi"
                      value={loginData.upiId}
                      onChange={(e) => setLoginData({...loginData, upiId: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 focus:border-violet-500 focus:ring-violet-500/20 rounded-xl px-4 py-3 text-white placeholder-slate-600 outline-none transition-all font-mono"
                    />
                  </div>

                  {otpSent && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                    >
                      <label className="block text-sm font-medium text-slate-300 mb-2">Enter OTP (Sent to linked number)</label>
                      <input 
                        required
                        type="text"
                        placeholder="000000"
                        maxLength={6}
                        value={loginData.otp}
                        onChange={(e) => setLoginData({...loginData, otp: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 focus:border-violet-500 focus:ring-violet-500/20 rounded-xl px-4 py-3 text-white placeholder-slate-600 outline-none transition-all font-mono tracking-[1em] text-center"
                      />
                    </motion.div>
                  )}

                  <button 
                    type="submit"
                    className="w-full py-4 rounded-xl bg-violet-600 text-white font-bold hover:bg-violet-500 shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all flex items-center justify-center gap-2"
                  >
                    {otpSent ? 'Verify & Login' : 'Send OTP'} <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="selection"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6"
              >
                <button 
                  onClick={() => { setIsJoinMode(false); setStep(2); }}
                  className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:border-violet-500/50 hover:bg-violet-500/5 transition-all text-left space-y-4 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-violet-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Smartphone className="w-6 h-6 text-violet-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Act as Buyer</h3>
                  <p className="text-sm text-slate-400">Initialize a new secure transaction and generate a payment QR.</p>
                </button>

                <button 
                  onClick={() => { setIsJoinMode(true); setStep(2); }}
                  className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all text-left space-y-4 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <History className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Act as Seller</h3>
                  <p className="text-sm text-slate-400">Access an existing escrow deal using a contract address.</p>
                </button>
              </motion.div>
            )}

            {step === 2 && !isJoinMode && (
              <motion.div
                key="setup"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-xl mx-auto space-y-8"
              >
                <div className="text-center">
                  <h1 className="text-3xl font-display font-bold text-white mb-2">Setup UPI Escrow</h1>
                  <p className="text-slate-400">Instantly secure your deal using UPI. AI agent handles the verification.</p>
                </div>

                <form onSubmit={handleNext} className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-8 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Amount to Pay (INR)</label>
                    <div className="relative">
                      <input 
                        required
                        type="number"
                        placeholder="0.00"
                        value={formData.amount}
                        onChange={(e) => setFormData({...formData, amount: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 focus:border-violet-500 focus:ring-violet-500/20 rounded-xl px-4 py-3 text-white placeholder-slate-600 outline-none transition-all"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-mono">₹</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Seller UPI ID</label>
                    <input 
                      required
                      type="text"
                      placeholder="username@upi"
                      value={formData.sellerUpi}
                      onChange={(e) => setFormData({...formData, sellerUpi: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 focus:border-violet-500 focus:ring-violet-500/20 rounded-xl px-4 py-3 text-white placeholder-slate-600 outline-none transition-all font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Deal Description</label>
                    <input 
                      required
                      type="text"
                      placeholder="e.g. Graphic Design Payment"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 focus:border-violet-500 focus:ring-violet-500/20 rounded-xl px-4 py-3 text-white placeholder-slate-600 outline-none transition-all"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4 rounded-xl bg-violet-600 text-white font-bold hover:bg-violet-500 shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all flex items-center justify-center gap-2"
                  >
                    Generate Payment QR <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
              </motion.div>
            )}

            {step === 2 && isJoinMode && (
              <motion.div
                key="join"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-xl mx-auto space-y-8"
              >
                <div className="text-center">
                  <h1 className="text-3xl font-display font-bold text-white mb-2">Access Escrow Deal</h1>
                  <p className="text-slate-400">Enter the BSXP contract address provided by the buyer.</p>
                </div>

                <form onSubmit={handleJoin} className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-8 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">BSXP Contract Address</label>
                    <input 
                      required
                      type="text"
                      placeholder="BSXP-XXXX-XXXX"
                      value={formData.contractId}
                      onChange={(e) => setFormData({...formData, contractId: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 focus:border-violet-500 focus:ring-violet-500/20 rounded-xl px-4 py-3 text-white placeholder-slate-600 outline-none transition-all font-mono"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isVerifying}
                    className="w-full py-4 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-2"
                  >
                    {isVerifying ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Join & Verify Deal'} 
                  </button>
                </form>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-2xl mx-auto"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white/[0.02] border border-white/[0.05] rounded-3xl p-8 lg:p-12 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 blur-3xl rounded-full" />
                  
                  <div className="space-y-6 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-bold uppercase tracking-wider">
                      <Zap className="w-3 h-3" /> Live Payment Request
                    </div>
                    <h2 className="text-3xl font-bold text-white">Scan & Pay</h2>
                    <p className="text-slate-400">Scan the QR code with any UPI app (GPay, PhonePe, Paytm). Funds are held in escrow.</p>
                    
                    <div className="space-y-4 pt-4">
                      <div className="flex justify-between items-center py-2 border-b border-white/5">
                        <span className="text-slate-500 text-sm">Amount</span>
                        <span className="text-white font-bold">₹{formData.amount}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-white/5">
                        <span className="text-slate-500 text-sm">Seller VPA</span>
                        <span className="text-white font-mono text-sm">{formData.sellerUpi}</span>
                      </div>
                    </div>

                    {!isVerifying ? (
                      <button 
                        onClick={handlePaid}
                        className="w-full py-4 rounded-xl bg-white text-black font-bold hover:bg-slate-100 transition-all"
                      >
                        I have completed the payment
                      </button>
                    ) : (
                      <div className="w-full py-4 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center gap-3">
                        <Loader2 className="w-5 h-5 text-violet-400 animate-spin" />
                        <span className="text-violet-400 font-bold">AI Agent Verifying Transaction...</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-center justify-center gap-4 bg-white p-6 rounded-2xl shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                    <img 
                      src={qrCodeUrl} 
                      alt="Payment QR" 
                      className="w-full max-w-[200px]"
                    />
                    <div className="flex items-center gap-2 text-black font-bold text-sm">
                      <Smartphone className="w-4 h-4" />
                      BHIM UPI
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-xl mx-auto text-center space-y-8"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-500/20 blur-[60px] rounded-full" />
                  <div className="relative w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(16,185,129,0.5)]">
                    <CheckCircle className="w-12 h-12 text-white" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h1 className="text-4xl font-display font-bold text-white">Payment Verified!</h1>
                  <p className="text-slate-400">The Computer Agent has logged you in as the buyer and verified the transaction. A permanent record has been generated below.</p>
                </div>

                <div className="bg-[#131316] border border-white/5 rounded-2xl p-6 text-left space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 text-sm">Escrow Status</span>
                    <span className="px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-500/20">Secured In Escrow</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 text-sm">Permanent Record</span>
                    <span className="text-violet-400 font-mono text-sm break-all">{transactionId}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 text-sm">Logged System ID</span>
                    <span className="text-white font-mono text-xs">BUYER_{transactionId.split('-')[1]}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 text-sm">Agent Name</span>
                    <span className="text-violet-400 font-bold text-sm">BlockSafe AI-01</span>
                  </div>
                </div>

                <div className="pt-6 space-y-4">
                  <button 
                    onClick={() => window.location.href = `/upi-escrow/${transactionId}`}
                    className="w-full py-4 rounded-xl bg-violet-600 text-white font-bold hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all"
                  >
                    View Ongoing Transaction Detail
                  </button>
                  <button 
                    onClick={() => window.location.href = '/'}
                    className="w-full py-4 rounded-xl bg-white/[0.05] border border-white/10 text-white font-medium hover:bg-white/10 transition-all"
                  >
                    Return Home
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Info Banner */}
          <div className="mt-12 p-4 bg-white/[0.02] border border-white/[0.05] rounded-2xl flex items-center gap-4 text-sm text-slate-500">
            <Shield className="w-5 h-5 text-violet-500/50" />
            <p>Our proprietary "Computer Agent" monitors UPI settlement in real-time. No manual intervention required from human agents.</p>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
