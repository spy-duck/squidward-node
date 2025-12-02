import { Injectable, Logger } from '@nestjs/common';
import { ICommandResponse } from '@/common/types';
import { ERRORS, SQUID_PROCESS_NAME } from '@contract/constants';
import { NodeHealthResponseModel } from '@/modules/node/models';
import { SupervisordService } from '@/common/libs/supervisord/supervisord.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NodeService {
    private readonly logger = new Logger(NodeService.name);
    
    constructor(
        private readonly supervisordService: SupervisordService,
        private readonly config: ConfigService,
    ) {}
    
    async health(): Promise<ICommandResponse<NodeHealthResponseModel>> {
        try {
            const squidProcessInfo = await this.supervisordService.getProcessInfo(SQUID_PROCESS_NAME);
            return {
                success: true,
                response: new NodeHealthResponseModel(
                    true,
                    null,
                    squidProcessInfo.statename,
                    this.config.get('VERSION', 'N/A'),
                ),
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
                response: new NodeHealthResponseModel(false, message),
            };
        }
    }
}