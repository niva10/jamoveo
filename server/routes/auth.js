
const express = require('express');
const bcrypt = require('bcrypt');

const fs = require('fs');
const path = require('path');

const { v4: uuidv4 } = require('uuid'); // For generating unique user ID

const router = express.Router();

// Path to the JSON file where users are stored
const USERS_FILE = path.join(__dirname, '..', 'data', 'users.json');

// Post method - Signup
router.post('/signup', async (req, res) => {
  const { userName, password, role, instrument } = req.body;

  // Validation for required fields
  if (!userName || !password || !role || !instrument) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    // Load  all existing users from the JSON file(DB)
    const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));

    // Check if user with the same name already exists
    const userExists = users.find(u => u.userName === userName);
    if (userExists) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Hash the user's password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: uuidv4(), 
      userName,
      hashed_password: hashedPassword,
      role,
      instrument
    };

    // Add the new user and save the updated list to the file(DB)
    users.push(newUser);
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

    // Store user info in session to keep them logged in
    req.session.user = { userName, role };
    
    console.log(req.session);
    
    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Post method - Login
router.post('/login', async (req, res) => {

  const { userName, password } = req.body;

  // validation
  if (!userName || !password) {
    return res.status(400).json({ error: 'Missing name or password' });
  }

  try {
    // Read users from the file (DB)
    const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));

    // Check if user exists in the file (DB)
    const user = users.find(u => u.userName === userName);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare the entered password with the hashed password
    const passwordMatch = await bcrypt.compare(password, user.hashed_password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    // Save user info in session
    req.session.user = {
      userName: user.userName,
      role: user.role
    };
    
    console.log(req.session);

    // Respond with success
    res.status(200).json({ message: 'Login successful' });

  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Post method - Logout
router.post('/logout', (req, res) => {

  // If the user is not logged in, res status is OK anyway
  if (!req.session.user) {
    return res.status(200).json({ message: 'Already logged out' });
  }

  // Destroy the session on the server
  req.session.destroy(err => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ error: 'Logout failed' });
    }

    // Clear the session cookie from the browser
    res.clearCookie('connect.sid');

    res.status(200).json({ message: 'Logout successful' });
  });
});

// Get method - route to check if user is currently logged in
router.get('/me', (req, res) => {

  // If no user session exists, respond with 401 (unauthorized)
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not logged in' });
  }

  // Return the currently logged-in user's info (without password)
  res.status(200).json(req.session.user);
});


module.exports = router;
