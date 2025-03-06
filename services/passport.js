/**
 * This file sets up authentication using Google OAuth and Passport.js.
	•	It allows users to log in with Google instead of a username/password.
	•	It interacts with MongoDB to check if the user exists and store new users.
 */

  const passport = require("passport");
  const GoogleStrategy = require("passport-google-oauth20");
  const keys = require("../config/keys");
  const mongoose = require("mongoose");
  
  //Loads the users model registered in User.js.
  //This allows us to query and save users in MongoDB.
  const User = mongoose.model("users");
  
  
  //Passport requests user information from Google.
  //The user’s Google profile (including googleId) is retrieved.
  passport.use(new GoogleStrategy({
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
      /**
       * 1.Google OAuth sends back a response, including accessToken, refreshToken, and profile.
    2.	Passport searches for an existing user in MongoDB.
    3.	If the user already exists, it sends the existing user object to Passport.
    4.	If user does not exist, a new user is created and saved.
       */
  }, async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({googleId: profile.id})
      if (existingUser) {
          return done(null, existingUser)
      }
      const user = await new User({googleId: profile.id}).save()
      done(null, user)
  }));
  
  
  /**
   * How Passport Stores & Retrieves User Data
      Passport stores the user’s ID (not the full object) in the session using serializeUser.
   */
  passport.serializeUser((user, done) => {
     done(null, user.id); // user.id is the unique MongoDB _id assigned when the user is saved in the database.
  });
  
  /**
   * On subsequent requests, Passport retrieves the full user object using deserializeUser.
   *  User.findById(id) finds the user in MongoDB based on the stored session ID.
  ✔️ If found, done(null, user); attaches the full user object to req.user.
  ✔️ Now req.user is available in every Express route.
   */
  passport.deserializeUser((id, done) => {
      User.findById(id)
          .then((user) => {
              done(null, user);
          });
  });
  
  