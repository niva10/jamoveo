
const CLIENT_URL = "http://localhost:5173";

const { Server } = require("socket.io");

function setupSocket(server) {

  const io = new Server(server, {
    cors: {
      origin: CLIENT_URL,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  // Handle client connection
  io.on("connection", (socket) => {
    console.log("User connected via socket");

    // Listen for a song start event from admin and broadcast to other users
    socket.on("start_song", (songId) => {
      console.log("Admin started song:", songId);
      socket.broadcast.emit("play_song", songId);
    });

    // Handle client disconnect
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });

  });
}

module.exports = setupSocket;
