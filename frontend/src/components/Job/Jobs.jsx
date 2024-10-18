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
import { RiSearchLine, RiBriefcaseLine, RiMapPin2Line, RiMoneyDollarCircleLine, RiCalendar2Line } from "react-icons/ri";

const JobCard = ({ job }) => {
  const formatSalary = (job) => {
    if (job.fixedSalary) {
      return `$${job.fixedSalary.toLocaleString()}`;
    } else if (job.salaryFrom && job.salaryTo) {
      return `$${job.salaryFrom.toLocaleString()} - $${job.salaryTo.toLocaleString()}`;
    } else {
      return "Not specified";
    }
  };

  return (
    <CCard className="h-full shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-70">
      <Link to={`/job/${job._id}`} className="mt-auto">
      <CCardImage
        orientation="top"
        src={job.companyLogo ? job.companyLogo.url : "/job.png"}
        style={{ height: "12rem", objectFit: "cover" }}
        className="transition-opacity duration-300"
      />
      <CCardBody className="flex flex-col justify-between p-6">
        <div>
          <CCardTitle className="text-xl font-bold text-gray-900 mb-2">
            {job.title}
          </CCardTitle>
          <CCardText className="text-sm text-gray-600 mb-4">
            {job.company}
          </CCardText>
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <RiBriefcaseLine className="mr-2" />
              <span>{job.category}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <RiMapPin2Line className="mr-2" />
              <span>{job.city}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <RiMoneyDollarCircleLine className="mr-2" />
              <span>{formatSalary(job)}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <RiCalendar2Line className="mr-2" />
              <span className="text-gray-700 text-sm">Posted on: {new Date(job.jobPostedOn).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
          <CButton color="primary" className="w-full">
            View Job Details
          </CButton>
        
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
    if (!isAuthorized) {
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
    <section className="jobs page py-10 bg-gray-100">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Available Jobs
        </h1>

        {/* Search, Category, Salary, and City Filters */}
        <div className="sticky top-0 bg-white rounded-lg shadow-md p-6 mb-8">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
              {currentJobs.length > 0 ? (
                currentJobs.map((job) => (
                  <JobCard key={job._id} job={job} />
                ))
              ) : (
                <p className="text-center col-span-full text-gray-600 text-lg">
                  No jobs found matching your criteria.
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
      </div>
    </section>
  );
};

export default Jobs;