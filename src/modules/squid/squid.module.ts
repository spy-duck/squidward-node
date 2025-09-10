import { Module } from '@nestjs/common';

import { SquidController } from './squid.controller';
import { SquidService } from './squid.service';
import { UsersRepository } from '@/modules/users/repositories/users.repository';

@Module({
    imports: [],
    controllers: [ SquidController ],
    providers: [ UsersRepository, SquidService ],
})
export class SquidModule {}