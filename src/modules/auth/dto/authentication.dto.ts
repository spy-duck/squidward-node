import { createZodDto } from 'nestjs-zod';
import { AuthenticationContract } from '../../../../libs/contracts';


export class AuthenticationRequestDto extends createZodDto(AuthenticationContract.RequestSchema) {}
export class AuthenticationResponseDto extends createZodDto(AuthenticationContract.ResponseSchema) {}