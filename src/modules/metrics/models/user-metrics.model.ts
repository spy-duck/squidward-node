import { UserMetric } from '@/modules/metrics/entities';

export class UserMetricsModel {
    success: boolean;
    error: null | string;
    metrics: UserMetric[];
    
    constructor(success: boolean, error?: null | string, metrics?: null | UserMetric[]) {
        this.success = success;
        this.error = error || null;
        this.metrics = metrics || [];
    }
}