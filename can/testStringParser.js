//test
const received = "POST,123456,68.5,1.75";
            if (received.startsWith("POST")) 
            {
            const data = received.substring(5); // → "123456,68.5,1.75"
            const [userId, weightStr, heightStr] = data.split(",");
            const weight = parseFloat(weightStr);
            const height = parseFloat(heightStr);
            const bmi = weight / (height * height);
            console.log("ID người dùng:", userId);
            console.log("Cân nặng:", weight, "kg");
            console.log("Chiều cao:", height, "m");
            console.log("BMI:", bmi.toFixed(2));
            if (bmi < 18.5) console.log("Tình trạng: Gầy");
            else if (bmi < 24.9) console.log("Tình trạng: Bình thường");
            else if (bmi < 29.9) console.log("Tình trạng: Thừa cân");
            else console.log("Tình trạng: Béo phì");
            } 
            else {
            console.log("Không đúng định dạng POST");
            }
