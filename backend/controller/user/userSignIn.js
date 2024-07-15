const bcrypt = require('bcryptjs');
const userModel = require('../../models/userModel');
const jwt = require('jsonwebtoken');

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
            const tokenData = {
                _id: user._id,
                email: user.email,
            };

            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: '8h' });

            const cookieOptionsNone = {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Set secure flag based on environment
                sameSite: 'None', // Use 'None' for cross-site requests
                maxAge: 1000 * 60 * 60 * 8, // 8 hours expiration
            };

            const cookieOptionsStrict = {
                httpOnly: true,
                secure: true, // Set secure flag based on environment
                sameSite: 'Strict', // Use 'Strict' for first-party requests
                maxAge: 1000 * 60 * 60 * 8, // 8 hours expiration
            };

            // Set both cookies
            res.cookie("tokenNone", token, cookieOptionsNone).cookie("tokenStrict", token, cookieOptionsStrict).status(200).json({
                message: "Login successfully",
                data: token,
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

module.exports = userSignInController;
