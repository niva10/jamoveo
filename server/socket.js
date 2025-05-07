
const CLIENT_URL = process.env.CLIENT_URL ||"http://localhost:5173";

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
    console.log("User connected via socket", socket.id);

    // Listen for a song start event from admin and broadcast to other users
    socket.on("start_song", (song) => {
      console.log("Admin started song:", song.id);
      io.emit("play_song", song);
    });

    // Listen for a song stop event from admin and broadcast to other users
    socket.on("stop_song", () => {
      console.log("Admin stopped the song");
      io.emit("stop_song");
    });
    
    // Handle client disconnect
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });

  });
}

module.exports = setupSocket;
