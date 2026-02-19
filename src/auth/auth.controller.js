import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './user.model.js';

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: encryptedPassword
    });

    return res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    return res.status(500).json({ message: 'Register error', error: error.message });
  }



};




export const login = async (req, res) => {
  try {

    console.log("JWT_SECRET LOGIN:", process.env.JWT_SECRET);

    const { email, password } = req.body;


    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
  { uid: user._id },
  process.env.JWT_SECRET,
  { expiresIn: '1h'  }
);

    return res.status(200).json({
      message: 'Login successful',
      token
    });

  } catch (error) {
    return res.status(500).json({ message: 'Login error', error: error.message });
  }
};