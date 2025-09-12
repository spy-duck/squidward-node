import { Injectable, Logger } from '@nestjs/common';
import { ICommandResponse } from '@/common/types';
import { ERRORS } from '@contract/constants';
import { NodeHealthResponseModel } from '@/modules/node/models';

@Injectable()
export class NodeService {
    private readonly logger = new Logger(NodeService.name);
    
    // eslint-disable-next-line @typescript-eslint/require-await
    async health(): Promise<ICommandResponse<NodeHealthResponseModel>> {
        try {
            return {
                success: true,
                response: new NodeHealthResponseModel(true, null),
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