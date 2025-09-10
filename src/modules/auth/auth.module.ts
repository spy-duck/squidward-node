import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersRepository } from '@/modules/users/repositories/users.repository';

@Module({
    imports: [],
    controllers: [ AuthController ],
    providers: [ UsersRepository, AuthService ],
})
export class AuthModule {}