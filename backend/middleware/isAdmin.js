const isAdmin = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized - User not found' });
    }

    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Forbidden - Admin access required' });
    }

    req.isAdmin = true; 
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = isAdmin;