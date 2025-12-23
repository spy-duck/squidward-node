import { Injectable, Logger } from '@nestjs/common';
import { ICommandResponse } from '@/common/types';
import { ERRORS } from '@contract/constants';
import { UsersMetricsRepository } from '@/modules/metrics/repositories/users-metrics.repository';
import { NodeMetricsModel, UserMetricsModel } from '@/modules/metrics/models';

@Injectable()
export class MetricsService {
    private readonly logger = new Logger(MetricsService.name);
    
    constructor(
        private readonly usersMetricsRepository: UsersMetricsRepository,
    ) {}
    
    async usersMetrics(): Promise<ICommandResponse<UserMetricsModel>> {
        try {
            return {
                success: true,
                response: new UserMetricsModel(
                    true,
                    null,
                    await this.usersMetricsRepository.getUsersMetrics(),
                ),
            };
        } catch (error) {
            this.logger.error(error);
            let message = '';
            if (error instanceof Error) {
                message = error.message;
            }
            return {
                success: false,
                code: ERRORS.INTERNAL_SERVER_ERROR.code,
                response: new UserMetricsModel(false, message),
            };
        }
    }
    
    async nodeMetrics(): Promise<ICommandResponse<NodeMetricsModel>> {
        try {
            return {
                success: true,
                response: new NodeMetricsModel(
                    true,
                    null,
                    await this.usersMetricsRepository.getNodeMetrics(),
                ),
            };
        } catch (error) {
            this.logger.error(error);
            let message = '';
            if (error instanceof Error) {
                message = error.message;
            }
            return {
                success: false,
                code: ERRORS.INTERNAL_SERVER_ERROR.code,
                response: new NodeMetricsModel(false, message),
            };
        }
    }
}