import { UserMetric, NodeMetric } from '@/modules/metrics/entities';

export class MetricsMapper {
    static mapUserMetricToEntity(raw: string): UserMetric {
        const parsed = JSON.parse(raw) as {
            ts: number;
            usr: string;
            up: string;
            down: string;
        };
        
        return new UserMetric({
            ...parsed,
            up: BigInt(parsed.up),
            down: BigInt(parsed.down),
        })
    }
    static mapNodeMetricToEntity(raw: string): NodeMetric {
        const parsed = JSON.parse(raw) as {
            ts: number;
            up: string;
            down: string;
        };
        
        return new NodeMetric({
            ...parsed,
            up: BigInt(parsed.up),
            down: BigInt(parsed.down),
        })
    }
}