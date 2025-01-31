import User from "../model/usermodel.js";
import { generateToken } from "../utils/token.js";
import { generateCookie } from "../utils/createCookie.js";
import jwt from "jsonwebtoken";

const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    // Create new user
    const user = await User.create({ username, email, password });

    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      msg: "user created succesfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("fullname username email phone password");


    if (user && (await user.matchPassword(password))) {
      //generate token
      const token = generateToken(user._id);
      //generate cookie before sending the request
      generateCookie(res, token);
      //
      res.status(200).json({
        id: user._id,
        fullname: user._fullname,
        username: user._username,
        email: user.email,
        phone: user._phone,
        token,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const logout = (req, res) => {
  try {
    // Get the token from cookies
    const token = req.cookies?.token;

    if (!token) {
      return res.status(400).json({ message: "No active session found" });
    }

    // Verify the token and extract the user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Clear the cookie
    res.clearCookie("authToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure in production
      sameSite: "Strict",
    });

    res.status(200).json({ message: `User ${decoded.id} logged out successfully` });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



export { signup, login, logout };
