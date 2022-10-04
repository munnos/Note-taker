const fs = require('fs');
const util = require('util');
const uuidv4 = require('uuid'.v4);


const readFromFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);


class Notes {
  readNotes() {
    return readFromFile("../db/db.json", "utf8")
  }
  writeNote(note) {
    return writeFile("../db/db.json", JSON.stringify(note))
  }

 addNote(note) {
    const { title, text } = note;

    if (!title || !text) {
      throw new Error("Please input a title and note")
    }

    const newNote = { title, text, id: uuidv4() }

    return this.retrieveNotes()
    .then(notes => [...notes,newNote])
    .then(updatedNotes => this.writeNote(updatedNotes))
    .then(() => this.newNote)

  }
  retrieveNotes() {
    return this.readNotes()
    .then(notes => {
      return JSON.parse(notes) || [];
    })
  }
  deleteNote(id) {
    return this.retrieveNotes()
    .then(notes => notes.filter(note => note.id !== id))
    .then(deleteNote => this.writeNote(deleteNote))
  }
}


module.exports = new Notes();