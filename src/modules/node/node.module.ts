import { Module } from '@nestjs/common';

import { NodeController } from './node.controller';
import { NodeService } from './node.service';
import { UsersRepository } from '@/modules/users/repositories/users.repository';

@Module({
    imports: [],
    controllers: [ NodeController ],
    providers: [ UsersRepository, NodeService ],
})
export class NodeModule {}