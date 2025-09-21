import { spawnSync } from 'node:child_process';
import { consola } from 'consola';
import { colorize } from 'consola/utils';
import packageJson from 'package.json';
import commandLineArgs from 'command-line-args';

const packageManager = 'npm';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const options = commandLineArgs([
    { name: 'yes', alias: 'y', type: Boolean },
    { name: 'no-push', alias: 'n', type: Boolean },
    { name: 'no-cache', alias: 'c', type: Boolean },
]) as {
    yes: boolean,
    'no-push': boolean,
    'no-cache': boolean,
};

void (async () => {
    let sigTerm = false;
    
    process.on('SIGTERM', () => {
        if (!sigTerm) {
            sigTerm = true;
            consola.log('SIGTERM received, exiting...');
            process.exit(0);
        }
    });
    
    const loader = createLoader();
    
    if (!options.yes && !await consola.prompt('Confirm deploy', { type: 'confirm' })) {
        consola.log('Exit...');
        process.exit(0);
    }
    
    consola.start(`Starting deploy v${ packageJson.version }...`);
    
    loader.start('Cleaning dist directory');
    spawnSync('rm', [ '-rf', 'dist' ]);
    loader.stop();
    consola.success('Dist directory cleaned');
    
    consola.start(`Starting building api`);
    loader.start('Building api');
    spawnSync(packageManager, [ 'run', 'build' ], {stdio: 'ignore', shell: true});
    loader.stop();
    consola.success('Api build finished');
    
    consola.start(`Starting building auth handler`);
    loader.start('Building squid-auth-handler');
    spawnSync(packageManager, [ 'run', 'build:squid-auth-handler' ], { stdio: 'inherit', shell: true });
    loader.stop();
    consola.success('Squid-auth-handler build finished');
    
    consola.start(`Starting building docker image`);
    spawnSync('docker', [
        'build',
        '--progress=plain',
        ...(options['no-cache'] ? ['--no-cache'] : []),
        '-t',
        `squidwardproxy/squidward-node:${ packageJson.version }`,
        '.',
    ], { stdio: 'inherit', shell: true });
    consola.success('Docker image build finished');
    
    if (!options['no-push'] && await consola.prompt('Push docker image to Docker Hub', { type: 'confirm' })) {
        spawnSync('docker', [
            'push',
            `squidwardproxy/squidward-node:${ packageJson.version }`,
        ], { stdio: 'inherit', shell: true });
    }
    
    consola.log('Exit...');
    process.exit(0);
    
})();

function createLoader() {
    const P = [
        '⠋',
        '⠙',
        '⠹',
        '⠸',
        '⠼',
        '⠴',
        '⠦',
        '⠧',
        '⠇',
        '⠏',
    ];
    let x = 0;
    let loader: NodeJS.Timeout | undefined;
    let lineText = '';
    
    function start(text: string) {
        lineText = text;
        loader = setInterval(() => {
            process.stdout.write(`\r${ colorize('blue', P[x++]) } ${ colorize('gray', text) }`);
            x %= P.length;
        }, 200);
    }
    
    function stop() {
        if (loader) {
            clearInterval(loader);
            process.stdout.write('\r' + ' '.repeat(lineText.length + 2) + '\r');
            x = 0;
        }
    }
    
    return {
        start,
        stop,
    }
}