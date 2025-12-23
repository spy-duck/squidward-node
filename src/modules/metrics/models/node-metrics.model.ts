import { NodeMetric } from '@/modules/metrics/entities';

export class NodeMetricsModel {
    success: boolean;
    error: null | string;
    metrics: NodeMetric[];
    
    constructor(success: boolean, error?: null | string, metrics?: null | NodeMetric[]) {
        this.success = success;
        this.error = error || null;
        this.metrics = metrics || [];
    }
}