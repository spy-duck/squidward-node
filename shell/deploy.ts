import { spawnSync } from 'node:child_process';
import { consola } from 'consola';
import packageJson from 'package.json';


const packageManager = 'yarn';

void (async () => {
    if (!await consola.prompt('Confirm deploy', { type: 'confirm' })) {
        consola.log('Exit...');
        process.exit(0);
    }
    
    consola.start(`Starting build v${packageJson.version}...`);
    
    spawnSync('rm', [ '-rf', 'dist' ], { stdio: 'inherit', shell: true });
    consola.success('Dist directory cleaned');
    
    spawnSync(packageManager, [ 'build' ], { stdio: 'inherit', shell: true });
    consola.success('App build finished');
    
    spawnSync(packageManager, [ 'build:squid-auth-handler' ], { stdio: 'inherit', shell: true });
    consola.success('Squid-auth-handler build finished');
    
    spawnSync('docker', [
            'build',
            '--progress=plain',
            '-t',
            `squidwardproxy/squidward-node:${packageJson.version}`,
            '.'
        ], { stdio: 'inherit', shell: true });
    consola.success('Docker image build finished');
    
    if (await consola.prompt('Push docker image to Docker Hub', { type: 'confirm' })) {
        spawnSync('docker', [
            'push',
            `squidwardproxy/squidward-node:${packageJson.version}`,
        ], { stdio: 'inherit', shell: true });
    }
    
    consola.log('Exit...');
    process.exit(0);
    
})();