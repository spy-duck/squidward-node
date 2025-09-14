import { z } from 'zod';
import { REST_API } from '../../api';

export namespace NodeHealthContract {
    export const url = REST_API.NODE.HEALTH;
    
    export const ResponseSchema = z.object({
        response: z.object({
            success: z.boolean(),
            error: z.string().nullable(),
            state: z.string().nullable(),
            status: z.literal('ok'),
        }),
    });
    
    export type Response = z.infer<typeof ResponseSchema>;
}