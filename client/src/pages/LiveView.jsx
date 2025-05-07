
import { useEffect, useState, useRef } from "react";
import { useLocation , useNavigate } from "react-router-dom";

import { Typography, Box, Paper,Button  } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import socket from "../utilities/socketClient"
import { BASE_SERVER_URL } from "../utilities/api";

const LiveView = ({currentUser}) => {

  const [currentSong, setCurrentSong] = useState(null);
  const [lyricsData, setLyricsData] = useState([]);
  const [isPaused, setIsPaused] = useState(false);

  const lyricsRef = useRef(null);
  const intervalRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const songFromNavigate  = location.state;
 

    // Receive the current song either from navigation or socket event
    useEffect(() => {

      if (songFromNavigate) {
        console.log("Navigated with song:", songFromNavigate);
        setCurrentSong(songFromNavigate);
      } else {

        console.log("No song in navigation, waiting for socket...");

      // Listen for the event "play_song" (when a new song is played)
        socket.on("play_song", (song) => {
          console.log("Received song from socket:", song);
          setCurrentSong(song);
        });
      }

      // Listen for the event "stop_song"
      socket.on("stop_song", () => {
        console.log("Stop song event received from admin");
        clearInterval(intervalRef.current); // Stop the scrolling
        navigate("/"); 
      });
      
      return () => {
        socket.off("play_song");
        socket.off("stop_song"); 
      };
    }, [songFromNavigate]);


    // Fetch lyrics from server based on current song ID
    useEffect(() => {
      const fetchLyrics = async () => {
        if (!currentSong) return;
  
        try {
          const res = await fetch(
            `${BASE_SERVER_URL}/songs/lyrics/${currentSong.id}`
          );
          const data = await res.json();
          setLyricsData(data);
        } catch (err) {
          console.error("Error loading lyrics:", err);
        }
      };
  
      fetchLyrics();
    }, [currentSong]);
  
    // Auto-scroll lyrics
    useEffect(() => {
      if (lyricsData.length > 0 && lyricsRef.current) {
        intervalRef.current = setInterval(() => {
          if (!isPaused && lyricsRef.current) {
            lyricsRef.current.scrollTop += 1;
          }
        }, 50);
      }
      return () => clearInterval(intervalRef.current);
    }, [lyricsData, isPaused]);
  
    // Render each line of lyrics with optional chords
    const renderLyrics = () => {
      return lyricsData.map((line, index) => (
        <Box
          key={index}
          display="flex"
          justifyContent={currentSong.language === "he" ? "flex-end" : "flex-start"}
          flexDirection={currentSong.language === "he" ? "row-reverse" : "row"}
          gap={1}
          mb={2}
        >
          {line.map((wordObj, idx) => (
            <Box key={idx} textAlign="center">
              <Typography variant="h5" fontWeight="bold">
                {wordObj.lyrics}
              </Typography>

              {currentUser?.instrument !== "vocal" ?(
                <Typography variant="subtitle1" color="#3f51b5">
                  {wordObj.chords || ""}
                </Typography>
              ):''}
            </Box>
          ))}
        </Box>
      ));
    };
  
    const handleQuit = () => {
      socket.emit("stop_song");
      // navigate("/");
    };

    return (
      <Box
        sx={{
          backgroundColor: "#eeeeee",
          minHeight: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "3vh 0",
        }}
      >
        <Paper
          elevation={6}
          sx={{
            padding: "4vh",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          {currentSong && (
            <>
              <Typography variant="h4" fontWeight="bold" mb={1} 
                sx={{color:"#3f51b5"}}>
                {currentSong.title}
              </Typography>
              <Typography variant="h6" color="textSecondary" mb={4}>
                {currentSong.artist}
              </Typography>
            </>
          )}
  
          {/* Lyrics Box with scrolling */}
          <Box
            ref={lyricsRef}
            sx={{
              height: "30vh",
              width:'67vw',
              overflowY: "auto",
              border: "2px solid #3f51b5",
              padding: "1rem",
              borderRadius: "10px",
              backgroundColor: "white",
              mb: 4,
            }}
          >
            {renderLyrics()}
          </Box>
  
          {/* Control buttons */}
          <Box display="flex" justifyContent="center" gap={2}>
            <Button
              onClick={() => setIsPaused((prev) => !prev)}
              variant="contained"
              sx={{ backgroundColor: "#3f51b5",borderRadius:'12px' }}
              startIcon={isPaused ? <PlayArrowIcon /> : <PauseCircleIcon />}
            >
              {isPaused ? "Resume" : "Pause"}
            </Button>
  
            {currentUser?.role === "admin" && (
              <Button
                onClick={handleQuit}
                variant="contained"
                startIcon={<LogoutIcon />}
                sx={{backgroundColor:"#fff",color:"#3f51b5",
                  border: "2px solid #3f51b5",borderRadius:'12px'}}
              >
                Quit
              </Button>
            )}
          </Box>

        </Paper>
      </Box>
    );
  
};

export default LiveView;
