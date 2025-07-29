function attachUserId(req, res, next) {
  const userId = req.header('x-user-id');
  if (!userId || typeof userId !== 'string' || userId.trim() === '') {
    return res.status(400).json({ error: 'Missing or invalid x-user-id header' });
  }
  req.userId = userId;
  next();
}

module.exports = attachUserId;
