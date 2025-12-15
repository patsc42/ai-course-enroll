import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
  return (
    <div className="flex flex-col gap-2 mb-4">
      <label className="text-sm font-medium text-slate-300 ml-1">{label}</label>
      <input 
        className={`bg-slate-800 border border-slate-700 text-white text-base rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all placeholder-slate-500 ${className}`}
        {...props} 
      />
    </div>
  );
};

export default Input;
