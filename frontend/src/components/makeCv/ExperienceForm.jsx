import React, { useState } from 'react';

const ExperienceForm = ({ experience, setExperience }) => {
  const [newExperience, setNewExperience] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    location: '',
    responsibilities: '',
  });

  const addExperience = () => {
    setExperience([...experience, newExperience]);
    setNewExperience({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      location: '',
      responsibilities: '',
    });
  };

  const deleteExperience = (index) => {
    const updatedExperience = experience.filter((_, i) => i !== index);
    setExperience(updatedExperience);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Experience</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Company</label>
        <input
          type="text"
          className="form-input w-full border border-gray-300 p-2 rounded-md"
          value={newExperience.company}
          onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
          placeholder="Enter company"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Position</label>
        <input
          type="text"
          className="form-input w-full border border-gray-300 p-2 rounded-md"
          value={newExperience.position}
          onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })}
          placeholder="Enter position"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Start Date</label>
        <input
          type="date"
          className="form-input w-full border border-gray-300 p-2 rounded-md"
          value={newExperience.startDate}
          onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">End Date</label>
        <input
          type="date"
          className="form-input w-full border border-gray-300 p-2 rounded-md"
          value={newExperience.endDate}
          onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Location</label>
        <input
          type="text"
          className="form-input w-full border border-gray-300 p-2 rounded-md"
          value={newExperience.location}
          onChange={(e) => setNewExperience({ ...newExperience, location: e.target.value })}
          placeholder="Enter location"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Responsibilities</label>
        <textarea
          className="form-textarea w-full border border-gray-300 p-2 rounded-md"
          rows="3"
          value={newExperience.responsibilities}
          onChange={(e) =>
            setNewExperience({ ...newExperience, responsibilities: e.target.value })
          }
          placeholder="Enter responsibilities"
        ></textarea>
      </div>
      <div className="mb-4 flex">
        <button
          type="button"
          className="btn bg-blue-500 text-white p-2 rounded-md"
          onClick={addExperience}
        >
          Add Experience
        </button>
      </div>
      <ul className="list-disc pl-5 mb-4">
        {experience.map((exp, index) => (
          <li key={index} className="mb-2">
            <div className="flex justify-between items-start">
              <div>
                <strong>{exp.position}</strong> at {exp.company} ({exp.startDate} to {exp.endDate}) - {exp.location}
                <br />
                Responsibilities: {exp.responsibilities}
              </div>
              <button
                onClick={() => deleteExperience(index)}
                className="bg-red-500 text-white p-1 rounded-md ml-2 text-sm"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExperienceForm;