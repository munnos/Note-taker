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

  async addNote(note) {
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
  async retrieveNotes() {
    return this.readNotes()
    .then(notes => {
      return JSON.parse(notes) || [];
    })
  }
  async deleteNote(id) {
    return this.retrieveNotes()
    .then(notes => notes.filter(note => note.id !== id))
  }
}

// /**
//  *  Function to write data to the JSON file given a destination and some content
//  *  @param {string} destination The file you want to write to.
//  *  @param {object} content The content you want to write to the file.
//  *  @returns {void} Nothing
 */
 const writeToFile = (destination, content) =>
 fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
   err ? console.error(err) : console.info(`\nData written to ${destination}`)
 );
// /**
// *  Function to read data from a given a file and append some content
// *  @param {object} content The content you want to append to the file.
// *  @param {string} file The path to the file you want to save to.
// *  @returns {void} Nothing
// */
const readAndAppend = (content, file) => {
 fs.readFile(file, 'utf8', (err, data) => {
   if (err) {
     console.error(err);
   } else {
     const parsedData = JSON.parse(data);
     parsedData.push(content);
     writeToFile(file, parsedData);
   }
 });
};

module.exports = { readFromFile, writeToFile, readAndAppend };