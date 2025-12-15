import React from 'react';
import { GeneratedCoursePlan, UserProfile } from '../types';
import Button from './Button';

interface SyllabusResultProps {
  plan: GeneratedCoursePlan;
  user: UserProfile;
  onRestart: () => void;
}

const SyllabusResult: React.FC<SyllabusResultProps> = ({ plan, user, onRestart }) => {
  
  const handleShare = async () => {
    const shareData = {
      title: 'Nexus Academy - Enrollment Confirmed',
      text: `I just secured my spot in the 2025 AI Agents Masterclass by Nexus Academy! 🚀`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.debug('Share cancelled');
      }
    } else {
      // Fallback for desktops/browsers without Web Share API
      try {
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        alert('News copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy', err);
      }
    }
  };

  return (
    // Increased max-width for desktop
    <div className="min-h-screen bg-slate-900 text-white p-6 max-w-6xl mx-auto w-full pt-8 pb-24">
      
      {/* Branding Header - Centered for Certificate feel */}
      <div className="flex items-center justify-center gap-2 mb-10 opacity-80">
          <div className="w-6 h-6 bg-slate-700 rounded flex items-center justify-center">
              <span className="font-bold text-white text-xs">N</span>
          </div>
          <span className="font-bold text-sm tracking-tight text-slate-300">NEXUS<span className="text-cyan-500">ACADEMY</span></span>
      </div>

      <div className="text-center mb-12 max-w-2xl mx-auto">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 text-green-400 mb-4 ring-2 ring-green-500/20">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold mb-3">Enrollment Confirmed!</h2>
        <p className="text-slate-400 text-base px-4">{plan.welcomeMessage}</p>
      </div>

      <div className="space-y-6 mb-12">
        <div className="flex items-center justify-between max-w-5xl mx-auto">
           <h3 className="text-xl font-semibold text-white">Full Course Schedule</h3>
           <span className="text-xs font-mono text-cyan-400 px-2 py-1 rounded bg-cyan-900/30 border border-cyan-800">
             FOUNDATION
           </span>
        </div>

        {/* Responsive Grid for Syllabus Weeks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {plan.weeks.map((week) => (
            <div 
                key={week.weekNumber} 
                className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-slate-600 transition-colors flex flex-col h-full"
            >
                <div className="flex items-start gap-4 h-full">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-slate-700 flex items-center justify-center text-cyan-400 font-bold border border-slate-600 text-lg">
                    W{week.weekNumber}
                </div>
                <div className="flex-1 flex flex-col h-full">
                    <h4 className="font-bold text-white text-lg leading-tight mb-2">{week.title}</h4>
                    <p className="text-slate-400 text-sm mb-4 flex-1">{week.description}</p>
                    
                    <div className="space-y-3 pt-4 border-t border-slate-700/50 mt-auto">
                    {week.topics.map((topic, i) => (
                        <div key={i} className="flex gap-3">
                            <div className={`w-1.5 h-1.5 mt-1.5 rounded-full flex-shrink-0 ${i === 0 ? 'bg-blue-500' : 'bg-purple-500'}`}></div>
                            <span className="text-sm text-slate-300 font-medium leading-snug">{topic}</span>
                        </div>
                    ))}
                    </div>
                </div>
                </div>
            </div>
            ))}
        </div>
      </div>

      <div className="bg-slate-800 rounded-2xl p-8 text-center border border-slate-700 max-w-lg mx-auto shadow-xl shadow-black/20">
        <h4 className="text-white font-bold mb-2 text-xl">You're all set!</h4>
        <p className="text-slate-400 text-sm mb-8">We've sent the login details and calendar invites to <span className="text-slate-200 font-medium">{user.email}</span>.</p>
        
        <div className="flex flex-col gap-3">
          <Button variant="primary" fullWidth onClick={handleShare} className="flex items-center justify-center gap-2 text-lg">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share News
          </Button>
          <Button variant="secondary" fullWidth onClick={onRestart}>
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SyllabusResult;
