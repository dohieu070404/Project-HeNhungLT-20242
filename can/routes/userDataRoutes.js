import express from "express";
import UserData from "../model/UserData.js";

const userDataRouter = express.Router();

userDataRouter.post("/user-data", async (req, res) => {
  try {
    const raw = req.body.data;

    const parts = raw.split(",");

    if (parts.length !== 7) {
      return res.status(400).json({ message: "Invalid format: expected 7 fields" });
    }

    const [status, rfid_id, name, age, height, weight, bmi] = parts;

    const parsedData = {
      rfid_id,
      name,
      age: parseInt(age),
      height: parseFloat(height),
      weight: parseFloat(weight),
      bmi: parseFloat(bmi),
      time: new Date(),
    };

    // Xử lý tùy theo status
    switch (status.toLowerCase()) {
      case "check": {
        const found = await UserData.findOne({ rfid_id });
        if (found) {
          return res.status(200).json({ message: "User found", data: found });
        } else {
          return res.status(404).json({ message: "User not found" });
        }
      }

      case "get": {
        const record = await UserData.findOne({ rfid_id });
        if (record) {
          return res.status(200).json({ data: record });
        } else {
          return res.status(404).json({ message: "User not found" });
        }
      }

      case "update": {
        const updated = await UserData.findOneAndUpdate(
          { rfid_id },
          { $set: parsedData },
          { new: true }
        );
        if (updated) {
          return res.status(200).json({ message: "User updated", data: updated });
        } else {
          return res.status(404).json({ message: "User not found to update" });
        }
      }

      case "create": {
        const exists = await UserData.findOne({ rfid_id });
        if (exists) {
          return res.status(409).json({ message: "User already exists" });
        }
        const newRecord = new UserData(parsedData);
        const saved = await newRecord.save();
        return res.status(201).json({ message: "User created", data: saved });
      }

      case "delete": {
        const deleted = await UserData.findOneAndDelete({ rfid_id });
        if (deleted) {
          return res.status(200).json({ message: "User deleted", data: deleted });
        } else {
          return res.status(404).json({ message: "User not found to delete" });
        }
      }

      default:
        return res.status(400).json({ message: "Unknown command in status field" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default userDataRouter;