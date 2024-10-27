import React, { useRef, useEffect } from 'react';
import { templates } from './Templates';
import html2canvas from '@nidi/html2canvas';
import { jsPDF } from 'jspdf';
import { DownloadCloud, Image, Edit } from 'lucide-react';

// A4 dimensions in pixels at 96 DPI
const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;
const MM_TO_PX = 3.7795275591;
const A4_WIDTH_PX = Math.floor(A4_WIDTH_MM * MM_TO_PX);
const A4_HEIGHT_PX = Math.floor(A4_HEIGHT_MM * MM_TO_PX);

const CvPreview = ({ personalInfo, education, experience, selectedTemplate, onEdit }) => {
  const cvPreviewRef = useRef(null);

  useEffect(() => {
    if (cvPreviewRef.current) {
      cvPreviewRef.current.style.width = `${A4_WIDTH_PX}px`;
      cvPreviewRef.current.style.height = `${A4_HEIGHT_PX}px`;
    }
  }, [personalInfo, education, experience, selectedTemplate]);

  const generatePDF = async () => {
    if (!cvPreviewRef.current) return;

    try {
      await document.fonts.ready;
      
      const canvas = await html2canvas(cvPreviewRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        width: A4_WIDTH_PX,
        height: A4_HEIGHT_PX,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      pdf.addImage(imgData, 'PNG', 0, 0, A4_WIDTH_MM, A4_HEIGHT_MM);
      pdf.save(`${personalInfo.name || 'cv'}_resume.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const handleJpgDownload = async () => {
    if (!cvPreviewRef.current) return;

    try {
      await document.fonts.ready;
      
      const canvas = await html2canvas(cvPreviewRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        width: A4_WIDTH_PX,
        height: A4_HEIGHT_PX,
        backgroundColor: '#ffffff'
      });

      const jpgUrl = canvas.toDataURL('image/jpeg', 1.0);
      const link = document.createElement('a');
      link.download = `${personalInfo.name || 'cv'}_resume.jpg`;
      link.href = jpgUrl;
      link.click();
    } catch (error) {
      console.error('Error generating JPG:', error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="overflow-auto max-h-[80vh] mb-4 p-4 bg-gray-100 w-full">
        <div
          ref={cvPreviewRef}
          className="cv-preview shadow-lg bg-white mx-auto"
          style={{
            width: `${A4_WIDTH_PX}px`,
            height: `${A4_HEIGHT_PX}px`,
            overflow: 'hidden',
            position: 'relative',
            textRendering: 'optimizeLegibility',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            transform: 'scale(1)',
            transformOrigin: 'top left'
          }}
        >
          <style>
            {`
              @media print {
                .cv-preview {
                  width: 210mm !important;
                  height: 297mm !important;
                }
              }
              ${templates[selectedTemplate].styles}
            `}
          </style>
          <div
            className="w-full h-full relative"
            dangerouslySetInnerHTML={{
              __html: templates[selectedTemplate].html({ personalInfo, education, experience })
            }}
          />
        </div>
      </div>

      <div className="w-full max-w-md space-y-3">
        <button 
          onClick={onEdit}
          className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition-colors duration-200"
        >
          <Edit className="w-5 h-5" />
          Edit CV
        </button>
        
        <div className="flex gap-3">
          <button 
            onClick={generatePDF}
            className="flex-1 flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-md transition-colors duration-200"
          >
            <DownloadCloud className="w-5 h-5" />
            Download PDF
          </button>
          
          <button 
            onClick={handleJpgDownload}
            className="flex-1 flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-md transition-colors duration-200"
          >
            <Image className="w-5 h-5" />
            Download JPG
          </button>
        </div>
      </div>
    </div>
  );
};

export default CvPreview;