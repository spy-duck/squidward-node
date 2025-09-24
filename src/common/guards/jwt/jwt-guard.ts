import { Request, Response } from 'express';
import { ExecutionContext, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export class JwtGuard extends AuthGuard('node-jwt-guard') {
    private readonly logger = new Logger(JwtGuard.name);
    
    handleRequest(err: any, user: any, info: any, context: ExecutionContext): any {
        if (info instanceof Error || err || !user) {
            const request: Request = context.switchToHttp().getRequest();
            const response: Response = context.switchToHttp().getResponse();
            
            this.logger.debug(`${JSON.stringify(request.headers)}`);
            
            this.logger.error(
                `Incorrect SSL_CERT or JWT! Request dropped. URL: ${request.url}, IP: ${request.ip}`,
            );
            
            response.socket?.destroy();
            throw new UnauthorizedException('Unauthorized');
        }
        return user;
    }
}