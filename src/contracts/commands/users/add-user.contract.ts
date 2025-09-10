import { z } from 'zod';
import { REST_API } from '@/contracts/api';

export namespace AddUserContract {
    export const url = REST_API.USERS.ADD;
    
    export const RequestSchema = z.object({
        id: z.uuid(),
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