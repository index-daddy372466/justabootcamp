require('dotenv').config();

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const bycrpt = require('bcrypt');

const findOrCreateOAuthUser = (provider, profile, done) => {
  // Logic to find or create a user in your database using profile.id, profile.emails, etc.
  
  
  // For demonstration, we pass the raw profile object:
  return done(null, profile);
};

// 1. Local Strategy (Username/Email & Password)
passport.use(new LocalStrategy(
  { usernameField: 'email' }, 
  async (email, password, done) => {
    try {
      // Replace with database lookup & password hash comparison (e.g., bcrypt)
      
      
      return done(null, false, { message: 'Local strategy needs database integration' });
    } catch (err) {
      return done(err);
    }
  }
));

// 2. Facebook Strategy
// passport.use(new FacebookStrategy({
//     clientID: process.env.FACEBOOK_APP_ID,
//     clientSecret: process.env.FACEBOOK_APP_SECRET,
//     callbackURL: '/auth/facebook/callback',
//     profileFields: ['id', 'displayName', 'photos', 'email']
//   },
//   (accessToken, refreshToken, profile, done) => {
//     return findOrCreateOAuthUser('facebook', profile, done);
//   }
// ));

// 3. Google (Gmail) Strategy
// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: '/auth/google/callback'
//   },
//   (accessToken, refreshToken, profile, done) => {
//     return findOrCreateOAuthUser('google', profile, done);
//   }
// ));

// 4. GitHub Strategy
// passport.use(new GitHubStrategy({
//     clientID: process.env.GITHUB_CLIENT_ID,
//     clientSecret: process.env.GITHUB_CLIENT_SECRET,
//     callbackURL: '/auth/github/callback',
//     scope: ['user:email']
//   },
//   (accessToken, refreshToken, profile, done) => {
//     return findOrCreateOAuthUser('github', profile, done);
//   }
// ));

// Serialize user instance to session
passport.serializeUser((user, done) => {
  done(null, user);
});
// Deserialize user instance from session
passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
