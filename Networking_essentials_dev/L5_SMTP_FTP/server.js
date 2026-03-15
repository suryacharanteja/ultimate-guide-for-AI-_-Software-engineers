// ============================================================
//  LESSON 5: SMTP / FTP SIMULATION — Specialized Protocols
//  Run this with:  node server.js
//
//  This lesson simulates SMTP and FTP command flows
//  to show how specialized protocols work on top of TCP
// ============================================================

const net = require('net');  // Back to raw TCP — because SMTP/FTP ARE just TCP!

// ============================================================
//  PART A: SMTP SIMULATION (Email sending protocol)
// ============================================================
const smtpServer = net.createServer((socket) => {
    console.log('[SMTP] Client connected');

    // SMTP servers greet first (just like a real mail server)
    socket.write('220 mail.example.com SMTP Ready\r\n');

    socket.on('data', (data) => {
        const cmd = data.toString().trim();
        console.log('[SMTP] Client:', cmd);

        // Simulate SMTP conversation
        if (cmd.startsWith('HELO') || cmd.startsWith('EHLO')) {
            socket.write('250 Hello, pleased to meet you\r\n');
        }
        else if (cmd.startsWith('MAIL FROM:')) {
            socket.write('250 Sender OK\r\n');
        }
        else if (cmd.startsWith('RCPT TO:')) {
            socket.write('250 Recipient OK\r\n');
        }
        else if (cmd === 'DATA') {
            socket.write('354 Start mail input; end with <CRLF>.<CRLF>\r\n');
        }
        else if (cmd === '.') {
            socket.write('250 Message accepted for delivery\r\n');
        }
        else if (cmd === 'QUIT') {
            socket.write('221 Bye\r\n');
            socket.end();
        }
        else {
            socket.write(`500 Unknown command: ${cmd}\r\n`);
        }
    });

    socket.on('end', () => console.log('[SMTP] Client disconnected'));
});

smtpServer.listen(2525, '127.0.0.1', () => {
    console.log('📧 SMTP server listening on port 2525');
});

// ============================================================
//  PART B: FTP SIMULATION (File transfer protocol)
// ============================================================
const ftpServer = net.createServer((socket) => {
    console.log('[FTP] Client connected');

    socket.write('220 FTP server ready\r\n');

    const fakeFiles = ['report.pdf', 'data.csv', 'config.yaml'];

    socket.on('data', (data) => {
        const cmd = data.toString().trim();
        console.log('[FTP] Client:', cmd);

        if (cmd.startsWith('USER')) {
            socket.write('331 Password required\r\n');
        }
        else if (cmd.startsWith('PASS')) {
            socket.write('230 Login successful\r\n');
        }
        else if (cmd === 'LIST') {
            socket.write('150 File list:\r\n');
            fakeFiles.forEach(f => socket.write(`  📄 ${f}\r\n`));
            socket.write('226 Directory listing complete\r\n');
        }
        else if (cmd.startsWith('RETR')) {
            const filename = cmd.split(' ')[1];
            if (fakeFiles.includes(filename)) {
                socket.write(`150 Opening data connection for ${filename}\r\n`);
                socket.write(`[Simulated content of ${filename}]\r\n`);
                socket.write('226 Transfer complete\r\n');
            } else {
                socket.write('550 File not found\r\n');
            }
        }
        else if (cmd === 'QUIT') {
            socket.write('221 Goodbye\r\n');
            socket.end();
        }
        else {
            socket.write(`500 Unknown command: ${cmd}\r\n`);
        }
    });

    socket.on('end', () => console.log('[FTP] Client disconnected'));
});

ftpServer.listen(2121, '127.0.0.1', () => {
    console.log('📁 FTP server listening on port 2121');
    console.log('👉 Now run client.js in another terminal');
});

// ============================================================
//  WHAT'S HAPPENING:
//
//  SMTP and FTP are JUST text commands over TCP!
//
//  Email Client          Mail Server
//  ┌──────────┐          ┌──────────┐
//  │ Outlook  │─ HELO ──►│  SMTP    │
//  │          │◄─ 250 ───│  :25     │
//  │          │─ MAIL ──►│          │
//  │          │◄─ 250 ───│          │
//  └──────────┘          └──────────┘
//
//  KEY INSIGHT: Every protocol (SMTP, FTP, HTTP) is just an
//  AGREEMENT about what text commands to send over a TCP pipe.
//  They all use the SAME foundation from Lesson 1!
// ============================================================
