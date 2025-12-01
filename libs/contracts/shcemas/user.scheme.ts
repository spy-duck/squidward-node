import z from 'zod';

export const UserScheme = z.object({
    uuid: z.uuid().describe('UUID'),
    username: z.string().describe('Username'),
    password: z.string().describe('Password'),
    expireAt: z.codec(
        z.string().nonempty(),
        z.date(),
        {
            decode: (str) => new Date(str),
            encode: (dt) => dt.toISOString(),
        },
    ).nonoptional().describe('Expire at'),
}).describe('User scheme');

export type User = z.infer<typeof UserScheme>;