#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

// === WiFi credentials ===
const char* ssid = "Esp111";
const char* password = "11223344";

// === Server API URL ===
//  <IP-SERVER> bằng IP  mạng 
const char* serverPostURL = "http://<IP-SERVER>:3000/api/user-data";
const char* serverGetBaseURL = "http://<IP-SERVER>:3000/api/user-data/";

// === Dữ liệu mẫu để gửi ===
String csvData = "123456,Nguyen Van A,22,170,60,20.8";  
String rfidToCheck = "123456";     //checkid                     

void setup() {
  Serial.begin(115200);

  // === Kết nối WiFi ===
  WiFi.begin(ssid, password);
  Serial.print("conecting WiFi....");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println("\n WiFi conected ");
  Serial.print("IP: ");
  Serial.println(WiFi.localIP());

  // === Gửi dữ liệu CSV lên server ===
  sendCSVData(csvData);

  delay(2000); 

  //Truy vấn theo RFID 
  getUserByRFID(rfidToCheck);
}

void loop() {
  // Có thể chờ xử lý SPI sau này
}

//  post string to sever
void sendCSVData(String csv) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverPostURL);
    http.addHeader("Content-Type", "application/json");

    // create body JSON: { "data": "csv string" }
    String jsonBody = "{\"data\":\"" + csv + "\"}";

    int httpResponseCode = http.POST(jsonBody);
    String response = http.getString();

    Serial.println(" POST Status: " + String(httpResponseCode));
    Serial.println(" Response: " + response);

    http.end();
  } else {
    Serial.println(" WiFi chưa kết nối");
  }
}

// truy vấn  theo RFID từ server
void getUserByRFID(String rfid_id) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    String fullURL = serverGetBaseURL + rfid_id;
    http.begin(fullURL);

    int httpResponseCode = http.GET();
    String payload = http.getString();

    Serial.println("GET Status: " + String(httpResponseCode));
    Serial.println("Thông tin người dùng:");
    Serial.println(payload);

    http.end();
  } else {
    Serial.println("WiFi chưa kết nối");
  }
}
