import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { errorHandler } from '@/common/helpers/error-handler.helper';
import { AUTH_CONTROLLER, AUTH_ROUTES } from '@/contracts';
import { InternalServerGuard } from '@/common/guards/internal-server/internal-server.guard';
import {
    AuthenticationRequestDto, AuthenticationResponseDto,
} from './dto';
import { AuthService } from './auth.service';

@UseGuards(InternalServerGuard)
@Controller(AUTH_CONTROLLER)
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    @Post(AUTH_ROUTES.AUTHENTICATION)
    public async authentication(@Body() body: AuthenticationRequestDto): Promise<AuthenticationResponseDto> {
        const response = await this.authService.authentication(body);
        const data = errorHandler(response);
        return {
            response: data,
        };
    }
}