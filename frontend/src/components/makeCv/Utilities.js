import { jsPDF } from "jspdf";
import "jspdf-autotable";

export const generatePDF = (personalInfo, education, experience, selectedTemplate) => {
  const doc = new jsPDF();
  
  // Add font
  doc.addFont('https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf', 'Roboto', 'normal');
  doc.setFont('Roboto');
  
  const maxWidth = 170;
  let yPos = 20;
  
  const addSection = (title, content) => {
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 255);
    
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    
    doc.text(title, 20, yPos);
    yPos += 10;
    
    doc.setFontSize(12);
    doc.setTextColor(0);
    
    content.forEach(item => {
      const lines = doc.splitTextToSize(item, maxWidth);
      
      if (yPos + (lines.length * 7) > 280) {
        doc.addPage();
        yPos = 20;
      }
      
      doc.text(lines, 20, yPos);
      yPos += lines.length * 7 + 5;
    });
    
    yPos += 10;
  };
  
  // Header
  doc.setFontSize(24);
  doc.setTextColor(0, 0, 100);
  doc.text(personalInfo.name, 105, yPos, { align: "center" });
  yPos += 10;
  
  doc.setFontSize(12);
  doc.setTextColor(100);
  const contactInfo = `${personalInfo.email} | ${personalInfo.phone}`;
  const contactLines = doc.splitTextToSize(contactInfo, maxWidth);
  doc.text(contactLines, 105, yPos, { align: "center" });
  yPos += contactLines.length * 7 + 5;
  
  const addressLines = doc.splitTextToSize(personalInfo.address, maxWidth);
  doc.text(addressLines, 105, yPos, { align: "center" });
  yPos += addressLines.length * 7 + 15;
  
  // Add photo if available
  if (personalInfo.photo) {
    try {
      doc.addImage(personalInfo.photo, 'JPEG', 20, 20, 30, 30);
    } catch (error) {
      console.error("Error adding image to PDF:", error);
    }
  }
  
  // Education
  const eduContent = education.map(edu => 
    `${edu.institution} - ${edu.degree}\n${edu.startDate} to ${edu.endDate} - ${edu.location}`
  );
  addSection("Education", eduContent);
  
  // Experience
  const expContent = experience.map(exp => 
    `${exp.position} at ${exp.company}\n${exp.startDate} to ${exp.endDate} - ${exp.location}\n\nResponsibilities: ${exp.responsibilities}`
  );
  addSection("Experience", expContent);
  
  doc.save("cv.pdf");
};