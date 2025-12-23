import { MetricsNode } from '@contract/shcemas';

export class NodeMetric implements MetricsNode {
    readonly ts: number;
    readonly up: bigint;
    readonly down: bigint;
    
    constructor(entity: NodeMetric) {
        Object.assign(this, entity);
        return this;
    }
}