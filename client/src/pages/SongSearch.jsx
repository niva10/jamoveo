
import { useEffect, useState } from "react";
import { Container,Typography, List,ListItem,
         ListItemText, TextField, Button} from "@mui/material";
import { BASE_SERVER_URL } from "../utilities/api";

// Import the socket instance to emit events to the server
import socket from "../utilities/socketClient";
import { useNavigate } from "react-router-dom";

const Search = ({currentUser}) => {

  const [songs, setSongs] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {

    // Listen for the "play_song" event from the server and navigate to live view page
    socket.on("play_song", (song) => {

      console.log("Received song broadcast_2:15:", song);

      if (location.pathname !== "/live") {
        navigate("/live", { state: song });
      }
    });

    const fetchSongs = async () => {
      try {
        const res = await fetch(`${BASE_SERVER_URL}/songs`);
        if (!res.ok){
          throw new Error("Failed to fetch songs");
        }
        const data = await res.json();
        setSongs(data);

      } catch (err) {
        console.error(err);
        setError("Failed to load songs");
      }
    };

    fetchSongs();

    // Clean to avoid duplicate listeners
    return () => socket.off("play_song");
  }, [navigate]);

  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.artist_he.includes(searchTerm) || 
    song.title_he.includes(searchTerm)
  );

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>

      <Typography color="#3f51b5" variant="h4" fontWeight={800}>
          Our songs
      </Typography>

      <TextField
        label="Search by title or artist"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
        

      {error && (
        <Typography color="error" variant="body1">
          {error}
        </Typography>
      )}

      {/* Render the list of songs */}
      <List>
        {filteredSongs.map((song) => (
          <ListItem
            key={song.id}
            divider
            sx={{
              backgroundColor: "#f5f5f5",
              borderRadius: "10px",
              mb: 1.2,
              px: 3,
              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
            }}
          >
            <ListItemText
              primary={
                <Typography variant="h6" sx={{ color: "#3f51b5", fontWeight: 600 }}>
                  {song.title}
                </Typography>
              }
              secondary={
                <Typography variant="body1" sx={{ color: "#555" }}>
                  {song.artist}
                </Typography>
              }
            />

            {
            currentUser?.role === "admin" ? <Button variant="contained" 
                                            sx={{borderRadius:'6px',backgroundColor:'#3f51b5'}}
                                            onClick={() => socket.emit("start_song", song)}
                                            >Live
                                            </Button> : ''
            }
            
          </ListItem>
        ))}
      </List>

    </Container>
  );
};

export default Search;
