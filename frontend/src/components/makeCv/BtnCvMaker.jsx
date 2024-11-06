import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FileText, Sparkles, ChevronRight } from 'lucide-react';

const BtnCvMaker = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const shouldHideButton =
    location.pathname === '/cvMaker' ||
    location.pathname === '/cvPreview';

  const openCvMaker = () => {
    navigate("/cvMaker");
  };

  if (shouldHideButton) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        onClick={openCvMaker}
        className="group relative flex items-center gap-3 
          bg-white dark:bg-slate-900 
          rounded-full py-3 pl-3 pr-6
          shadow-lg shadow-blue-500/20
          transition-all duration-300 ease-in-out
          hover:shadow-xl hover:shadow-blue-500/30
          hover:-translate-y-1
          border border-blue-100 dark:border-slate-800"
      >
        {/* Animated icon container */}
        <div className="relative rounded-full bg-gradient-to-tr from-teal-500 to-teal-700 p-2
          transition-transform duration-300 group-hover:scale-110">
          <FileText className="w-5 h-5 text-white" />
          <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-yellow-300
            opacity-0 transition-all duration-300 group-hover:opacity-100" />
        </div>

        {/* Text content with gradient animation */}
        <div className="flex flex-col items-start">
          <span className="text-xs font-medium bg-gradient-to-r from-blue-500 to-violet-500 
            bg-clip-text text-transparent">
            Build Your Future
          </span>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200
            tracking-wide">
            Create CV
          </span>
        </div>

        {/* Animated arrow */}
        <ChevronRight className="w-4 h-4 text-blue-500
          transition-all duration-300
          transform translate-x-0 group-hover:translate-x-1" />

        {/* Background pulse effect */}
        <div className="absolute inset-0 rounded-full bg-blue-400/20 dark:bg-blue-500/20
          animate-pulse opacity-0 group-hover:opacity-100
          transition-opacity duration-300" />
      </button>
    </div>
  );
};

export default BtnCvMaker;