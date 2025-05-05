
import { useState, useEffect } from "react";
import {useNavigate } from "react-router-dom";
import { fetchCurrentUser } from "./utilities/authUtils";

import Router from "./router";

function App() {

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function init() {
      try {
        const user = await fetchCurrentUser();

        if (user) {
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
  return <Router/>
}

export default App;
