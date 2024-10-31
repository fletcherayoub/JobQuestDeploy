import React from 'react';
import { Layout, User, Briefcase, Mail, Phone, MapPin } from 'lucide-react';

const TemplatePreview = ({ name, selected, onClick }) => {
  // Preview layout varies based on template style
  const getPreviewContent = () => {
    switch (name) {
      case 'classic':
        return (
          <div className="h-full p-2">
            <div className="bg-gray-200 h-4 w-24 mb-2"></div>
            <div className="flex gap-2">
              <div className="w-1/3">
                <div className="bg-gray-300 h-8 w-8 rounded-full mb-2"></div>
                <div className="bg-gray-200 h-2 w-full mb-1"></div>
                <div className="bg-gray-200 h-2 w-full mb-1"></div>
              </div>
              <div className="w-2/3">
                <div className="bg-gray-200 h-2 w-full mb-1"></div>
                <div className="bg-gray-200 h-2 w-3/4 mb-2"></div>
                <div className="bg-gray-200 h-2 w-full mb-1"></div>
              </div>
            </div>
          </div>
        );
      
      case 'modern':
        return (
          <div className="h-full p-2">
            <div className="flex gap-2">
              <div className="w-1/2 bg-gray-800 p-2">
                <div className="bg-gray-200 h-6 w-6 rounded-full mb-2"></div>
                <div className="bg-gray-200 h-2 w-full mb-1"></div>
                <div className="bg-gray-200 h-2 w-3/4"></div>
              </div>
              <div className="w-1/2 p-1">
                <div className="bg-gray-300 h-3 w-3/4 mb-2"></div>
                <div className="bg-gray-200 h-2 w-full mb-1"></div>
                <div className="bg-gray-200 h-2 w-full"></div>
              </div>
            </div>
          </div>
        );

      case 'minimalist':
        return (
          <div className="h-full p-2">
            <div className="flex justify-between mb-2">
              <div className="bg-gray-200 h-4 w-20"></div>
              <div className="bg-gray-200 h-4 w-20"></div>
            </div>
            <div className="bg-gray-200 h-2 w-full mb-1"></div>
            <div className="bg-gray-200 h-2 w-3/4"></div>
          </div>
        );

      case 'professional':
        return (
          <div className="h-full p-2">
            <div className="bg-blue-100 h-8 w-full mb-2 flex items-center justify-center">
              <div className="bg-gray-300 h-4 w-32"></div>
            </div>
            <div className="flex gap-2">
              <div className="w-1/3">
                <div className="bg-gray-200 h-2 w-full mb-1"></div>
                <div className="bg-gray-200 h-2 w-3/4"></div>
              </div>
              <div className="w-2/3">
                <div className="bg-gray-200 h-2 w-full mb-1"></div>
                <div className="bg-gray-200 h-2 w-full"></div>
              </div>
            </div>
          </div>
        );

      case 'business':
        return (
          <div className="h-full p-2">
            <div className="flex gap-2 mb-2">
              <div className="bg-gray-800 h-12 w-12 rounded"></div>
              <div>
                <div className="bg-gray-300 h-4 w-24 mb-1"></div>
                <div className="bg-gray-200 h-2 w-20"></div>
              </div>
            </div>
            <div className="bg-gray-200 h-2 w-full mb-1"></div>
            <div className="bg-gray-200 h-2 w-3/4"></div>
          </div>
        );

      case 'simple':
        return (
          <div className="h-full p-2">
            <div className="bg-gray-200 h-6 w-32 mx-auto mb-2"></div>
            <div className="bg-gray-200 h-2 w-full mb-1"></div>
            <div className="bg-gray-200 h-2 w-full mb-1"></div>
            <div className="bg-gray-200 h-2 w-3/4"></div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div 
      className={`border-2 rounded-lg cursor-pointer transition-all h-32
        ${selected ? 'border-blue-500 shadow-lg' : 'border-gray-200 hover:border-blue-300'}
      `}
      onClick={onClick}
    >
      <div className="bg-white h-24 rounded-t-lg">
        {getPreviewContent()}
      </div>
      <div className="h-8 bg-gray-50 rounded-b-lg flex items-center justify-center">
        <span className="text-sm font-medium text-gray-700 capitalize">{name}</span>
      </div>
    </div>
  );
};

const PersonalInfoForm = ({ personalInfo, setPersonalInfo, selectedTemplate, setSelectedTemplate }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo({
      ...personalInfo,
      [name]: value,
    });
  };

  const handlePhotoChange = (e) => {
    setPersonalInfo({
      ...personalInfo,
      photo: URL.createObjectURL(e.target.files[0]),
    });
  };

  const templates = [
    'classic',
    'modern',
    'minimalist',
    'professional',
    'business',
    'simple'
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Build Your Resume</h2>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Choose Your Template</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {templates.map((template) => (
            <TemplatePreview
              key={template}
              name={template}
              selected={selectedTemplate === template}
              onClick={() => setSelectedTemplate(template)}
            />
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium mb-4">Personal Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <User className="inline w-4 h-4 mr-1" />
                Full Name
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2"
                name="name"
                value={personalInfo.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Briefcase className="inline w-4 h-4 mr-1" />
                Profile
              </label>
              <textarea
                className="w-full border border-gray-300 rounded-md p-2"
                name="profile"
                value={personalInfo.profile}
                onChange={handleChange}
                rows="3"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Mail className="inline w-4 h-4 mr-1" />
                Email
              </label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-md p-2"
                name="email"
                value={personalInfo.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Phone className="inline w-4 h-4 mr-1" />
                Phone
              </label>
              <input
                type="tel"
                className="w-full border border-gray-300 rounded-md p-2"
                name="phone"
                value={personalInfo.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <MapPin className="inline w-4 h-4 mr-1" />
                Address
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2"
                name="address"
                value={personalInfo.address}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Layout className="inline w-4 h-4 mr-1" />
                Photo
              </label>
              <input
                type="file"
                className="w-full border border-gray-300 rounded-md p-2"
                name="photo"
                onChange={handlePhotoChange}
                accept="image/*"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;