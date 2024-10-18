import React, { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import { Briefcase, MapPin, DollarSign } from 'lucide-react';

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryType, setSalaryType] = useState("default");
  const [companyLogo, setCompanyLogo] = useState(null);

  const { isAuthorized, user } = useContext(Context);

  const handleJobPost = async (e) => {
    e.preventDefault();
    if (salaryType === "Fixed Salary") {
      setSalaryFrom("");
      setSalaryTo("");
    } else if (salaryType === "Ranged Salary") {
      setFixedSalary("");
    } else {
      setSalaryFrom("");
      setSalaryTo("");
      setFixedSalary("");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("country", country);
    formData.append("city", city);
    formData.append("location", location);
    if (fixedSalary) {
      formData.append("fixedSalary", fixedSalary);
    } else {
      formData.append("salaryFrom", salaryFrom);
      formData.append("salaryTo", salaryTo);
    }
    if (companyLogo) {
      formData.append("companyLogo", companyLogo);
    }

    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/job/post",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(res.data.message);
      // Clear form after successful submission
      setTitle("");
      setDescription("");
      setCategory("");
      setCountry("");
      setCity("");
      setLocation("");
      setSalaryFrom("");
      setSalaryTo("");
      setFixedSalary("");
      setSalaryType("default");
      setCompanyLogo(null);

      navigateTo("/job/getall")
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const handleLogoChange = (e) => {
    setCompanyLogo(e.target.files[0]);
  };

  const navigateTo = useNavigate();
  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Background image */}
      <div 
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: "url('/post.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
      
      {/* Content */}
      <div className="max-w-md w-full space-y-8 relative">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Post New Job
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Find the perfect candidate for your company
          </p>
        </div>

        {/* Professional elements */}
        <div className="flex justify-around mb-8">
          <div className="text-center">
            <Briefcase className="mx-auto h-8 w-8 text-green-500" />
            <p className="mt-2 text-sm font-medium text-gray-900">Quality Candidates</p>
          </div>
          <div className="text-center">
            <MapPin className="mx-auto h-8 w-8 text-blue-500" />
            <p className="mt-2 text-sm font-medium text-gray-900">Worldwide Reach</p>
          </div>
          <div className="text-center">
            <DollarSign className="mx-auto h-8 w-8 text-yellow-500" />
            <p className="mt-2 text-sm font-medium text-gray-900">Competitive Salaries</p>
          </div>
        </div>

        <form className="mt-8 space-y-6 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleJobPost}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Job Title"
                required
              />
            </div>
            <div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                required
              >
                <option value="">Select Category</option>
                <option value="Graphics & Design">Graphics & Design</option>
                <option value="Mobile App Development">Mobile App Development</option>
                <option value="Frontend Web Development">Frontend Web Development</option>
                <option value="MERN Stack Development">MERN STACK Development </option>
                <option value="Account & Finance">Account & Finance</option>
                <option value="Artificial Intelligence">Artificial Intelligence</option>
                <option value="Video Animation">Video Animation</option>
                <option value="Data Entry Operator">Data Entry Operator</option>
                <option value="Full-Stack Developer">Full-Stack Developer</option>
                <option value="Data Analyst">Data Analyst</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="Cloud Computing">Cloud Computing</option>
                <option value="Software Testing">Software Testing</option>
                <option value="Software Engineering">Software Engineering</option>
                <option value="Product Management">Product Management</option>
                <option value="User Experience">User Experience</option>
                <option value="Technical Support">Technical Support</option>
                <option value="Sales and Marketing ">Sales and Marketing </option>
                <option value="Human Resources">Human Resources</option>
                <option value="Game Development">Game Development</option>
                <option value="Blockchain and Cryptocurrency">Blockchain and Cryptocurrency</option>
              </select>
            </div>
            <div>
              <textarea
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Job Description"
                required
              />
            </div>
            <div>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Country"
                required
              />
            </div>
            <div>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="City"
                required
              />
            </div>
            <div>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Location"
                required
              />
            </div>
            <div>
              <select
                value={salaryType}
                onChange={(e) => setSalaryType(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                required
              >
                <option value="default">Select Salary Type</option>
                <option value="Fixed Salary">Fixed Salary</option>
                <option value="Ranged Salary">Ranged Salary</option>
              </select>
            </div>
            {salaryType === "Fixed Salary" && (
              <div>
                <input
                  type="number"
                  value={fixedSalary}
                  onChange={(e) => setFixedSalary(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Fixed Salary"
                  required
                />
              </div>
            )}
            {salaryType === "Ranged Salary" && (
              <>
                <div>
                  <input
                    type="number"
                    value={salaryFrom}
                    onChange={(e) => setSalaryFrom(e.target.value)}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Salary From"
                    required
                  />
                </div>
                <div>
                  <input
                    type="number"
                    value={salaryTo}
                    onChange={(e) => setSalaryTo(e.target.value)}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Salary To"
                    required
                  />
                </div>
              </>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mt-2">
                Company Logo
              </label>
              <input
                type="file"
                onChange={handleLogoChange}
                accept="image/*"
                className="mt-1 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <Briefcase className="h-5 w-5 text-green-500 group-hover:text-green-400" aria-hidden="true" />
              </span>
              Create Job
            </button>
          </div>
        </form>

        {/* Additional professional element */}
        <div className="text-center text-sm text-gray-500 mt-4">
          <p>Join thousands of companies finding top talent every day</p>
        </div>
      </div>
    </div>
  );
};

export default PostJob;