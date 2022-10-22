const fs = require("fs");
const util = require("util");
const uuid = require("uuid").v4;
// const json = require("../db/db.json");

const readFromFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class Notes {
  readNotes() {
    return readFromFile("../Note-taker/db/db.json", "utf8");
    
  }
  writeNote(note) {
    return writeFile("../Note-taker/db/db.json", JSON.stringify(note));
    // return writeFile("../Note-taker/db/db.json", JSON.stringify(note));
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
      // console.log(notes);
      // return JSON.parse(notes) || [];
      return notes || [];
    })
  }

  deleteNote(id) {
    return this.retrieveNotes()
    .then(notes => notes.filter(note => note.id !== id))
    .then(filteredNote => this.writeNote(filteredNote))
  }
}

module.exports = new Notes();
