// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
    if (req.session._id) {
      res.redirect("/");
    } else {
      next();
    }
  };

module.exports = sessionChecker;