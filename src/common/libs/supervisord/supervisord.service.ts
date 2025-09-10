import { SupervisordClient, SupervisordClientMethod } from 'node-supervisord';
import { Inject, Injectable } from '@nestjs/common';
import { MODULE_OPTIONS_TOKEN } from './supervisord.module-definition';
import type { TSupervisorOptions } from '@/common/libs/supervisord/supervisord.types';

@Injectable()
export class SupervisordService {
    private readonly _supervisord: SupervisordClient;
    
    constructor(
        @Inject(MODULE_OPTIONS_TOKEN) private readonly options: TSupervisorOptions,
    ) {
        this._supervisord = new SupervisordClient(`${options.host}:${options.port}`, {
            username: options.user,
            password: options.password,
        });
    }
    
    startProcess(appName: string): Promise<boolean> {
        return this._supervisord.startProcess(appName);
    }
    
    stopProcess(appName: string): Promise<boolean> {
        return this._supervisord.stopProcess(appName);
    }
    
    restart(): Promise<boolean> {
        return this._supervisord.restart();
    }
    
    getProcessInfo(appName: string): ReturnType<SupervisordClientMethod['getProcessInfo']> {
        return this._supervisord.getProcessInfo(appName);
    }
    
    getState(): ReturnType<SupervisordClientMethod['getState']> {
        return this._supervisord.getState();
    }
}
