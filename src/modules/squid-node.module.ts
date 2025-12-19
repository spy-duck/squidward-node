import { Logger, Module, OnApplicationShutdown } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { RedisService } from '@/common/libs/redis/redis.service';
import { SquidModule } from '@/modules/squid/squid.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { NodeModule } from '@/modules/node/node.module';
import { MetricsModule } from '@/modules/metrics/metrics.module';


@Module({
    imports: [
        AuthModule,
        UsersModule,
        SquidModule,
        NodeModule,
        MetricsModule,
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