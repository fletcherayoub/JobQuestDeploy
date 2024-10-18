import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../../main";
import { Briefcase, MapPin, Calendar, DollarSign, Users, Clock, ArrowLeft, AlertCircle } from "lucide-react";

const CustomAlert = ({ message }) => (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
    <div className="flex items-center">
      <AlertCircle className="mr-2" size={20} />
      <span className="block sm:inline">{message}</span>
    </div>
  </div>
);

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigateTo = useNavigate();
  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/job/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setJob(res.data.job);
        setLoading(false);
      })
      .catch((error) => {
        setError("Job not found or unable to fetch data.");
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/login");
    }
  }, [isAuthorized, navigateTo]);

  const handleBack = () => {
    navigateTo(-1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CustomAlert message={error} />
      </div>
    );
  }

  return (
    <section className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <button
          onClick={handleBack}
          className="mb-6 flex items-center text-teal-600 hover:text-teal-700 transition"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back to Jobs
        </button>
        
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{job.title}</h1>
            <div className="flex flex-wrap items-center text-gray-600 mb-6">
              <div className="flex items-center mr-6 mb-2">
                <Briefcase className="mr-2" size={18} />
                <span>{job.category}</span>
              </div>
              <div className="flex items-center mr-6 mb-2">
                <MapPin className="mr-2" size={18} />
                <span>{job.city}, {job.country}</span>
              </div>
              <div className="flex items-center mr-6 mb-2">
                <Calendar className="mr-2" size={18} />
                <span>Posted on {new Date(job.jobPostedOn).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center mb-2">
                <DollarSign className="mr-2" size={18} />
                <span>
                  {job.fixedSalary
                    ? `$${job.fixedSalary.toLocaleString()}`
                    : `$${job.salaryFrom.toLocaleString()} - $${job.salaryTo.toLocaleString()}`}
                </span>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Job Description</h2>
              <p className="text-gray-600 leading-relaxed">{job.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Requirements</h3>
                <ul className="list-disc list-inside text-gray-600">
                  <li>3+ years of experience in related field</li>
                  <li>Strong problem-solving skills</li>
                  <li>Excellent communication abilities</li>
                  <li>Proficiency in relevant technologies</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Benefits</h3>
                <ul className="list-disc list-inside text-gray-600">
                  <li>Competitive salary package</li>
                  <li>Health and dental insurance</li>
                  <li>401(k) retirement plan</li>
                  <li>Flexible working hours</li>
                </ul>
              </div>
            </div>
            
            <div className="flex items-center justify-between border-t border-gray-200 pt-6">
              <div className="flex items-center text-gray-600">
                <Users className="mr-2" size={18} />
                <span>10-50 employees</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="mr-2" size={18} />
                <span>Full-time</span>
              </div>
            </div>
          </div>
          
          {user && user.role !== "Employer" && (
            <div className="bg-gray-50 px-8 py-6">
              <Link
                to={`/application/${job._id}`}
                className="block w-full bg-teal-600 text-white text-center px-6 py-3 rounded-lg hover:bg-teal-700 transition"
              >
                Apply for this Position
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobDetails;