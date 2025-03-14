import React , {useContext} from 'react';
import { Context } from '../../main';
import { Navigate } from 'react-router-dom';
import HeroSection from './Herosection';
import HowItWorks from './HowitWorks';
import PopularCategories from './PopularCategories';
import PopularCompanies from './PopularCompanies';




const Home = () => {
  const { isAuthorized } = useContext(Context);
  const isGuest = localStorage.getItem("guest") === "true";
  if (!isAuthorized && !isGuest) {
    return <Navigate to={"/login"} />;
  }
  return (
   <section className='homePage page'>
    <HeroSection/>
    <HowItWorks/>
    <PopularCategories/>
    <PopularCompanies/>
    </section>
);
  
}

export default Home