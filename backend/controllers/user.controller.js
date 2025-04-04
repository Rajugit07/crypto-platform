import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register User
export const register = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        if (!fullname || !email || !password) {
            return res
                .status(400)
                .json({ message: "All fields are required", success: false });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res
                .status(400)
                .json({ message: "User already exists", success: false });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        await User.create({ fullname, email, password: hashPassword });

        return res
            .status(201)
            .json({ message: "Account created successfully", success: true });
    } catch (error) {
        console.error("Error in user registration:", error);
        return res
            .status(500)
            .json({ message: "Internal Server Error", success: false });
    }
};

// Login User
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "All fields are required", success: false });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false,
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false,
            });
        }

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
            expiresIn: "1d",
        });

        // Set Cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // Change to true in production (for HTTPS)
            sameSite: "Lax", // Allows cookies in same-origin requests
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        return res.status(200).json({
            message: `Welcome back ${user.fullname}`,
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
            },
            success: true,
        });
    } catch (error) {
        console.error("Error in user login:", error);
        return res
            .status(500)
            .json({ message: "Internal Server Error", success: false });
    }
};

// Logout User
export const logout = async (req, res) => {
    try {
        res.cookie("token", "", {
            httpOnly: true,
            secure: false, // Change to true in production
            sameSite: "Lax",
            expires: new Date(0), // Expire the cookie immediately
        });

        return res
            .status(200)
            .json({ message: "User logged out successfully", success: true });
    } catch (error) {
        console.error("Error in user logout:", error);
        return res
            .status(500)
            .json({ message: "Internal Server Error", success: false });
    }
};
