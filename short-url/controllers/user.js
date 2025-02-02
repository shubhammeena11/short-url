const User = require("../models/user");
require('dotenv').config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


async function createUser(req, res) {
    try {
        const { name, email, password } = req.body;
        
        // Validate email and password
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10); // Hash password before saving
        
        const newUser = await User.create({ name,  email : email.toLowerCase(), password: hashedPassword });
        res.status(201).json({ message: "User created successfully", user: newUser.name});
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
}


async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        console.log("Received Request Body:", req.body);

        console.log("Email received from client:", email);
        const user = await User.findOne({ email : email.toLowerCase() });
        console.log("User found in DB:", user);

        if (!user) {
            return res.status(401).json({ message: "Email not found" });
        }

        // Compare entered password with stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid Password" });
        }

        // Generate JWT Token (optional)
        const token = generateToken(user);

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }    
}
function generateToken(user) {
    // Use your secret key to generate a token (JWT)
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET , { expiresIn: "1h" });
    return token;
}

module.exports = { createUser, loginUser }; // Fix export name
