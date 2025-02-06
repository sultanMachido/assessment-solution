import { Server } from "mock-socket";

const MOCK_WS_URL = "ws://localhost:8080";

const mockServer = new Server(MOCK_WS_URL);
const activities = [
  "logged in",
  "uploaded a file",
  "logged out",
  "joined the chat",
];

const users = ["User A ", "User B ", "User C ", "User D "];
mockServer.on("connection", (socket) => {
  console.log("Mock WebSocket connected");

  setInterval(() => {
    const message = {
      text:
        users[Math.floor(Math.random() * users.length)] +
        " " +
        activities[Math.floor(Math.random() * activities.length)],
      timestamp: new Date().toLocaleTimeString(),
    };

    socket.send(JSON.stringify(message));
  }, 2000);
});

export default MOCK_WS_URL; // Export WebSocket URL for client connection
