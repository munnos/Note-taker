// This allows you to create off shoots of routes and then be like to server - use these routes
const api = require("express").Router();
const Notes = require("../helpers/fsUtils")


// GET /api/notes should read the db.json file and return all saved notes as JSON.

api.get('/notes', (req, res) => {
   Notes.retrieveNotes()
   .then((notes) => {
res.json(notes);
   })
   .catch((err) => {
    res.status(503).json(err);
   });

});

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).

api.post('/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    Notes.addNote(req.body)
    console.log(req.body)
    .then((note) => {
       res.json(note);       
    })
    .catch((err) => {
        res.status(503).json(err);
    });
    
});

    api.delete("notes/:id", (req,res) => {
        Notes.deleteNote(req.params.id)
        .then(() => res.json({ok: true}))
        .catch((err) => res.status(503).json(err));

    });



module.exports = api;