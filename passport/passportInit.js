/*   To use Passport, tell it how to authenticate users, retrieving them from the database.*/


const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");

const passportInit = () => {
  passport.use(
    "local",
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email: email });
          if (!user) {
            return done(null, false, { message: "Email provided doesn't match the one on file." });
          }

          const result = await user.comparePassword(password);
          if (result) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Password provided doesn't match the one on file." });
          }
        } catch (e) {
          return done(e);
        }
      }
    )
  );

  passport.serializeUser(async function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(async function (id, done) {
    try {
      const user = await User.findById(id);
      if (!user) {
        return done(new Error("User not found"));
      }
      return done(null, user);
    } catch (e) {
      done(e);
    }
  });
};

module.exports = passportInit;