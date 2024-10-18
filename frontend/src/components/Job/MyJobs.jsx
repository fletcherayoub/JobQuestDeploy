import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaCheck, FaPencilAlt, FaTrash, FaBriefcase, FaMapMarkerAlt, FaDollarSign, FaCalendarAlt, FaImage, FaSearch } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");

  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/job/getmyjobs",
          { withCredentials: true }
        );
        const sortedJobs = data.myJobs.sort((a, b) => new Date(b.jobPostedOn) - new Date(a.jobPostedOn));
        setMyJobs(sortedJobs);
      } catch (error) {
        toast.error(error.response.data.message);
        setMyJobs([]);
      }
    };
    fetchJobs();
  }, []);

  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId);
  };

  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  const handleUpdateJob = async (jobId, updatedJobData) => {
    const formData = new FormData();
    
    for (const key in updatedJobData) {
      if (key !== 'companyLogo') {
        formData.append(key, updatedJobData[key]);
      }
    }

    if (updatedJobData.newCompanyLogo) {
      formData.append('companyLogo', updatedJobData.newCompanyLogo);
    }

    try {
      const res = await axios.put(`http://localhost:4000/api/v1/job/update/${jobId}`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success(res.data.message);
      setEditingMode(null);
      // Refresh job list
      const { data } = await axios.get("http://localhost:4000/api/v1/job/getmyjobs", { withCredentials: true });
      setMyJobs(data.myJobs);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      const res = await axios.delete(`http://localhost:4000/api/v1/job/delete/${jobId}`, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const JobCard = ({ job }) => (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">{job.title}</h2>
          {job.companyLogo && (
            <img 
              src={job.companyLogo.url} 
              alt="Company Logo" 
              className="w-16 h-16 object-contain"
            />
          )}
        </div>
        <div className="mb-4">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${job.expired ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
            {job.expired ? 'Expired' : 'Active'}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center">
            <FaBriefcase className="text-gray-500 mr-2" />
            <span className="text-gray-700 text-sm">{job.category}</span>
          </div>
          <div className="flex items-center">
            <FaMapMarkerAlt className="text-gray-500 mr-2" />
            <span className="text-gray-700 text-sm">{job.city}, {job.country}</span>
          </div>
          <div className="flex items-center">
            <FaDollarSign className="text-gray-500 mr-2" />
            <span className="text-gray-700 text-sm">
              {job.fixedSalary ? `$${job.fixedSalary}` : `$${job.salaryFrom} - $${job.salaryTo}`}
            </span>
          </div>
          <div className="flex items-center">
            <FaCalendarAlt className="text-gray-500 mr-2" />
            <span className="text-gray-700 text-sm">Posted on: {new Date(job.jobPostedOn).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => handleEnableEdit(job._id)}
            className="flex items-center justify-center px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 text-sm"
          >
            <FaPencilAlt className="mr-1" />
            Edit
          </button>
          <button
            onClick={() => handleDeleteJob(job._id)}
            className="flex items-center justify-center px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300 text-sm"
          >
            <FaTrash className="mr-1" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  const EditJobForm = ({ job }) => {
    const [localJob, setLocalJob] = useState(job);

    const handleLocalInputChange = (field, value) => {
      setLocalJob((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
      handleUpdateJob(job._id, localJob);
    };

    const handleLogoChange = (file) => {
      setLocalJob((prev) => ({ ...prev, newCompanyLogo: file }));
    };

    return (
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Edit Job</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
              <input
                type="text"
                value={localJob.title}
                onChange={(e) => handleLocalInputChange("title", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Job Title"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <input
                  type="text"
                  value={localJob.country}
                  onChange={(e) => handleLocalInputChange("country", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Country"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  value={localJob.city}
                  onChange={(e) => handleLocalInputChange("city", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="City"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={localJob.category}
                onChange={(e) => handleLocalInputChange("category", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Categories</option>
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
            <div className="grid grid-cols-2 gap-4">
              {localJob.fixedSalary ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fixed Salary</label>
                  <input
                    type="number"
                    value={localJob.fixedSalary}
                    onChange={(e) => handleLocalInputChange("fixedSalary", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Fixed Salary"
                  />
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Salary From</label>
                    <input
                      type="number"
                      value={localJob.salaryFrom}
                      onChange={(e) => handleLocalInputChange("salaryFrom", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Salary From"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Salary To</label>
                    <input
                      type="number"
                      value={localJob.salaryTo}
                      onChange={(e) => handleLocalInputChange("salaryTo", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Salary To"
                    />
                  </div>
                </>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={localJob.expired}
                onChange={(e) => handleLocalInputChange("expired", e.target.value === "true")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={false}>Active</option>
                <option value={true}>Expired</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Logo</label>
              <input
                type="file"
                onChange={(e) => handleLogoChange(e.target.files[0])}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                accept="image/*"
              />
              {localJob.companyLogo && (
                <img 
                  src={localJob.companyLogo.url} 
                  alt="Current Company Logo" 
                  className="mt-2 w-32 h-32 object-contain"
                />
              )}
            </div>
          </div>
        </div>
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleSubmit}
              className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
            >
              <FaCheck className="mr-2" />
              Save
            </button>
            <button
              onClick={handleDisableEdit}
              className="flex items-center justify-center px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-300"
            >
              <RxCross2 className="mr-2" />
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Filter jobs based on search term
  const filteredJobs = myJobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const Pagination = ({ jobsPerPage, totalJobs, paginate, currentPage }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalJobs / jobsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <navv className="flex justify-center mt-8">
        <ul className="flex space-x-2">
          <li>
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
            >
              &lt;
            </button>
          </li>
          {pageNumbers.map(number => (
            <li key={number}>
              <button
                onClick={() => paginate(number)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === number
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {number}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(totalJobs / jobsPerPage)}
              className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
            >
              &gt;
            </button>
          </li>
        </ul>
      </navv>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Your Posted Jobs</h1>
      
      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search jobs by title..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-12 pr-4 py-3 w-full border-2 border-blue-300 rounded-full shadow-md transition duration-300 ease-in-out"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-blue-400 text-xl" />
          </div>
        </div>
      </div>

      {filteredJobs.length > 0 ? (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {currentJobs.map((job) => (
              <div key={job._id}>
                {editingMode === job._id ? (
                  <EditJobForm job={job} />
                ) : (
                  <JobCard job={job} />
                )}
              </div>
            ))}
          </div>
          <Pagination
            jobsPerPage={jobsPerPage}
            totalJobs={filteredJobs.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </>
      ) : (
        <p className="text-gray-500 text-center">
          {searchTerm ? "No jobs match your search." : "You've not posted any job or may be you deleted all of your jobs!"}
        </p>
      )}
    </div>
  );
};

export default MyJobs;