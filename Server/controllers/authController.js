import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.json({ success: false, message: 'Missing Details' });
    }

    try {
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.json({ success: false, message: "User Already Exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new userModel({ name, email, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {  // ✅ Token is set in cookies
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // ✅ MISSING: Send token in response for frontend storage
        return res.json({
            success: true,
            message: "Registration Successful",
            userId: user._id,
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            }
        });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


export const login = async (req, res) => {

    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) return res.status(400).json({ success: false, message: "User not found" });

    if (!user.password) {
        return res.status(400).json({ success: false, message: "This account is linked with Google. Use Google Login." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json({ success: false, message: "Incorrect password" });

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.json({ success: true, message: "Login successful", user, token });
};

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ?
                'none' : 'strict',
        })

        return res.json({ success: true, message: "Logged Out Successfully" })
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

export const isAuthenticated = (req, res) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
    }

    // If token exists, verify and return user details (modify based on your JWT setup)
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return res.json({ success: true, user: decoded });
    } catch (error) {
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};

export const sendResetOtp = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.json({ success: false, message: 'Please Enter Email' })
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'User Does not Exist' })
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000

        await user.save();

        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Reset Password',
            text: `Your OTP for resetting your password is ${otp}. Reset your password using this OTP. DO NOT SHARE THIS OTP WITH ANYONE !!`
        };
        await transporter.sendMail(mailOption);

        return res.json({ success: true, message: 'OTP to Reset Password Sent' })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        return res.json({ success: false, message: 'Please fill in the details' })
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'User Does Not Exist' })
        }

        if (user.resetOtp === "" || user.resetOtp !== otp) {
            return res.json({ success: false, message: 'Invalid OTP' })
        }

        if (user.resetOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: 'OTP Expired' })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        user.resetOtp = '',
            user.resetOtpExpireAt = 0;

        await user.save();
        return res.json({ success: true, message: 'Password Reset Successful' })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

export const googleLogin = async (req, res) => {
    const { name, email, googleId, profilePic } = req.body;

    if (!name || !email || !googleId) {
        return res.json({ success: false, message: "Missing Google ID" });
    }

    try {
        let user = await userModel.findOne({ email });

        if (!user) {
            // Create new user
            user = new userModel({
                name,
                email,
                googleId,
                profilePic
            });
            await user.save();
        }

        // ✅ Generate JWT Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // ✅ Set cookie (for backend authentication)
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // ✅ Send token in response (for frontend storage)
        return res.json({
            success: true,
            message: "Google Login Successful",
            token, // ✅ Include token here
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                profilePic: user.profilePic,
                googleId: user.googleId
            }
        });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

