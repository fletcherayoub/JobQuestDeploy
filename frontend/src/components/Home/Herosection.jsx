import React from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";
import { Briefcase, Sparkles, ArrowRight } from "lucide-react";
import { NavLink } from "react-router-dom";
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
          <div className="title overflow-clip">
            <h1 className="overflow-clip">Find your job </h1>
            <h1 className="overflow-clip">and ensure success</h1>
            <p className="overflow-clip">
            JobQuest designed to connect job seekers with their dream careers.
            Whether you're a recent graduate, a seasoned professional 
            looking for a change, or someone re-entering the workforce,
            our platform provides the tools and resources
            you need to find your perfect job.
            </p>
            <div className="mt-8 flex justify-center overflow-hidden">
            <NavLink
                  to="/job/getall"
                  className={({ isActive }) =>
                    `group relative inline-flex items-center gap-4 
                    px-8 py-4 rounded-xl text-lg font-semibold
                    ${isActive 
                      ? 'bg-teal-600 text-white' 
                      : 'bg-teal-600 hover:bg-teal-700 text-white'
                    }
                    transition-all duration-300
                    shadow-[0_0_20px_rgba(20,184,166,0.3)]
                    hover:shadow-[0_0_25px_rgba(20,184,166,0.4)]`
                  }
                >
                  <Briefcase className="w-5 h-5" />
                  <span>Explore Jobs</span>
                  <ArrowRight className="w-5 h-5 transform transition-transform group-hover:translate-x-1" />
                </NavLink>
            </div>
          </div>
          <div className="image">
            <EarthCanvas />
          </div>
        </div>
        <div className="details">
          {details.map((element) => {
            return (
              <div className="card" key={element.id}>
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