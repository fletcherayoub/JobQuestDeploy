export const templates = {
    classic: {
      styles: `
        .cv-container { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        .cv-header { text-align: center; margin-bottom: 20px; }
        .cv-section { margin-bottom: 20px; }
        .cv-section-title { font-size: 18px; border-bottom: 1px solid #333; margin-bottom: 10px; }
      `,
      html: (data) => `
        <div class="cv-container">
          <div class="cv-header">
            <h1>${data.personalInfo.name}</h1>
            <p>${data.personalInfo.email} | ${data.personalInfo.phone}</p>
            <p>${data.personalInfo.address}</p>
          </div>
          <div class="cv-section">
            <h2 class="cv-section-title">Education</h2>
            ${data.education.map(edu => `
              <p>${edu.institution} - ${edu.degree}</p>
              <p>${edu.startDate} to ${edu.endDate} - ${edu.location}</p>
            `).join('')}
          </div>
          <div class="cv-section">
            <h2 class="cv-section-title">Experience</h2>
            ${data.experience.map(exp => `
              <p>${exp.position} at ${exp.company}</p>
              <p>${exp.startDate} to ${exp.endDate} - ${exp.location}</p>
              <p>Responsibilities: ${exp.responsibilities}</p>
            `).join('')}
          </div>
        </div>
      `
    },
    modern: {
      styles: `
        .cv-container { font-family: 'Helvetica', sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; background-color: #f0f0f0; }
        .cv-header { background-color: #333; color: white; padding: 20px; text-align: center; }
        .cv-section { background-color: white; margin: 20px 0; padding: 20px; border-radius: 5px; }
        .cv-section-title { font-size: 20px; color: #333; margin-bottom: 10px; }
      `,
      html: (data) => `
        <div class="cv-container">
          <div class="cv-header">
            <h1>${data.personalInfo.name}</h1>
            <p>${data.personalInfo.email} | ${data.personalInfo.phone}</p>
            <p>${data.personalInfo.address}</p>
          </div>
          <div class="cv-section">
            <h2 class="cv-section-title">Education</h2>
            ${data.education.map(edu => `
              <p><strong>${edu.institution}</strong> - ${edu.degree}</p>
              <p>${edu.startDate} to ${edu.endDate} - ${edu.location}</p>
            `).join('')}
          </div>
          <div class="cv-section">
            <h2 class="cv-section-title">Experience</h2>
            ${data.experience.map(exp => `
              <p><strong>${exp.position}</strong> at ${exp.company}</p>
              <p>${exp.startDate} to ${exp.endDate} - ${exp.location}</p>
              <p>Responsibilities: ${exp.responsibilities}</p>
            `).join('')}
          </div>
        </div>
      `
    },
    minimalist: {
      styles: `
        .cv-container { font-family: 'Georgia', serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
        .cv-header { border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
        .cv-section { margin-bottom: 20px; }
        .cv-section-title { font-size: 16px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px; }
      `,
      html: (data) => `
      <div class="cv-container">
        <div class="cv-header">
          <h1>${data.personalInfo.name}</h1>
          <p>${data.personalInfo.email} | ${data.personalInfo.phone}</p>
          <p>${data.personalInfo.address}</p>
        </div>
        <div class="cv-section">
          <h2 class="cv-section-title">Education</h2>
          ${data.education.map(edu => `
            <p>${edu.institution} - ${edu.degree}</p>
            <p>${edu.startDate} to ${edu.endDate} - ${edu.location}</p>
          `).join('<br>')}
        </div>
        <div class="cv-section">
          <h2 class="cv-section-title">Experience</h2>
          ${data.experience.map(exp => `
            <p>${exp.position} at ${exp.company}</p>
            <p>${exp.startDate} to ${exp.endDate} - ${exp.location}</p>
            <p>Responsibilities: ${exp.responsibilities}</p>
          `).join('<br>')}
        </div>
      </div>
    `
    }
  };