import { NODE_CONTROLLER, NODE_ROUTES } from '@contract/api';
import { Controller, Post } from '@nestjs/common';
import { errorHandler } from '@/common/helpers/error-handler.helper';
import { NodeService } from '@/modules/node/node.service';
import { NodeHealthDto } from '@/modules/node/dto';


@Controller(NODE_CONTROLLER)
export class NodeController {
    constructor(private readonly nodeService: NodeService) {}
    
    @Post(NODE_ROUTES.HEALTH)
    public async health(): Promise<NodeHealthDto> {
        const response = await this.nodeService.health();
        const data = errorHandler(response);
        
        return {
            response: data,
        };
    }
}