import React, { useState } from 'react';
import { PlusCircle, Trash2, ChevronDown, ChevronUp, School } from 'lucide-react';

const EducationForm = ({ education, setEducation }) => {
  const [newEducation, setNewEducation] = useState({
    institution: '',
    degree: '',
    startDate: '',
    endDate: '',
    location: '',
    description: ''
  });
  const [isAdding, setIsAdding] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const resetForm = () => {
    setNewEducation({
      institution: '',
      degree: '',
      startDate: '',
      endDate: '',
      location: '',
      description: ''
    });
    setIsAdding(false);
  };

  const addEducation = () => {
    if (!newEducation.institution || !newEducation.degree) {
      return;
    }
    setEducation([...education, newEducation]);
    resetForm();
  };

  const deleteEducation = (index) => {
    const updatedEducation = education.filter((_, i) => i !== index);
    setEducation(updatedEducation);
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
          <School className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-semibold">Education</h2>
        </div>
        {!isAdding && (
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Add Education</span>
          </button>
        )}
      </div>

      {isAdding && (
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Institution*</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={newEducation.institution}
                  onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                  placeholder="e.g. Stanford University"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Degree*</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={newEducation.degree}
                  onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                  placeholder="e.g. Bachelor of Science"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Start Date</label>
                <input
                  type="month"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={newEducation.startDate}
                  onChange={(e) => setNewEducation({ ...newEducation, startDate: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">End Date</label>
                <input
                  type="month"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={newEducation.endDate}
                  onChange={(e) => setNewEducation({ ...newEducation, endDate: e.target.value })}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Location</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={newEducation.location}
                  onChange={(e) => setNewEducation({ ...newEducation, location: e.target.value })}
                  placeholder="e.g. Stanford, CA"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                  value={newEducation.description}
                  onChange={(e) => setNewEducation({ ...newEducation, description: e.target.value })}
                  placeholder="Add relevant coursework, achievements, etc."
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                onClick={addEducation}
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

      {education.length === 0 && !isAdding && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-blue-700">
            Click the "Add Education" button to start adding your educational background.
          </p>
        </div>
      )}

      <div className="space-y-4">
        {education.map((edu, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div
              className="p-4 cursor-pointer flex items-center justify-between hover:bg-gray-50"
              onClick={() => toggleExpand(index)}
            >
              <div className="flex-1">
                <h3 className="font-medium">{edu.institution}</h3>
                <p className="text-sm text-gray-600">{edu.degree}</p>
                <p className="text-sm text-gray-500">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteEducation(index);
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
                {edu.location && (
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Location:</strong> {edu.location}
                  </p>
                )}
                {edu.description && (
                  <p className="text-sm text-gray-600">
                    <strong>Description:</strong> {edu.description}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationForm;