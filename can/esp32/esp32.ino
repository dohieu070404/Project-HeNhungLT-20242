#include <WiFi.h>
#include <HTTPClient.h>

// WiFi
const char *ssid = "SONGNAM-STAFF";
const char *password = "songnam@123";

// Server
const char *serverURL = "http://192.168.1.53:3000/api/user-data";

// Dữ liệu
String createData = "create,121212,Nguyen Van B,25,1.70,68.5,23.7";

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

  delay(1000);
  sendCommandToServer(createData);
}

void loop() {}

void sendCommandToServer(String csvData)
{
  if (WiFi.status() == WL_CONNECTED)
  {
    HTTPClient http;
    http.begin(serverURL);
    http.setTimeout(10000); // tăng thời gian chờ
    http.addHeader("Content-Type", "application/json");

    String jsonPayload = "{\"data\":\"" + csvData + "\"}";

    Serial.println("Payload JSON: " + jsonPayload); // debug

    int httpCode = http.POST(jsonPayload);
    String response = http.getString();

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
