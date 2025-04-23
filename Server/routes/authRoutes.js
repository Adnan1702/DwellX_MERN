import express from 'express'
import { isAuthenticated, login, logout, register, resetPassword, sendResetOtp, googleLogin } from '../controllers/authController.js';

export const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.get('/is-authenticated', isAuthenticated);
authRouter.post('/send-reset-otp', sendResetOtp);
authRouter.post('/reset-password', resetPassword);
authRouter.post('/google-login', googleLogin);


