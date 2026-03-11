import { Check } from 'lucide-react';
import { EscrowStatus } from '@/components/dashboard/StatusBadge';

const steps = ['Created', 'Deposited', 'Delivered', 'Confirmed', 'Released'];

export default function EscrowTimeline({ status }: { status: EscrowStatus }) {
  const getStepStatus = (step: string) => {
    if (status === 'Disputed') {
      return step === 'Created' || step === 'Deposited' ? 'completed' : 'pending';
    }
    
    // Map escrow status to timeline steps
    let currentStep = 'Created';
    if (status === 'Funded') currentStep = 'Deposited';
    if (status === 'Delivered') currentStep = 'Delivered';
    if (status === 'Completed') currentStep = 'Released';
    
    const statusIndex = steps.indexOf(currentStep);
    const stepIndex = steps.indexOf(step);
    
    if (stepIndex < statusIndex) return 'completed';
    if (stepIndex === statusIndex) return 'current';
    return 'pending';
  };

  return (
    <div className="p-6 rounded-3xl bg-[#131316] border border-white/[0.05]">
      <h3 className="text-lg font-display font-semibold text-white mb-8">Escrow Progress</h3>
      
      <div className="flex items-center w-full mb-4">
        {steps.map((step, index) => {
          const stepStatus = getStepStatus(step);
          return (
            <div key={step} className="flex-1 flex items-center relative">
              <div className="flex flex-col items-center relative z-10">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500
                    ${stepStatus === 'completed' ? 'bg-cyan-500 border-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.4)]' : 
                      stepStatus === 'current' ? 'bg-[#131316] border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]' : 
                      'bg-[#131316] border-slate-700'}`}
                >
                  {stepStatus === 'completed' ? (
                    <Check className="w-5 h-5 text-white" />
                  ) : (
                    <div className={`w-2.5 h-2.5 rounded-full ${stepStatus === 'current' ? 'bg-cyan-400 animate-pulse' : 'bg-slate-700'}`} />
                  )}
                </div>
                <span className={`absolute top-12 text-xs sm:text-sm font-medium whitespace-nowrap
                  ${stepStatus === 'completed' || stepStatus === 'current' ? 'text-cyan-400' : 'text-slate-500'}`}
                >
                  {step}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`h-[2px] w-full absolute left-1/2 right-0 -translate-y-1/2 top-5 transition-colors duration-500
                  ${stepStatus === 'completed' ? 'bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.4)]' : 'bg-slate-800'}`} 
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
