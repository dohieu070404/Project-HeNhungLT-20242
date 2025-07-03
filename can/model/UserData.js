// import mongoose from "mongoose";

// const UserSchema = new mongoose.Schema({
//   rfid_uid: {
//     type: String,
//     required: true,
//     unique: true, // mỗi thẻ RFID chỉ gán cho 1 người
//   },
//   name: {
//     type: String,
//     required: true,
//   },
//   age: {
//     type: Number,
//   },
//   weight: {
//     type: Number, // đơn vị kg
//   },
//   height: {
//     type: Number, // đơn vị cm
//   }
// }, { timestamps: true });

// const User = mongoose.model("User", UserSchema);
// export default User;


import mongoose from "mongoose";

const UserDataSchema = new mongoose.Schema({
  rfid_id: { 
    type: String, 
    required: true, 
    // unique: true   // mỗi thẻ RFID chỉ gán cho 1 người
    
  },
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  bmi: {
    type: Number,
    required: true
  },
  time: {
    type: Date,
    default: Date.now
  }
});

const UserData = mongoose.model("UserData", UserDataSchema);

export default UserData;

