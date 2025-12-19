import { Injectable } from '@nestjs/common';
import { RedisService } from '@/common/libs/redis/redis.service';
import { UserMetric } from '@/modules/metrics/entities';
import { UserMetricsMapper } from '@/modules/metrics/mappers';


enum REDIS_KEYS {
    USERS_METRICS = 'metrics:users',
}

@Injectable()
export class UsersMetricsRepository {
    constructor(
        private readonly redisService: RedisService,
    ) {}
    
    async getUserMetrics(): Promise<UserMetric[]> {
        await this.redisService.client.select(0);
        const rows = await this.redisService.client.lPopCount(
            REDIS_KEYS.USERS_METRICS,
            500,
        );
        return (rows || []).map((row) => UserMetricsMapper.mapToEntity(row));
    }
}