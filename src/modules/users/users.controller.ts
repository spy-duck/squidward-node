import { USERS_CONTROLLER, USERS_ROUTES } from '../../../libs/contracts';
import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '@/modules/users/users.service';
import {
    PostUsersRequestDto, PostUsersResponseDto,
    AddUserRequestDto, AddUserResponseDto,
    RemoveUserRequestDto, RemoveUserResponseDto, UpdateUserRequestDto, UpdateUserResponseDto,
} from '@/modules/users/dto';
import { errorHandler } from '@/common/helpers/error-handler.helper';


@Controller(USERS_CONTROLLER)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    
    @Post(USERS_ROUTES.POST)
    public async postUsers(@Body() body: PostUsersRequestDto): Promise<PostUsersResponseDto> {
        const response = await this.usersService.postUsers(body);
        const data = errorHandler(response);
        return {
            response: data,
        };
    }
    
    @Post(USERS_ROUTES.ADD)
    public async addUser(@Body() body: AddUserRequestDto): Promise<AddUserResponseDto> {
        const response = await this.usersService.addUser(body);
        const data = errorHandler(response);
        return {
            response: data,
        };
    }
    
    @Post(USERS_ROUTES.REMOVE)
    public async removeUser(@Body() body: RemoveUserRequestDto): Promise<RemoveUserResponseDto> {
        const response = await this.usersService.removeUser(body);
        const data = errorHandler(response);
        return {
            response: data,
        };
    }
    
    @Post(USERS_ROUTES.UPDATE)
    public async updateUser(@Body() body: UpdateUserRequestDto): Promise<UpdateUserResponseDto> {
        const response = await this.usersService.updateUser(body);
        const data = errorHandler(response);
        return {
            response: data,
        };
    }
}