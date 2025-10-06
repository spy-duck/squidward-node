import readline from 'node:readline';
import fs from 'node:fs';

const INTERNAL_SERVER_PORT = 9053;
const INTERNAL_SERVER_URL = `http://localhost:${ INTERNAL_SERVER_PORT }/auth/authentication`;

export async function initSquidAuthHandler() {
    try {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false,
        });
        
        async function main(username, password): Promise<'OK' | 'ERR'> {
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
                    }
                } = await response.json();
                
                return data?.response?.success ? `OK` : `ERR`;
            } catch (err) {
                fs.writeFileSync('/tmp/squid-auth-handler.error.log', `[${ new Date().toISOString() }] ${ JSON.stringify(err) } \n`);
                return `ERR`;
            }
        }
 
        rl.on('line', (line) => {
            const [ username, password ] = line.split(' ');
            main(username, password)
                .then((result) => {
                    console.log(result);
                    process.exit(0);
                })
                .catch((err) => {
                    fs.writeFileSync('/tmp/squid-auth-handler.error.log', `[${ new Date().toISOString() }] ${ JSON.stringify(err) } \n`);
                    console.log(`ERR`);
                });
        });
        
        await new Promise((resolve) =>
            setTimeout(resolve, 10_000),
        );
    } catch (err) {
        fs.writeFileSync('/tmp/squid-auth-handler.error.log', `[${ new Date().toISOString() }] ${ JSON.stringify(err) } \n`);
        console.log(`ERR`);
        // TODO: log and report error
    }
}