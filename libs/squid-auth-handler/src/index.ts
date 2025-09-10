import readline from 'node:readline';

export async function initSquidAuthHandler() {
    try {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false
        });
        
        async function main(username, password) {
            const response = await fetch('http://localhost:9090/auth/authentication', {
                method: 'POST',
                headers: {
                    'User-Agent': 'squid-connector',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password
                }),
            });
            const data = await response.json();
            console.log(data?.response?.success ? `OK` : `ERR`);
            process.exit(0);
        }
        
        rl.on('line', async (line) => {
            const [username, password] = line.split(' ');
            await main(username, password);
        });
    } catch (error) {
        console.log(`ERR`);
        // TODO: log and report error
    }
}