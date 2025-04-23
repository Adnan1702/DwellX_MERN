import express from "express";
import jwt from "jsonwebtoken";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import Property from "../models/Property.js";

const PropertyRouter = express.Router();

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "property_images", // Cloudinary folder
        format: async (req, file) => "jpg", // Convert all to JPG
        public_id: (req, file) => Date.now() + "-" + file.originalname,
    },
});

const upload = multer({ storage });

// Adding Property
PropertyRouter.post("/add", upload.single("photo"), async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized. No token provided." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const { name, description, type, price, location } = req.body;
        const photo = req.file?.path; // ✅ Cloudinary URL

        const property = new Property({
            userId,
            name,
            description,
            type,
            price,
            location,
            photo
        });

        await property.save();
        res.status(201).json({ success: true, message: "Property added successfully", property });

    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

// Fetching My Properties
PropertyRouter.get("/", async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized. No token provided." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        // Find properties belonging to the user
        const properties = await Property.find({ userId }).exec();

        // if (properties.length === 0) {
        //     return res.status(404).json({ message: "No properties found." });
        // }

        res.status(200).json(properties);
    } catch (error) {
        console.error("Debug: Server error fetching properties:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

// Fetching All Listed Properties
PropertyRouter.get("/explore", async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized. No token provided." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        // Fetch properties **not** uploaded by the current user
        const properties = await Property.find({ userId: { $ne: userId } }).exec();

        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});


// Fetching Single Property Details
PropertyRouter.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const property = await Property.findById(id);
        if (!property) {
            return res.status(404).json({ message: "Property not found." });
        }

        res.status(200).json(property);
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

// Updating Property Details
PropertyRouter.put("/:id", upload.single("photo"), async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, type, price, location } = req.body;

        let updatedFields = { name, description, type, price, location };

        if (req.file) {
            updatedFields.photo = req.file.path;
        }

        const updatedProperty = await Property.findByIdAndUpdate(id, updatedFields, { new: true });

        if (!updatedProperty) {
            return res.status(404).json({ message: "Property not found." });
        }

        res.status(200).json({ success: true, message: "Property updated successfully", property: updatedProperty });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});


// Deleting Property
PropertyRouter.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProperty = await Property.findByIdAndDelete(id);

        if (!deletedProperty) {
            return res.status(404).json({ message: "Property not found." });
        }

        res.status(200).json({ success: true, message: "Property deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

export default PropertyRouter;
