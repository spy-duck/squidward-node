import { createZodDto } from 'nestjs-zod';
import { PostUsersContract } from '@contract/commands';


export class PostUsersRequestDto extends createZodDto(PostUsersContract.RequestSchema) {}
export class PostUsersResponseDto extends createZodDto(PostUsersContract.ResponseSchema) {}