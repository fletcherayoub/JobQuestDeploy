import React from 'react';

const Card = () => {
  const cardsData = [
    { 
      category: 'CV', 
      title: 'Create a standout CV that highlights your skills', 
      imageUrl: '../../person2.jpg' 
    },
    { 
      category: 'Find Jobs', 
      title: 'Browse through available job listings. Post job offers if you re hiring.', 
      imageUrl: '../../person4.jpg' 
    },
    { 
      category: 'Applications', 
      title: 'Get ready with resources to craft compelling resumes and cover letters tailored to each job opportunity.', 
      imageUrl: '../../person3.jpg' 
    },
    { 
      category: 'Track', 
      title: 'Submit your applications and wait for employers to reach out to you with updates and interview invitations.', 
      imageUrl: '../../person5.jpg' 
    },
  ];

  const categoryStyles = {
    CV: 'bg-blue-500 text-white',
    'Find Jobs': 'bg-yellow-500 text-white',
    Applications: 'bg-green-500 text-white',
    Track: 'bg-red-500 text-white',
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cardsData.map((card, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img src={card.imageUrl} alt={card.title} className="w-full h-48 object-cover" />
          <div className="p-4">
            <span className={`inline-block px-3 py-1 text-sm font-semibold ${categoryStyles[card.category]} rounded-full`}>
              {card.category}
            </span>
            <h3 className="mt-2 text-lg font-semibold">{card.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
