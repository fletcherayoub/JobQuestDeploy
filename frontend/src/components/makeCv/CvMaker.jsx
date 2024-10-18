import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiChevronLeft, HiUser, HiAcademicCap, HiBriefcase, HiEye } from 'react-icons/hi';
import PersonalInfoForm from './PersonalInfoForm';
import EducationForm from './EducationForm';
import ExperienceForm from './ExperienceForm';
import CvPreview from './CvPreview';
import { generatePDF } from './Utilities';

const CvMaker = () => {
  const navigate = useNavigate();
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    photo: null,
  });
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [selectedTemplate, setSelectedTemplate] = useState('classic');

  const tabs = [
    { id: 'personal', label: 'Personal', icon: HiUser },
    { id: 'education', label: 'Education', icon: HiAcademicCap },
    { id: 'experience', label: 'Experience', icon: HiBriefcase },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
    } else {
      alert('Please fill in all required fields before submitting.');
    }
  };

  const validateForm = () => {
    if (!personalInfo.name || !personalInfo.email || !personalInfo.phone) {
      return false;
    }
    if (education.length === 0 || experience.length === 0) {
      return false;
    }
    return true;
  };

  const handleEdit = () => {
    setSubmitted(false);
    setActiveTab('personal');
  };

  const handleDownload = () => {
    generatePDF(personalInfo, education, experience, selectedTemplate);
  };

  const handleNextTab = () => {
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].id);
    }
  };

  const handlePreviousTab = () => {
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].id);
    }
  };

  const handleReturnToPreviousPage = () => {
    navigate(-1);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return <PersonalInfoForm
          personalInfo={personalInfo}
          setPersonalInfo={setPersonalInfo}
          selectedTemplate={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
        />;
      case 'education':
        return <EducationForm education={education} setEducation={setEducation} />;
      case 'experience':
        return <ExperienceForm experience={experience} setExperience={setExperience} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed" style={{backgroundImage: 'url(/applied.jpg'}}>
      <div className="min-h-screen bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="container mx-auto pt-10 p-5 max-w-4xl">
          <button
            onClick={handleReturnToPreviousPage}
            className="mb-5 flex items-center text-white hover:text-gray-200 transition-colors"
          >
            <HiChevronLeft className="mr-2" size={20} />
            Go back
          </button>

          {!submitted ? (
            <div className="bg-white bg-opacity-90 shadow-lg rounded-lg overflow-hidden">
              <div className="bg-gray-100 bg-opacity-90 p-6">
                <h1 className="text-3xl font-bold text-gray-800">Create Your CV</h1>
              </div>

              <div className="flex border-b border-gray-200">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`flex-1 py-4 px-6 flex items-center justify-center ${
                      activeTab === tab.id
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <tab.icon className="mr-2" size={20} />
                    {tab.label}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="p-6">
                {renderTabContent()}

                <div className="flex justify-between mt-8">
                  {activeTab !== 'personal' && (
                    <button
                      type="button"
                      onClick={handlePreviousTab}
                      className="btn bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
                    >
                      Previous
                    </button>
                  )}
                  {activeTab !== 'experience' ? (
                    <button
                      type="button"
                      onClick={handleNextTab}
                      className="btn bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors ml-auto"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="btn bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors flex items-center ml-auto"
                    >
                      <HiEye className="mr-2" size={20} />
                      Preview CV
                    </button>
                  )}
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-white bg-opacity-90 shadow-lg rounded-lg overflow-hidden">
              <CvPreview
                personalInfo={personalInfo}
                education={education}
                experience={experience}
                selectedTemplate={selectedTemplate}
                onEdit={handleEdit}
                onDownload={handleDownload}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CvMaker;