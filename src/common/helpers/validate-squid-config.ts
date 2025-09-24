import { exec } from "node:child_process";

export async function validateSquidConfig(configPath: string): Promise<{
    isValid: boolean;
    errors?: string;
}> {
    return new Promise((resolve) => {
        exec(`squid -f ${configPath} -k parse`, (error, stdout, stderr) => {
            if (error) {
                resolve({
                    isValid: false,
                    errors: stderr,
                });
            } else {
                resolve({
                    isValid: true,
                });
            }
        });
    });
}