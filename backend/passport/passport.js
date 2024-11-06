import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/userSchema.js";
import dotenv from "dotenv";

dotenv.config({path: "./config/config.env"});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://jobquestdeploy.onrender.com/api/v1/user/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // check if there is already a user with the same google id in the database
        let user = await User.findOne({ googleId: profile.id });

        // if the googleid doesn t match anyone in the database we store them on it
        if (!user) {
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email:
              profile.emails && profile.emails[0]
                ? profile.emails[0].value
                : null,
            password: null, // or an empty string ''
            role: "Job Seeker",
            
          });
        }
        // we see data stored oof the user
        // and we retuen the data of the user to use it later
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    // get the logged user data too use it in the session
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);  
  }
});

export default passport;