import { ExecutionContext, Logger, UnauthorizedException, CanActivate } from '@nestjs/common';
import { InternalRequest } from '@/common/types/internal-request.type';
import { INTERNAL_ALLOWED_CONTROLLERS, INTERNAL_USER_AGENT } from '@contract/constants';


export class InternalServerGuard implements CanActivate {
    private readonly logger = new Logger(InternalServerGuard.name);
    
    canActivate(context: ExecutionContext) {
        const request: InternalRequest = context.switchToHttp().getRequest();
        
        const headers = request.headers;
        
        if (headers['user-agent'] !== INTERNAL_USER_AGENT) {
            this.logger.error('Invalid user-agent:', headers['user-agent']);
            throw new UnauthorizedException('Unauthorized');
        }
        
        if (!INTERNAL_ALLOWED_CONTROLLERS.some(
            (controller) => request.url.startsWith(`/${controller}`),
        )) {
            this.logger.error('Forbidden by controller access:', request.url);
            return false;
        }
        
        return request.isInternalRequest;
    }
}
