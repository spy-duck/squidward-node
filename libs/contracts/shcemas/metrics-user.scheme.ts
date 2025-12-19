import z from 'zod';

export const MetricsUserScheme = z.object({
    ts: z.number().describe('Timestamp'),
    usr: z.uuid().describe('User id'),
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
}).describe('User metrics item');

export type MetricsUser = z.infer<typeof MetricsUserScheme>;