// import fetch from "node-fetch";

// const received = "POST,123456,68.5,1.75";

// if (received.startsWith("POST")) {
//   const data = received.substring(5); // Cắt bỏ "POST,"
//   const [userId, weightStr, heightStr] = data.split(",");

//   const weight = parseFloat(weightStr);
//   const height = parseFloat(heightStr);

//   if (isNaN(weight) || isNaN(height)) {
//     console.log(" Giá trị không hợp lệ.");
//     process.exit(1);
//   }

//   const bmi = weight / (height * height);
//   const bmiRounded = parseFloat(bmi.toFixed(2));

//   let status = "";
//   if (bmi < 18.5) status = "THIN";
//   else if (bmi < 24.9) status = "NORMAL";
//   else if (bmi < 29.9) status = "OVERWEIGHT";
//   else status = "OBESE";

//   console.log("Parsed:");
//   console.log("User ID:", userId);
//   console.log("Weight:", weight, "kg");
//   console.log("Height:", height, "m");
//   console.log("BMI:", bmiRounded);
//   console.log("Status:", status);

//   //  Gửi dữ liệu lên server Node API (MongoDB)
//   try {
//     const response = await fetch("http://192.168.1.53:3000/api/user-data", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//     data: "create,123456,Nguyen Van A,25,1.70,68.5,23.7"
//       }),
//     });

//     const result = await response.json();

//     if (response.ok) {
//       console.log(" Gửi thành công. Đã lưu vào MongoDB:");
//       console.log(result);
//     } else {
//       console.log(" Gửi thất bại:", result);
//     }
//   } catch (err) {
//     console.error(" Lỗi khi gửi:", err.message);
//   }

// } else {
//   console.log("Không đúng định dạng POST");
// }





// //chay demo node testStringParser.js

import fetch from "node-fetch";

// === Thông tin mẫu ===
const rfid = "123456";
const name = "Nguyen Van A";
const age = 25;
const height = 1.70;
const baseURL = "http://192.168.1.53:3000/api/user-data";

// === Hàm gửi lệnh dạng CSV string ===
async function sendCSV(csvString, description = "") {
  try {
    const response = await fetch(baseURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: csvString }),
    });

    const result = await response.json();
    console.log(`\n=== ${description} ===`);
    console.log("Status:", response.status);
    console.log("Response:", result);
  } catch (err) {
    console.error(`❌ Lỗi khi gửi ${description}:`, err.message);
  }
}

// === Hàm tính BMI từ cân nặng và chiều cao ===
function calcBMI(weight, height) {
  return parseFloat((weight / (height * height)).toFixed(2));
}

// === Chạy toàn bộ các API ===
async function testAll() {
  // 1. Tạo người dùng
  const initWeight = 68.5;
  const initBmi = calcBMI(initWeight, height);
  await sendCSV(`create,${rfid},${name},${age},${height},${initWeight},${initBmi}`, "Tạo người dùng");

  // 2. Check người dùng tồn tại
  await sendCSV(`check,${rfid},_,_,_,_,_`, "Check RFID");

  // 3. Lấy thông tin người dùng
  await sendCSV(`get,${rfid},_,_,_,_,_`, "Get thông tin người dùng");

  // 4. Mô phỏng cập nhật cân nặng 5 lần
  const weights = [69.2, 70.0, 70.5, 71.0, 69.8, 70.3];
  for (let i = 0; i < weights.length; i++) {
    const weight = weights[i];
    const bmi = calcBMI(weight, height);
    await sendCSV(`updateWeight,${rfid},_,_,_,${weight},${bmi}`, `Lần cân thứ ${i + 1}`);
    await new Promise((resolve) => setTimeout(resolve, 500)); // chờ 0.5s giữa các lần
  }

  // 5. Lấy cân nặng mới nhất
  await sendCSV(`weight,${rfid},_,_,_,_,_`, "Lấy cân nặng hiện tại");

  // 6. Lấy thông tin tổng quát
  await sendCSV(`info,${rfid},_,_,_,_,_`, "Lấy info");

  // 7. Lấy lịch sử cân (5 lần gần nhất)
  await sendCSV(`history,${rfid},_,_,_,_,_`, "Lấy lịch sử 5 lần cân");

  // 8. Xoá người dùng (toàn bộ bản ghi)
//   await sendCSV(`delete,${rfid},_,_,_,_,_`, "Xoá người dùng");
}

// === Bắt đầu test ===
testAll();
