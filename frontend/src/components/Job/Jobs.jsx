import React, { useContext, useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import {
  CCard,
  CCardBody,
  CCardTitle,
  CCardText,
  CCardImage,
  CButton,
  CSpinner,
  CAlert,
} from "@coreui/react";
import {
  RiBriefcaseLine,
  RiMapPin2Line,
  RiMoneyDollarCircleLine,
  RiCalendar2Line,
  RiArrowRightLine,
  RiSearchLine
} from "react-icons/ri";
const JobCard = ({ job }) => {
  const formatSalary = (job) => {
    if (job.fixedSalary) {
      return `$${job.fixedSalary.toLocaleString()}`;
    } else if (job.salaryFrom && job.salaryTo) {
      return `$${job.salaryFrom.toLocaleString()} - $${job.salaryTo.toLocaleString()}`;
    }
    return "Salary not specified";
  };

  return (
    <CCard className="group relative h-full border-0 rounded-2xl overflow-hidden bg-gradient-to-br from-white to-gray-50 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] z-0">
      <Link to={`/job/${job._id}`} className="flex flex-col h-full no-underline">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-[1]" />
          <CCardImage
            orientation="top"
            src={job.companyLogo?.url || "/job.png"}
            style={{ height: "240px", objectFit: "cover" }}
            className="transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4 z-[2]">
            <div className="inline-flex items-center bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
              <img 
                src={job.companyLogo?.url || "/company-default.png"} 
                className="w-5 h-5 rounded-full mr-2"
                alt={job.company}
              />
              <span className="text-sm font-medium text-gray-800">{job.company}</span>
            </div>
          </div>
          <div className="absolute bottom-4 left-4 right-4 z-[2]">
            <CCardTitle className="text-2xl font-bold text-white mb-2 line-clamp-2">
              {job.title}
            </CCardTitle>
            <div className="flex flex-wrap gap-2">
              <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                {job.category}
              </span>
              <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                {formatSalary(job)}
              </span>
            </div>
          </div>
        </div>

        <CCardBody className="flex flex-col flex-grow p-6">
          <div className="flex-grow space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center text-gray-700">
                  <RiMapPin2Line className="w-5 h-5 mr-2 text-teal-600" />
                  <span className="text-sm font-medium">{job.city}</span>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center text-gray-700">
                  <RiCalendar2Line className="w-5 h-5 mr-2 text-teal-600" />
                  <span className="text-sm font-medium">
                    {new Date(job.jobPostedOn).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <CCardText className="text-gray-600 line-clamp-2">
                {job.description || "Join our team and be part of something amazing. We offer competitive benefits and a great work environment."}
              </CCardText>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-600">Actively hiring</span>
            </div>
            <button className="group/button flex items-center text-teal-700 font-medium hover:text-teal-600 transition-colors">
              View Details
              <RiArrowRightLine className="ml-2 transition-transform duration-300 group-hover/button:translate-x-1" />
            </button>
          </div>
        </CCardBody>
      </Link>
    </CCard>
  );
};
const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [salaryRange, setSalaryRange] = useState({ min: "", max: "" });
  const [cityFilter, setCityFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(15);
  const isGuest = localStorage.getItem("guest") === "true";

  useEffect(() => {
    
    const fetchJobs = async () => {
      try {
        const res = await axios.get("https://jobquestdeploy.onrender.com/api/v1/job/getall", {
          withCredentials: true,
        });
        // Sort jobs from latest to oldest
        const sortedJobs = res.data.jobs.sort((a, b) => new Date(b.jobPostedOn) - new Date(a.jobPostedOn));
        setJobs(sortedJobs);
      } catch (error) {
        setError("Failed to load jobs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    if (!isAuthorized && !isGuest) {
      navigateTo("/");
    }
  }, [isAuthorized, navigateTo]);

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  const handleSalaryChange = (e) => {
    const { name, value } = e.target;
    setSalaryRange((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const handleCityFilterChange = (e) => {
    setCityFilter(e.target.value);
    setCurrentPage(1);
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesTitle = job.title.toLowerCase().includes(filterText.toLowerCase());
      const matchesCategory = selectedCategory === "All" || job.category === selectedCategory;
      const matchesCity = job.city.toLowerCase().includes(cityFilter.toLowerCase());

      const matchesSalary =
        (salaryRange.min === "" || (job.fixedSalary && job.fixedSalary >= parseInt(salaryRange.min)) ||
         (job.salaryFrom && job.salaryFrom >= parseInt(salaryRange.min))) &&
        (salaryRange.max === "" || (job.fixedSalary && job.fixedSalary <= parseInt(salaryRange.max)) ||
         (job.salaryTo && job.salaryTo <= parseInt(salaryRange.max)));

      return matchesTitle && matchesCategory && matchesCity && matchesSalary;
    });
  }, [jobs, filterText, selectedCategory, cityFilter, salaryRange]);

  // Get current jobs
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pageNumbers.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pageNumbers;
  };

  return (
      <section className="jobs page min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
        {/* Modern Navbar Text Area */}
        <div className="relative overflow-hidden py-20 bg-gradient-to-r from-gray-800 via-slate-900 to-zinc-900">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-[0.1] pattern-grid-lg"></div>
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 via-blue-500/10 to-purple-500/10 animate-gradient"></div>
          </div>
  
          <div className="relative container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl sm:text-5xl lg:text-6xl font-bold mb-6 text-white tracking-tight">
          Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-400">Dream Job</span>
        </h1>
              <p className="text-teal-100 text-lg mb-8">
                Explore <span className="text-teal-400 font-semibold">{jobs.length}+ jobs</span> from top companies in our job board
              </p>
              
              {/* Stats Cards */}
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-teal-400"></div>
                    <span className="text-white text-sm">Active Listings</span>
                  </div>
                  <p className="text-2xl font-bold text-white mt-2">{jobs.length}</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                    <span className="text-white text-sm">Categories</span>
                  </div>
                  <p className="text-2xl font-bold text-white mt-2">20+</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                    <span className="text-white text-sm">Companies</span>
                  </div>
                  <p className="text-2xl font-bold text-white mt-2">100+</p>
                </div>
              </div>
            </div>
          </div>
        </div>  

        <div className="container mx-auto px-4 -mt-8">
        {/* Search, Category, Salary, and City Filters */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <RiSearchLine
                className="absolute left-3 top-3 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search jobs"
                value={filterText}
                onChange={handleFilterChange}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none"
                aria-label="Search jobs"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full border border-gray-300 rounded-lg shadow-sm py-2 pl-3 pr-2 focus:outline-none"
            >
              <option value="All">All Categories</option>
              <option value="Graphics & Design">Graphics & Design</option>
              <option value="Mobile App Development">Mobile App Development</option>
              <option value="Frontend Web Development">Frontend Web Development</option>
              <option value="MERN Stack Development">MERN Stack Development</option>
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
              <option value="Sales and Marketing">Sales and Marketing</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Game Development">Game Development</option>
              <option value="Blockchain and Cryptocurrency">Blockchain and Cryptocurrency</option>
            </select>

            <div className="flex gap-2">
              <input
                type="number"
                name="min"
                placeholder="Min Salary"
                value={salaryRange.min}
                onChange={handleSalaryChange}
                className="w-1/2 border border-gray-300 rounded-lg shadow-sm py-2 pl-3 pr-2 focus:outline-none"
                aria-label="Minimum salary"
                min="0" // This will prevent negative values from being manually typed
              />
              <input
                type="number"
                name="max"
                placeholder="Max Salary"
                value={salaryRange.max}
                onChange={handleSalaryChange}
                className="w-1/2 border border-gray-300 rounded-lg shadow-sm py-2 pl-3 pr-2 focus:outline-none"
                aria-label="Maximum salary"
                min="0" // This will prevent negative values from being manually typed
              />
            </div>


            <input
              type="text"
              placeholder="Filter by city"
              value={cityFilter}
              onChange={handleCityFilterChange}
              className="w-full border border-gray-300 rounded-lg shadow-sm py-2 pl-3 pr-2 focus:outline-none"
              aria-label="Filter by city"
            />
          </div>
        </div>
        </div>




        {/* Error Handling */}
        {error && (
          <div className="mt-6 max-w-xl mx-auto">
            <CAlert color="danger" className="text-center">
              {error}
            </CAlert>
          </div>
        )}

        {/* Job cards or Loading Spinner */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <CSpinner color="primary" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {currentJobs.length > 0 ? (
                currentJobs.map((job) => (
                  <JobCard key={job._id} job={job} />
                ))
              ) : (
                <p className="text-center col-span-full text-gray-600 text-lg">
                  No jobs found matching your search.
                </p>
              )}
            </div>

            {/* Pagination */}
            {filteredJobs.length > jobsPerPage && (
              <div className="mt-8 flex justify-center">
                <navv className="inline-flex rounded-md shadow-sm" aria-label="Pagination">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Previous</span>
                    &lt;
                  </button>
                  {getPageNumbers().map((number, index) => (
                    <button
                      key={index}
                      onClick={() => typeof number === 'number' ? paginate(number) : null}
                      className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                        number === currentPage
                          ? 'z-10 bg-blue-50 border-blue-500 text-teal-600'
                          : 'text-gray-500 hover:bg-gray-50'
                      } ${typeof number !== 'number' ? 'cursor-default' : ''}`}
                    >
                      {number}
                    </button>
                  ))}
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Next</span>
                    &gt;
                  </button>
                </navv>
              </div>
            )}
          </>
        )}
    </section>
  );
};

export default Jobs;