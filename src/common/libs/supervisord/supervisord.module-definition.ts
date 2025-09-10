import { ConfigurableModuleBuilder } from '@nestjs/common';
import type { TSupervisorOptions } from '@/common/libs/supervisord/supervisord.types';


export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
    new ConfigurableModuleBuilder<TSupervisorOptions>().build();
