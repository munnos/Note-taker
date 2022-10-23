// requiring routes and express applicaiton

const express = require('express');
const api = require("./routes/api")
const frontEnd = require("./routes/frontend");
const dbJson = require("./db/db.json");



const PORT = process.env.PORT || 3000;
const app = express();

// middleware
// parses all of JSON - and allows it to read
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// this is serving all of static files for express
app.use(express.static('public'));

// Specifying the routes for express to use
app.use('/api', api);
app.use('/', frontEnd);



// Telling server to listen at PORT 3000 - http://localhost:3000/
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
