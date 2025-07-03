import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import Connection from "./db/db.js";
import userDataRouter from "./routes/userDataRoutes.js"; // định nghĩa router xử lý ESP

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Kết nối tới MongoDB
Connection();

// Middleware
app.use(cors());
app.use(express.json()); // xử lý dữ liệu JSON từ ESP

// API route chính
app.use("/api", userDataRouter); // toàn bộ xử lý ESP dùng router này

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
