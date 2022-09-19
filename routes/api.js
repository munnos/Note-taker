const api = require("express").Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require("../")


// GET /api/notes should read the db.json file and return all saved notes as JSON.

api.get('/api/notes', (req,res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('../db/db.json').then((data) => res.json(JSON.parse(data)));

});

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).

api.post('/api/notes', (req,res) => {
    console.info(`${req.method} request received to add a note`);
    console.log(req.body);

    const { note } = req.body;

    if (req.body) {
        const newNote = {
            note,
            note_id: uuid(),
        };
    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully`);
    } else {
        res.error(`Error in adding note`);
    }


});

module.exports = api;