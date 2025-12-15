import React, { useState } from 'react';
import Button from './Button';
import Input from './Input';
import { ExperienceLevel, CohortOption, PaymentMethod, UserProfile } from '../types';

interface EnrollmentFormProps {
  onSubmit: (data: UserProfile) => void;
  onBack: () => void;
}

const EnrollmentForm: React.FC<EnrollmentFormProps> = ({ onSubmit, onBack }) => {
  const [formData, setFormData] = useState<UserProfile>({
    name: '',
    email: '',
    phone: '',
    experience: ExperienceLevel.BEGINNER,
    cohort: CohortOption.WEEKEND_MORNING,
    paymentMethod: PaymentMethod.UPI
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    // Updated container to use justify-center for desktop vertical centering
    <div className="min-h-screen flex flex-col p-6 max-w-lg mx-auto w-full pt-8 lg:justify-center">
      
      {/* Branding Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <span className="font-bold text-white text-sm">N</span>
            </div>
            <span className="font-bold text-lg tracking-tight text-white">NEXUS<span className="text-cyan-400">ACADEMY</span></span>
        </div>
        <button 
            onClick={onBack}
            className="text-slate-400 hover:text-white flex items-center gap-1 text-sm font-medium transition-colors"
        >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Cancel
        </button>
      </div>

      <h2 className="text-3xl font-bold text-white mb-2">Secure Your Spot</h2>
      <p className="text-slate-400 mb-8">Customize your learning schedule.</p>

      <form onSubmit={handleSubmit} className="flex-1 lg:flex-none flex flex-col space-y-6">
        <Input 
          label="Full Name"
          name="name"
          placeholder="e.g. Alex Chen"
          value={formData.name}
          onChange={handleChange}
          required
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input 
            label="Email Address"
            type="email"
            name="email"
            placeholder="alex@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            />
            <Input 
            label="Phone Number"
            type="tel"
            name="phone"
            placeholder="+91 98765 43210"
            value={formData.phone}
            onChange={handleChange}
            required
            />
        </div>

        {/* Cohort Selection */}
        <div className="flex flex-col gap-2">
           <label className="text-sm font-medium text-slate-300 ml-1">Select Cohort (2 Hours/Session)</label>
           <div className="grid grid-cols-1 gap-3">
            {Object.values(CohortOption).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, cohort: option }))}
                className={`
                  p-4 rounded-xl border text-left transition-all flex items-center justify-between group
                  ${formData.cohort === option 
                    ? 'bg-cyan-500/20 border-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]' 
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'}
                `}
              >
                <div>
                    <span className="block font-semibold text-sm">{option.split(' (')[0]}</span>
                    <span className={`text-xs ${formData.cohort === option ? 'text-cyan-200' : 'text-slate-500'}`}>
                        {option.split(' (')[1].replace(')', '')}
                    </span>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${formData.cohort === option ? 'border-cyan-400' : 'border-slate-600'}`}>
                    {formData.cohort === option && <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full" />}
                </div>
              </button>
            ))}
           </div>
        </div>

        {/* Experience Level */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-300 ml-1">Current Experience</label>
          <div className="grid grid-cols-4 gap-2">
            {Object.values(ExperienceLevel).map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, experience: level }))}
                className={`
                  py-2 px-1 rounded-xl border text-xs font-medium transition-all
                  ${formData.experience === level 
                    ? 'bg-blue-500/20 border-blue-500 text-blue-400' 
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'}
                `}
              >
                {level} 
              </button>
            ))}
          </div>
        </div>
        
        {/* Payment Method */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-300 ml-1">Payment Method</label>
          <div className="grid grid-cols-3 gap-3">
            {Object.values(PaymentMethod).map((method) => (
              <button
                key={method}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, paymentMethod: method }))}
                className={`
                  py-3 px-2 rounded-xl border text-xs font-semibold transition-all flex flex-col items-center justify-center gap-2
                  ${formData.paymentMethod === method 
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' 
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'}
                `}
              >
                {/* Icons for payment methods */}
                {method === PaymentMethod.UPI && (
                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4h-4v-4H8m13-4V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-5v1h1m0-2v1h-1m1-1h1m-1 0H9m-2 0H6m2 0v1h1m-1-1v-1h1m0 1h1" />
                   </svg>
                )}
                {method === PaymentMethod.CARD && (
                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                   </svg>
                )}
                {method === PaymentMethod.NET_BANKING && (
                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                   </svg>
                )}
                <span className="text-center leading-tight">{method}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sticky bottom on mobile, regular spacing on desktop */}
        <div className="mt-auto pt-8 pb-8 sticky bottom-0 lg:static bg-slate-900 lg:bg-transparent">
          <Button fullWidth type="submit" variant="primary">
            Complete Enrollment
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EnrollmentForm;
