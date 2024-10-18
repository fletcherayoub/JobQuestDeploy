import React from "react";
import { FaMicrosoft, FaApple } from "react-icons/fa";
import {  SiIbm } from "react-icons/si";
import { FaAmazon } from "react-icons/fa";
import Companies from "./companies";

const PopularCompanies = () => {

  return (
    <div className="companies">
      <div className="container">
        <h3>Awesome Companies Hiring for Remote Jobs</h3>
        <div className="banner">
              
              <Companies />
              
        </div>
      </div>
    </div>
  );
};

export default PopularCompanies;