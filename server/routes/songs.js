
const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const SONGS_FILE = path.join(__dirname, "../data/songs.json");

// GET method that fetches songs from the database
router.get("/", (req, res) => {
  try {
    const songsData = fs.readFileSync(SONGS_FILE, "utf-8");
    const songs = JSON.parse(songsData);
    res.status(200).json(songs);

  } catch (err) {
    console.error("Error reading songs file:", err);
    res.status(500).json({ error: "Failed to load songs" });
  }
});

module.exports = router;
