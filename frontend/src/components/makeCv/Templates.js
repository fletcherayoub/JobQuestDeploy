export const templates = {
  classic: {
    styles: `
      .cv-container {
        font-family: Arial, sans-serif;
        max-width: 800px;
        margin: 0 auto;
        padding: 40px;
        display: grid;
        grid-template-columns: 280px 1fr;
        gap: 40px;
        background: white;
      }

      .cv-header {
        grid-column: 1 / -1;
        display: grid;
        grid-template-columns: 150px 1fr;
        gap: 30px;
        align-items: center;
        margin-bottom: 40px;
      }

      .cv-photo-container {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        overflow: hidden;
        border: 2px solid #000;
      }

      .cv-photo {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .cv-title-section {
        border-bottom: 2px solid #000;
      }

      .cv-name {
        font-size: 32px;
        font-weight: bold;
        margin-bottom: 5px;
      }

      .cv-position {
        font-size: 20px;
        margin-bottom: 15px;
      }

      .cv-left-column {
        padding-right: 20px;
      }

      .cv-section {
        margin-bottom: 30px;
      }

      .cv-section-title {
        text-transform: uppercase;
        font-size: 16px;
        font-weight: bold;
        letter-spacing: 1px;
        margin-bottom: 15px;
        padding-bottom: 5px;
        border-bottom: 2px solid #000;
      }

      .cv-contact-item {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-bottom: 8px;
        text-align: right;
      }

      .cv-skill, .cv-language {
        text-align: right;
        margin-bottom: 8px;
      }

      .cv-language-level {
        color: #666;
        font-size: 14px;
      }

      .cv-education-item, .cv-experience-item {
        margin-bottom: 25px;
      }

      .cv-item-title {
        font-weight: bold;
        font-size: 16px;
        margin-bottom: 5px;
      }

      .cv-item-subtitle {
        font-style: italic;
        margin-bottom: 5px;
      }

      .cv-item-date {
        color: #666;
        margin-bottom: 8px;
      }

      .cv-item-description {
        font-size: 14px;
        line-height: 1.6;
      }

      .cv-interests {
        text-align: right;
      }

      .cv-interest-item {
        margin-bottom: 8px;
      }
    `,
    html: (data) => `
      <div class="cv-container">
        <div class="cv-header">
          <div class="cv-photo-container">
            <img src="${data.personalInfo.photo || '/api/placeholder/150/150'}" alt="Profile Photo" class="cv-photo">
          </div>
          <div class="cv-title-section">
            <h1 class="cv-name">${data.personalInfo.name}</h1>
            <div class="cv-position">${data.personalInfo.profile || 'Professional Title'}</div>
          </div>
        </div>

        <div class="cv-left-column">
          <div class="cv-section">
            <h2 class="cv-section-title">Contact</h2>
            <div class="cv-contact-item">${data.personalInfo.phone}</div>
            <div class="cv-contact-item">${data.personalInfo.email}</div>
            <div class="cv-contact-item">${data.personalInfo.address}</div>
          </div>

          <div class="cv-section">
            <h2 class="cv-section-title">Compétences</h2>
            ${(data.skills || []).map(skill => `
              <div class="cv-skill">${skill}</div>
            `).join('')}
          </div>

          <div class="cv-section">
            <h2 class="cv-section-title">Langues</h2>
            ${(data.languages || []).map(lang => `
              <div class="cv-language">
                ${typeof lang === 'string' ? lang : `
                  ${lang.name} 
                  ${lang.level ? `<span class="cv-language-level">- ${lang.level}</span>` : ''}
                `}
              </div>
            `).join('')}
          </div>

          <div class="cv-section">
            <h2 class="cv-section-title">Centres d'Intérêt</h2>
            <div class="cv-interests">
              ${(data.hobbies || []).map(hobby => `
                <div class="cv-interest-item">${hobby}</div>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="cv-right-column">
          <div class="cv-section">
            <h2 class="cv-section-title">Formation</h2>
            ${data.education.map(edu => `
              <div class="cv-education-item">
                <div class="cv-item-title">${edu.degree}</div>
                <div class="cv-item-subtitle">${edu.institution}</div>
                <div class="cv-item-date">${edu.startDate} - ${edu.endDate}</div>
                ${edu.description ? `<div class="cv-item-description">${edu.description}</div>` : ''}
              </div>
            `).join('')}
          </div>

          <div class="cv-section">
            <h2 class="cv-section-title">Expériences Professionnelles</h2>
            ${data.experience.map(exp => `
              <div class="cv-experience-item">
                <div class="cv-item-title">${exp.position}</div>
                <div class="cv-item-subtitle">${exp.company}</div>
                <div class="cv-item-date">${exp.startDate} - ${exp.endDate}</div>
                <div class="cv-item-description">${exp.responsibilities}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `
  },
    simple: {
      styles: `
        .cv-container {
          font-family: Arial, 'Helvetica Neue', sans-serif; /* Using web-safe fonts */
          max-width: 800px;
          margin: 0 auto;
          padding: 40px;
          background-color: #fff;
          color: #222;
          line-height: 1.5;
          -webkit-font-smoothing: antialiased; /* Better font rendering */
          -moz-osx-font-smoothing: grayscale;
        }
        .cv-header {
          text-align: center;
          margin-bottom: 30px;
          border-bottom: 2px dashed #222;
          padding-bottom: 20px;
        }
        .cv-name {
          font-size: 28px;
          margin-bottom: 10px;
          letter-spacing: 2px;
          line-height: normal; /* Explicit line height */
        }
        .cv-contact {
          font-size: 14px;
          line-height: 1.6; /* Explicit line height */
        }
        .cv-section {
          margin-bottom: 25px;
        }
        .cv-section-title {
          font-size: 18px;
          margin-bottom: 15px;
          text-transform: uppercase;
          letter-spacing: 3px;
          border-left: 4px solid #222;
          padding-left: 10px;
          line-height: 1.4; /* Explicit line height */
        }
        .cv-item {
          margin-bottom: 15px;
          padding-left: 20px;
        }
        .cv-item-title {
          font-weight: bold;
          line-height: 1.4; /* Explicit line height */
        }
        .cv-item-subtitle {
          font-style: italic;
          line-height: 1.4; /* Explicit line height */
        }
        .cv-item-detail {
          margin-top: 5px;
          line-height: 1.4; /* Explicit line height */
        }
      `,
      html: (data) => `
        <div class="cv-container">
          <div class="cv-header">
            <div class="cv-name">${data.personalInfo.name}</div>
            <div class="cv-contact">
              ${data.personalInfo.email} | ${data.personalInfo.phone}<br>
              ${data.personalInfo.address}
            </div>
          </div>
          <div class="cv-section">
              <div class="cv-section-title">About Me</div>
              <p>${data.personalInfo.profile || 'Write a brief professional summary here.'}</p>
            </div>
          <div class="cv-section">
            <div class="cv-section-title">Education</div>
            ${data.education.map(edu => `
              <div class="cv-item">
                <div class="cv-item-title">${edu.institution}</div>
                <div class="cv-item-subtitle">${edu.degree}</div>
                <div class="cv-item-detail">${edu.startDate} - ${edu.endDate}</div>
                <div class="cv-item-detail">${edu.location}</div>
              </div>
            `).join('')}
          </div>
  
          <div class="cv-section">
            <div class="cv-section-title">Experience</div>
            ${data.experience.map(exp => `
              <div class="cv-item">
                <div class="cv-item-title">${exp.position}</div>
                <div class="cv-item-subtitle">${exp.company}</div>
                <div class="cv-item-detail">${exp.startDate} - ${exp.endDate}</div>
                <div class="cv-item-detail">${exp.location}</div>
                <div class="cv-item-detail">${exp.responsibilities}</div>
              </div>
            `).join('')}
          </div>
  
          ${data.skills ? `
            <div class="cv-section">
              <div class="cv-section-title">Skills</div>
              <div class="cv-item">
                ${data.skills.join(' • ')}
              </div>
            </div>
          ` : ''}
        </div>
      `
    },
    modern: {
      styles: `
        .cv-container {
          font-family: Arial, sans-serif;
          max-width: 800px;
          margin: 0 auto;
          padding: 40px;
          color: #333;
        }
  
        .cv-header {
          display: grid;
          grid-template-columns: 150px 1fr;
          gap: 30px;
          margin-bottom: 40px;
          align-items: center;
        }
  
        .cv-photo {
          width: 150px;
          height: 150px;
          border-radius: 5px;
          object-fit: cover;
        }
  
        .cv-title-section {
          border-bottom: 2px solid #0077b6;
        }
  
        .cv-name {
          font-size: 48px;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin: 0;
          color: #333;
        }
  
        .cv-position {
          font-size: 24px;
          color: #0077b6;
          margin: 10px 0 20px 0;
        }
  
        .cv-main {
          display: grid;
          grid-template-columns: 250px 1fr;
          gap: 40px;
        }
  
        .cv-left-column {
          padding-right: 20px;
        }
  
        .cv-section {
          margin-bottom: 30px;
        }
  
        .cv-section-title {
          text-transform: uppercase;
          font-weight: bold;
          margin-bottom: 15px;
          color: #333;
        }
  
        .cv-contact-item {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
          font-size: 14px;
        }
  
        .cv-contact-icon {
          width: 20px;
          height: 20px;
          margin-right: 10px;
        }
  
        .cv-skills-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
  
        .cv-skill-item {
          display: flex;
          align-items: center;
        }
  
        .cv-skill-dots {
          display: flex;
          gap: 5px;
          margin-left: 10px;
        }
  
        .cv-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: #0077b6;
        }
  
        .cv-dot.empty {
          background-color: #e0e0e0;
        }
  
        .cv-languages-bar {
          height: 8px;
          background-color: #0077b6;
          margin-top: 5px;
          border-radius: 4px;
        }
  
        .cv-experience-item {
          margin-bottom: 25px;
          position: relative;
          padding-left: 20px;
        }
  
        .cv-experience-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 8px;
          width: 12px;
          height: 12px;
          background-color: #0077b6;
          border-radius: 50%;
        }
  
        .cv-experience-date {
          color: #0077b6;
          font-size: 14px;
          margin-bottom: 5px;
        }
  
        .cv-experience-title {
          font-weight: bold;
          margin-bottom: 5px;
        }
  
        .cv-experience-company {
          font-style: italic;
          margin-bottom: 5px;
        }
  
        .cv-education-item {
          margin-bottom: 20px;
        }
  
        .cv-interests {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
        }
      `,
      html: (data) => `
        <div class="cv-container">
          <div class="cv-header">
            <img src="${data.personalInfo.photo || '/api/placeholder/150/150'}" alt="Profile Photo" class="cv-photo">
            <div class="cv-title-section">
              <h3 class="cv-name">${data.personalInfo.name}</h3>
              <div class="cv-position">${data.personalInfo.title || data.personalInfo.profile}</div>
            </div>
          </div>
  
          <div class="cv-main">
            <div class="cv-left-column">
              <div class="cv-section">
                <h4 class="cv-section-title">Contact</h4>
                <div class="cv-contact-item">
                  <span>${data.personalInfo.email}</span>
                </div>
                <div class="cv-contact-item">
                  <span>${data.personalInfo.phone}</span>
                </div>
                <div class="cv-contact-item">
                  <span>${data.personalInfo.address}</span>
                </div>
              </div>
  
              <div class="cv-section">
                <h4 class="cv-section-title">Logiciels & Compétences</h4>
                <div class="cv-skills-list">
                  ${(data.skills || []).map(skill => `
                    <div class="cv-skill-item">
                      <span>${skill}</span>
                      <div class="cv-skill-dots">
                        ${Array(5).fill().map((_, i) => `
                          <div class="cv-dot ${i < 4 ? '' : 'empty'}"></div>
                        `).join('')}
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
  
              <div class="cv-section">
                <h4 class="cv-section-title">Langues</h4>
                ${(data.languages || []).map(lang => {
                  const level = typeof lang === 'string' ? 80 : (parseInt(lang.level) || 80);
                  return `
                    <div class="cv-language-item">
                      <div>${typeof lang === 'string' ? lang : lang.name}</div>
                      <div class="cv-languages-bar" style="width: ${level}%"></div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
  
            <div class="cv-right-column">
              <div class="cv-section">
                <h4 class="cv-section-title">Profil</h4>
                <p>${data.personalInfo.profile}</p>
              </div>
  
              <div class="cv-section">
                <h4 class="cv-section-title">Expériences</h4>
                ${data.experience.map(exp => `
                  <div class="cv-experience-item">
                    <div class="cv-experience-date">${exp.startDate} - ${exp.endDate}</div>
                    <div class="cv-experience-title">${exp.position}</div>
                    <div class="cv-experience-company">${exp.company}</div>
                    <div>${exp.responsibilities}</div>
                  </div>
                `).join('')}
              </div>
  
              <div class="cv-section">
                <h4 class="cv-section-title">Formation</h4>
                ${data.education.map(edu => `
                  <div class="cv-education-item">
                    <div class="cv-experience-date">${edu.startDate} - ${edu.endDate}</div>
                    <div class="cv-experience-title">${edu.degree}</div>
                    <div class="cv-experience-company">${edu.institution}</div>
                  </div>
                `).join('')}
              </div>
  
              ${data.hobbies ? `
                <div class="cv-section">
                  <h4 class="cv-section-title">Centres d'Intérêt</h4>
                  <div class="cv-interests">
                    ${data.hobbies.map(hobby => `
                      <div class="cv-interest-item">${hobby}</div>
                    `).join('')}
                  </div>
                </div>
              ` : ''}
            </div>
          </div>
        </div>
      `
    },
    professional: {
      styles: `
        @page { size: A4; margin: 0; }
        .cv-container { font-family: 'Arial', sans-serif; width: 210mm; height: 297mm; margin: 0; display: flex; }
        .cv-sidebar { background-color: #0077be; color: white; padding: 10mm; width: 70mm; height: 297mm; }
        .cv-main { background-color: #f0f0f0; padding: 10mm; width: 140mm; height: 297mm; }
        .cv-photo { width: 50mm; height: 50mm; border-radius: 50%; object-fit: cover; margin: 0 auto 5mm; display: block; }
        .cv-name { font-size: 7mm; font-weight: bold; text-align: center; margin-bottom: 5mm; }
        .cv-section { margin-bottom: 8mm; }
        .cv-section-title { background-color: #d3d3d3; padding: 2mm 3mm; font-size: 5mm; font-weight: bold; margin-bottom: 3mm; }
        .cv-item { margin-bottom: 5mm; }
        .cv-item-title { font-weight: bold; font-size: 4.5mm; }
        .cv-item-subtitle { font-style: italic; font-size: 4mm; }
        .cv-contact-item { display: flex; align-items: center; margin-bottom: 3mm; font-size: 3.5mm; }
        .cv-contact-icon { width: 5mm; height: 5mm; margin-right: 3mm; fill: white; }
        .cv-hobbies { display: flex; justify-content: space-around; }
        .cv-hobby-icon { width: 8mm; height: 8mm; }
        p { font-size: 3.5mm; line-height: 1.4; }
      `,
      html: (data) => `
        <div class="cv-container">
          <div class="cv-sidebar">
            <img src="${data.personalInfo.photo || '/api/placeholder/150/150'}" alt="Profile Photo" class="cv-photo">
            <h1 class="cv-name">${data.personalInfo.name}</h1>
            <div class="cv-section">
              <h2 class="cv-section-title">CONTACT</h2>
              <div class="cv-contact-item">
                <svg class="cv-contact-icon" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <span>${data.personalInfo.phone}</span>
              </div>
              <div class="cv-contact-item">
                <svg class="cv-contact-icon" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <span>${data.personalInfo.email}</span>
              </div>
              <div class="cv-contact-item">
                <svg class="cv-contact-icon" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span>${data.personalInfo.address}</span>
              </div>
              <div class="cv-contact-item">
                <svg class="cv-contact-icon" viewBox="0 0 24 24">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"/>
                </svg>
                <span>${data.personalInfo.website || 'yourwebsite.com'}</span>
              </div>
            </div>
            <div class="cv-section">
              <h2 class="cv-section-title">HOBBIES</h2>
              <div class="cv-hobbies">
                <svg class="cv-hobby-icon" viewBox="0 0 24 24">
                  <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z"/>
                  <path d="M12 8v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
                </svg>
                <svg class="cv-hobby-icon" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <svg class="cv-hobby-icon" viewBox="0 0 24 24">
                  <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H3V8h18v8zM6 15h2v-2h2v-2H8V9H6v2H4v2h2z"/>
                  <circle cx="14.5" cy="13.5" r="1.5"/>
                  <circle cx="18.5" cy="10.5" r="1.5"/>
                </svg>
              </div>
            </div>
          </div>
          <div class="cv-main">
            <div class="cv-section">
              <h2 class="cv-section-title">PROFILE</h2>
              <p>${data.personalInfo.profile || 'Write down a professional summary or a resume objective.'}</p>
            </div>
            <div class="cv-section">
              <h2 class="cv-section-title">EDUCATION</h2>
              ${data.education.map(edu => `
                <div class="cv-item">
                  <div class="cv-item-title">${edu.institution}</div>
                  <div class="cv-item-subtitle">${edu.degree}</div>
                  <div>${edu.startDate} - ${edu.endDate}</div>
                  <div>${edu.location}</div>
                  <div>${edu.description || ''}</div>
                </div>
              `).join('')}
            </div>
            <div class="cv-section">
              <h2 class="cv-section-title">EXPERIENCE</h2>
              ${data.experience.map(exp => `
                <div class="cv-item">
                  <div class="cv-item-title">${exp.company}</div>
                  <div class="cv-item-subtitle">${exp.position}</div>
                  <div>${exp.startDate} - ${exp.endDate}</div>
                  <div>${exp.location}</div>
                  <div>${exp.responsibilities}</div>
                </div>
              `).join('')}
            </div>
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
    },
    business: {
      styles: `
        .cv-container { font-family: 'Segoe UI', 'Helvetica', sans-serif; max-width: 800px; margin: 0 auto; display: flex; background-color: #f5f5f5; color: #333; line-height: 1.6; }
        .cv-main { flex: 2; padding: 40px; background-color: white; }
        .cv-sidebar { flex: 1; padding: 40px; background-color: #2c3e50; color: #ecf0f1; }
        .cv-header { margin-bottom: 30px; }
        .cv-name { font-size: 36px; font-weight: 700; margin-bottom: 5px; color: #2c3e50; }
        .cv-title { font-size: 20px; color: #7f8c8d; font-weight: 300; }
        .cv-section { margin-bottom: 30px; }
        .cv-section-title { font-size: 24px; font-weight: 600; margin-bottom: 15px; text-transform: uppercase; color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 5px; }
        .cv-job { margin-bottom: 20px; }
        .cv-job-title { font-weight: 600; font-size: 18px; color: #2980b9; }
        .cv-job-company, .cv-job-date { color: #7f8c8d; font-size: 16px; }
        .cv-job p { margin-top: 10px; font-size: 16px; }
        .cv-photo { width: 150px; height: 150px; border-radius: 50%; object-fit: cover; margin-bottom: 30px; border: 3px solid #ecf0f1; }
        .cv-contact-item { display: flex; align-items: center; margin-bottom: 15px; font-size: 16px; }
        .cv-contact-icon { width: 20px; height: 20px; margin-right: 15px; fill: #ecf0f1; }
        .cv-skills-item, .cv-language-item, .cv-hobby-item { margin-bottom: 10px; font-size: 16px; }
        .cv-sidebar .cv-section-title { color: #ecf0f1; border-bottom-color: #3498db; }
        p { font-size: 16px; margin-bottom: 10px; }
      `,
      html: (data) => `
        <div class="cv-container">
          <div class="cv-main">
            <div class="cv-header">
              <h1 class="cv-name">${data.personalInfo.name}</h1>
              <div class="cv-title">${data.personalInfo.title || 'Professional Title'}</div>
            </div>
            <div class="cv-section">
              <h2 class="cv-section-title">About Me</h2>
              <p>${data.personalInfo.profile || 'Write a brief professional summary here.'}</p>
            </div>
            <div class="cv-section">
              <h2 class="cv-section-title">Job Experience</h2>
              ${data.experience.map(job => `
                <div class="cv-job">
                  <div class="cv-job-title">${job.position}</div>
                  <div class="cv-job-company">${job.company}</div>
                  <div class="cv-job-date">${job.startDate} - ${job.endDate}</div>
                  <p>${job.responsibilities}</p>
                </div>
              `).join('')}
            </div>
            <div class="cv-section">
              <h2 class="cv-section-title">Education</h2>
              ${data.education.map(edu => `
                <div class="cv-job">
                  <div class="cv-job-title">${edu.degree}</div>
                  <div class="cv-job-company">${edu.institution}</div>
                  <div class="cv-job-date">${edu.startDate} - ${edu.endDate}</div>
                </div>
              `).join('')}
            </div>
          </div>
          <div class="cv-sidebar">
            <img src="${data.personalInfo.photo || '/api/placeholder/150/150'}" alt="Profile Photo" class="cv-photo">
            <div class="cv-section">
              <h2 class="cv-section-title">Contact Me</h2>
              <div class="cv-contact-item">
                <svg class="cv-contact-icon" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <span>${data.personalInfo.phone}</span>
              </div>
              <div class="cv-contact-item">
                <svg class="cv-contact-icon" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <span>${data.personalInfo.email}</span>
              </div>
              <div class="cv-contact-item">
                <svg class="cv-contact-icon" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span>${data.personalInfo.address}</span>
              </div>
            </div>
            <div class="cv-section">
              <h2 class="cv-section-title">Skills</h2>
              ${(data.skills || ['Skill 1', 'Skill 2', 'Skill 3']).map(skill => `
                <div class="cv-skills-item">${skill}</div>
              `).join('')}
            </div>
            <div class="cv-section">
              <h2 class="cv-section-title">Languages</h2>
              ${(data.languages || ['Language 1', 'Language 2']).map(lang => `
                <div class="cv-language-item">${lang}</div>
              `).join('')}
            </div>
            <div class="cv-section">
              <h2 class="cv-section-title">Hobbies</h2>
              ${(data.hobbies || ['Hobby 1', 'Hobby 2', 'Hobby 3']).map(hobby => `
                <div class="cv-hobby-item">${hobby}</div>
              `).join('')}
            </div>
          </div>
        </div>
      `
    },
    QuestOne: {
    styles: `
      .cv-container {
        font-family: Arial, sans-serif;
        max-width: 800px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 250px 1fr;
        gap: 40px;
        padding: 40px;
        background: white;
      }
      .cv-left-column {
        padding-right: 20px;
      }
      .cv-right-column {
        border-left: 1px solid #eee;
        padding-left: 40px;
      }
      .cv-photo {
        width: 130px;
        height: 130px;
        border-radius: 50%;
        object-fit: cover;
        margin-bottom: 30px;
      }
      .cv-name {
        font-size: 32px;
        font-weight: bold;
        margin-bottom: 5px;
        letter-spacing: 0.5px;
      }
      .cv-title {
        font-size: 18px;
        color: #333;
        margin-bottom: 30px;
        font-weight: normal;
      }
      .cv-contact {
        margin-bottom: 30px;
      }
      .cv-contact-item {
        margin-bottom: 8px;
        font-size: 14px;
        color: #333;
      }
      .cv-section {
        margin-bottom: 30px;
      }
      .cv-section-title {
        text-transform: uppercase;
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 15px;
        letter-spacing: 1px;
      }
      .cv-skill, .cv-language {
        margin-bottom: 8px;
        font-size: 14px;
      }
      .cv-language-level {
        color: #666;
        font-size: 13px;
      }
      .cv-education-item, .cv-experience-item {
        margin-bottom: 25px;
      }
      .cv-item-title {
        font-weight: bold;
        font-size: 16px;
        margin-bottom: 5px;
      }
      .cv-item-subtitle {
        font-size: 14px;
        margin-bottom: 5px;
      }
      .cv-item-date {
        font-size: 14px;
        color: #666;
        margin-bottom: 8px;
      }
      .cv-item-description {
        font-size: 14px;
        line-height: 1.6;
        color: #333;
      }
      .cv-profile {
        font-size: 14px;
        line-height: 1.6;
        color: #333;
        margin-bottom: 30px;
      }
    `,
    html: (data) => `
      <div class="cv-container">
        <div class="cv-left-column">
          <img src="${data.personalInfo.photo || '/api/placeholder/130/130'}" alt="Profile Photo" class="cv-photo">
          
          <div class="cv-section">
            <h2 class="cv-section-title">Contact</h2>
            <div class="cv-contact">
              <div class="cv-contact-item">${data.personalInfo.phone}</div>
              <div class="cv-contact-item">${data.personalInfo.email}</div>
              <div class="cv-contact-item">${data.personalInfo.address}</div>
            </div>
          </div>

          <div class="cv-section">
            <h2 class="cv-section-title">Skills</h2>
            ${(data.skills || []).map(skill => `
              <div class="cv-skill">${skill}</div>
            `).join('')}
          </div>

          <div class="cv-section">
            <h2 class="cv-section-title">Languages</h2>
            ${(data.languages || []).map(lang => `
              <div class="cv-language">
                <span class="cv-language-name">${lang.name || lang}</span>
                ${lang.level ? `<span class="cv-language-level"> - ${lang.level}</span>` : ''}
              </div>
            `).join('')}
          </div>
        </div>

        <div class="cv-right-column">
          <div class="cv-name">${data.personalInfo.name}</div>
          <div class="cv-title">${data.personalInfo.title || 'HIGH SCHOOL STUDENT'}</div>

          <div class="cv-section">
            <h2 class="cv-section-title">Profile</h2>
            <div class="cv-profile">
              ${data.personalInfo.profile || ''}
            </div>
          </div>

          <div class="cv-section">
            <h2 class="cv-section-title">Education</h2>
            ${data.education.map(edu => `
              <div class="cv-education-item">
                <div class="cv-item-title">${edu.institution}</div>
                <div class="cv-item-subtitle">${edu.degree}</div>
                <div class="cv-item-date">${edu.startDate} - ${edu.endDate}</div>
                ${edu.description ? `<div class="cv-item-description">${edu.description}</div>` : ''}
              </div>
            `).join('')}
          </div>

          <div class="cv-section">
            <h2 class="cv-section-title">Experience</h2>
            ${data.experience.map(exp => `
              <div class="cv-experience-item">
                <div class="cv-item-title">${exp.position}</div>
                <div class="cv-item-subtitle">${exp.company}</div>
                <div class="cv-item-date">${exp.startDate} - ${exp.endDate}</div>
                <div class="cv-item-description">${exp.responsibilities}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `
  }
  };