// src/Companies.js
import React from 'react';

const companies = [
  { name: 'Spotify', logo: 'spotify-logo.png' },
  { name: 'Netflix', logo: 'netflix-logo.png' },
  { name: 'Dropbox', logo: 'dropbox-logo.png' },
  { name: 'Peloton', logo: 'peloton-logo.png' },
  { name: 'CVS Health', logo: 'cvs-health-logo.png' },
  { name: 'ModSquad', logo: 'modsquad-logo.png' },
  { name: 'DoorDash', logo: 'doordash-logo.png' },
  { name: 'UnitedHealth Group', logo: 'unitedhealth-group-logo.png' },
  { name: 'HubSpot', logo: 'hubspot-logo.png' },
  { name: 'Pearson', logo: 'pearson-logo.png' },
  { name: 'American Red Cross', logo: 'american-red-cross-logo.png' },
  { name: 'Citizens Bank', logo: 'citizens-bank-logo.png' },
  { name: 'Progressive', logo: 'progressive-logo.png' },
  { name: 'Lyft', logo: 'lyft-logo.png' },
  { name: 'Kaplan', logo: 'kaplan-logo.png' },
  { name: 'Toast', logo: 'toast-logo.png' },
  { name: 'Reddit', logo: 'reddit-logo.png' },
  { name: 'DocuSign', logo: 'docusign-logo.png' },
];

const Companies = () => {
  return (
    <div className="flex flex-col mx-auto justify-center items-center">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full max-w-5xl px-2">
        {companies.map((company, index) => (
          <div key={index} className="bg-white p-3 rounded-lg shadow-md flex justify-center items-center">
            <img src={company.logo} alt={company.name} className="max-h-12" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Companies;
