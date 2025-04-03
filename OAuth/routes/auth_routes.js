const router = require("express").Router();
const passport = require("passport");
const User = require("../models/user_model");
const bcrypt = require("bcrypt");

router.get("/login", (req, res) => {
  return res.render("login", { user: req.user });
});

router.get("/logout", (req, res) => {
  req.logOut((err) => {
    if (err) return next(err);
    return res.redirect("/");
  });
});

router.get("/signup", (req, res) => {
  return res.render("signup", { user: req.user });
});

router.post("/signup", async (req, res, next) => {
  let { name, email, password } = req.body;
  if (password.length < 8) {
    req.flash("error_msg", "Password must be at least 8 characters long");
    return res.redirect("/auth/signup");
  }

  //check email
  const foundEmail = await User.findOne({ email }).exec();
  if (foundEmail) {
    req.flash("error_msg", "Email 已被註冊");
    return res.redirect("/auth/signup");
  }

  let hashedPassword = await bcrypt.hash(password, 12);
  let newUser = new User({ name, email, password: hashedPassword });
  await newUser.save();
  req.flash("success_msg", "註冊成功");
  return res.redirect("/auth/login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/auth/login",
    failureFlash: "login failed",
  }),
  (req, res) => {
    return res.redirect("/profile");
  }
);
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  return res.redirect("/profile");
});

module.exports = router;
