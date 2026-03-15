// ============================================================
//  LESSON 5: SMTP + FTP CLIENT — Talking to specialized servers
//  Run this with:  node client.js  (while server.js is running)
// ============================================================

const net = require('net');
const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function ask(question) {
    return new Promise(resolve => rl.question(question, resolve));
}

async function main() {
    console.log('Which protocol do you want to try?');
    console.log('  1. SMTP (Email)  — port 2525');
    console.log('  2. FTP  (Files)  — port 2121');
    const choice = await ask('\nEnter 1 or 2: ');

    const port = choice === '1' ? 2525 : 2121;
    const protocol = choice === '1' ? 'SMTP' : 'FTP';

    console.log(`\n📡 Connecting to ${protocol} server on port ${port}...`);

    const client = net.createConnection({ host: '127.0.0.1', port }, () => {
        console.log(`✅ Connected to ${protocol} server!\n`);

        if (protocol === 'SMTP') {
            console.log('Try these commands in order:');
            console.log('  HELO mycomputer');
            console.log('  MAIL FROM:<alice@gmail.com>');
            console.log('  RCPT TO:<bob@company.com>');
            console.log('  DATA');
            console.log('  Subject: Hello from Node.js!');
            console.log('  .');
            console.log('  QUIT\n');
        } else {
            console.log('Try these commands:');
            console.log('  USER admin');
            console.log('  PASS secret');
            console.log('  LIST');
            console.log('  RETR data.csv');
            console.log('  QUIT\n');
        }
    });

    client.on('data', (data) => {
        console.log(`📨 Server: ${data.toString().trim()}`);
    });

    // Send user input to the server
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (input) => {
        client.write(input);
    });

    client.on('end', () => {
        console.log('🔌 Server closed connection');
        process.exit(0);
    });

    client.on('error', (err) => {
        console.error('❌', err.message);
        process.exit(1);
    });
}

main();

// ============================================================
//  KEY INSIGHT:
//  You just "spoke" SMTP and FTP by typing text commands!
//  That's literally all these protocols are — a conversation
//  format agreed upon by client and server over a TCP pipe.
//
//  Real email clients (Outlook, Gmail) do EXACTLY this,
//  just automated and faster.
// ============================================================
