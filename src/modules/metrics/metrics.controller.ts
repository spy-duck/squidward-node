import { METRICS_CONTROLLER, METRICS_ROUTES } from '@contract/api';
import { Controller, Post, UseGuards } from '@nestjs/common';
import { errorHandler } from '@/common/helpers/error-handler.helper';
import { JwtGuard } from '@/common/guards/jwt';
import { MetricsService } from './metrics.service';
import { NodeMetricsDto, UsersMetricsDto } from './dto';


@UseGuards(JwtGuard)
@Controller(METRICS_CONTROLLER)
export class MetricsController {
    constructor(private readonly metricsService: MetricsService) {}
    
    @Post(METRICS_ROUTES.USERS)
    public async usersMetrics(): Promise<UsersMetricsDto> {
        const response = await this.metricsService.usersMetrics();
        const data = errorHandler(response);
        return {
            response: data.metrics,
        };
    }
    
    @Post(METRICS_ROUTES.NODE)
    public async nodeMetrics(): Promise<NodeMetricsDto> {
        const response = await this.metricsService.nodeMetrics();
        const data = errorHandler(response);
        return {
            response: data.metrics,
        };
    }
}