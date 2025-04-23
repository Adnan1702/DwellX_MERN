import express from "express";
import mongoose from "mongoose";
import Message from '../models/Messages.js';

const MessageRouter = express.Router();

// Send Message
MessageRouter.post("/", async (req, res) => {
    try {
        const { senderId, receiverId, propertyId, message } = req.body;

        if (!senderId || !receiverId || !propertyId || !message) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const newMessage = new Message({
            senderId: new mongoose.Types.ObjectId(senderId),
            receiverId: new mongoose.Types.ObjectId(receiverId),
            propertyId: new mongoose.Types.ObjectId(propertyId),
            message
        });

        await newMessage.save();
        res.status(201).json({ success: true, message: "Message sent successfully!" });
    } catch (error) {
        console.error("Error saving message:", error);
        res.status(500).json({ error: "Server error. Try again later." });
    }
});

// Get Messages
MessageRouter.get("/user/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        const messages = await Message.find({ receiverId: new mongoose.Types.ObjectId(userId) })
            .populate("senderId", "name email")  // Populate sender details
            .populate("propertyId", "name photo") // Populate property details
            .sort({ timestamp: -1 });

        res.status(200).json(messages);
    } catch (error) {
        console.error("Error fetching messages:", error.message);
        res.status(500).json({ error: "Server error", details: error.message });
    }
});


export default MessageRouter;
