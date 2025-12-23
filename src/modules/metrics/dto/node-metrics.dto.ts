import { createZodDto } from 'nestjs-zod';
import { MetricsNodeContract } from '@contract/commands';


export class NodeMetricsDto extends createZodDto(MetricsNodeContract.ResponseSchema) {}