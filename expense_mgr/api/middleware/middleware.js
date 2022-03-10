// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
    if (req.session._id) {
      next();
    } else {
      res.redirect("/login");
    }
  };

module.exports = sessionChecker;



