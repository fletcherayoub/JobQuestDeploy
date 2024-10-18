import React, { useContext, useState } from "react";
import { FaRegUser, FaUser, FaEnvelope, FaPhone, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        { name, phone, email, role, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(data.message);
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (isAuthorized) {
    return <Navigate to={'/'} />
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8 bg-white shadow-2xl rounded-xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left column - Form */}
          <div className="md:w-1/2 px-8 py-12 bg-white">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">
                Create your account
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Join JobQuest and start your journey
              </p>
            </div>
            <form className="space-y-6" onSubmit={handleRegister}>
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  Register As
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="">Select Role</option>
                    <option value="Employer">Employer</option>
                    <option value="Job Seeker">Job Seeker</option>
                  </select>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaRegUser className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    placeholder="John Doe"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    placeholder="you@example.com"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    placeholder="0612345678"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaPhone className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    placeholder="••••••••"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="focus:outline-none"
                    >
                      {showPassword ? (
                        <FaEyeSlash className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      ) : (
                        <FaEye className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Create Account
                </button>
              </div>
            </form>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-teal-600 hover:text-teal-500">
                  Log in
                </Link>
              </p>
            </div>
          </div>
          
          {/* Right column - Image and branding */}
          <div className="md:w-1/2 bg-teal-600 flex items-center justify-center">
            <div className="max-w-md px-4 text-center">
              <img 
                className="mx-auto h-32 w-auto mb-8"
                src="/JobQuestblanc.png" 
                alt="JobQuest logo" 
              />
              <h2 className="text-3xl font-extrabold text-white mb-4">
                Welcome to JobQuest
              </h2>
              <p className="text-xl text-indigo-200">
                Your journey to the perfect job starts here. Join us and explore endless opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;