// import React, { createContext, useContext, useEffect, useState } from "react";

// // Create context for authentication
// export const AuthContext = createContext();

// // Custom hook to use authentication context
// export const useAuthContext = () => {
//   return useContext(AuthContext);
// };

// // Provider component to manage authentication state
// export const AuthContextProvider = ({ children }) => {
//   // State to store authenticated user
//   const [authUser, setAuthUser] = useState(() => {
//     // Load user from localStorage or set to null if not available
//     const storedUser = localStorage.getItem("user");
//     return storedUser ? JSON.parse(storedUser) : null;
//   });

//   // Function to update authUser with the latest user data
//   const updateUserProfile = (userData) => {
//     setAuthUser(userData);
//   };

//   // Effect to update localStorage when authUser changes
//   useEffect(() => {
//     // Store updated authUser in localStorage
//     localStorage.setItem("user", JSON.stringify(authUser));
//   }, [authUser]);

//   // Provide authUser, setAuthUser, and updateUserProfile to children components
//   return (
//     <AuthContext.Provider value={{ authUser, setAuthUser, updateUserProfile }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };