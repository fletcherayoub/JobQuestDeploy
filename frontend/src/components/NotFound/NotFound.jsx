import React from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft, Search, MapPin } from "lucide-react";

const NotFound = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-emerald-50 to-teal-50 p-4">
      <div className="w-full max-w-lg mx-auto text-center px-4">
        <div className="space-y-6">
          {/* Animated 404 Number */}
          <div className="relative">
            <div className="text-[120px] sm:text-[150px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600 animate-pulse">
              404
            </div>
            {/* Floating elements */}
            <Search className="absolute top-0 right-4 text-emerald-400 animate-bounce" />
            <MapPin className="absolute bottom-0 left-4 text-teal-400 animate-pulse" />
          </div>
          
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
              Page Not Found
            </h2>
            <p className="text-sm sm:text-base text-gray-600 px-4">
              The job posting you're looking for seems to have moved on to new opportunities. Let's get you back on track!
            </p>
          </div>

          <div className="flex flex-col gap-3 mt-8 px-4">
            <Link
              to="/"
              className="flex items-center justify-center gap-2 p-3 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Home size={18} />
              <span>Return to JobQuest</span>
            </Link>
            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center gap-2 p-3 bg-white text-gray-700 rounded-full hover:bg-gray-50 transition-all duration-300 shadow-md hover:shadow-lg border border-emerald-100"
            >
              <ArrowLeft size={18} />
              <span>Previous Page</span>
            </button>
          </div>

          {/* JobQuest Logo */}
          <div className="mt-8">
            <div className="flex items-center justify-center gap-2 text-emerald-600">
              <Search size={24} />
              <span className="text-xl font-semibold">JobQuest</span>
            </div>
            <p className="text-sm text-emerald-600 mt-1">Navigate Your Career Path</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;