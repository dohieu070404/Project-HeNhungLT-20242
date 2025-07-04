#include <SPI.h>

#define PIN_MOSI 23
#define PIN_MISO 19
#define PIN_SCK 18
#define PIN_SS 5

void setup()
{
  Serial.begin(115200);
  delay(1000);
  Serial.println("ESP32 SPI Master Initialized");

  SPI.begin(PIN_SCK, PIN_MISO, PIN_MOSI, PIN_SS);
  pinMode(PIN_SS, OUTPUT);
  digitalWrite(PIN_SS, HIGH);
}

void loop()
{
  uint8_t dataToSend = 0xAB;
  uint8_t receivedData = 0;

  // Bắt đầu truyền
  digitalWrite(PIN_SS, LOW);
  SPI.beginTransaction(SPISettings(1000000, MSBFIRST, SPI_MODE0));

  receivedData = SPI.transfer(dataToSend);

  // uint8_t buffer[] = {0x01, 0x02, 0x03};
  // uint8_t response[3];

  // digitalWrite(PIN_SS, LOW);
  // SPI.beginTransaction(SPISettings(1000000, MSBFIRST, SPI_MODE0));

  // for (int i = 0; i < 3; i++) {
  //   response[i] = SPI.transfer(buffer[i]);
  // }

  // SPI.endTransaction();
  // digitalWrite(PIN_SS, HIGH);

  SPI.endTransaction();
  digitalWrite(PIN_SS, HIGH);

  Serial.print("Sent: 0x");
  Serial.print(dataToSend, HEX);
  Serial.print(" | Received: 0x");
  Serial.println(receivedData, HEX);

  delay(1000);
}
