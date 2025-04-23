import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // ✅ Fix field name
    name: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    photo: { type: String }
});

export default mongoose.model("Property", PropertySchema);
