// src/components/Navbar/Navbar.jsx
import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Home, Briefcase, FileText, LogOut, User, PlusCircle, List, Menu, X } from "lucide-react";
import ProfileModal from "../ProfileModal";

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
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
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthorized(true);
    }
  };

  const isEmployer = user && user.role === "Employer";
  const isAdmin = user && user.role === "Admin";
  const navbarBgColor = "bg-teal-600";
  const hoverBgColor = "hover:bg-teal-700";

  return (
    <>
      <nav className={`${navbarBgColor} text-white ${isAuthorized ? "block" : "hidden"}`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-2">
            <Link to="/" className="flex items-center space-x-6">
              <img src="/JobQuestblanc.png" alt="logo" className="w-40 h-auto" />
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
              
              <div 
                className="flex items-center px-3 py-1 bg-teal-700 rounded-full cursor-pointer hover:bg-teal-800 transition-colors"
                onClick={() => setShowProfileModal(true)}
              >
                {user?.profilePicture ? (
                  <img 
                    src={user.profilePicture.url} 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full mr-2 object-cover"
                  />
                ) : (
                  <User size={18} className="mr-2" />
                )}
                <span className="font-medium">{user?.name}</span>
                <span className={`ml-2 text-xs font-semibold px-2 py-1 rounded-full ${
                  isAdmin ? "bg-purple-500 text-white" :
                  isEmployer ? "bg-blue-500 text-white" : "bg-green-500 text-white"
                }`}>
                  {isAdmin ? "Admin" : isEmployer ? "Employer" : "Job Seeker"}
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
              className="text-white focus:outline-none p-2 md:hidden"
            >
              {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
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
              <div 
                className="flex items-center px-3 py-2 bg-teal-700 rounded-full mb-4 cursor-pointer hover:bg-teal-800 transition-colors"
                onClick={() => {
                  setShowProfileModal(true);
                  setShowMobileMenu(false);
                }}
              >
                {user?.profilePicture ? (
                  <img 
                    src={user.profilePicture.url} 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full mr-2 object-cover"
                  />
                ) : (
                  <User size={18} className="mr-2" />
                )}
                <span className="font-medium">{user?.name}</span>
                <span className={`ml-2 text-xs font-semibold px-2 py-1 rounded-full ${
                  isAdmin ? "bg-purple-500 text-white" :
                  isEmployer ? "bg-blue-500 text-white" : "bg-green-500 text-white"
                }`}>
                  {isAdmin ? "Admin" : isEmployer ? "Employer" : "Job Seeker"}
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
      
      <ProfileModal 
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />
    </>
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