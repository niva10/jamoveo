
import { useEffect, useState } from "react";
import { Container,Typography, List,ListItem,ListItemText,Divider} from "@mui/material";
import { BASE_URL } from "../utilities/api";

const Search = () => {
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchSongs = async () => {
      try {
        const res = await fetch(`${BASE_URL}/songs`);
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
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>

      <Typography variant="h4" gutterBottom>
        Songs List
      </Typography>

      {error && (
        <Typography color="error" variant="body1">
          {error}
        </Typography>
      )}

      {/* Render the list of songs */}
      <List>
        {songs.map((song) => (
          <div key={song.id}>
            <ListItem>
              <ListItemText
                primary={song.title}
                secondary={`Artist: ${song.artist}`}
              />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </Container>
  );
};

export default Search;
