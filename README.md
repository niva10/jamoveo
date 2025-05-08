
# JaMoveo

A live song-broadcasting platform with real-time synchronization between admin and users.
Built as part of a take-home assignment.

## Live Project Links

- *Client (Vercel):* https://jamoveo-nu.vercel.app  
- *Server (Render):* https://jamoveo-sja6.onrender.com

## Sign Up Links

To sign up, please use the following direct links:

- *Regular user sign-up:* https://jamoveo-nu.vercel.app/signup  
- *Admin sign-up:* https://jamoveo-nu.vercel.app/signup/admin

## Test Login Credentials

- *User:*  
  Username: Noy  
  Password: N12345

- *Admin:*  
  Username: Niv  
  Password: N12345

## Main Features

- Live admin broadcasting: songs are played simultaneously for all users.
- Real-time synchronization via WebSocket (socket.io).
- Responsive and friendly UI.
- Login and signup flows for users and admin.
- Passwords are securely encrypted using bcrypt.

## Technologies Used

- *Frontend:* React, Vite, MUI, Socket.io  
- *Backend:* Node.js, Express, Socket.io  
- *Database:* Local JSON (no external DB)

## Local Setup Instructions

To run the project locally:

### Backend

```bash
cd server  
npm install  
npm run dev

### Frontend
cd client  
npm install  
npm run dev
