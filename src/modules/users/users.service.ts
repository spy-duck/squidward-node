import { Injectable, Logger } from '@nestjs/common';
import { ICommandResponse } from '@/common/types';
import { ERRORS } from '@contract/constants';
import {
    TPostUsersRequest,
    TAddUserRequest,
    TRemoveUsersRequest,
    TUpdateUserRequest,
} from '@/modules/users/interfaces';
import {
    AddUserResponseModel,
    PostUsersResponseModel,
    RemoveUserResponseModel,
    UpdateUserResponseModel,
} from '@/modules/users/models';
import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { UserEntity } from '@/modules/users/entities/user.entity';

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);
    
    constructor(
        private readonly usersRepository: UsersRepository,
    ) {}
    
    async postUsers(request: TPostUsersRequest): Promise<ICommandResponse<PostUsersResponseModel>> {
        try {
            // Clear users
            await this.usersRepository.clear();
            
            // Save users
            for (const user of request.data) {
                await this.usersRepository.create(new UserEntity({
                    uuid: user.uuid,
                    username: user.username,
                    password: user.password,
                    expireAt: user.expireAt,
                }));
            }
            
            return {
                success: true,
                response: new PostUsersResponseModel(true),
            };
        } catch (error) {
            this.logger.error(error);
            let message = '';
            if (error instanceof Error) {
                message = error.message;
            }
            return {
                success: false,
                code: ERRORS.INTERNAL_SERVER_ERROR.code,
                response: new PostUsersResponseModel(false, message),
            };
        }
    }
    
    async addUser(request: TAddUserRequest): Promise<ICommandResponse<AddUserResponseModel>> {
        try {
            await this.usersRepository.create(new UserEntity({
                uuid: request.uuid,
                username: request.username,
                password: request.password,
                expireAt: request.expireAt,
            }));
            return {
                success: true,
                response: new AddUserResponseModel(true),
            };
        } catch (error) {
            this.logger.error(error);
            let message = '';
            if (error instanceof Error) {
                message = error.message;
            }
            return {
                success: false,
                code: ERRORS.INTERNAL_SERVER_ERROR.code,
                response: new AddUserResponseModel(false, message),
            };
        }
    }
    
    async removeUser(data: TRemoveUsersRequest): Promise<ICommandResponse<RemoveUserResponseModel>> {
        try {
            await this.usersRepository.remove(data.userUuid);
            return {
                success: true,
                response: new AddUserResponseModel(true),
            };
        } catch (error) {
            this.logger.error(error);
            let message = '';
            if (error instanceof Error) {
                message = error.message;
            }
            return {
                success: false,
                code: ERRORS.INTERNAL_SERVER_ERROR.code,
                response: new AddUserResponseModel(false, message),
            };
        }
    }
    
    async updateUser(request: TUpdateUserRequest): Promise<ICommandResponse<UpdateUserResponseModel>> {
        try {
            await this.usersRepository.update(new UserEntity({
                uuid: request.uuid,
                username: request.username,
                password: request.password,
                expireAt: request.expireAt,
            }));
            return {
                success: true,
                response: new UpdateUserResponseModel(true),
            };
        } catch (error) {
            this.logger.error(error);
            let message = '';
            if (error instanceof Error) {
                message = error.message;
            }
            return {
                success: false,
                code: ERRORS.INTERNAL_SERVER_ERROR.code,
                response: new UpdateUserResponseModel(false, message),
            };
        }
    }
}