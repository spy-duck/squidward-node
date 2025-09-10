import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ICommandResponse } from '@/common/types';
import { ERRORS } from '@contract/constants';
import { TRestartSquidRequest, TStartSquidRequest, TStopSquidRequest } from '@/modules/squid/interfaces';
import { RestartSquidResponseModel, StartSquidResponseModel } from '@/modules/squid/models';
import { SupervisordService } from '@/common/libs/supervisord/supervisord.service';
import { StopSquidResponseModel } from '@/modules/squid/models/stop-squid-response.model';

@Injectable()
export class SquidService implements OnApplicationBootstrap{
    private readonly squidProcessName = 'squid-node';
    private readonly logger = new Logger(SquidService.name);
    private isSquidRunning: boolean = false;
    
    constructor(
        private readonly supervisordService: SupervisordService,
    ) {}
    
    async onApplicationBootstrap() {
        const squidProcessInfo = await this.supervisordService.getProcessInfo(this.squidProcessName);
        this.isSquidRunning = squidProcessInfo.state === 20;
    }
    
    async startSquid(data: TStartSquidRequest): Promise<ICommandResponse<StartSquidResponseModel>> {
        try {
            if (this.isSquidRunning) {
                return {
                    success: false,
                    code: ERRORS.SQUID_ALREADY_RUNNING.code,
                    response: new StartSquidResponseModel(false, ERRORS.SQUID_ALREADY_RUNNING.message),
                };
            }
            
            await this.supervisordService.startProcess(this.squidProcessName);
            
            this.isSquidRunning = true;
            
            return {
                success: true,
                response: new StartSquidResponseModel(true),
            };
        } catch (error) {
            this.logger.error(error);
            let message = '';
            if (error instanceof Error) {
                message = error.message;
            }
            return {
                success: false,
                code: ERRORS.INTERNAL_SERVER_ERROR.code,
                response: new StartSquidResponseModel(false, message),
            };
        }
    }
    
    async stopSquid(data: TStopSquidRequest): Promise<ICommandResponse<StopSquidResponseModel>> {
        try {
            if (!this.isSquidRunning) {
                return {
                    success: false,
                    code: ERRORS.SQUID_IS_NOT_RUNNING.code,
                    response: new StartSquidResponseModel(false, ERRORS.SQUID_IS_NOT_RUNNING.message),
                };
            }
            
            await this.supervisordService.stopProcess(this.squidProcessName);
            
            this.isSquidRunning = false;
            
            return {
                success: true,
                response: new StopSquidResponseModel(true),
            };
        } catch (error) {
            this.logger.error(error);
            let message = '';
            if (error instanceof Error) {
                message = error.message;
            }
            return {
                success: false,
                code: ERRORS.INTERNAL_SERVER_ERROR.code,
                response: new StopSquidResponseModel(false, message),
            };
        }
    }
    
    async restartSquid(data: TRestartSquidRequest): Promise<ICommandResponse<RestartSquidResponseModel>> {
        try {
            if (!this.isSquidRunning) {
                return {
                    success: false,
                    code: ERRORS.SQUID_IS_NOT_RUNNING.code,
                    response: new RestartSquidResponseModel(false, ERRORS.SQUID_IS_NOT_RUNNING.message),
                };
            }
            
            await this.stopSquid(data);
            
            await this.startSquid(data);
            
            this.isSquidRunning = true;
            
            return {
                success: true,
                response: new RestartSquidResponseModel(true),
            };
        } catch (error) {
            this.logger.error(error);
            let message = '';
            if (error instanceof Error) {
                message = error.message;
            }
            return {
                success: false,
                code: ERRORS.INTERNAL_SERVER_ERROR.code,
                response: new RestartSquidResponseModel(false, message),
            };
        }
    }
}