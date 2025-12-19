import { MetricsUser } from '@contract/shcemas';

export class UserMetric implements MetricsUser {
    readonly ts: number;
    readonly usr: string;
    readonly up: bigint;
    readonly down: bigint;
    
    constructor(entity: UserMetric) {
        Object.assign(this, entity);
        return this;
    }
}