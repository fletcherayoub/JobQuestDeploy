import React, { useState, useEffect } from 'react';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTip, setCurrentTip] = useState(0);

  const loadingTips = [
    "Optimizing your experience...",
    "Powering up the engines...",
    "Unlocking hidden talents...",
    "Just a few more moments..."
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
    <div className="fixed inset-0 bg-gradient-to-br from-teal-700 to-teal-500 flex flex-col items-center justify-center z-50">
      {/* Main Loading Animation */}
      <div className="relative w-72 h-72 mb-12">
        {/* Outer rotating circles */}
        <div className="absolute inset-0 animate-spin-slow">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-5 bg-white/40 rounded-full"></div>
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-5 h-5 bg-white/50 rounded-full"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-5 bg-white/60 rounded-full"></div>
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-5 h-5 bg-white/70 rounded-full"></div>
        </div>

        {/* Middle layer with floating dots */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-white rounded-full animate-float-up"></div>
          <div className="absolute bottom-1/4 right-1/4 w-4 h-4 bg-white rounded-full animate-float-down delay-300"></div>
          <div className="absolute top-1/2 left-1/3 w-4 h-4 bg-white rounded-full animate-float-diagonal delay-700"></div>
        </div>

        {/* Center spinner */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Outer ring */}
            <div className="w-40 h-40 rounded-full border-8 border-white/30 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full border-8 border-white animate-spin"></div>
            </div>
            
            {/* Inner pulsing circle */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-white/20 rounded-full animate-pulse"></div>
              <div className="absolute w-16 h-16 bg-white/30 rounded-full animate-pulse delay-150"></div>
              <div className="absolute w-12 h-12 bg-white/40 rounded-full animate-pulse delay-300"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-72 bg-white/20 rounded-full h-2 mb-6 overflow-hidden">
        <div 
          className="h-full bg-white rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Loading Text */}
      <div className="text-center max-w-sm px-4">
        <div className="h-10 mb-4"> {/* Fixed height container */}
          <p className="text-2xl font-medium text-white transition-opacity duration-300">
            {loadingTips[currentTip]}
          </p>
        </div>
        <p className="text-lg text-white/80">
          {progress}% Complete
        </p>
      </div>

      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Floating background circles */}
        <div className="absolute -top-10 -left-10 w-48 h-48 border-4 border-white/20 rounded-full"></div>
        <div className="absolute -bottom-10 -right-10 w-56 h-56 border-4 border-white/20 rounded-full"></div>
        <div className="absolute top-1/3 -right-10 w-40 h-40 border-4 border-white/20 rounded-full"></div>
        <div className="absolute bottom-1/3 -left-10 w-44 h-44 border-4 border-white/20 rounded-full"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgZmlsbD0iI0ZGRiIgY3g9IjIwIiBjeT0iMjAiIHI9IjEiLz48L2c+PC9zdmc+')]"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;