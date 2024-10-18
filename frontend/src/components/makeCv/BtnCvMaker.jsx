import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, ChevronRight } from 'lucide-react';

const BtnCvMaker = () => {
  const navigate = useNavigate();

  const openCvMaker = () => {
    navigate("/cvMaker");
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        className="group flex items-center bg-teal-600 text-white rounded-full p-3 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
        onClick={openCvMaker}
      >
        <div className="bg-white rounded-full p-2">
          <FileText className="w-8 h-8 text-green-900" />
        </div>
        <span className="overflow-hidden w-0 group-hover:w-32 transition-all duration-500 ease-in-out">
          <span className="px-3 whitespace-nowrap flex items-center">
            CV Maker
            <ChevronRight className="w-4 h-4 ml-1 animate-pulse" />
          </span>
        </span>
      </button>
    </div>
  );
};

export default BtnCvMaker;