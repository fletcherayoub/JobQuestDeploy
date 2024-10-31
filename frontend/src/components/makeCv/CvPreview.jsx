import React, { useRef, useEffect, useState } from 'react';
import { templates } from './Templates';
import html2canvas from '@nidi/html2canvas';
import { jsPDF } from 'jspdf';
import { DownloadCloud, Image, PenSquare, ArrowLeft } from 'lucide-react';

// A4 dimensions in pixels at 96 DPI
const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;
const MM_TO_PX = 3.7795275591;
const A4_WIDTH_PX = Math.floor(A4_WIDTH_MM * MM_TO_PX);
const A4_HEIGHT_PX = Math.floor(A4_HEIGHT_MM * MM_TO_PX);

const CvPreview = ({ personalInfo, education, experience, selectedTemplate, onEdit }) => {
  const cvPreviewRef = useRef(null);
  const [scale, setScale] = useState(1);

  // ... keeping all the existing useEffect and functions the same ...
  useEffect(() => {
    const updateScale = () => {
      if (window.innerWidth < 768) {
        const containerWidth = window.innerWidth - 32;
        const newScale = containerWidth / A4_WIDTH_PX;
        setScale(newScale);
      } else {
        setScale(1);
      }
    };

    if (cvPreviewRef.current) {
      cvPreviewRef.current.style.width = `${A4_WIDTH_PX}px`;
      cvPreviewRef.current.style.height = `${A4_HEIGHT_PX}px`;
    }

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [personalInfo, education, experience, selectedTemplate]);

  const generatePDF = async () => {
    if (!cvPreviewRef.current) return;
  
    try {
      await document.fonts.ready;
      const originalScrollY = window.scrollY;
      window.scrollTo(0, 0);
      const originalScale = cvPreviewRef.current.style.transform;
      cvPreviewRef.current.style.transform = 'scale(1)';
  
      const canvas = await html2canvas(cvPreviewRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        width: A4_WIDTH_PX,
        height: A4_HEIGHT_PX,
        backgroundColor: '#ffffff',
        y: cvPreviewRef.current.getBoundingClientRect().top
      });
  
      cvPreviewRef.current.style.transform = originalScale;
      window.scrollTo(0, originalScrollY);
  
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
      const originalScrollY = window.scrollY;
      window.scrollTo(0, 0);
      const originalScale = cvPreviewRef.current.style.transform;
      cvPreviewRef.current.style.transform = 'scale(1)';
  
      const canvas = await html2canvas(cvPreviewRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        width: A4_WIDTH_PX,
        height: A4_HEIGHT_PX,
        backgroundColor: '#ffffff',
        y: cvPreviewRef.current.getBoundingClientRect().top
      });
  
      cvPreviewRef.current.style.transform = originalScale;
      window.scrollTo(0, originalScrollY);
  
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
    <div className="flex flex-col">
      {/* Header with Back Button */}
      <div className="sticky top-0 z-10 bg-white border-b p-4 flex items-center justify-between" >
        <button
          onClick={onEdit}
          className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          Back to editing
        </button>
        <div className="flex gap-2">
          <button
            onClick={generatePDF}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            <DownloadCloud className="w-4 h-4" />
            <span className="hidden sm:inline">Download PDF</span>
          </button>
          <button
            onClick={handleJpgDownload}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            <Image className="w-4 h-4" />
            <span className="hidden sm:inline">Download JPG</span>
          </button>
        </div>
      </div>

      {/* CV Preview Area */}
      <div className="flex-1 overflow-auto bg-gray-50 p-4">
        <div className="flex justify-center min-h-[calc(100vh-8rem)]">
          <div
            className="relative bg-gray-100 rounded-lg p-4"
            style={{
              width: `${A4_WIDTH_PX * (window.innerWidth < 768 ? scale : 1)}px`,
              height: `${A4_HEIGHT_PX * (window.innerWidth < 768 ? scale : 1)}px`,
            }}
          >
            <div
              ref={cvPreviewRef}
              className="cv-preview shadow-xl bg-white rounded-lg"
              style={{
                width: `${A4_WIDTH_PX}px`,
                height: `${A4_HEIGHT_PX}px`,
                overflow: 'hidden',
                position: 'absolute',
                top: '1rem',
                left: '1rem',
                textRendering: 'optimizeLegibility',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                transform: `scale(${window.innerWidth < 768 ? scale : 1})`,
                transformOrigin: 'top left'
              }}
            >
              <style>
                {`
                  @media print {
                    .cv-preview {
                      width: 210mm !important;
                      height: 297mm !important;
                      transform: none !important;
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
        </div>
      </div>

      {/* Mobile Action Buttons */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4 space-y-2">
        <div className="flex gap-2">
          <button
            onClick={generatePDF}
            className="flex-1 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <DownloadCloud className="w-4 h-4" />
            PDF
          </button>
          <button
            onClick={handleJpgDownload}
            className="flex-1 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Image className="w-4 h-4" />
            JPG
          </button>
        </div>
      </div>
    </div>
  );
};

export default CvPreview;