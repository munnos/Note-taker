const express = require('express');
const frontEnd = require('./routes/frontend');
const api = require('./routes/api');


const PORT = process.env.PORT || 3001;
const app = express();

// middleware
// parses all of JSON - allows you to read it
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// this is serving up all of static files
app.use(express.static('public'));

app.use('/', frontEnd);
app.use('/api', api);


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
