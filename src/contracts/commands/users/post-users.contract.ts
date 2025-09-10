import { z } from 'zod';
import { REST_API } from '@/contracts/api';

export namespace PostUsersContract {
    export const url = REST_API.USERS.POST;
    
    const User = z.object({
        id: z.uuid(),
        username: z.string(),
        password: z.string(),
    });
    
    export const RequestSchema = z.object({
        data: z.array(
            User,
        ),
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