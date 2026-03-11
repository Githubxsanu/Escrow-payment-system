import { Check } from 'lucide-react';
import { DisputeStatus } from './DisputeStatusBadge';

const steps = ['Opened', 'Evidence Submitted', 'Under Review', 'Resolved'];

export default function DisputeTimeline({ status }: { status: DisputeStatus }) {
  const getStepStatus = (step: string) => {
    if (status === 'Closed') return 'completed';
    
    let currentStep = 'Opened';
    if (status === 'Under Review') currentStep = 'Under Review';
    if (status === 'Resolved') currentStep = 'Resolved';
    
    // For simplicity, assume evidence is submitted if it's under review or later
    if (currentStep === 'Under Review' || currentStep === 'Resolved') {
        if (step === 'Evidence Submitted') return 'completed';
    } else if (currentStep === 'Opened' && step === 'Evidence Submitted') {
        return 'current';
    }

    const statusIndex = steps.indexOf(currentStep);
    const stepIndex = steps.indexOf(step);
    
    if (stepIndex < statusIndex) return 'completed';
    if (stepIndex === statusIndex) return 'current';
    return 'pending';
  };

  return (
    <div className="p-6 rounded-3xl bg-[#131316] border border-white/[0.05]">
      <h3 className="text-lg font-display font-semibold text-white mb-8">Dispute Progress</h3>
      
      <div className="flex items-center w-full mb-4">
        {steps.map((step, index) => {
          const stepStatus = getStepStatus(step);
          return (
            <div key={step} className="flex-1 flex items-center relative">
              <div className="flex flex-col items-center relative z-10">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500
                    ${stepStatus === 'completed' ? 'bg-rose-500 border-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.4)]' : 
                      stepStatus === 'current' ? 'bg-[#131316] border-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.2)]' : 
                      'bg-[#131316] border-slate-700'}`}
                >
                  {stepStatus === 'completed' ? (
                    <Check className="w-5 h-5 text-white" />
                  ) : (
                    <div className={`w-2.5 h-2.5 rounded-full ${stepStatus === 'current' ? 'bg-rose-400 animate-pulse' : 'bg-slate-700'}`} />
                  )}
                </div>
                <span className={`absolute top-12 text-xs sm:text-sm font-medium whitespace-nowrap
                  ${stepStatus === 'completed' || stepStatus === 'current' ? 'text-rose-400' : 'text-slate-500'}`}
                >
                  {step}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`h-[2px] w-full absolute left-1/2 right-0 -translate-y-1/2 top-5 transition-colors duration-500
                  ${stepStatus === 'completed' ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.4)]' : 'bg-slate-800'}`} 
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
