// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const mongodb=require("./data/database")
const app = express();
const PORT = 8080;

app.use('/', require('./routes'));

// Middleware
app.use(cors());
app.use(express.json());

app.get('/professional', (req, res) => {
  res.json(professional);
});

mongodb.initDb((err) =>{
  if (err){
    console.log(err);
  }
  else{
    app.listen(8080, () => {console.log("Servidor corriendo en http://localhost:8080");});
  }
})
