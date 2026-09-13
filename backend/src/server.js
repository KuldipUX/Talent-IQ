import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import { serve } from "inngest/express";
import { inngest, functions } from "./lib/inngest.js";
import { clerkMiddleware } from "@clerk/express";

import chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoute.js";
import codeRoutes from "./routes/codeRoutes.js";
import problemRoutes from "./routes/problemRoutes.js";

const app = express();
const httpServer = createServer(app);
const allowedOrigins = [
  ...(ENV.CLIENT_URL || "").split(","),
  "http://localhost:5173",
  "http://localhost:5174",
].map((origin) => origin.trim()).filter(Boolean);
const isAllowedOrigin = (origin, callback) => {
  callback(null, !origin || allowedOrigins.includes(origin));
};

// --------------------
// Socket.io - real-time code sync between host & participant
// --------------------

export const io = new Server(httpServer, {
  cors: {
    origin: isAllowedOrigin,
    credentials: true,
  },
});

io.on("connection", (socket) => {
  // Each interview session is its own "room", keyed by sessionId
  socket.on("join-session", (sessionId) => {
    socket.join(sessionId);
  });

  // Someone typed in the editor -> broadcast to everyone else in that session
  socket.on("code-change", ({ sessionId, code, language, senderId }) => {
    socket.to(sessionId).emit("code-change", { code, language, senderId });
  });

  // Someone switched language -> broadcast + reset starter code together
  socket.on("language-change", ({ sessionId, language, code, senderId }) => {
    socket.to(sessionId).emit("language-change", { language, code, senderId });
  });

  // Someone ran the code -> show the same result to both sides
  socket.on("run-result", ({ sessionId, result, senderId }) => {
    socket.to(sessionId).emit("run-result", { result, senderId });
  });

  socket.on("disconnect", () => {
    // socket.io removes the socket from all rooms automatically
  });
});

// --------------------
// Global middleware
// --------------------

app.use(
  cors({
    origin: isAllowedOrigin,
    credentials: true,
  })
);

app.use(express.json());

app.use(clerkMiddleware());

// --------------------
// Routes
// --------------------

app.get(["/health", "/api/health"], (req, res) => {
  res.status(200).json({
    message: "Success from api",
  });
});

app.use("/api/chat", chatRoutes);

app.use("/api/code", codeRoutes);

app.use("/api/problem", problemRoutes);

app.use("/api/session", sessionRoutes);

app.get("/video-calls", (req, res) => {
  res.status(200).json({
    msg: "video call endpoint",
  });
});

// --------------------
// Inngest
// --------------------

app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions,
  })
);

// --------------------
// Start server
// --------------------

const startServer = async () => {
  try {
    await connectDB();

    httpServer.listen(ENV.PORT, () => {
      console.log(`Server is running on port ${ENV.PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

startServer();