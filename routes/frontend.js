// Requiring frontEnd route from server.js with express acting as server and path to simplify writing route to static html files

const frontEnd = require("express").Router();
const path = require("path");

// returns notes.html page

frontEnd.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

// GET * should returns the index.html file

frontEnd.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});


// Exporting frontEnd routes so other files can use

module.exports = frontEnd;
