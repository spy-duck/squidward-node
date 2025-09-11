import { createZodDto } from 'nestjs-zod';
import { SquidConfigContract } from '@contract/commands/squid/squid-config.contract';


export class ConfigSquidRequestDto extends createZodDto(SquidConfigContract.RequestSchema) {}
export class ConfigSquidResponseDto extends createZodDto(SquidConfigContract.ResponseSchema) {}