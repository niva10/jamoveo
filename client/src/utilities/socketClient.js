
import { BASE_SERVER_URL } from "./api";

// Import socket.io-client for real-time communication with the backend
import { io } from "socket.io-client";

// Create a socket instance connected to the backend server
const socket = io(BASE_SERVER_URL, {
  withCredentials: true,        
  transports: ["websocket"],    // Use websocket protocol
});

export default socket;
