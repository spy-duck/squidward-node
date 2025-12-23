import z from 'zod';

export const MetricsNodeScheme = z.object({
    ts: z.number().describe('Timestamp'),
    up: z.codec(
        z.string(),
        z.bigint(),
        {
            decode: (v) => BigInt(v),
            encode: (v) => v.toString(),
        },
    ).describe('Upload traffic bytes'),
    down: z.codec(
        z.string(),
        z.bigint(),
        {
            decode: (v) => BigInt(v),
            encode: (v) => v.toString(),
        },
    ).describe('Download traffic bytes'),
}).describe('Node metrics item');

export type MetricsNode = z.infer<typeof MetricsNodeScheme>;