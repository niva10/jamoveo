
import {useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { signupUser } from "../utilities/authUtils";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [instrument, setInstrument] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = location.pathname.includes("admin");

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

  // Validation:
    if (!userName || !password || !instrument) {
      setError("All fields are required");
      return;
    }

    if (userName.length < 3) {
      setError("Username must be at least 3 characters");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    const role = isAdmin ? "admin" : "user";

    const response = await signupUser(userName, password, instrument, role);

    if (response?.user) {

      // Navigate based on role
      response.user.role === "admin" ?navigate("/search"):navigate("/waiting");

      //-------
      // if (user.role === "admin") {
      //   navigate("/search");
      // } else {
      //   navigate("/waiting");
      // }
      //-----------
      
    }else{
          setError("Signup failed, Try a different username");
          return;
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={6} sx={{ p: 3, mt: 18 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Signup
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <TextField
            label="Instrument"
            variant="outlined"
            fullWidth
            margin="normal"
            value={instrument}
            onChange={(e) => setInstrument(e.target.value)}
          />

          {error && (
            <Typography color="error" variant="body2" mt={1}>
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, backgroundColor: "#1976d2" }}
          >
            Signup
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Signup;
