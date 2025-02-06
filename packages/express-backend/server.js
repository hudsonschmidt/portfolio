import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs"; // Missing import

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/api/track", (req, res) => {
  try {
    const { userId, userAgent, screenWidth, screenHeight } = req.body;
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    if (!userId || !userAgent || !screenWidth || !screenHeight) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const logEntry = `${new Date().toISOString()} - User: ${userId}, IP: ${ip}, UserAgent: ${userAgent}, Screen: ${screenWidth}x${screenHeight}\n`;

    fs.appendFile("user_logs.txt", logEntry, (err) => {
      if (err) {
        console.error("Logging error:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.sendStatus(200);
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`REST API is listening on port ${port}`);
});
