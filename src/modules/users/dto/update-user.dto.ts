import { createZodDto } from 'nestjs-zod';
import { UpdateUserContract } from '@contract/commands';


export class UpdateUserRequestDto extends createZodDto(UpdateUserContract.RequestSchema) {}
export class UpdateUserResponseDto extends createZodDto(UpdateUserContract.ResponseSchema) {}