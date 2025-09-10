import { Global, Module } from '@nestjs/common';
import { SupervisordService } from './supervisord.service';
import { ConfigurableModuleClass } from './supervisord.module-definition';



@Global()
@Module({
    providers: [ SupervisordService ],
    exports: [ SupervisordService ],
})
export class SupervisordModule extends ConfigurableModuleClass {}
