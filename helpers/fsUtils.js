const fs = require('fs');
const util = require('util');
const uuid = require('uuid').v4;
const path = require("path");


const readFromFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);


class Notes {
  readNotes() {
    return readFromFile(path.join(__dirname, "../db/db.json"), "utf8");
  };
  writeNote(note) {
    return writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(note));   
  };
  

addNote(note) {
  
    const { title, text } = note;

    if (!title || !text) {
      throw new Error("Please input a title and note")
    }

    const newNote = { title, text, id: uuid() }

    const notes = this.retrieveNotes();
   const updatedNotes = [...notes, newNote];
    this.writeNote(updatedNotes);
   return this.newNote;

  }
  retrieveNotes() {
    const notes = this.readNotes();
    // JSON.parse(notes) || [];
    return this.notes || [];
  }
  deleteNote(id) {
    const notes =  this.retrieveNotes();
    const deleteNote = notes.filter(note => note.id !== id);
    return this.writeNote(deleteNote);
  }
}


module.exports = new Notes();