import { Logger, Module, OnApplicationShutdown } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { RedisService } from '@/common/libs/redis/redis.service';
import { SquidModule } from '@/modules/squid/squid.module';
import { AuthModule } from '@/modules/auth/auth.module';

@Module({
    imports: [
        AuthModule,
        UsersModule,
        SquidModule,
    ],
    providers: [],
})
export class SquidNodeModule implements OnApplicationShutdown {
    private readonly logger = new Logger(SquidNodeModule.name);
    constructor(
        private readonly redisService: RedisService,
    ) {}
    
    async onApplicationShutdown(signal?: string): Promise<void> {
        this.logger.log(`${signal} received, shutting down...`);
        await this.redisService.client.quit();
    }
}