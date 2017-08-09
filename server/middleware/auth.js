export function isAuthed(req, res, next) {
  // Treat devs as admin.
  if (JSON.stringify(process.env.NODE_ENV) === 'test'
    || JSON.stringify(process.env.NODE_ENV) === 'development') {
    return next();
  }
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).send('Not authorized.');
}

export function isAdmin(req, res, next) {
  // Treat devs as admin.
  if (JSON.stringify(process.env.NODE_ENV) === 'test'
    || JSON.stringify(process.env.NODE_ENV) === 'development') {
    return next();
  }
  if (req.isAuthenticated() && req.user.role === 0) {
    return next();
  }
  return res.status(401).send('Not authorized.');
}
