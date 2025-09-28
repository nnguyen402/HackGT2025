#include <SoftwareSerial.h>

// Bluetooth pins
SoftwareSerial BTSerial(6, 7);  // RX = 6, TX = 7

// L298N Motor driver pin
const int ENA  = 3;  // Enable pin controls motor on/off
const int ledPin = 13;  // Onboard LED

String command = "";

void setup() {
  pinMode(ENA, OUTPUT);
  pinMode(ledPin, OUTPUT);

  // Ensure motor and LED are off at startup
  digitalWrite(ENA, LOW);
  digitalWrite(ledPin, LOW);

  Serial.begin(9600);
  BTSerial.begin(9600);
  Serial.println("Arduino ready. Waiting for Bluetooth commands...");
}

void loop() {
  // Read full line from Bluetooth until newline
  while (BTSerial.available() > 0) {
    char c = BTSerial.read();

    if (c == '\n' || c == '\r') {   // end of line
      command.trim();               // remove spaces/newlines
      if (command.length() > 0) {
        processCommand(command);
      }
      command = "";                 // reset for next line
    } else {
      command += c;
    }
  }

  // Optional: USB → Bluetooth passthrough
  if (Serial.available() > 0) {
    char c = Serial.read();
    BTSerial.write(c);
  }
}

void processCommand(String cmd) {
  Serial.print("Got command: ");
  Serial.println(cmd);

  if (cmd.equalsIgnoreCase("on") || cmd == "1") {
    // Turn motor on
    digitalWrite(ENA, HIGH);
    digitalWrite(ledPin, HIGH);

    BTSerial.println("MOTOR + LED ON");
    Serial.println("MOTOR + LED ON");

    // Print motor state
    int state = digitalRead(ENA); 
    Serial.print("Motor pin state: ");
    Serial.println(state); // 1 = HIGH, 0 = LOW
  }
  else if (cmd.equalsIgnoreCase("off") || cmd == "0") {
    // Turn motor off
    digitalWrite(ENA, LOW);
    digitalWrite(ledPin, LOW);

    BTSerial.println("MOTOR + LED OFF");
    Serial.println("MOTOR + LED OFF");

    // Print motor state
    int state = digitalRead(ENA); 
    Serial.print("Motor pin state: ");
    Serial.println(state); // 1 = HIGH, 0 = LOW
  }
  else if (cmd.equalsIgnoreCase("left") || cmd == "L") {
    // Blink LED once
    digitalWrite(ledPin, HIGH);
    delay(500);               // LED on 500ms
    digitalWrite(ledPin, LOW);
    delay(500);               // LED off 500ms

    BTSerial.println("LEFT command: 1 blink");
    Serial.println("LEFT command: 1 blink");
  }
  else if (cmd.equalsIgnoreCase("right") || cmd == "R") {
    // Blink LED twice rapidly
    for (int i = 0; i < 2; i++) {
      digitalWrite(ledPin, HIGH);
      delay(200);             // LED on 200ms
      digitalWrite(ledPin, LOW);
      delay(200);             // LED off 200ms
    }

    BTSerial.println("RIGHT command: 2 rapid blinks");
    Serial.println("RIGHT command: 2 rapid blinks");
  }
  else {
    BTSerial.println("Unknown command");
    Serial.println("Unknown command");
  }
}
