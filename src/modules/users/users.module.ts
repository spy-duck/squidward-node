import { Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from '@/modules/users/repositories/users.repository';

@Module({
    imports: [],
    controllers: [ UsersController ],
    providers: [ UsersRepository, UsersService ],
})
export class UsersModule {}