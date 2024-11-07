import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Context } from "../../main";

const MyApplications = () => {
  const { user, isAuthorized } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthorized) {
      navigate("/login");
      return;
    }

    const fetchApplications = async () => {
      try {
        const endpoint = user.role === "Employer"
          ? "/api/v1/application/employer/getall"
          : "/api/v1/application/jobseeker/getall";

        const response = await axios.get(`https://jobquestdeploy.onrender.com${endpoint}`, {
          withCredentials: true,
          params: { page: currentPage, limit: 10 }
        });

        const applicationsWithJobs = await Promise.all(response.data.applications.map(async (app) => {
          try {
            const jobResponse = await axios.get(`https://jobquestdeploy.onrender.com/api/v1/job/${app.jobId}`, {
              withCredentials: true,
            });
            return { ...app, jobDetails: jobResponse.data.job };
          } catch (error) {
            console.error(`Error fetching job details for application ${app._id}:`, error);
            return { ...app, jobDetails: null };
          }
        }));
        setApplications(applicationsWithJobs);
        setTotalPages(response.data.totalPages || 1);
      } catch (error) {
        // toast.error("Failed to fetch applications. Please try again.");
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [isAuthorized, user, currentPage, navigate]);

  const deleteApplication = async (id) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      try {
        await axios.delete(`https://jobquestdeploy.onrender.com/api/v1/application/delete/${id}`, {
          withCredentials: true,
        });
        toast.success("Application deleted successfully");
        setApplications((prev) => prev.filter((app) => app._id !== id));
      } catch (error) {
        toast.error("Failed to delete application. Please try again.");
        console.error("Error deleting application:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-3xl font-semibold text-gray-800">
              {user.role === "Employer" ? "Applications From Job Seekers" : "My Applications"}
            </h2>
          </div>

          {applications.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-gray-400">
                <svg 
                  className="mx-auto h-12 w-12" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" 
                  />
                </svg>
                <p className="mt-2 text-lg">No applications found</p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              {/* Mobile View */}
              <div className="grid grid-cols-1 gap-4 p-4 sm:hidden">
                {applications.map((application) => (
                  <div key={application._id} 
                    className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all duration-200">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center">
                          {application.applicantID?.user?.profilePicture?.url ? (
                            <img
                              src={application.applicantID.user.profilePicture.url}
                              alt="Profile"
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          ) : (
                            <span className="text-teal-600 font-medium">
                              {application.name.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{application.name}</p>
                          <p className="text-sm text-gray-500">{application.email}</p>
                        </div>
                      </div>
                      <div className="pt-2">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Job: </span>
                          {application?.jobId?.title || 'Not available'}
                        </p>
                      </div>
                      <div className="flex space-x-2 pt-3">
                        <button
                          className="flex-1 bg-teal-50 text-teal-700 hover:bg-teal-100 px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                          onClick={() => setSelectedApplication(application)}
                        >
                          View Details
                        </button>
                        {user.role !== "Employer" && (
                        <button
                          className="flex-1 bg-red-50 text-red-700 hover:bg-red-100 px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                          onClick={() => deleteApplication(application._id)}
                        >
                          Delete
                        </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop View */}
              <table className="w-full hidden sm:table">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Applicant</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Contact</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Job Position</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {applications.map((application) => (
                    <tr key={application._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center">
                            {application.applicantID?.user?.profilePicture?.url ? (
                              <img
                                src={application.applicantID.user.profilePicture.url}
                                alt="Profile"
                                className="h-10 w-10 rounded-full object-cover"
                              />
                            ) : (
                              <span className="text-teal-600 font-medium">
                                {application.name.charAt(0)}
                              </span>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">{application.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{application.email}</div>
                        <div className="text-sm text-gray-500">{application.phone}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {application?.jobId?.title || 'Not available'}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          className="text-teal-600 hover:text-teal-900 font-medium text-sm mx-2"
                          onClick={() => setSelectedApplication(application)}
                        >
                          View
                        </button>
                        {user.role !== "Employer" && (
                        <button
                          className="text-red-600 hover:text-red-900 font-medium text-sm mx-2"
                          onClick={() => deleteApplication(application._id)}
                        >
                          Delete
                        </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-100">
            <div className="flex justify-center space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    currentPage === page 
                      ? 'bg-teal-600 text-white' 
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">Application Details</h3>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-500">Name</p>
                  <p className="text-gray-900">{selectedApplication.name}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-gray-900">{selectedApplication.email}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <p className="text-gray-900">{selectedApplication.phone}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-500">Address</p>
                  <p className="text-gray-900">{selectedApplication.address}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Job Position</p>
                <p className="text-gray-900">{selectedApplication?.jobId?.title || 'Not available'}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Cover Letter</p>
                <p className="text-gray-900 whitespace-pre-wrap">{selectedApplication.coverLetter}</p>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Resume</p>
                <img 
                  src={selectedApplication.resume.url} 
                  alt="Resume" 
                  className="max-w-full h-auto rounded-lg border border-gray-200"
                />
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-100">
              <button
                className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors"
                onClick={() => setSelectedApplication(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyApplications;