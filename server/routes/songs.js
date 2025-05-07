
const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const SONGS_FILE = path.join(__dirname, "../data/songs.json");

// GET method that fetches  all songs from the database
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


// GET method that return specific song from the database
router.get("/lyrics/:songId", (req, res) => {

  const songId = req.params.songId;

  try {
    const filePath = path.join(__dirname, "../data", `${songId}.json`);
    const fileData = fs.readFileSync(filePath, "utf-8");
    const lyrics = JSON.parse(fileData);
    res.status(200).json(lyrics);
  } catch (err) {
    console.error("Failed to load lyrics file:", err.message);
    res.status(404).json({ error: "Lyrics file not found" });
  }
});


module.exports = router;
