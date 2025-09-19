// server.js
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const mongoose = require('mongoose');
const mongodb=require("./data/database")
const app = express();

const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use((req, res, next) =>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, OPTIONS');
  next();
})
app.use('/', require('./routes'));


// // Middleware
// app.use(cors());
// app.use(express.json());

// app.get('/professional', (req, res) => {
//   res.json(professional);
// });

mongodb.initDb((err) =>{
  if (err){
    console.log(err);
  }
  else{
    app.listen(8080, () => {console.log("Servidor corriendo en http://localhost:8080");});
  }
})


