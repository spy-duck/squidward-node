import { ExtractJwt, Strategy } from 'passport-jwt';

import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { parseNodePayloadFromConfigService } from '@/common/utils/decode-node-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'node-jwt-guard') {
    constructor(configService: ConfigService) {
        const certPayload = parseNodePayloadFromConfigService(
            configService.getOrThrow<string>('SSL_CERT'),
        ) ;
        
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: certPayload.jwtPublicKey,
            algorithms: [ 'RS256' ],
        });
    }
    
    validate(JWTPrivatePayload: unknown): Promise<unknown> {
        return Promise.resolve(JWTPrivatePayload);
    }
}