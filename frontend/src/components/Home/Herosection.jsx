import React from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";
import EarthCanvas from "./EarthCanvas";

const HeroSection = () => {
  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Live Job",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "91220",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "2,99,999",
      subTitle: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ];
  return (
    <>
      <div className="heroSection bg-slate-800 text-slate-50">
        <div className="container">
          <div className="title">
            <h1>Find your job </h1>
            <h1 >and ensure success</h1>
            <p>
            JobQuest designed to connect job seekers with their dream careers.
            Whether you're a recent graduate, a seasoned professional 
            looking for a change, or someone re-entering the workforce,
            our platform provides the tools and resources
            you need to find your perfect job.
            </p>
          </div>
          <div className="image">
            <EarthCanvas />
          </div>
        </div>
        <div className="details">
          {details.map((element) => {
            return (
              <div className="card " key={element.id}>
                <div className="icon">{element.icon}</div>
                <div className="content">
                  <p>{element.title}</p>
                  <p>{element.subTitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default HeroSection;