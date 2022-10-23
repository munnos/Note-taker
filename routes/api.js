// Requiring api route from server.js to add onto and fsutils file for functions within that file

const api = require("express").Router();
const Notes = require("../helpers/fsUtils");

// Reads db.json file and returns existing notes

api.get("/notes", (req, res) => {
  Notes.retrieveNotes().then((notes) => {
    res.json(notes);
  });
});

// This route receives a new note to save on the request body, add it to the db.json file, and then returns the new note to the client. Given unique ID through UUID package.
api.post("/notes", (req, res) => {
  console.info(`${req.method} request received to add a note`);
  Notes.addNote(req.body);
  console.log(req.body);

  res.json(Notes);
});

// Route to delete note

api.delete("/notes/:id", (req, res) => {
  Notes.deleteNote(req.params.id).then(() => res.json({ ok: true }));
});

module.exports = api;
