import { createZodDto } from 'nestjs-zod';
import { AddUserContract } from '../../../../libs/contracts';


export class AddUserRequestDto extends createZodDto(AddUserContract.RequestSchema) {}
export class AddUserResponseDto extends createZodDto(AddUserContract.ResponseSchema) {}