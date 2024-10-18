import { jsPDF } from "jspdf";
import "jspdf-autotable";

export const generatePDF = (personalInfo, education, experience, selectedTemplate) => {
  const doc = new jsPDF();

  // Add font
  doc.setFont("helvetica", "normal");

  // Add photo if available
  if (personalInfo.photo) {
    try {
      doc.addImage(personalInfo.photo, 'JPEG', 20, 20, 30, 30);
    } catch (error) {
      console.error("Error adding image to PDF:", error);
    }
  }

  // Header
  doc.setFontSize(24);
  doc.text(personalInfo.name, 105, 30, { align: "center" });
  
  doc.setFontSize(10);
  doc.text(`${personalInfo.email} | ${personalInfo.phone}`, 105, 40, { align: "center" });
  doc.text(personalInfo.address, 105, 45, { align: "center" });

  // Education
  doc.setFontSize(16);
  doc.text("Education", 20, 60);

  let yPos = 70;
  education.forEach(edu => {
    doc.setFontSize(12);
    doc.text(`${edu.institution} - ${edu.degree}`, 20, yPos);
    doc.setFontSize(10);
    doc.text(`${edu.startDate} to ${edu.endDate} - ${edu.location}`, 20, yPos + 5);
    yPos += 15;
  });

  // Experience
  doc.setFontSize(16);
  doc.text("Experience", 20, yPos + 10);

  yPos += 20;
  experience.forEach(exp => {
    doc.setFontSize(12);
    doc.text(`${exp.position} at ${exp.company}`, 20, yPos);
    doc.setFontSize(10);
    doc.text(`${exp.startDate} to ${exp.endDate} - ${exp.location}`, 20, yPos + 5);
    
    const responsibilities = doc.splitTextToSize(`Responsibilities: ${exp.responsibilities}`, 170);
    doc.text(responsibilities, 20, yPos + 10);
    
    yPos += 20 + (responsibilities.length * 5);
  });

  doc.save("cv.pdf");
};