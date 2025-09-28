const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline'); // FIX 1: Destructure ReadlineParser
const WebSocket = require('ws');
const express = require('express');

// --- Config ---
const ARDUINO_PORT = 'COM5';  // change to your HC-05 COM port
const BAUD_RATE = 9600;
const HTTP_PORT = 3001;
const WS_PORT = 8080;

// --- Serial Connection ---
const port = new SerialPort({ path: ARDUINO_PORT, baudRate: BAUD_RATE });

// FIX 2: Use the correct class name 'ReadlineParser'
const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

port.on('open', () => console.log(`✅ Connected to Arduino on ${ARDUINO_PORT}`));
parser.on('data', (data) => {
    console.log('Arduino says:', data);
    // Optional: forward data to all connected WebSocket clients
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data.toString());
        }
    });
});
port.on('error', (err) => console.error('SerialPort Error: ', err));


// --- WebSocket Server ---
const wss = new WebSocket.Server({ port: WS_PORT });
wss.on('connection', (ws) => {
  console.log('🌐 Frontend connected via WebSocket');

  ws.on('message', (msg) => {
    // Make sure the message is a string or buffer
    const messageString = msg.toString();
    console.log(`Received from frontend: ${messageString}`);
    port.write(messageString, (err) => {
      if (err) console.error('Error writing to Arduino:', err);
    });
  });

  ws.on('close', () => console.log('Frontend disconnected'));
});

// --- Optional HTTP server ---
const app = express();
app.get('/send/:cmd', (req, res) => {
  const cmd = req.params.cmd;
  port.write(cmd, (err) => {
    if (err) return res.status(500).send('Failed to send');
    // FIX 3: Use backticks for the template string
    res.send(`Sent "${cmd}" to Arduino`);
  });
});

app.listen(HTTP_PORT, () => console.log(`HTTP server listening on http://localhost:${HTTP_PORT}`));
console.log(`WebSocket server listening on ws://localhost:${WS_PORT}`);