import { Module } from '@nestjs/common';

import { MetricsController } from './metrics.controller';
import { MetricsService } from './metrics.service';
import { UsersMetricsRepository } from '@/modules/metrics/repositories/users-metrics.repository';

@Module({
    imports: [],
    controllers: [ MetricsController ],
    providers: [ UsersMetricsRepository, MetricsService ],
})
export class MetricsModule {}