Đây là project thuộc về bộ môn Hệ nhúng - IT4210 của nhóm 6 . 
Người thực hiện bao gồm : 
    Lê Xuân Cường - 20225797
    Đỗ Trung Hiếu 
    Nguyễn Văn Hiếu - 20225717 
    Bùi Xuân Nhất - 20225897
``````````````````````````````````````````````````````````````````````````````````````````````````````````````````
Kit và các ngoại vi sử dụng : 
- STM32F42i-disc1 : Kit chính để xử lý 
- ESP32 devkit v1 : Kit để giao tiếp và gửi lên server dựa vào module Wifi có sẵn trong kit. 
- Module HX711 + 4 loadcell-50kg : Sử dụng để làm chức năng chính cân . Sử dụng driver có sẵn trên github : https://github.com/nimaltd/HX711 bản mới nhất .  Datasheet đi kèm : https://cdn.sparkfun.com/datasheets/Sensors/ForceFlex/hx711_english.pdf.
- Module RFID RC552 : Sử dụng để quẹt thẻ xác nhận người dùng . Datasheet đi kèm : https://www.handsontec.com/dataspecs/RC522.pdf.
Các công cụ sử dụng trong dự án : 
- STM32 Cube IDE 1.18.1
- STM32 Tough GFX 4.25.0
- Adruino 
``````````````````````````````````````````````````````````````````````````````````````````````````````````````````
Cách cài đặt cho các thành phần của hệ thống : 
1. Clone project về hệ thống rồi copy các thành phần tương ứng .
2. Cài đặt và cách để sử dụng project : 
2.1 Setup trên STM32 :
- Khởi tạo và mở dự án trên tough bằng toughGFX trong phần toughGFX thuộc final project
- Sau khi đã kiểm tra thì sau đó có thể mở code bằng STM32 Cube IDE và có thể trực tiếp build và upload vào kit .
2.2 : Setup với esp32 : 
- Tạo sketch mới trong Adruino ide và chọn kit tương ứng . 
- Copy nội dung file code esp32.ino vào sketch và sau đó tải các thư viện tương ứng . 
- Đổi tên và mật khẩu wifi tương ứng để có thể sử dụng với server. 
2.3 : Setup server : 

3. Ghép nối các thiết bị ngoại vi : 
Ghép nối trực tiếp module HX711 với các loadcell vào theo sơ đồ sau : 
https://circuitjournal.com/img/articles/10_50kg_load_cell/HX711_4x50kg_load_cell_diagram.webp?v=19


``````````````````````````````````````````````````````````````````````````````````````````````````````````````````