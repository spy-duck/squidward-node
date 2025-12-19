import { z } from 'zod';
import { REST_API } from '../../api';
import { MetricsUserScheme } from '../../shcemas';

export namespace MetricsUsersContract {
    export const url = REST_API.METRICS.USERS;
    
    export const ResponseSchema = z.object({
        response: z.array(MetricsUserScheme),
    });
    
    export type Response = z.infer<typeof ResponseSchema>;
}