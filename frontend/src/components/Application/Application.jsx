import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";
import axios from "axios";
import { toast } from "react-hot-toast";
import { MdPerson, MdEmail, MdPhone, MdHome, MdDescription, MdAttachFile, MdSend } from 'react-icons/md';

const Application = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    coverLetter: "",
    resume: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  const { id } = useParams();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event) => {
    setFormData((prev) => ({ ...prev, resume: event.target.files[0] }));
  };

  const handleApplication = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      submitData.append(key, value);
    });
    submitData.append("jobId", id);

    try {
      const { data } = await axios.post(
        "https://jobquestdeploy.onrender.com/api/v1/application/post",
        submitData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        coverLetter: "",
        resume: null,
      });
      toast.success('The Employer will contact you soon.');
      navigateTo("/job/getall");
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthorized || (user && user.role === "Employer")) {
    navigateTo("/");
    return null;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-teal-100 p-4">
      
      <div className="bg-white shadow-2xl rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-2xl mt-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Job Application</h2>
        <form onSubmit={handleApplication} className="space-y-6">
          <div className="relative">
            <label htmlFor="name" className="text-sm font-medium text-gray-700 flex items-center">
              <MdPerson className="h-5 w-5 text-gray-400 mr-2" />
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="John Doe"
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="relative">
            <label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center">
              <MdEmail className="h-5 w-5 text-gray-400 mr-2" />
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="johndoe@example.com"
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="relative">
            <label htmlFor="phone" className="text-sm font-medium text-gray-700 flex items-center">
              <MdPhone className="h-5 w-5 text-gray-400 mr-2" />
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+1 (555) 123-4567"
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="relative">
            <label htmlFor="address" className="text-sm font-medium text-gray-700 flex items-center">
              <MdHome className="h-5 w-5 text-gray-400 mr-2" />
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="123 Main St, City, State, ZIP"
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 h-24"
            />
          </div>
          <div className="relative">
            <label htmlFor="coverLetter" className="text-sm font-medium text-gray-700 flex items-center">
              <MdDescription className="h-5 w-5 text-gray-400 mr-2" />
              Cover Letter
            </label>
            <textarea
              id="coverLetter"
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleInputChange}
              placeholder="Tell us why you're the perfect fit for this role..."
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 h-32"
            />
          </div>
          <div className="relative">
            <label htmlFor="resume" className="text-sm font-medium text-gray-700 flex items-center">
              <MdAttachFile className="h-5 w-5 text-gray-400 mr-2" />
              Resume
            </label>
            <input
              id="resume"
              type="file"
              accept=".pdf,.doc,.docx,.png,.jpg"
              onChange={handleFileChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 flex items-center justify-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                <>
                  <MdSend className="mr-2" />
                  Submit Application
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Application;