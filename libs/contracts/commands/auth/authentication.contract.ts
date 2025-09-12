import { z } from 'zod';
import { REST_API } from '../../api';

export namespace AuthenticationContract {
    export const url = REST_API.AUTH.AUTHENTICATION;
    
    export const RequestSchema = z.object({
        username: z.string(),
        password: z.string(),
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