import React, {useEffect, useContext} from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route,} from "react-router-dom";
import {Context} from './main';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './components/Home/Home';
import Jobs from './components/Job/Jobs';
import JobDetails from './components/Job/JobDetails';
import MyJobs from './components/Job/MyJobs';
import PostJobs from './components/Job/PostJob';
import Application from './components/Application/Application';
import MyApplications from './components/Application/MyApplications';
import NotFound from './components/NotFound/NotFound';
import axios from 'axios';
import {Toaster} from 'react-hot-toast';
import CvMaker from './components/makeCv/CvMaker';
import BtnCvMaker from './components/makeCv/BtnCvMaker';
import LoadingScreen from './components/LoadingScreen';
import OAuthCallback from './Hooks/OAuthCallback';

const App = () => {
  const {isAuthorized, setIsAuthorized, setUser} = useContext(Context);

  useEffect(() => {


    const fetchUser = async () => {
      try {
        const response = await axios.get("https://jobquestdeploy.onrender.com/api/v1/user/getUser", {withCredentials: true });
        setUser(response.data.user);
        console.log(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setIsAuthorized(true);
      } catch (error) {
        console.error("Error fetching user:", error);
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [isAuthorized]);
  
  return (
    <>
    <Router>
    <LoadingScreen />
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/job/getall" element={<Jobs />} />
        <Route path="/job/:id" element={<JobDetails />} /> 
        <Route path="/job/me" element={<MyJobs />} />
        <Route path="/job/post" element={<PostJobs />} />
        <Route path="/application/:id" element={<Application />} />
        <Route path="/applications/me" element={<MyApplications />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/cvMaker" element={<CvMaker/>} />
        <Route path="/oauth-callback" element={<OAuthCallback/>} />
      </Routes>
      <Footer />
      <Toaster />
    <BtnCvMaker/>
    </Router>
    </>
  )
}

export default App