#!/usr/local/bin/node
import fs from 'node:fs';
import readline from 'node:readline';
const LOG_FILE = '/var/log/squid/auth.log';


try {

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });

    const users = {
        user3: 'qweqwe',
    }

    async function main(username, password) {
        fs.writeFileSync(LOG_FILE, `${new Date()}\t[LOG]\tStart auth: ${username} ${password}\n`, {
            encoding: "utf8",
            flag: "a+",
        });

        if (!users[username] || users[username] !== password) {
            // fs.writeFileSync(LOG_FILE, `${new Date()}\t[LOG]\tERR incorrect username or password: ${username} ${password}\n`, {
            //     encoding: "utf8",
            //     flag: "a+",
            // });
            console.log(`ERR`);
            process.exit(0);
        }
        // fs.writeFileSync(LOG_FILE, `${new Date()}\t[LOG]\tOK ${username} ${password}\n`, {
        //     encoding: "utf8",
        //     flag: "a+",
        // });
        console.log(`OK`);
        process.exit(0);
    }

    rl.on('line', async (line) => {
        fs.writeFileSync(LOG_FILE, `${new Date()}\t[LOG]\tline: ${line}\n`, {
            encoding: "utf8",
            flag: "a+",
        });
        const [username, password] = line.split(' ');
        await main(username, password);
    });
} catch (error) {
    fs.writeFileSync(LOG_FILE, `${new Date()}\t[ERR]\t${error}`, { append: true });
    console.log(`ERR`);
}
