import { UserMetric } from '@/modules/metrics/entities';

export class UserMetricsMapper {
    static mapToEntity(raw: string): UserMetric {
        const parsed: {
            ts: number;
            usr: string;
            up: string;
            down: string;
        } = JSON.parse(raw);
        return new UserMetric({
            ...parsed,
            up: BigInt(parsed.up),
            down: BigInt(parsed.down),
        })
    }
}