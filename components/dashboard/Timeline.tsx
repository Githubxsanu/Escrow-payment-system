import { Check } from 'lucide-react';
import { EscrowStatus } from './StatusBadge';

const steps = ['Created', 'Funded', 'Delivered', 'Released'];

export default function Timeline({ currentStatus }: { currentStatus: EscrowStatus }) {
  const getStepStatus = (step: string) => {
    if (currentStatus === 'Disputed') return step === 'Created' || step === 'Funded' ? 'completed' : 'pending';
    
    const statusIndex = steps.indexOf(currentStatus === 'Completed' ? 'Released' : currentStatus === 'Pending' ? 'Created' : currentStatus);
    const stepIndex = steps.indexOf(step);
    
    if (stepIndex < statusIndex) return 'completed';
    if (stepIndex === statusIndex) return 'current';
    return 'pending';
  };

  return (
    <div className="flex items-center w-full mt-6 mb-2">
      {steps.map((step, index) => {
        const status = getStepStatus(step);
        return (
          <div key={step} className="flex-1 flex items-center relative">
            <div className="flex flex-col items-center relative z-10">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors duration-300
                  ${status === 'completed' ? 'bg-cyan-500 border-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.4)]' : 
                    status === 'current' ? 'bg-[#131316] border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.2)]' : 
                    'bg-[#131316] border-slate-700'}`}
              >
                {status === 'completed' ? (
                  <Check className="w-4 h-4 text-white" />
                ) : (
                  <div className={`w-2 h-2 rounded-full ${status === 'current' ? 'bg-cyan-400 animate-pulse' : 'bg-slate-700'}`} />
                )}
              </div>
              <span className={`absolute top-10 text-[10px] sm:text-xs font-medium whitespace-nowrap
                ${status === 'completed' || status === 'current' ? 'text-cyan-400' : 'text-slate-500'}`}
              >
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`h-[2px] w-full absolute left-1/2 right-0 -translate-y-1/2 top-4 transition-colors duration-300
                ${status === 'completed' ? 'bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.4)]' : 'bg-slate-800'}`} 
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
