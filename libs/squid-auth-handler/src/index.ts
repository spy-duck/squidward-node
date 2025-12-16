import readline from 'node:readline';
import fs from 'node:fs';

const INTERNAL_SERVER_PORT = 9053;
const INTERNAL_SERVER_URL = `http://localhost:${ INTERNAL_SERVER_PORT }/auth/authentication`;

type OKType = `OK${ string }`;

export async function initSquidAuthHandler() {
    try {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false,
        });
        
        async function main(username, password): Promise<OKType | 'ERR'> {
            try {
                const response = await fetch(INTERNAL_SERVER_URL, {
                    method: 'POST',
                    headers: {
                        'User-Agent': 'squid-connector',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username,
                        password,
                    }),
                });
                
                if (!response.ok) {
                    return `ERR`;
                }
                
                if (!String(response.status).startsWith('20')) {
                    return `ERR`;
                }
                
                const data: {
                    response?: {
                        success?: boolean;
                        userUuid?: string | null;
                    }
                } = await response.json();
                
                return data?.response?.success ? `OK uuid=${ data.response.userUuid }` : `ERR`;
            } catch (err) {
                fs.writeFileSync('/tmp/squid-auth-handler.error.log', `[${ new Date().toISOString() }] ${ JSON.stringify(err) } \n`);
                return `ERR`;
            }
        }
        
        rl.on('line', (line) => {
            const [ username, password ] = line.split(' ');
            main(username, password)
                .then((result) => {
                    process.stdout.write(result + "\r\n");
                    process.exit(0);
                })
                .catch((err) => {
                    fs.writeFileSync('/tmp/squid-auth-handler.error.log', `[${ new Date().toISOString() }] ${ JSON.stringify(err) } \n`);
                    process.stdout.write(`ERR\r\n`);
                });
        });
        
        await new Promise((resolve) =>
            setTimeout(resolve, 10_000),
        );
    } catch (err) {
        fs.writeFileSync('/tmp/squid-auth-handler.error.log', `[${ new Date().toISOString() }] ${ JSON.stringify(err) } \n`);
        process.stdout.write(`ERR\r\n`);
        // TODO: log and report error
    }
}