#include <WiFi.h>
#include <HTTPClient.h>

// WiFi
const char *ssid = "SONGNAM-STAFF";
const char *password = "songnam@123";

const char *serverURL = "http://192.168.1.53:3000/api/user-data";

// ==== Dữ liệu mẫu ====
String createData = "create,112233,Nguyen Van A,22,170,60,20.8";
String checkData = "check,112233,_,_,_,_,_";
String getData = "get,112233,_,_,_,_,_";
String updateData = "update,112233,Nguyen Van B,23,172,62,21.0";
String deleteData = "delete,112233,_,_,_,_,_";

void setup()
{
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi...");
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(500);
  }
  Serial.println("\nWiFi connected");
  Serial.println("IP address: " + WiFi.localIP().toString());

  sendCommandToServer(create);
  delay(1000);
  sendCommandToServer(checkD);
  delay(1000);
  sendCommandToServer(get);
  delay(1000);
  sendCommandToServer(update);
  delay(1000);
  sendCommandToServer(delete);
}

void loop()
{
}

void sendCommandToServer(String csvData)
{
  if (WiFi.status() == WL_CONNECTED)
  {
    HTTPClient http;
    http.begin(serverURL);
    http.addHeader("Content-Type", "application/json");

    String jsonPayload = "{\"data\":\"" + csvData + "\"}";
    int httpCode = http.POST(jsonPayload);
    String response = http.getString();

    Serial.println("=== Gửi: " + csvData);
    Serial.println("HTTP Code: " + String(httpCode));
    Serial.println("Phản hồi: " + response);
    Serial.println("===================================");

    http.end();
  }
  else
  {
    Serial.println("WiFi chưa kết nối");
  }
}
