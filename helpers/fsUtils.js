// Requiring fs package to write and read files and UUID for random ID numbers

const fs = require("fs");
const util = require("util");
const uuid = require("uuid").v4;
// const dbJson = require("./db/db.json");

const readFromFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

// Functions within class to export for use in other files such as api.js

class Notes {
  readNotes() {
    return readFromFile("db/db.json", "utf8");
  }
  writeNote(note) {
    return writeFile("db/db.json", JSON.stringify(note));
  }

  addNote(note) {
    const { title, text } = note;

    if (!title || !text) {
      throw new Error("Please input a title and note");
    }

    const newNote = { title, text, id: uuid() };

    return this.retrieveNotes()
      .then((notes) => [...notes, newNote])
      .then((updatedNotes) => this.writeNote(updatedNotes))
      .then(() => this.newNote);
  }

  retrieveNotes() {
    return this.readNotes().then((notes) => {
      return JSON.parse(notes) || [];
    });
  }

  deleteNote(id) {
    return this.retrieveNotes()
      .then((notes) => notes.filter((note) => note.id !== id))
      .then((filteredNote) => this.writeNote(filteredNote));
  }
}

module.exports = new Notes();
