import passport from "passport"
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from "passport-github2";
import dotenv from 'dotenv'
dotenv.config()


passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'https://x-rnmn.onrender.com/user/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
      try {
            done(null, profile);
      } catch (err) {
            done(err, null);
      }
}));

passport.use(new GitHubStrategy({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'https://x-rnmn.onrender.com/user/auth/github/callback',
}, async (accessToken, refreshToken, profile, done) => {
      try {
            done(null, profile);
      } catch (err) {
            done(err, null);
      }
}));