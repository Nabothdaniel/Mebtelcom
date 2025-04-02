
import User from "../model/usermodel.js";
import { generateToken } from "../utils/token.js";
import { generateCookie } from "../utils/createCookie.js";
import jwt from "jsonwebtoken";

const signup = async (req, res) => {
  const { fullname, username, email, phone, password } = req.body;

  try {
    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    // Create new user
    const user = await User.create({ fullname, username, email, phone, password });

    res.status(201).json({
      id: user._id,
      username: user.username,
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
        email: user.email,
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
  console.log("Cookies received:", req.cookies);
  console.log("Authorization Header:", req.headers.authorization);

  try {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(400).json({ message: "No active session found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    res.clearCookie("authToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    res.status(200).json({ message: `User logged out successfully` });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const profile = async (req, res) => {
  try {
    // Get the user ID from the request
    const userId = req.user.id;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user profile
    res.status(200).json({
      id: user._id,
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      phone: user.phone,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateProfile = async (req, res) => {
  const { fullname, username, email, phone, password } = req.body;
  const { id } = req.params; // Get user ID from URL

  try {
    const userExists = await User.findById(id);

    if (userExists) {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { fullname, username, email, phone, password }, // Update fields
        { new: true, runValidators: true } // Return updated user
      );

      return res.status(200).json({
        message: "User profile has been updated successfully",
        user: updatedUser,
      });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Something happened", error: err.message });
  }
};


export { signup, login, logout, profile,updateProfile };
