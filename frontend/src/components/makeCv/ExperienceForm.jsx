import React, { useState } from 'react';
import { PlusCircle, Trash2, ChevronDown, ChevronUp, Briefcase } from 'lucide-react';

const ExperienceForm = ({ experience, setExperience }) => {
  const [newExperience, setNewExperience] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    location: '',
    responsibilities: '',
    isCurrentJob: false
  });
  const [isAdding, setIsAdding] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const resetForm = () => {
    setNewExperience({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      location: '',
      responsibilities: '',
      isCurrentJob: false
    });
    setIsAdding(false);
  };

  const addExperience = () => {
    if (!newExperience.company || !newExperience.position) {
      return;
    }
    setExperience([...experience, newExperience]);
    resetForm();
  };

  const deleteExperience = (index) => {
    const updatedExperience = experience.filter((_, i) => i !== index);
    setExperience(updatedExperience);
  };

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-semibold">Experience</h2>
        </div>
        {!isAdding && (
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Add Experience</span>
          </button>
        )}
      </div>

      {isAdding && (
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Company*</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={newExperience.company}
                  onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                  placeholder="e.g. Google"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Position*</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={newExperience.position}
                  onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })}
                  placeholder="e.g. Software Engineer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Start Date</label>
                <input
                  type="month"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={newExperience.startDate}
                  onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">End Date</label>
                <div className="space-y-2">
                  <input
                    type="month"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={newExperience.endDate}
                    onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
                    disabled={newExperience.isCurrentJob}
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="currentJob"
                      checked={newExperience.isCurrentJob}
                      onChange={(e) => setNewExperience({ 
                        ...newExperience, 
                        isCurrentJob: e.target.checked,
                        endDate: e.target.checked ? '' : newExperience.endDate 
                      })}
                      className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                    />
                    <label htmlFor="currentJob" className="text-sm text-gray-600">
                      Current job
                    </label>
                  </div>
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Location</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={newExperience.location}
                  onChange={(e) => setNewExperience({ ...newExperience, location: e.target.value })}
                  placeholder="e.g. San Francisco, CA"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Responsibilities</label>
                <textarea
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="4"
                  value={newExperience.responsibilities}
                  onChange={(e) => setNewExperience({ ...newExperience, responsibilities: e.target.value })}
                  placeholder="Describe your key responsibilities and achievements..."
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                onClick={addExperience}
              >
                Save
              </button>
              <button
                type="button"
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                onClick={resetForm}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {experience.length === 0 && !isAdding && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-blue-700">
            Click the "Add Experience" button to start adding your work experience.
          </p>
        </div>
      )}

      <div className="space-y-4">
        {experience.map((exp, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div
              className="p-4 cursor-pointer flex items-center justify-between hover:bg-gray-50"
              onClick={() => toggleExpand(index)}
            >
              <div className="flex-1">
                <h3 className="font-medium">{exp.position}</h3>
                <p className="text-sm text-gray-600">{exp.company}</p>
                <p className="text-sm text-gray-500">
                  {formatDate(exp.startDate)} - {exp.isCurrentJob ? 'Present' : formatDate(exp.endDate)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteExperience(index);
                  }}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                {expandedIndex === index ? (
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                )}
              </div>
            </div>
            {expandedIndex === index && (
              <div className="px-4 pb-4 pt-2 border-t bg-gray-50">
                {exp.location && (
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Location:</strong> {exp.location}
                  </p>
                )}
                {exp.responsibilities && (
                  <div className="text-sm text-gray-600">
                    <strong>Responsibilities:</strong>
                    <p className="mt-1 whitespace-pre-line">{exp.responsibilities}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceForm;