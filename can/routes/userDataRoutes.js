// import express from "express";
// import UserData from "../model/UserData.js";

// const userDataRouter = express.Router();

// userDataRouter.post("/user-data", async (req, res) => {
//   try {
//     const raw = req.body.data;

//     const parts = raw.split(",");

//     if (parts.length !== 7) {
//       return res.status(400).json({ message: "Invalid format: expected 7 fields" });
//     }

//     const [status, rfid_id, name, age, height, weight, bmi] = parts;

//     const parsedData = {
//       rfid_id,
//       name,
//       age: parseInt(age),
//       height: parseFloat(height),
//       weight: parseFloat(weight),
//       bmi: parseFloat(bmi),
//       time: new Date(),
//     };

//     // Xử lý tùy theo status
//     switch (status.toLowerCase()) {
//       case "check": {
//         const found = await UserData.findOne({ rfid_id });
//         if (found) {
//           return res.status(200).json({ message: "User found", data: found });
//         } else {
//           return res.status(404).json({ message: "User not found" });
//         }
//       }

//       case "get": {
//         const record = await UserData.findOne({ rfid_id });
//         if (record) {
//           return res.status(200).json({ data: record });
//         } else {
//           return res.status(404).json({ message: "User not found" });
//         }
//       }

//       case "update": {
//         const updated = await UserData.findOneAndUpdate(
//           { rfid_id },
//           { $set: parsedData },
//           { new: true }
//         );
//         if (updated) {
//           return res.status(200).json({ message: "User updated", data: updated });
//         } else {
//           return res.status(404).json({ message: "User not found to update" });
//         }
//       }

//       case "create": {
//         const exists = await UserData.findOne({ rfid_id });
//         if (exists) {
//           return res.status(409).json({ message: "User already exists" });
//         }
//         const newRecord = new UserData(parsedData);
//         const saved = await newRecord.save();
//         return res.status(201).json({ message: "User created", data: saved });
//       }

//       case "delete": {
//         const deleted = await UserData.findOneAndDelete({ rfid_id });
//         if (deleted) {
//           return res.status(200).json({ message: "User deleted", data: deleted });
//         } else {
//           return res.status(404).json({ message: "User not found to delete" });
//         }
//       }

//       default:
//         return res.status(400).json({ message: "Unknown command in status field" });
//     }
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// });

// export default userDataRouter;


import express from "express";
import UserData from "../model/UserData.js";

const userDataRouter = express.Router();

userDataRouter.post("/user-data", async (req, res) => {
  try {
    const raw = req.body.data;
    const parts = raw.split(",");

    if (parts.length !== 7) {
      return res.status(400).json({ message: "Dữ liệu không đúng định dạng (7 phần tử)" });
    }

    const [status, rfid_id, name, age, height, weight, bmi] = parts;

    // Tạo bản ghi mới dựa trên thông tin nhận được
    const parsedData = {
      rfid_id,
      name,
      age: parseInt(age),
      height: parseFloat(height),
      weight: parseFloat(weight),
      bmi: parseFloat(bmi),
      time: new Date(),
    };

    // =================== XỬ LÝ THEO status ===================
    switch (status.toLowerCase()) {
      // Kiểm tra user có tồn tại không
      case "check": {
        const found = await UserData.findOne({ rfid_id });
        if (found) {
          return res.status(200).json({ message: "User found", data: found });
        } else {
          return res.status(404).json({ message: "User not found" });
        }
      }

      // Trả về thông tin gần nhất của user
      case "get": {
        const record = await UserData.findOne({ rfid_id }).sort({ time: -1 });
        if (record) {
          return res.status(200).json({ data: record });
        } else {
          return res.status(404).json({ message: "User not found" });
        }
      }

      // Tạo mới lần đầu
      case "create": {
        const exists = await UserData.findOne({ rfid_id });
        if (exists) {
          return res.status(409).json({ message: "User already exists" });
        }
        const newRecord = new UserData(parsedData);
        const saved = await newRecord.save();
        return res.status(201).json({ message: "User created", data: saved });
      }

      // ❗ Ghi thêm một bản mới thay vì cập nhật đè
      case "update": {
        const latest = await UserData.findOne({ rfid_id }).sort({ time: -1 });
        if (!latest) {
          return res.status(404).json({ message: "User not found to update" });
        }

        const newRecord = new UserData(parsedData);
        const saved = await newRecord.save();
        return res.status(201).json({ message: "User updated (new record)", data: saved });
      }

      // Xóa toàn bộ user
      case "delete": {
        const deleted = await UserData.deleteMany({ rfid_id });
        if (deleted.deletedCount > 0) {
          return res.status(200).json({ message: "All user records deleted", count: deleted.deletedCount });
        } else {
          return res.status(404).json({ message: "User not found to delete" });
        }
      }

      // Lấy cân nặng mới nhất
      case "weight": {
        const user = await UserData.findOne({ rfid_id }).sort({ time: -1 });
        if (user) {
          return res.status(200).json({ weight: user.weight });
        } else {
          return res.status(404).json({ message: "User not found" });
        }
      }

      // Trả về tất cả thông tin cân
      case "info": {
        const user = await UserData.findOne({ rfid_id }).sort({ time: -1 });
        if (user) {
          return res.status(200).json({
            weight: user.weight,
            age: user.age,
            height: user.height,
            bmi: user.bmi,
          });
        } else {
          return res.status(404).json({ message: "User not found" });
        }
      }

      // ❗ Cập nhật cân nặng → tạo bản ghi mới (dựa trên height đã lưu)
      case "updateweight": {
        const latest = await UserData.findOne({ rfid_id }).sort({ time: -1 });
        if (!latest) {
          return res.status(404).json({ message: "User not found for update weight" });
        }

        const newWeight = parseFloat(weight);
        const bmiNew = parseFloat((newWeight / (latest.height * latest.height)).toFixed(2));

        const newRecord = new UserData({
          rfid_id,
          name: latest.name,
          age: latest.age,
          height: latest.height,
          weight: newWeight,
          bmi: bmiNew,
          time: new Date(),
        });

        const saved = await newRecord.save();
        return res.status(201).json({ message: "Weight recorded", data: saved });
      }

      // Lấy 5 lần cân gần nhất
      case "history": {
        const history = await UserData.find({ rfid_id }).sort({ time: -1 }).limit(5);
        if (history.length > 0) {
          return res.status(200).json({ history });
        } else {
          return res.status(404).json({ message: "No history found" });
        }
      }

      // Nếu không khớp status nào
      default:
        return res.status(400).json({ message: "Unknown command in status field" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default userDataRouter;
