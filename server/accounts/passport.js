require('dotenv').config();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const bcrypt = require('bcrypt');

const findOrCreateOAuthUser = (provider, profile, done) => {
  // Logic to find or create a user in your database using profile.id, profile.emails, etc.
  
  
  // For demonstration, we pass the raw profile object:
  return done(null, profile);
};

passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      
    } catch (err) {
      return done(err);
    }
  }
));

// Serialize user instance to session
passport.serializeUser((user, done) => {
  done(null, user);
});
// Deserialize user instance from session
passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
