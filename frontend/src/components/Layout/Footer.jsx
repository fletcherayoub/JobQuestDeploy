import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { Home, Briefcase, FileText, User, MessageCircle, Phone, Shield } from "lucide-react";

const Footer = () => {
  const { isAuthorized, user } = useContext(Context);
  const isEmployer = user && user.role === "Employer";

  const footerBgColor = "bg-teal-600";
  const hoverBgColor = "hover:bg-teal-700";

  return (
    <footer className={`${footerBgColor} text-white ${isAuthorized ? "block" : "hidden"}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">JobQuest</h2>
            <p>&copy; All Rights Reserved By JobQuest 2024</p>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <FooterLink to="/" icon={<Home size={18} />} text="Home" hoverBgColor={hoverBgColor} />
              <FooterLink to="/job/getall" icon={<Briefcase size={18} />} text="Jobs" hoverBgColor={hoverBgColor} />
              <FooterLink 
                to="/applications/me" 
                icon={<FileText size={18} />} 
                text={isEmployer ? "Applications" : "My Apps"} 
                hoverBgColor={hoverBgColor}
              />
            </ul>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
            <p className="flex items-center mb-2">
              <User size={18} className="mr-2" />
              123 JobQuest Street, City 12345
            </p>
            <p className="flex items-center mb-2">
              <MessageCircle size={18} className="mr-2" />
              info@jobquest.com
            </p>
            <p className="flex items-center">
              <Phone size={18} className="mr-2" />
              +123 456 7890
            </p>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-4">Legal</h2>
            <ul className="space-y-2">
              <FooterLink to="/privacy" icon={<Shield size={18} />} text="Privacy Policy" hoverBgColor={hoverBgColor} />
              <FooterLink to="/terms" icon={<FileText size={18} />} text="Terms of Service" hoverBgColor={hoverBgColor} />
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ to, icon, text, hoverBgColor }) => (
  <li>
    <Link
      to={to}
      className={`flex items-center px-3 py-2 rounded-full ${hoverBgColor} transition duration-300`}
    >
      {icon}
      <span className="ml-2">{text}</span>
    </Link>
  </li>
);

export default Footer;