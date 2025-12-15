import React, { useState } from 'react';
import Button from './Button';
import Input from './Input';
import { saveToGoogleSheets } from '../services/sheetService';

interface InterestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InterestModal: React.FC<InterestModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState(''); // Collecting email is crucial for a waitlist
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Save to Google Sheets
    await saveToGoogleSheets({ name, email }, 'INTEREST');
    
    setIsLoading(false);
    setIsSuccess(true);
    
    // Auto close after success
    setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setName('');
        setEmail('');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-sm shadow-2xl transform transition-all scale-100">
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-500 hover:text-white"
        >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>

        {isSuccess ? (
            <div className="text-center py-8">
                <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-green-400">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">You're on the list!</h3>
                <p className="text-slate-400 text-sm">We'll notify you when spots open up.</p>
            </div>
        ) : (
            <form onSubmit={handleSubmit}>
                <h3 className="text-xl font-bold text-white mb-1">Show Interest</h3>
                <p className="text-slate-400 text-sm mb-6">Not ready to enroll? Share your details and we'll keep you posted.</p>
                
                <div className="space-y-4 mb-6">
                    <Input 
                        label="First Name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Alex"
                        required
                    />
                    <Input 
                        label="Email (Optional)" 
                        type="email"
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@example.com"
                    />
                </div>

                <Button fullWidth type="submit" isLoading={isLoading}>
                    I'm Interested
                </Button>
            </form>
        )}
      </div>
    </div>
  );
};

export default InterestModal;