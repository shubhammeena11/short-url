const User = require("../models/user");


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
        
        const newUser = await User.create({ name, email, password: hashedPassword });
        res.status(201).json({ message: "User created successfully", user: newUser.name });
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
}


async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid Email" });
        }

        // Compare entered password with stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid Password" });
        }

        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
}

module.exports = { createUser, loginUser }; // Fix export name
