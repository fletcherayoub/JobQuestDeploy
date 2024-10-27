import React from 'react';

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

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Full name</label>
        <input
          type="text"
          className="form-input w-full border border-gray-300 p-2 rounded-md"
          name="name"
          value={personalInfo.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Profile</label>
        <input
          type="text"
          className="form-input w-full border border-gray-300 p-2 rounded-md"
          name="profile"
          value={personalInfo.profile}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          className="form-input w-full border border-gray-300 p-2 rounded-md"
          name="email"
          value={personalInfo.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Phone</label>
        <input
          type="tel"
          className="form-input w-full border border-gray-300 p-2 rounded-md"
          name="phone"
          value={personalInfo.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Address</label>
        <input
          type="text"
          className="form-input w-full border border-gray-300 p-2 rounded-md"
          name="address"
          value={personalInfo.address}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Photo</label>
        <input
          type="file"
          className="form-input w-full border border-gray-300 p-2 rounded-md"
          name="photo"
          onChange={handlePhotoChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Select Template</label>
        <select
          className="form-select w-full border border-gray-300 p-2 rounded-md"
          value={selectedTemplate}
          onChange={(e) => setSelectedTemplate(e.target.value)}
        >
          <option value="classic">Classic</option>
          <option value="modern">Modern</option>
          <option value="QuestOne">QuestOne</option>
          <option value="minimalist">Minimalist</option>
          <option value="professional">Professional</option>
          <option value="business">Business</option>
          <option value="simple">simple</option>
        </select>
      </div>
    </div>
  );
};

export default PersonalInfoForm;