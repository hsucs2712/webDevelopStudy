const { render } = require("ejs");
const Post = require("../models/post_models");

const router = require("express").Router();

const authCheck = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/auth/login");
  }
};

router.get("/", authCheck, async (req, res) => {
  let postFound = await Post.find({ author: req.user._id });
  return res.render("profile", { user: req.user, posts: postFound });
});

router.get("/post", authCheck, (req, res) => {
  return res.render("post", { user: req.user });
});

router.post("/post", authCheck, async (req, res) => {
  let { title, content } = req.body;
  let newPost = new Post({ title, content, author: req.user._id });
  try {
    await newPost.save();
    return res.redirect("/profile");
  } catch (e) {
    req.flash("error_msg", "標題與內容都要填寫才能發布");
    return res.redirect("/profile/post");
  }
});
module.exports = router;
