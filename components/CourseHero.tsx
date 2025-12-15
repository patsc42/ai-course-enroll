import React, { useState } from 'react';
import Button from './Button';
import { getCoursePreview } from '../services/geminiService';
import InterestModal from './InterestModal';

interface CourseHeroProps {
  onStart: () => void;
}

const CourseHero: React.FC<CourseHeroProps> = ({ onStart }) => {
  const [isInterestModalOpen, setInterestModalOpen] = useState(false);
  const preview = getCoursePreview();

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-slate-900">
      <InterestModal 
        isOpen={isInterestModalOpen} 
        onClose={() => setInterestModalOpen(false)} 
      />

      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-900/20 to-transparent z-0 pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-64 h-64 lg:w-96 lg:h-96 bg-cyan-500/10 rounded-full blur-3xl z-0 pointer-events-none" />
      <div className="hidden lg:block absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl z-0 pointer-events-none" />

      {/* BRANDING HEADER */}
      <nav className="relative z-20 w-full max-w-7xl mx-auto px-6 pt-6 flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
             <span className="font-bold text-white text-lg">N</span>
          </div>
          <span className="font-bold text-xl tracking-tight text-white">NEXUS<span className="text-cyan-400">ACADEMY</span></span>
        </div>
        <div className="hidden md:block">
            <span className="text-slate-400 text-sm font-medium hover:text-white cursor-pointer transition-colors">Member Login</span>
        </div>
      </nav>

      {/* Main Content Container - Adaptive Width */}
      <main className="flex-1 z-10 p-6 pt-8 lg:pt-16 max-w-7xl mx-auto w-full flex flex-col lg:flex-row lg:gap-16 lg:items-start">
        
        {/* LEFT COLUMN: Header & CTA (Sticky on Desktop) */}
        <div className="lg:w-1/2 lg:sticky lg:top-24">
            <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-block py-1 px-3 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                2025 Cohort
                </span>
                <span className="inline-block py-1 px-3 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-wider animate-pulse-slow">
                Featuring AI Agents
                </span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-6 leading-tight">
                Build the Future with AI Agents
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed max-w-xl">
                Master the stack of 2025. From Neural Networks foundations to deploying autonomous Multi-Agent Systems.
            </p>
            </div>

            {/* Primary CTA */}
            <div className="mb-12 max-w-md flex flex-col gap-4">
                <Button fullWidth onClick={onStart} className="text-lg shadow-cyan-500/20 py-4 relative z-10">
                    Start Your Journey
                </Button>
                
                {/* Secondary 'Show Interest' Option - HIGHLIGHTED DESIGN */}
                <div className="mt-4 relative z-10">
                    <button 
                        onClick={() => setInterestModalOpen(true)}
                        className="w-full group relative px-6 py-5 rounded-2xl border-2 border-slate-700/50 bg-slate-800 hover:bg-slate-800/90 hover:border-purple-500/50 transition-all duration-300 shadow-xl overflow-hidden"
                    >
                        {/* Subtle Glow Background Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <div className="relative flex items-center justify-between">
                            <div className="text-left">
                                 <div className="flex items-center gap-2 mb-1">
                                    {/* Pulsing Dot */}
                                    <span className="relative flex h-2 w-2">
                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                      <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                                    </span>
                                    <span className="text-slate-400 text-xs font-bold uppercase tracking-wider group-hover:text-purple-300 transition-colors">Waitlist Open</span>
                                 </div>
                                 <span className="text-white font-bold text-xl tracking-tight group-hover:text-purple-100 transition-colors">
                                    Show Interest
                                 </span>
                            </div>
                            
                            {/* Icon Box */}
                            <div className="w-12 h-12 rounded-xl bg-slate-700/50 flex items-center justify-center border border-slate-600/50 group-hover:bg-purple-500 group-hover:border-purple-500 transition-all duration-300 shadow-lg">
                                  <svg className="w-6 h-6 text-slate-300 group-hover:text-white transition-colors transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                 </svg>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
            
             {/* Desktop-only testimonial or trust marker could go here */}
             <div className="hidden lg:block text-slate-500 text-sm">
                 <p>Trusted by engineers from top tech companies.</p>
             </div>
        </div>

        {/* RIGHT COLUMN: Syllabus & FAQ (Scrollable) */}
        <div className="lg:w-1/2 space-y-8 lg:space-y-12">
            {/* Sneak Peek Section */}
            <div>
                <div className="flex items-center justify-between mb-4 px-1">
                    <h3 className="text-white font-bold text-sm uppercase tracking-wide">4-Week Syllabus</h3>
                    {/* UPDATED: Changed from Sat & Sun to Flex timings */}
                    <span className="text-xs text-slate-500 font-medium bg-slate-800 px-2 py-1 rounded border border-slate-700">Flex timings</span>
                </div>
                <div className="bg-slate-800/40 rounded-2xl border border-slate-700/50 p-5 backdrop-blur-sm space-y-4">
                    {preview.map((item) => (
                    <div key={item.week} className="flex gap-3 items-start">
                        <div className="w-6 h-6 rounded bg-slate-700 flex items-center justify-center text-xs font-bold text-cyan-400 flex-shrink-0 mt-0.5">
                        {item.week}
                        </div>
                        <div>
                        <p className="text-slate-200 text-sm font-medium">{item.title}</p>
                        <p className="text-slate-500 text-xs line-clamp-1">{item.description}</p>
                        </div>
                    </div>
                    ))}
                </div>
            </div>

            {/* FAQ & Benefits Section */}
            <div>
                <h3 className="text-xl font-bold text-white mb-6 px-1">Why Join This Course?</h3>
                
                <div className="space-y-4">
                    {/* FAQ Item 1 */}
                    <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
                        <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                            <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                            What will I learn?
                        </h4>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            You will gain deep expertise in the modern AI stack. We move beyond basic API calls to cover 
                            <strong> PyTorch, Transformer architectures, RAG pipelines</strong>, and crucially, how to orchestrate 
                            <strong> Autonomous AI Agents</strong> that can reason and execute tasks.
                        </p>
                    </div>

                    {/* FAQ Item 2 */}
                    <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
                        <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            The Benefits
                        </h4>
                        <ul className="text-slate-400 text-sm space-y-2 list-disc list-inside">
                            <li>Mastery of 2025's most in-demand skills</li>
                            <li>Build a portfolio of 4 production-grade projects</li>
                            <li>Direct mentorship from AI architects</li>
                            <li>Lifetime access to course materials & community</li>
                        </ul>
                    </div>

                    {/* FAQ Item 3 */}
                    <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
                        <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                            <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 01-6-6v-1m-9 4h14" />
                            </svg>
                            Who is this for?
                        </h4>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Designed for <strong>Beginners & Intermediates</strong>. Whether you're a developer looking to pivot 
                            or a student wanting to future-proof your career, this course builds the foundation from the ground up.
                        </p>
                    </div>
                </div>
            </div>
            
             {/* Mobile Footer CTA (Visible only on mobile) */}
            <div className="mt-4 pb-8 text-center lg:hidden">
                <p className="text-slate-500 text-sm mb-4">Ready to build the next generation of software?</p>
                <Button variant="outline" fullWidth onClick={onStart}>
                    Secure Your Spot
                </Button>
            </div>
        </div>

      </main>
    </div>
  );
};

export default CourseHero;