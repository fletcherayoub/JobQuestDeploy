import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft,
  User,
  GraduationCap,
  Briefcase,
  Eye,
  PenSquare,
  CheckCircle2,
  AlertCircle,
  ArrowLeft
} from 'lucide-react';
import PersonalInfoForm from './PersonalInfoForm';
import EducationForm from './EducationForm';
import ExperienceForm from './ExperienceForm';
import CvPreview from './CvPreview';

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
  const [step, setStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState('classic');

  const steps = [
    { 
      number: 1, 
      id: 'personal', 
      label: 'Personal Info', 
      icon: User,
      isComplete: () => personalInfo.name && personalInfo.email && personalInfo.phone
    },
    { 
      number: 2, 
      id: 'education', 
      label: 'Education', 
      icon: GraduationCap,
      isComplete: () => education.length > 0
    },
    { 
      number: 3, 
      id: 'experience', 
      label: 'Experience', 
      icon: Briefcase,
      isComplete: () => experience.length > 0
    }
  ];

  const validateForm = () => {
    const hasRequiredPersonalInfo = steps[0].isComplete();
    const hasEducation = steps[1].isComplete();
    const hasExperience = steps[2].isComplete();

    if (!hasRequiredPersonalInfo) {
      setStep(1);
      return false;
    }
    if (!hasEducation) {
      setStep(2);
      return false;
    }
    if (!hasExperience) {
      setStep(3);
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
    } else {
      alert('Please complete all required sections before previewing your CV.');
    }
  };

  const handleEdit = () => {
    setSubmitted(false);
    setStep(1);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <PersonalInfoForm
          personalInfo={personalInfo}
          setPersonalInfo={setPersonalInfo}
          selectedTemplate={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
        />;
      case 2:
        return <EducationForm education={education} setEducation={setEducation} />;
      case 3:
        return <ExperienceForm experience={experience} setExperience={setExperience} />;
      default:
        return null;
    }
  };

  const StepIndicator = ({ stepInfo, currentStep }) => (
    <div className={`flex items-center ${stepInfo.number !== steps.length ? 'flex-1' : ''}`}>
      <div className="relative flex flex-col items-center">
        <button
          onClick={() => setStep(stepInfo.number)}
          className={`w-10 h-10 rounded-full border-2 flex items-center justify-center
            ${stepInfo.isComplete() 
              ? 'bg-green-500 border-green-500 text-white' 
              : currentStep === stepInfo.number
                ? 'bg-blue-500 border-blue-500 text-white'
                : 'border-gray-300 text-gray-300'}`}
        >
          {stepInfo.isComplete() ? <CheckCircle2 className="w-6 h-6" /> : <stepInfo.icon className="w-5 h-5" />}
        </button>
        <p className={`text-xs mt-1 font-medium absolute -bottom-6 whitespace-nowrap
          ${currentStep === stepInfo.number ? 'text-blue-500' : 'text-gray-500'}`}>
          {stepInfo.label}
        </p>
      </div>
      {stepInfo.number !== steps.length && (
        <div className={`flex-1 h-[2px] mx-2 ${
          stepInfo.isComplete() ? 'bg-green-500' : 'bg-gray-300'
        }`} />
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed" style={{backgroundImage: 'url(/applied.jpg'}}>
      <div className="min-h-screen bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="max-w-3xl mx-auto p-4">
        {!submitted && (
          <button
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center text-white hover:text-gray-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back
          </button>
        )}

        {!submitted ? (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b">
              <h1 className="text-2xl font-bold text-gray-800 mb-6">Create Your CV</h1>
              
              {/* Progress Steps */}
              <div className="relative flex justify-between mb-8 px-2">
                {steps.map((s) => (
                  <StepIndicator key={s.number} stepInfo={s} currentStep={step} />
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              {renderStepContent()}

              <div className="flex gap-3 mt-8">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Previous
                  </button>
                )}
                {step < steps.length ? (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="flex-1 px-4 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    Preview CV
                  </button>
                )}
              </div>

              {/* Section Requirements Notice */}
              <div className="mt-4 flex items-start gap-2 text-sm text-gray-600">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p>
                  {step === 1 && "Personal information (name, email, phone) is required"}
                  {step === 2 && "Add at least one education entry"}
                  {step === 3 && "Add at least one work experience"}
                </p>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
           
            
            <CvPreview
              personalInfo={personalInfo}
              education={education}
              experience={experience}
              selectedTemplate={selectedTemplate}
              onEdit={handleEdit}
            />
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default CvMaker;