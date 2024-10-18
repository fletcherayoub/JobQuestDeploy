import React, { useState } from 'react';

const EducationForm = ({ education, setEducation }) => {
  const [newEducation, setNewEducation] = useState({
    institution: '',
    degree: '',
    startDate: '',
    endDate: '',
    location: '',
  });

  const addEducation = () => {
    setEducation([...education, newEducation]);
    setNewEducation({
      institution: '',
      degree: '',
      startDate: '',
      endDate: '',
      location: '',
    });
  };

  const deleteEducation = (index) => {
    const updatedEducation = education.filter((_, i) => i !== index);
    setEducation(updatedEducation);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Education</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Institution</label>
        <input
          type="text"
          className="form-input w-full border border-gray-300 p-2 rounded-md"
          value={newEducation.institution}
          onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
          placeholder="Enter institution"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Degree</label>
        <input
          type="text"
          className="form-input w-full border border-gray-300 p-2 rounded-md"
          value={newEducation.degree}
          onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
          placeholder="Enter degree"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Start Date</label>
        <input
          type="date"
          className="form-input w-full border border-gray-300 p-2 rounded-md"
          value={newEducation.startDate}
          onChange={(e) => setNewEducation({ ...newEducation, startDate: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">End Date</label>
        <input
          type="date"
          className="form-input w-full border border-gray-300 p-2 rounded-md"
          value={newEducation.endDate}
          onChange={(e) => setNewEducation({ ...newEducation, endDate: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Location</label>
        <input
          type="text"
          className="form-input w-full border border-gray-300 p-2 rounded-md"
          value={newEducation.location}
          onChange={(e) => setNewEducation({ ...newEducation, location: e.target.value })}
          placeholder="Enter location"
        />
      </div>
      <div className="mb-4 flex">
        <button
          type="button"
          className="btn bg-blue-500 text-white p-2 rounded-md"
          onClick={addEducation}
        >
          Add Education
        </button>
      </div>
      <ul className="list-none pl-0 mb-4">
        {education.map((edu, index) => (
          <li key={index} className="mb-2 flex items-center justify-between bg-gray-100 p-2 rounded">
            <span>
              {edu.institution} - {edu.degree} ({edu.startDate} to {edu.endDate}) - {edu.location}
            </span>
            <button
              onClick={() => deleteEducation(index)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EducationForm;