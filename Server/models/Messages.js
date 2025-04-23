import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("Message", MessageSchema);
