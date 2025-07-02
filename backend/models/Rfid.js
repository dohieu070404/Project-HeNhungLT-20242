import mongoose from "mongoose";

// Model: Lưu log quét thẻ RFID
const RfidSchema = new mongoose.Schema({
  rfid_id: {
    type: String,
    required: true,
    unique: false, // mỗi lần quét một thẻ có thể lưu nhiều lần
  },
  time: {
    type: Date,
    default: Date.now,
    required: true
  },
  status: {
    type: String,
    required: true  
  }
});

const RfidLog = mongoose.model("RfidLog", RfidSchema);
export default RfidLog;
