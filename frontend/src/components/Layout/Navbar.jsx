import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Home, Briefcase, FileText, LogOut, User, PlusCircle, List, Menu, X } from "lucide-react";

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "https://jobquestdeploy.onrender.com/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        setIsAuthorized(false);
        setUser(null);
        localStorage.removeItem('user');
        // Clear any other auth-related state or storage here
        toast.success("Logged out successfully");
        navigateTo("/login");
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  const isEmployer = user && user.role === "Employer";
  const navbarBgColor = "bg-teal-600";
  const hoverBgColor = "hover:bg-teal-700";

  return (
    <nav className={`${navbarBgColor} text-white ${isAuthorized ? "block" : "hidden"}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-0">
          <Link to="/" className="flex items-center space-x-6">
          <img src="/JobQuestblanc.png" alt="logoo" className="w-40 h-auto" />
          </Link>
          
          <div className="hidden md:flex items-center space-x-2 ml-auto">
            <NavLink to="/" icon={<Home size={18} />} text="Home" hoverBgColor={hoverBgColor} />
            <NavLink to="/job/getall" icon={<Briefcase size={18} />} text="Jobs" hoverBgColor={hoverBgColor} />
            <NavLink 
              to="/applications/me" 
              icon={<FileText size={18} />} 
              text={isEmployer ? "Applications" : "My Apps"} 
              hoverBgColor={hoverBgColor}
            />
            {isEmployer && (
              <>
                <NavLink to="/job/post" icon={<PlusCircle size={18} />} text="Post Job" hoverBgColor={hoverBgColor} />
                <NavLink to="/job/me" icon={<List size={18} />} text="My Jobs" hoverBgColor={hoverBgColor} />
              </>
            )}
            <div className="flex items-center px-3 py-1 bg-teal-700 rounded-full">
              <User size={18} className="mr-2" />
              <span className="font-medium">{user?.name}</span>
              <span className={`ml-2 text-xs font-semibold px-2 py-1 rounded-full ${
                isEmployer ? "bg-blue-500 text-white" : "bg-green-500 text-white"
              }`}>
                {isEmployer ? "Employer" : "Job Seeker"}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center px-3 py-2 rounded-full bg-red-600 hover:bg-red-700 transition duration-300"
            >
              <LogOut size={18} className="mr-2" />
              Logout
            </button>
          </div>
          
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="text-white focus:outline-none p-2 md:hidden ml-auto"
          >
            {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className={`md:hidden fixed inset-0 ${navbarBgColor} z-50 flex flex-col`}>
          <div className="flex justify-between items-center p-4 border-b border-teal-500">
            <Link to="/" className="flex items-center space-x-2" onClick={() => setShowMobileMenu(false)}>
              <span className="text-xl font-bold">JobQuest</span>
            </Link>
            <button
              onClick={() => setShowMobileMenu(false)}
              className="text-white focus:outline-none p-2"
            >
              <X size={24} />
            </button>
          </div>
          <div className="flex flex-col space-y-2 p-4 overflow-y-auto flex-grow">
            <div className="flex items-center px-3 py-2 bg-teal-700 rounded-full mb-4">
              <User size={18} className="mr-2" />
              <span className="font-medium">{user?.name}</span>
              <span className={`ml-2 text-xs font-semibold px-2 py-1 rounded-full ${
                isEmployer ? "bg-blue-500 text-white" : "bg-green-500 text-white"
              }`}>
                {isEmployer ? "Employer" : "Job Seeker"}
              </span>
            </div>
            <MobileNavLink to="/" icon={<Home size={18} />} text="Home" onClick={() => setShowMobileMenu(false)} hoverBgColor={hoverBgColor} />
            <MobileNavLink to="/job/getall" icon={<Briefcase size={18} />} text="All Jobs" onClick={() => setShowMobileMenu(false)} hoverBgColor={hoverBgColor} />
            <MobileNavLink 
              to="/applications/me" 
              icon={<FileText size={18} />} 
              text={isEmployer ? "Applications" : "My Applications"} 
              onClick={() => setShowMobileMenu(false)}
              hoverBgColor={hoverBgColor}
            />
            {isEmployer && (
              <>
                <MobileNavLink to="/job/post" icon={<PlusCircle size={18} />} text="Post New Job" onClick={() => setShowMobileMenu(false)} hoverBgColor={hoverBgColor} />
                <MobileNavLink to="/job/me" icon={<List size={18} />} text="View Your Jobs" onClick={() => setShowMobileMenu(false)} hoverBgColor={hoverBgColor} />
              </>
            )}
          </div>
          <div className="p-4 border-t border-teal-500">
            <button
              onClick={() => {
                handleLogout();
                setShowMobileMenu(false);
              }}
              className="flex items-center px-4 py-2 rounded-full bg-red-600 hover:bg-red-700 transition duration-300 w-full justify-center"
            >
              <LogOut size={18} className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ to, icon, text, hoverBgColor }) => (
  <Link
    to={to}
    className={`flex items-center px-3 py-2 rounded-full ${hoverBgColor} transition duration-300`}
  >
    {icon}
    <span className="ml-2">{text}</span>
  </Link>
);

const MobileNavLink = ({ to, icon, text, onClick, hoverBgColor }) => (
  <Link
    to={to}
    className={`flex items-center px-3 py-2 rounded-full ${hoverBgColor} transition duration-300 w-full`}
    onClick={onClick}
  >
    {icon}
    <span className="ml-2">{text}</span>
  </Link>
);

export default Navbar;