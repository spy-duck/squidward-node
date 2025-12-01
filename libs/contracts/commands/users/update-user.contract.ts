import { z } from 'zod';
import { REST_API } from '../../api';
import { UserScheme } from '../../shcemas';

export namespace UpdateUserContract {
    export const url = REST_API.USERS.UPDATE;
    
    export const RequestSchema = UserScheme;
    
    export type Request = z.infer<typeof RequestSchema>;
    
    export const ResponseSchema = z.object({
        response: z.object({
            success: z.boolean(),
            error: z.string().nullable(),
        }),
    });
    
    export type Response = z.infer<typeof ResponseSchema>;
}