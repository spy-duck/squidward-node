import { z } from 'zod';
import { REST_API } from '../../api';
import { MetricsNodeScheme } from '../../shcemas';

export namespace MetricsNodeContract {
    export const url = REST_API.METRICS.NODE;
    
    export const ResponseSchema = z.object({
        response: z.array(MetricsNodeScheme),
    });
    
    export type Response = z.infer<typeof ResponseSchema>;
}