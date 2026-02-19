import jwt from 'jsonwebtoken';

export const validateJWT = (req, res, next) => {

  console.log("JWT_SECRET VERIFY:", process.env.JWT_SECRET);

  try {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.replace('Bearer ', '');

    console.log("TOKEN:", token);

    const { uid } = jwt.verify(token, process.env.JWT_SECRET);

    console.log("UID:", uid);

    req.uid = uid;

    next();

  } catch (error) {
    console.log("VERIFY ERROR:", error.message);
    return res.status(401).json({ message: 'Invalid token' });
  }
};
