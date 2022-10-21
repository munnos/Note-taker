const fs = require("fs");
const util = require("util");
const uuid = require("uuid").v4;
// const json = require("../db/db.json");

const readFromFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class Notes {
  readNotes() {
    return readFromFile("../db/db.json", "utf8");
    
  }
  writeNote(note) {
    return writeFile("../db/db.json", JSON.stringify(note));
      // path.join(__dirname, "../db/db.json"), JSON.stringify(note));
      

  
  }

  addNote(note) {
    const { title, text } = note;

    if (!title || !text) {
      throw new Error("Please input a title and note");
    }

    const newNote = { title, text, id: uuid() }

    return this.retrieveNotes()
      .then((notes) => [...notes, newNote])
      .then((updatedNotes) => this.writeNote(updatedNotes))
      .then(() => this.newNote)
  }

  retrieveNotes() {
    return this.readNotes()
    .then(notes => {
      return JSON.parse(notes) || [];
    })
  }

  deleteNote(id) {
    const notes = this.retrieveNotes();
    const deleteNote = notes.filter((note) => note.id !== id);
    return this.writeNote(deleteNote);
  }
}

module.exports = new Notes();
