import { Injectable, Logger } from '@nestjs/common';
import { ICommandResponse } from '@/common/types';
import { ERRORS } from '@contract/constants';
import { UserMetricsModel } from './models/user-metrics.model';
import { UsersMetricsRepository } from '@/modules/metrics/repositories/users-metrics.repository';

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
                    await this.usersMetricsRepository.getUserMetrics(),
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
}