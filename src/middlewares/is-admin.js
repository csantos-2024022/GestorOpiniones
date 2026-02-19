import User from '../auth/user.model.js';

export const isAdmin = async (req, res, next) => {
  try {

    const user = await User.findById(req.uid);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Access denied: Admin only' });
    }

    next();

  } catch (error) {
    res.status(500).json({ message: 'Error verifying role' });
  }
};