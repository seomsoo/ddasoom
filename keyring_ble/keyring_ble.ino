#include <ArduinoBLE.h>  // BLE 라이브러리 포함

// BLE LED 서비스 UUID 정의 
BLEService ledService("9c73e86c-0837-49c0-9a26-ed299e12caf1"); 

// LED 제어를 위한 BLE 특성 정의
BLEByteCharacteristic switchCharacteristic("4ed65ae1-31dc-4a36-8164-0fd01cb015de", BLEWrite | BLEWriteWithoutResponse | BLERead | BLENotify);

const int ledPin = LED_BUILTIN;  // 내장 LED 핀 정의
const int relayPin = 2;          // 릴레이 제어 핀 정의 (D2)

unsigned long timerStart = 0;    // 타이머 시작 시간
bool timerActive = false;        // 타이머가 활성화되었는지 여부

void setup() {
  Serial.begin(9600);             // 시리얼 통신 초기화
  pinMode(ledPin, OUTPUT);        // LED 핀을 출력으로 설정
  pinMode(relayPin, OUTPUT);      // 릴레이 핀을 출력으로 설정
  digitalWrite(relayPin, LOW);    // 릴레이 초기 상태 설정 (꺼짐)

  // BLE 초기화 및 에러 체크
  if (!BLE.begin()) {
    Serial.println("BLE 시작 실패");
    while (1);
  }

  // BLE 장치 이름 설정
  BLE.setLocalName("DDASOMI");
  BLE.setAdvertisedService(ledService); // 광고할 서비스 설정

  // 서비스에 특성 추가
  ledService.addCharacteristic(switchCharacteristic);

  // 서비스 추가
  BLE.addService(ledService);

  // 특성 초기값 설정
  switchCharacteristic.writeValue(0);

  // 광고 시작
  BLE.advertise();
  Serial.println("BLE LED & Relay Peripheral 시작");
}

void loop() {
  BLEDevice central = BLE.central();

  if (central) {
    Serial.print("중앙 기기에 연결됨: ");
    Serial.println(central.address());

    while (central.connected()) {
      // 특성 값이 쓰여졌는지 확인
      if (switchCharacteristic.written()) {
        int value = switchCharacteristic.value();  // 특성 값 읽기
        Serial.print("입력 값: ");
        Serial.println(value);

        if (value == 1) {
          digitalWrite(ledPin, HIGH);     // LED 켜기
          digitalWrite(relayPin, HIGH);   // 릴레이 활성화
          Serial.println("LED와 릴레이가 켜졌습니다.");
          timerActive = false;            // 타이머 비활성화
        } else if (value == 0) {
          digitalWrite(ledPin, LOW);      // LED 끄기
          digitalWrite(relayPin, LOW);    // 릴레이 비활성화
          Serial.println("LED와 릴레이가 꺼졌습니다.");
          timerActive = false;            // 타이머 비활성화
        } else if (value == 2) {
          digitalWrite(ledPin, HIGH);     // LED 켜기
          digitalWrite(relayPin, HIGH);   // 릴레이 활성화
          Serial.println("LED와 릴레이가 5분 동안 켜졌습니다.");
          timerStart = millis();          // 타이머 시작 시간 설정
          timerActive = true;             // 타이머 활성화
        }

        // 현재 상태 출력
        Serial.print("현재 LED 상태: ");
        Serial.println(digitalRead(ledPin) == HIGH ? "ON" : "OFF");
        Serial.print("현재 릴레이 상태: ");
        Serial.println(digitalRead(relayPin) == HIGH ? "ON" : "OFF");
      }

      // 타이머가 활성화되었고, 5분이 지난 경우 LED와 릴레이를 끔
      if (timerActive && (millis() - timerStart >= 300000)) {
        digitalWrite(ledPin, LOW);       // LED 끄기
        digitalWrite(relayPin, LOW);     // 릴레이 비활성화
        timerActive = false;             // 타이머 비활성화
        Serial.println("5분이 경과하여 LED와 릴레이가 꺼졌습니다.");
      }
      
      delay(100);  // 상태 확인 주기 설정
    }

    Serial.print("중앙 기기에서 연결 해제됨: ");
    Serial.println(central.address());
  }
}
