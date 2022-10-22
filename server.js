const express = require('express');
const api = require("./routes/api")
const frontEnd = require("./routes/frontend");



const PORT = process.env.PORT || 3000;
const app = express();

// middleware
// parses all of JSON - allows you to read it
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// this is serving up all of static files
app.use(express.static('public'));

app.use('/api', api);
app.use('/', frontEnd);



app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
