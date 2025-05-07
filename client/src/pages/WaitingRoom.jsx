
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";

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
    <Box
      sx={{
        backgroundColor: "#f0f0f0",
        minHeight: "95vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Rubik",
        px: 2,
      }}
    >
      <Box
        sx={{
          backgroundColor: "#ffffff",
          padding: "32px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          border: "1px solid #ddd",
          textAlign: "center",
        }}
      >
        <CircularProgress
          sx={{ color: "#3f51b5", mb: 2 }}
          size={50} />
        <Typography variant="h6" fontWeight={600} sx={{ color: "#3f51b5" }}>
          Please wait...
        </Typography>
        <Typography variant="body2" sx={{ color: "#555", mt: 1 }}>
          The live will begin shortly. You will be redirected once the song starts.
        </Typography>
      </Box>

    </Box>
  );
};

export default WaitingRoom;
