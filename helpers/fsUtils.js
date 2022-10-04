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
    return writeFile("../db/db.json", JSON.stringify(note));
    
  };
  

 async addNote(note) {
  
    const { title, text } = note;

    if (!title || !text) {
      throw new Error("Please input a title and note")
    }

    const newNote = { title, text, id: uuidv4() }

    const notes = await this.retrieveNotes();
   const updatedNotes = [...notes, newNote];
   await this.writeNote(updatedNotes);
   return this.newNote;

  }
  async retrieveNotes() {
    const notes = await this.readNotes();
    return JSON.parse(notes) || [];
  }
  async deleteNote(id) {
    const notes = await this.retrieveNotes();
    const deleteNote = notes.filter(note => note.id !== id);
    return await this.writeNote(deleteNote);
  }
}


module.exports = new Notes();