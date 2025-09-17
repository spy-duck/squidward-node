import { spawnSync } from 'node:child_process';
import { consola } from 'consola';
import packageJson from 'package.json';


const packageManager = 'yarn';

(async () => {
    const isCnfirmStart = await consola.prompt('Confirm deploy', { type: 'confirm' });
    
    if (!isCnfirmStart) {
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
    
    consola.log('Exit...');
    spawnSync(
        'docker',
        [
            'build',
            '--progress=plain',
            '-t',
            `squidwardproxy/squidward-node:${packageJson.version}`,
            '.'
        ],
        { stdio: 'inherit', shell: true },
    );
})();