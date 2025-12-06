// server.js
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
require('dotenv').config();

const port = 8888;
const authCallbackPath = '/auth/spotify/callback';

// Passport Setup
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: 'https://buzzify-5hmq.onrender.com/auth/spotify/callback',
    },
    function (accessToken, refreshToken, expires_in, profile, done) {
      // IMPORTANT: Add the accessToken to the profile object so we can send it to the client
      profile.accessToken = accessToken;
      process.nextTick(function () {
        return done(null, profile);
      });
    }
  )
);

const app = express();

// Configure view engine to EJS
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(session({ secret: 'buzzify-mobile', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

// Routes
app.get('/', function (req, res) {
  // Pass the user object (containing accessToken) to the frontend
  res.render('index', { user: req.user });
});

app.get(
  '/auth/spotify',
  passport.authenticate('spotify', {
    // Added 'user-top-read' to scopes
    scope: ['user-read-email', 'user-read-private', 'user-top-read'],
    showDialog: true,
  })
);

app.get(
  authCallbackPath,
  passport.authenticate('spotify', { failureRedirect: '/' }),
  function (req, res) {
    res.redirect('/');
  }
);

app.get('/logout', function (req, res) {
  req.logout(() => {
    res.redirect('/');
  });
});

app.listen(port, function () {
  console.log('Buzzify Mobile running on http://localhost:' + port);
});
