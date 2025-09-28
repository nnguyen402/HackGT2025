import serial
import time

bluetooth_port = '/dev/cu.HC-05'  # Your HC-05 port (adjust if needed)
baud_rate = 9600

try:
    bt = serial.Serial(bluetooth_port, baud_rate, timeout=1)
    print(f"✅ Connected to Arduino via Bluetooth on {bluetooth_port}")

    while True:
        command = input("Enter command (Left/Right/exit): ").strip().lower()

        if command not in ["left", "right", "exit"]:
            print("⚠️ Invalid command. Please type 'left', 'right' or 'exit'.")
            continue

        # Send command to Arduino
        bt.write((command + "\n").encode("utf-8"))

        if command == "exit":
            print("👋 Exiting program...")
            break

        # Small delay for Arduino to respond
        time.sleep(0.2)

        # Read any feedback from Arduino
        while bt.in_waiting > 0:
            response = bt.readline().decode("utf-8", errors="ignore").strip()
            if response:
                print(f"🔹 Arduino says: {response}")

except serial.SerialException as e:
    print(f"❌ Error: {e}")

finally:
    if "bt" in locals() and bt.is_open:
        bt.close()
        print("🔌 Bluetooth connection closed.")
