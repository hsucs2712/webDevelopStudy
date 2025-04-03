const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const User = require("../models/user_model");
const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  let foundUser = await User.findById(id);
  done(null, foundUser);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/redirect",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("進入google strategy的區域");
      console.log(profile);
      console.log("==============");
      let foundUser = await User.findOne({ googleId: profile.id }).exec();
      if (foundUser) {
        console.log("使用者已經註冊過了");
        done(null, foundUser);
      } else {
        console.log("偵測到新用戶");
        let newUser = new User({
          name: profile.displayName,
          googleId: profile.id,
          thumbnail: profile.photos[0].vlaue,
          email: profile.emails[0].value,
        });
        let saveuser = await newUser.save();
        console.log("使用者已經成功註冊");
        done(null, newUser);
      }
    }
  )
);

passport.use(
  new localStrategy(async (username, password, done) => {
    let foundUser = await User.findOne({ email: username }).exec();
    if (foundUser) {
      bcrypt.compare(password, foundUser.password, (err, result) => {
        if (result) {
          done(null, foundUser);
        } else {
          done(null, false);
        }
      });
    } else {
      done(null, false);
    }
  })
);
