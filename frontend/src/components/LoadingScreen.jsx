// LoadingScreen.jsx
import React, { useState, useEffect } from 'react';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTip, setCurrentTip] = useState(0);

  const loadingTips = [
    "Analyzing your professional profile...",
    "Matching with perfect opportunities...",
    "Preparing personalized recommendations...",
    "Almost there, fine-tuning results..."
  ];

  useEffect(() => {
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    // Tips rotation
    const tipsInterval = setInterval(() => {
      setCurrentTip(prev => (prev + 1) % loadingTips.length);
    }, 3000);

    // Main loading timeout
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(tipsInterval);
      clearTimeout(loadingTimeout);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
      {/* Main Loading Animation */}
      <div className="relative w-64 h-64 mb-12">
        {/* Outer rotating circles */}
        <div className="absolute inset-0 animate-spin-slow">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-teal-500/30 rounded-full"></div>
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-4 h-4 bg-teal-500/40 rounded-full"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-teal-500/50 rounded-full"></div>
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-4 h-4 bg-teal-500/60 rounded-full"></div>
        </div>

        {/* Middle layer with floating dots */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-teal-400 rounded-full animate-float-up"></div>
          <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-teal-400 rounded-full animate-float-down delay-300"></div>
          <div className="absolute top-1/2 left-1/3 w-3 h-3 bg-teal-400 rounded-full animate-float-diagonal delay-700"></div>
        </div>

        {/* Center spinner */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Outer ring */}
            <div className="w-32 h-32 rounded-full border-4 border-gray-100 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full border-4 border-teal-500 border-t-transparent animate-spin"></div>
            </div>
            
            {/* Inner pulsing circle */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-teal-50 rounded-full animate-pulse"></div>
              <div className="absolute w-12 h-12 bg-teal-100 rounded-full animate-pulse delay-150"></div>
              <div className="absolute w-8 h-8 bg-teal-200 rounded-full animate-pulse delay-300"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-64 bg-gray-100 rounded-full h-1.5 mb-6 overflow-hidden">
        <div 
          className="h-full bg-teal-500 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Loading Text */}
      <div className="text-center max-w-sm px-4">
        <div className="h-8 mb-2"> {/* Fixed height container */}
          <p className="text-lg font-medium text-gray-800 transition-opacity duration-300">
            {loadingTips[currentTip]}
          </p>
        </div>
        <p className="text-sm text-gray-500">
          {progress}% Complete
        </p>
      </div>

      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Floating background circles */}
        <div className="absolute -top-10 -left-10 w-40 h-40 border border-gray-100 rounded-full"></div>
        <div className="absolute -bottom-10 -right-10 w-48 h-48 border border-gray-100 rounded-full"></div>
        <div className="absolute top-1/3 -right-10 w-32 h-32 border border-gray-100 rounded-full"></div>
        <div className="absolute bottom-1/3 -left-10 w-36 h-36 border border-gray-100 rounded-full"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjEiIGZpbGw9ImN1cnJlbnRDb2xvciIvPjwvZz48L3N2Zz4=')]"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;

// Add these animations to your tailwind.config.js
/**
module.exports = {
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'float-up': 'float-up 3s ease-in-out infinite',
        'float-down': 'float-down 3s ease-in-out infinite',
        'float-diagonal': 'float-diagonal 4s ease-in-out infinite',
      },
      keyframes: {
        'float-up': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'float-down': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(20px)' },
        },
        'float-diagonal': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(20px, -20px)' },
        },
      },
    },
  },
  plugins: [],
}
*/