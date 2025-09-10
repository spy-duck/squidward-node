import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { ConfigurableModuleClass } from './redis.module-definition';



@Global()
@Module({
    providers: [ RedisService ],
    exports: [ RedisService ],
})
export class RedisModule extends ConfigurableModuleClass {}
