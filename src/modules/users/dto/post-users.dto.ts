import { createZodDto } from 'nestjs-zod';
import { PostUsersContract } from '@/contracts';


export class PostUsersRequestDto extends createZodDto(PostUsersContract.RequestSchema) {}
export class PostUsersResponseDto extends createZodDto(PostUsersContract.ResponseSchema) {}