import { z } from 'zod';
import { REST_API } from '../../api';
import { UserScheme } from '../../shcemas';

export namespace PostUsersContract {
    export const url = REST_API.USERS.POST;
    
    export const RequestSchema = z.object({
        data: z.array(UserScheme),
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