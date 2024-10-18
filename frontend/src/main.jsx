import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import '../index.css';
import "./App.css";


export const Context = createContext({ isAuthorized: false })

const AppWrapper = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState({});

  return (
    <Context.Provider value={{ isAuthorized, setIsAuthorized, user, setUser }}>
      <App className="relative" />
    </Context.Provider>
  )
};
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper/>
  </React.StrictMode>,
)
