import React, { useState } from 'react';
import CourseHero from './components/CourseHero';
import EnrollmentForm from './components/EnrollmentForm';
import SyllabusResult from './components/SyllabusResult';
import { AppState, GeneratedCoursePlan, UserProfile } from './types';
import { getCourseSyllabus } from './services/geminiService';
import { saveToGoogleSheets } from './services/sheetService';

const App: React.FC = () => {
  const [view, setView] = useState<AppState>(AppState.LANDING);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [generatedPlan, setGeneratedPlan] = useState<GeneratedCoursePlan | null>(null);

  const handleStartEnrollment = () => {
    setView(AppState.ENROLLING);
    window.scrollTo(0, 0);
  };

  const handleEnrollmentSubmit = async (data: UserProfile) => {
    setUserProfile(data);
    setView(AppState.GENERATING);
    
    // Save enrollment data to Google Sheets in the background
    // We don't await this to keep the UI snappy, but in a real app you might want to.
    saveToGoogleSheets(data, 'ENROLLMENT');

    try {
      const plan = await getCourseSyllabus(data);
      setGeneratedPlan(plan);
      setView(AppState.SUCCESS);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error(error);
      setView(AppState.ERROR);
    }
  };

  const handleRestart = () => {
    setUserProfile(null);
    setGeneratedPlan(null);
    setView(AppState.LANDING);
    window.scrollTo(0, 0);
  };

  // Render logic
  switch (view) {
    case AppState.LANDING:
      return <CourseHero onStart={handleStartEnrollment} />;
    
    case AppState.ENROLLING:
      return (
        <EnrollmentForm 
          onSubmit={handleEnrollmentSubmit} 
          onBack={() => setView(AppState.LANDING)} 
        />
      );

    case AppState.GENERATING:
      return (
        <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-center">
          <div className="relative w-24 h-24 mb-8">
            <div className="absolute inset-0 border-4 border-slate-700 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-cyan-500 rounded-full border-t-transparent animate-spin"></div>
            <div className="absolute inset-4 bg-cyan-500/20 rounded-full blur-xl animate-pulse"></div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Finalizing Enrollment...</h2>
          <p className="text-slate-400">Preparing your 2025 Standard Syllabus.</p>
        </div>
      );

    case AppState.SUCCESS:
      if (!generatedPlan || !userProfile) return null;
      return (
        <SyllabusResult 
          plan={generatedPlan} 
          user={userProfile} 
          onRestart={handleRestart} 
        />
      );

    case AppState.ERROR:
      return (
        <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 mb-6">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Something went wrong</h2>
          <p className="text-slate-400 mb-8">We couldn't generate your syllabus at this moment. Please try again.</p>
          <button 
            onClick={() => setView(AppState.ENROLLING)}
            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      );

    default:
      return null;
  }
};

export default App;
