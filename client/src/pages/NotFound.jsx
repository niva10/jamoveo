
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
 
  const navigate = useNavigate();

  return (
    
    <Box
      sx={{
        backgroundColor: "#eeeeee",
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
          <Typography variant="h2" sx={{ color: "#3f51b5", fontWeight: 700 }}>
            404
          </Typography>

          <Typography variant="h5" sx={{ mt: 1, color: "#333" }}>
            Page Not Found
          </Typography>

          <Typography variant="body1" sx={{ mt: 1, color: "#666", mb: 2 }}>
            The page you are looking for does not exist.
          </Typography>
          
          <Button
            onClick={() => navigate("/")}
            variant="outlined"
            sx={{
              color: "#3f51b5",
              borderColor: "#3f51b5",
              fontWeight: 600,
              borderRadius:'10px',
              "&:hover": {
                backgroundColor: "#3f51b5",
                color: "#fff",
              },
            }}
          >
            Go Home
          </Button>
        </Box>
    </Box>
  );

 

}
