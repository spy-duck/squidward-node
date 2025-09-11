import { z } from 'zod';
import { REST_API } from '@/contracts';

export namespace SquidConfigContract {
    export const url = REST_API.SQUID.CONFIG;
    
    export const RequestSchema = z.object({
        config: z.string(),
    });
    
    export type Request = z.infer<typeof RequestSchema>;
    
    export const ResponseSchema = z.object({
        response: z.object({
            success: z.boolean(),
            error: z.string().nullable(),
        }),
    });
    
    export type Response = z.infer<typeof ResponseSchema>;
}