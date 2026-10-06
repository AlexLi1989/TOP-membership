//check for logged in status
function ensureAuthenticated(req, res, next) {
  if (!req.isAuthenticated?.()) {
    const error = new Error("Unauthorized");
    error.status = 401;
    return next(error);
  }
  return next();
}

//check for admin status
function ensureAdmin(req, res, next) {
  if (req.user && req.user.admin_status) {
    return next();
  }
  const error = new Error("Forbidden");
  error.status = 403;
  return next(error);
}

module.exports = {
  ensureAuthenticated,
  ensureAdmin,
};
