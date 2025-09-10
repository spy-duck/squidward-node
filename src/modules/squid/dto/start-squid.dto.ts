import { createZodDto } from 'nestjs-zod';
import { SquidStartContract } from '@/contracts';


export class StartSquidRequestDto extends createZodDto(SquidStartContract.RequestSchema) {}
export class StartSquidResponseDto extends createZodDto(SquidStartContract.ResponseSchema) {}