import React, { useState, useContext, useEffect } from 'react';
import axios from "axios";
import { Settings, X, Camera, Phone, Briefcase, Mail, User, Lock } from "lucide-react";
import toast from "react-hot-toast";
import { Context } from "../main";

const ProfileModal = ({ isOpen, onClose }) => {
  const { user, setUser, setIsAuthorized } = useContext(Context);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    password: "",
    newPassword: "",
    profilePicture: null,
    previewUrl: null,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("https://jobquestdeploy.onrender.com/api/v1/user/getUser", {
          withCredentials: true 
        });
        
        const userData = response.data.user;
        setFormData({
          name: userData.name || "",
          email: userData.email || "",
          phone: userData.phone || "",
          role: userData.role || "",
          password: "",
          newPassword: "",
          profilePicture: null,
          previewUrl: userData?.profilePicture?.url || null,
        });
        setUser(userData);
        setIsAuthorized(true);
      } catch (error) {
        toast.error("Failed to fetch user data");
        setIsAuthorized(false);
      }
    };

    if (isOpen) {
      fetchUser();
    }
  }, [isOpen, setUser, setIsAuthorized]);

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      setFormData({
        ...formData,
        profilePicture: file,
        previewUrl: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const formDataToSend = new FormData();
      
      if (formData.name) formDataToSend.append("name", formData.name);
      if (formData.phone) formDataToSend.append("phone", formData.phone);
      
      if (formData.password && formData.newPassword) {
        formDataToSend.append("password", formData.password);
        formDataToSend.append("newPassword", formData.newPassword);
      }
      
      if (formData.profilePicture) {
        formDataToSend.append("profilePicture", formData.profilePicture);
      }
  
      const response = await axios.put(
        "https://jobquestdeploy.onrender.com/api/v1/user/update",
        formDataToSend,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      if (response.data.success) {
        setUser(response.data.user);
        toast.success(response.data.message);
        onClose();
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error updating profile";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      role: user?.role || "",
      password: "",
      newPassword: "",
      profilePicture: null,
      previewUrl: user?.profilePicture?.url || null,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative min-h-[100vh] sm:min-h-0 w-full sm:max-w-xl bg-white dark:bg-slate-900 p-4 sm:p-8 sm:rounded-2xl shadow-xl shadow-black/10">
        {/* Close button - Fixed position on mobile, absolute on desktop */}
        <button 
          onClick={handleClose}
          className="fixed sm:absolute top-4 right-4 z-50 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300
            bg-gray-100 dark:bg-slate-800 p-2 rounded-full transition-colors"
        >
          <X size={18} />
        </button>

        <div className="mb-6 sm:mb-8 pt-8 sm:pt-0">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Edit Profile</h2>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1">Update your personal information</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative group">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28">
                <img
                  src={formData.previewUrl || "/placeholder-avatar.png"}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover 
                    ring-4 ring-white dark:ring-slate-800 shadow-xl"
                />
                <label
                  htmlFor="picture"
                  className="absolute inset-0 flex items-center justify-center 
                    bg-black/40 rounded-full opacity-0 group-hover:opacity-100 active:opacity-100
                    cursor-pointer transition-all duration-300"
                >
                  <Camera className="w-6 h-6 text-white" />
                </label>
                <input
                  id="picture"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Name Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-11 pr-4 py-2.5 bg-gray-50 dark:bg-slate-800
                    border border-gray-200 dark:border-slate-700 rounded-lg text-sm sm:text-base
                    focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600
                    text-gray-900 dark:text-white placeholder-gray-400
                    transition-colors duration-200"
                  required
                  minLength={3}
                  maxLength={50}
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => e.preventDefault()}
                  className="w-full pl-11 pr-4 py-2.5 bg-gray-100 dark:bg-slate-700 text-sm sm:text-base
                    text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-slate-600
                    rounded-lg focus:outline-none cursor-not-allowed"
                  required
                  readOnly
                />
              </div>
            </div>

            {/* Phone Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Phone
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-11 pr-4 py-2.5 bg-gray-50 dark:bg-slate-800 text-sm sm:text-base
                    border border-gray-200 dark:border-slate-700 rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600
                    text-gray-900 dark:text-white placeholder-gray-400
                    transition-colors duration-200"
                />
              </div>
            </div>

            {/* Role Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Role
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => e.preventDefault()}
                  className="w-full pl-11 pr-4 py-2.5 bg-gray-100 dark:bg-slate-700 text-sm sm:text-base
                    text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-slate-600
                    rounded-lg focus:outline-none cursor-not-allowed"
                  required
                  readOnly
                />
              </div>
            </div>

            {/* Current Password Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Current Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-11 pr-4 py-2.5 bg-gray-50 dark:bg-slate-800 text-sm sm:text-base
                    border border-gray-200 dark:border-slate-700 rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600
                    text-gray-900 dark:text-white placeholder-gray-400
                    transition-colors duration-200"
                  placeholder="Enter to change password"
                />
              </div>
            </div>

            {/* New Password Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={formData.newPassword}
                  onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                  className="w-full pl-11 pr-4 py-2.5 bg-gray-50 dark:bg-slate-800 text-sm sm:text-base
                    border border-gray-200 dark:border-slate-700 rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600
                    text-gray-900 dark:text-white placeholder-gray-400
                    transition-colors duration-200"
                  placeholder="New password"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end pt-4 sm:pt-6">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-gray-700 dark:text-gray-300
                bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700
                focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600
                disabled:opacity-50 transition-colors duration-200 text-sm sm:text-base"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-5 py-2.5 bg-teal-600 text-white rounded-lg
                hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500
                disabled:opacity-50 transition-colors duration-200
                flex items-center justify-center min-w-[100px] text-sm sm:text-base"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;