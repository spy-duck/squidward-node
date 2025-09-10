import { Injectable, Logger } from '@nestjs/common';
import { ICommandResponse } from '@/common/types';
import { ERRORS } from '@contract/constants';
import { comparePassword, encryptPassword } from '@/common/helpers';
import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { AuthenticationResponseModel } from './models';
import { TAuthenticationRequest } from './interfaces';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);
    
    constructor(
        private readonly usersRepository: UsersRepository,
    ) {}
    
    async authentication(data: TAuthenticationRequest): Promise<ICommandResponse<AuthenticationResponseModel>> {
        try {
            const user = await this.usersRepository.getByUsername(data.username);
   
            if (!user) {
                return {
                    success: false,
                    code: ERRORS.UNAUTHORIZED.code,
                    response: new AuthenticationResponseModel(false, ERRORS.UNAUTHORIZED.message),
                };
            }
            
            if (await comparePassword(data.password, user.password)) {
                this.logger.log(`User "${user.username}" has been authenticated`);
                return {
                    success: true,
                    response: new AuthenticationResponseModel(true),
                };
            }
            
            return {
                success: false,
                code: ERRORS.UNAUTHORIZED.code,
                response: new AuthenticationResponseModel(false, ERRORS.UNAUTHORIZED.message),
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
                response: new AuthenticationResponseModel(false, message),
            };
        }
    }
}