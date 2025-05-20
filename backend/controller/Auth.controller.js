import User from "../model/User.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  const { name, email, contact, password, confirmPassword } = req.body;
  try {
    // Check if all fields are provided
    if (!name || !email || !contact || !password || !confirmPassword) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    // Check if user already exists
    const existingUser = await User.find({ email });
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Check if password and confirm password match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const hashedConfirmPassword = await bcrypt.hash(confirmPassword, salt);

    // Create a new user

    const newUser = new User({
      name,
      email,
      contact,
      password: hashedPassword,
      confirmPassword: hashedConfirmPassword,
    });

    // Save the user to the database
    const savedUser = await newUser.save();
    if (savedUser) {
      return res.status(201).json({ message: "User registered successfully" });
    } else {
      return res.status(400).json({ message: "Failed to register user" });
    }
  } catch (error) {
    console.log(error.message);
  }
};
