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
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        phone: user.phone,
        token,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const logout = (req, res) => {
  try {
    //check if user has an auth token cookie
    if (!req.cookies.authToken)
      res.status(400).json({ message: "No active session found" });
    //clear cookie
    res.clearCookie("authToken", {
      httpOnly: true,
      sameSite: "Strict",
    });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



export { signup, login, logout };
