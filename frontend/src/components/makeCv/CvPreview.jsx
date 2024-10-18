import React, { useRef } from 'react';
import { templates } from './Templates';
import html2canvas from 'html2canvas';

const CvPreview = ({ personalInfo, education, experience, selectedTemplate, onEdit, onDownload }) => {
  const cvPreviewRef = useRef(null);

  const handleJpgDownload = async () => {
    if (cvPreviewRef.current) {
      try {
        // Create canvas from the CV preview
        const canvas = await html2canvas(cvPreviewRef.current, {
          scale: 2, // Higher quality
          useCORS: true,
          backgroundColor: '#ffffff'
        });

        // Convert canvas to JPG and download
        const jpgUrl = canvas.toDataURL('image/jpeg', 1.0);
        const link = document.createElement('a');
        link.download = `${personalInfo.name || 'cv'}_resume.jpg`;
        link.href = jpgUrl;
        link.click();
      } catch (error) {
        console.error('Error generating JPG:', error);
      }
    }
  };

  return (
    <div>
      <div 
        ref={cvPreviewRef} 
        className="cv-preview border border-gray-300 p-5 rounded-md bg-white"
      >
        <style>{templates[selectedTemplate].styles}</style>
        <div 
          dangerouslySetInnerHTML={{ 
            __html: templates[selectedTemplate].html({
              personalInfo, 
              education, 
              experience
            }) 
          }} 
        />
      </div>

      <div className="mt-4 space-y-3">
        {/* Edit button */}
        <button
          onClick={onEdit}
          className="btn bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded-md transition-colors duration-200"
        >
          Edit CV
        </button>

        {/* Download options */}
        <div className="flex gap-3">
          <button
            onClick={onDownload}
            className="flex-1 btn bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-md transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" 
              />
            </svg>
            Download PDF
          </button>
          
          <button
            onClick={handleJpgDownload}
            className="flex-1 btn bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-md transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
            Download JPG
          </button>
        </div>
      </div>
    </div>
  );
};
// export default CvPreview;
export default CvPreview;