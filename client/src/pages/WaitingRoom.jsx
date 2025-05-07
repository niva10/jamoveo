
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography } from "@mui/material";

import socket from "../utilities/socketClient";

const WaitingRoom = () => {
  
  const navigate = useNavigate();

  useEffect(() => {

    // Listen for the "play_song" event from the server and navigate to live view page
    socket.on("play_song", (song) => {

      if (location.pathname !== "/live") {
        navigate("/live", { state: song });
      }
    });

    // Clean to avoid duplicate listeners
    return () => socket.off("play_song");
  }, [navigate]);

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4 }}>
        Please wait for the admin to start a song...
      </Typography>
    </Container>
  );
};

export default WaitingRoom;
