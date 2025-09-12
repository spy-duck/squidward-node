import { createZodDto } from 'nestjs-zod';
import { RemoveUserContract } from '../../../../libs/contracts';


export class RemoveUserRequestDto extends createZodDto(RemoveUserContract.RequestSchema) {}
export class RemoveUserResponseDto extends createZodDto(RemoveUserContract.ResponseSchema) {}