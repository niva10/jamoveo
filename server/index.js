
const CLIENT_URL = process.env.CLIENT_URL ||"http://localhost:5173";

const express = require('express');
const cors = require('cors');
const session = require('express-session');

const authRoutes = require('./routes/auth');
const songsRoutes = require("./routes/songs");

const app = express();
const PORT = process.env.PORT || 5000;


const setupSocket = require("./socket"); // Socket.IO setup function
const http = require("http"); 
const server = http.createServer(app); // Create HTTP server for both Express and socket.io

// CORS : allow frontend on localhost / deploy to communicate with the server
app.use(cors({
  origin: CLIENT_URL ,
  credentials: true
}));

app.use(express.json());


// Set up session to manage logged-in users
app.use(session({
  secret: 'jamoveo-secret', 
  resave: false, 
  saveUninitialized: false, 
  cookie: {
    httpOnly: true, 
    maxAge: 1000 * 60 * 60 * 24,
    sameSite:'none',
    secure: true,
    domain:'.onrender.com'
  }
}));

// Routes:
app.use('/auth', authRoutes);     // Routes for authentication 
app.use("/songs", songsRoutes);   // Routes for songs 


// Attach socket.io to the server
setupSocket(server);


// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
