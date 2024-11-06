import React, { useEffect, useState } from 'react';
import { Loader2 } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const OAuthCallback = ({ setUser, setIsAuthorized }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  console.log("Starting OAuth callback...");

  useEffect(() => {
    const fetchUserData = async () => {
      console.log("Fetching user data...");

      try {
        const response = await fetch("https://jobquestdeploy.onrender.com/api/v1/user/userData", {
          credentials: "include"
        });

        console.log("Response received, processing...");

        if (!response.ok) {
          console.error(`Failed to fetch user data: Status ${response.status}, ${response.statusText}`);
          throw new Error(`Failed to fetch user data: ${response.statusText}`);
        }

        const data = await response.json();

        if (data) {
          console.log("User data received:", data);

          // Store user data in localStorage
          localStorage.setItem("user", JSON.stringify(data));
          
          // Update global state
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
        }, 3000); // Redirects after 3 seconds if there's an error
      }
    };

    fetchUserData();
  }, [navigate, setUser, setIsAuthorized]);

  // Render loading or error message if needed
  return (
    <div>
      {isLoading ? (
        <Loader2 className="animate-spin" />
      ) : error ? (
        <div>
          <p>Error: {error}</p>
          <p>Redirecting to login...</p>
        </div>
      ) : null}
    </div>
  );
};

export default OAuthCallback;