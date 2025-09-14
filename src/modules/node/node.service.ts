import { Injectable, Logger } from '@nestjs/common';
import { ICommandResponse } from '@/common/types';
import { ERRORS, SQUID_PROCESS_NAME } from '@contract/constants';
import { NodeHealthResponseModel } from '@/modules/node/models';
import { SupervisordService } from '@/common/libs/supervisord/supervisord.service';

@Injectable()
export class NodeService {
    private readonly logger = new Logger(NodeService.name);
    
    constructor(
        private readonly supervisordService: SupervisordService,
    ) {}
    
    // eslint-disable-next-line @typescript-eslint/require-await
    async health(): Promise<ICommandResponse<NodeHealthResponseModel>> {
        try {
            const squidProcessInfo = await this.supervisordService.getProcessInfo(SQUID_PROCESS_NAME);
            return {
                success: true,
                response: new NodeHealthResponseModel(true, null, squidProcessInfo.statename),
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