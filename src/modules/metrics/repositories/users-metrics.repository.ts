import { Injectable } from '@nestjs/common';
import { RedisService } from '@/common/libs/redis/redis.service';
import { NodeMetric, UserMetric } from '@/modules/metrics/entities';
import { MetricsMapper } from '@/modules/metrics/mappers';


enum REDIS_KEYS {
    USERS_METRICS = 'metrics:users',
    NODE_METRICS = 'metrics:node',
}

@Injectable()
export class UsersMetricsRepository {
    constructor(
        private readonly redisService: RedisService,
    ) {}
    
    async getUsersMetrics(): Promise<UserMetric[]> {
        await this.redisService.client.select(0);
        const rows = await this.redisService.client.lPopCount(
            REDIS_KEYS.USERS_METRICS,
            500,
        );
        return (rows || []).map((row) => MetricsMapper.mapUserMetricToEntity(row));
    }
    
    async getNodeMetrics(): Promise<NodeMetric[]> {
        await this.redisService.client.select(0);
        const rows = await this.redisService.client.lPopCount(
            REDIS_KEYS.NODE_METRICS,
            500,
        );
        return (rows || []).map((row) => MetricsMapper.mapNodeMetricToEntity(row));
    }
    
}