// server.js
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const mongoose = require('mongoose');
const mongodb=require("./data/database")
const app = express();
const passport = require('passport');
const session = require('express-session')
const GitHubStrategy = require('passport-github2').Strategy;

const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
}))
app.use(passport.initialize())
app.use(passport.session())
app.use((req, res, next) =>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, OPTIONS');
  next();
})
app.use(cors({ methods:['GET', 'POST', 'DELETE', 'PUT', 'PATCHES']}))
app.use(cors({origin:'*'}))
app.use('/', require('./routes'));


passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile,done){
  return done(null, profile)
}
));

passport.serializeUser((user,done) =>{
  done(null, user);
})
passport.deserializeUser((user,done) =>{
  done(null, user);
})


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


