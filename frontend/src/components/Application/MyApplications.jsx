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

        const response = await axios.get(`http://localhost:4000${endpoint}`, {
          withCredentials: true,
          params: { page: currentPage, limit: 10 }
        });

        const applicationsWithJobs = await Promise.all(response.data.applications.map(async (app) => {
          try {
            const jobResponse = await axios.get(`http://localhost:4000/api/v1/job/${app.jobId}`, {
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
        toast.error("Failed to fetch applications. Please try again.");
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
        await axios.delete(`http://localhost:4000/api/v1/application/delete/${id}`, {
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
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white shadow-md rounded px-4 sm:px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">
          {user.role === "Employer" ? "Applications From Job Seekers" : "My Applications"}
        </h2>
        {applications.length === 0 ? (
          <p className="text-center text-gray-500">No applications found.</p>
        ) : (
          <div className="overflow-x-auto">
            <div className="grid grid-cols-1 gap-4 sm:hidden">
              {applications.map((application) => (
                <div key={application._id} className="bg-white p-4 rounded-lg shadow">
                  <p><strong>Name:</strong> {application.name}</p>
                  <p><strong>Email:</strong> {application.email}</p>
                  <p><strong>Phone:</strong> {application.phone}</p>
                  <p><strong>Job Applied To:</strong> {application?.jobId?.title || 'Not available'}</p>
                  <div className="mt-2 flex justify-between">
                    <button
                      className="bg-teal-600 hover:bg-teal-700 transition text-white font-bold py-1 px-2 rounded"
                      onClick={() => setSelectedApplication(application)}
                    >
                      View
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                      onClick={() => deleteApplication(application._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <table className="min-w-full bg-white hidden sm:table">
              <thead>
                <tr>
                  <th className="py-2 px-2 sm:px-4 border-b">Name</th>
                  <th className="py-2 px-2 sm:px-4 border-b">Email</th>
                  <th className="py-2 px-2 sm:px-4 border-b">Phone</th>
                  <th className="py-2 px-2 sm:px-4 border-b">Job Applied To</th>
                  <th className="py-2 px-2 sm:px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((application) => (
                  <tr key={application._id}>
                    <td className="py-2 px-2 sm:px-4 border-b">{application.name}</td>
                    <td className="py-2 px-2 sm:px-4 border-b">{application.email}</td>
                    <td className="py-2 px-2 sm:px-4 border-b">{application.phone}</td>
                    <td className="py-2 px-2 sm:px-4 border-b">
                      {application?.jobId?.title || 'Not available'}
                    </td>
                    <td className="py-2 px-2 sm:px-4 border-b">
                      <button
                        className="bg-teal-600 hover:bg-teal-700 transition text-white font-bold py-1 px-2 rounded mr-2 mb-1 sm:mb-0"
                        onClick={() => setSelectedApplication(application)}
                      >
                        View
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                        onClick={() => deleteApplication(application._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="mt-4 flex justify-center">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === page ? 'bg-teal-600 text-white' : 'bg-gray-200'
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
      {selectedApplication && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-md sm:max-w-lg shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">Application Details</h3>
              <div className="mt-2 px-2 sm:px-7 py-3 text-left">
                <p className="text-sm text-gray-500 mb-1">
                  <strong>Name:</strong> {selectedApplication.name}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  <strong>Email:</strong> {selectedApplication.email}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  <strong>Phone:</strong> {selectedApplication.phone}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  <strong>Address:</strong> {selectedApplication.address}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  <strong>Job Applied To:</strong> {selectedApplication?.jobId?.title || 'Not available'}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  <strong>Cover Letter:</strong> {selectedApplication.coverLetter}
                </p>
                <img 
                  src={selectedApplication.resume.url} 
                  alt="Resume" 
                  className="mt-4 max-w-full h-auto"
                />
              </div>
              <div className="items-center px-4 py-3">
                <button
                  id="ok-btn"
                  className="px-4 py-2 bg-teal-600 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-teal-700 transition focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onClick={() => setSelectedApplication(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyApplications;