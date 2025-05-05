
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = 5000;

// CORS configuration: allow frontend on localhost / deploy to communicate with the server
app.use(cors({
  origin: 'http://localhost:3000' ,
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
    maxAge: 1000 * 60 * 60 * 24
  }
}));

// Routes for authentication 
app.use('/auth', authRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
