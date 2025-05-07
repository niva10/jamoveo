
import { useState, useEffect } from "react";
import {useNavigate } from "react-router-dom";
import { fetchCurrentUser } from "./utilities/authUtils";

import Router from "./router";

function App() {

  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {

    async function init() {
      try {
        const user = await fetchCurrentUser();

        if (user && location.pathname === "/") {
          setCurrentUser(user);
          if (user.role === "admin") {
            navigate("/search");
          } else {
            navigate("/waiting");
          }
        }
      } catch (err) {
        console.error("Error checking user:", err);
      } finally {
        setLoading(false); 
      }
    }

    init();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;
  return <Router currentUser = {currentUser} setCurrentUser = {setCurrentUser} />
}

export default App;
