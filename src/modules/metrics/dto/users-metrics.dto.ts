import { createZodDto } from 'nestjs-zod';
import { MetricsUsersContract } from '@contract/commands';


export class UsersMetricsDto extends createZodDto(MetricsUsersContract.ResponseSchema) {}