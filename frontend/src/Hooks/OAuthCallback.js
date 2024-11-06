import React, { useEffect } from 'react';
import { Loader2 } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const OAuthCallback = ({ setUser, setIsAuthorized }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  console.log("bidaya");

  useEffect(() => {
    const fetchUserData = async () => {
      console.log("okokokokok");
      try {
        const response = await fetch("https://jobquestdeploy.onrender.com/api/v1/user/userData", {
          credentials: "include",
          withCredentials: true,
          
        });
        console.log("okok");

        if (!response.ok) {
          throw new Error(`Failed to fetch user data: ${response.statusText}`);
        }

        const data = await response.json();
        
        if (data) {
          console.log("Received user data:", data);

          
          // Store user data
          localStorage.setItem("user", JSON.stringify(data));
          
          // Update global state if the props are provided
          if (setUser) setUser(data);
          if (setIsAuthorized) setIsAuthorized(true);
          
          // Redirect to home page
          navigate("/");
        } else {
          throw new Error("No user data received");
        }
      } catch (error) {
        console.error("Error in OAuth callback:", error);
        setError(error.message);
        setIsLoading(false);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    };

    fetchUserData();
  }, [navigate, setUser, setIsAuthorized]);

  

  
};

export default OAuthCallback;