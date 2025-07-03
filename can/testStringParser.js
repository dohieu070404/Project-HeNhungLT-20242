import fetch from "node-fetch";

const received = "POST,123456,68.5,1.75";

if (received.startsWith("POST")) {
  const data = received.substring(5); // Cắt bỏ "POST,"
  const [userId, weightStr, heightStr] = data.split(",");

  const weight = parseFloat(weightStr);
  const height = parseFloat(heightStr);

  if (isNaN(weight) || isNaN(height)) {
    console.log(" Giá trị không hợp lệ.");
    process.exit(1);
  }

  const bmi = weight / (height * height);
  const bmiRounded = parseFloat(bmi.toFixed(2));

  let status = "";
  if (bmi < 18.5) status = "THIN";
  else if (bmi < 24.9) status = "NORMAL";
  else if (bmi < 29.9) status = "OVERWEIGHT";
  else status = "OBESE";

  console.log("Parsed:");
  console.log("User ID:", userId);
  console.log("Weight:", weight, "kg");
  console.log("Height:", height, "m");
  console.log("BMI:", bmiRounded);
  console.log("Status:", status);

  //  Gửi dữ liệu lên server Node API (MongoDB)
  try {
    const response = await fetch("http://192.168.1.53:3000/api/user-data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
    data: "create,123456,Nguyen Van A,25,1.70,68.5,23.7"
      }),
    });

    const result = await response.json();

    if (response.ok) {
      console.log(" Gửi thành công. Đã lưu vào MongoDB:");
      console.log(result);
    } else {
      console.log(" Gửi thất bại:", result);
    }
  } catch (err) {
    console.error(" Lỗi khi gửi:", err.message);
  }

} else {
  console.log("Không đúng định dạng POST");
}





//chay demo node testStringParser.js