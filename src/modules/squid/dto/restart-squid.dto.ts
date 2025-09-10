import { createZodDto } from 'nestjs-zod';
import { SquidRestartContract } from '@/contracts';


export class RestartSquidRequestDto extends createZodDto(SquidRestartContract.RequestSchema) {}
export class RestartSquidResponseDto extends createZodDto(SquidRestartContract.ResponseSchema) {}