import express from "express";
import fetch from "node-fetch";
import LED from "../models/Led.js";
import RfidLog from "../models/Rfid.js";
const router = express.Router();
const espIP = "http://172.20.10.2";

// Manage LED: send command to ESP32 and log to MongoDB
router.post("/manageLed", async (req, res) => {
  try {
    // Prepare payload for ESP32
    const payload = {
      name: req.body.name,
      mode: req.body.mode,
      status: req.body.status,
    };

    // Send request to ESP32
    const espResponse = await fetch(`${espIP}/handleLED`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    // Check ESP32 connectivity
    if (!espResponse.ok) {
      return res.status(502).json({ message: "Failed to reach ESP32" });
    }

    const espData = await espResponse.json();

    // Validate ESP32 response
    if (espData.success !== "true") {
      return res.status(500).json({ message: "ESP32 command execution failed" });
    }

    // Log LED action to database
    const logEntry = new LED({
      name: req.body.name,
      time: new Date(),
      ledStatus: req.body.status,
      mode: req.body.mode,
      userId: req.body.userId,
    });

    const savedLog = await logEntry.save();
    return res.status(200).json(savedLog);
  } catch (error) {
    console.error("Manage LED error:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// Get all LED logs
router.get("/leds", async (req, res) => {
  try {
    const logs = await LED.find().sort({ time: -1 });
    return res.status(200).json(logs);
  } catch (error) {
    console.error("Get LEDs error:", error);
    return res.status(500).json({ message: "Failed to retrieve LED logs", error: error.message });
  }
});
// ======================
// RFID Routes
// ======================

// Log RFID scan
router.post("/rfid/scan", async (req, res) => {
  try {
    const { rfid_id, status } = req.body;
    const log = new RfidLog({ rfid_id, status, time: new Date() });
    const saved = await log.save();
    return res.status(201).json(saved);
  } catch (error) {
    console.error("RFID scan error:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// Retrieve RFID logs (optionally filter by rfid_id)
router.get("/rfid/logs", async (req, res) => {
  try {
    const { rfid_id } = req.query;
    const filter = rfid_id ? { rfid_id } : {};
    const logs = await RfidLog.find(filter).sort({ time: -1 });
    return res.status(200).json(logs);
  } catch (error) {
    console.error("RFID logs error:", error);
    return res.status(500).json({ message: "Failed to retrieve RFID logs", error: error.message });
  }
});

export default router;


// //Post Method
// router.post("/post", (req, res) => {
//   res.send("Post API");
// });

// //Get all Method
// router.get("/getAll", (req, res) => {
//   res.send("Get All API");
// });

// //Get by ID Method
// router.get("/getOne/:id", (req, res) => {
//   res.send(req.params.id);
// });

// //Update by ID Method
// router.patch("/update/:id", (req, res) => {
//   res.send("Update by ID API");
// });

// //Delete by ID Method
// router.delete("/delete/:id", (req, res) => {
//   res.send("Delete by ID API");
// });





curl -X POST http://172.20.10.2/manageLed \
  -H "Content-Type: application/json" \
  -d '{"name":"LED1","mode":"manual","status":"on","userId":"admin"}'
