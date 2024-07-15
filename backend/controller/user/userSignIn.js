const bcrypt = require('bcryptjs');
const userModel = require('../../models/userModel');
const express = require('express');
const cookieParser = require('cookie-parser');
const router = express.Router();

// Use cookie-parser middleware
router.use(cookieParser());

async function userSignInController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email) {
            throw new Error("Please provide email");
        }
        if (!password) {
            throw new Error("Please provide password");
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            throw new Error("User not found");
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (checkPassword) {
            // Generate a session ID (you can use UUID or any other secure method)
            const sessionId = uuidv4();

            // Set session data (example: _id and email)
            const sessionData = {
                _id: user._id,
                email: user.email,
                sessionId: sessionId  // Include session ID in session data
            };

            // Encrypt session data (you can use a library like crypto or bcrypt for encryption)
            const encryptedSessionData = encryptSessionData(sessionData);

            // Set cookie options
            const cookieOptions = {
                httpOnly: true,
                secure: true, // Set secure flag based on environment
                sameSite: 'Strict', // Use 'Strict' for first-party requests
                maxAge: 1000 * 60 * 60 * 8, // 8 hours expiration
                // domain: 'yourdomain.com', // Uncomment and replace with your domain if necessary
                // path: '/', // Uncomment and specify the path if necessary
            };

            // Set the cookie with encrypted session data
            res.cookie("sessionCookie", encryptedSessionData, cookieOptions)
               .status(200)
               .json({
                   message: "Login successfully",
                   success: true,
                   error: false
               });

        } else {
            throw new Error("Please check Password");
        }

    } catch (err) {
        res.status(500).json({
            message: err.message || "Internal Server Error",
            error: true,
            success: false,
        });
    }
}

// Example function to encrypt session data (replace with your encryption logic)
function encryptSessionData(sessionData) {
    // Example encryption logic (you should implement a secure encryption mechanism)
    const encryptedData = JSON.stringify(sessionData); // Convert to JSON string
    return encryptedData;
}

module.exports = userSignInController;
