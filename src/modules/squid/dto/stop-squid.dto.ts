import { createZodDto } from 'nestjs-zod';
import { SquidStopContract } from '@contract/commands/squid/squid-stop.contract';


export class StopSquidRequestDto extends createZodDto(SquidStopContract.RequestSchema) {}
export class StopSquidResponseDto extends createZodDto(SquidStopContract.ResponseSchema) {}