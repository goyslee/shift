var User = require("../models/user");
var Comment = require("../models/comment");
//middlewares all
var middlewareObj = {};
middlewareObj.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "Please log in first.");
  res.redirect("/login");
};
middlewareObj.notLoggedIn = function (req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};
middlewareObj.loggedInAlready = function (req, res, next) {
  if (!req.user) {
    return next();
  }
  req.flash("error", "You are logged in already!");
  res.redirect("/");
};
middlewareObj.isAdmin = function (req, res, next) {
  if (req.user.isAdmin == true) {
    next();
  } else {
    req.flash(
      "error",
      "You do not have permission for this action! Use admin and superadmin log in. User: tjoe, Password: tjoe ",
    );
    res.redirect("back");
  }
};
middlewareObj.checkCommentOwnership = async function (req, res, next) {
  if (req.isAuthenticated()) {
    try {
      const foundComment = await Comment.findById(req.params.comment_id).exec();
      if (!foundComment) {
        req.flash("error", "Comment has not found.");
        return res.redirect("back");
      }
      if (
        foundComment.author.id.equals(req.user._id) ||
        (req.isAuthenticated() && req.user.username === adminUser)
      ) {
        next();
      } else {
        res.redirect("back");
      }
    } catch (err) {
      console.log(err);
      req.flash("error", "An error occurred.");
      res.redirect("back");
    }
  } else {
    res.redirect("back");
  }
};
module.exports = middlewareObj;
