import { SQUID_CONTROLLER, SQUID_ROUTES } from '@/contracts';
import { Body, Controller, Post } from '@nestjs/common';
import { errorHandler } from '@/common/helpers/error-handler.helper';
import {
    RestartSquidRequestDto, RestartSquidResponseDto,
    StartSquidRequestDto, StartSquidResponseDto,
    StopSquidRequestDto, StopSquidResponseDto,
} from '@/modules/squid/dto';
import { SquidService } from '@/modules/squid/squid.service';


@Controller(SQUID_CONTROLLER)
export class SquidController {
    constructor(private readonly squidService: SquidService) {}
    
    @Post(SQUID_ROUTES.START)
    public async startSquid(@Body() body: StartSquidRequestDto): Promise<StartSquidResponseDto> {
        const response = await this.squidService.startSquid(body);
        const data = errorHandler(response);
        return {
            response: data,
        };
    }
    
    @Post(SQUID_ROUTES.STOP)
    public async stopSquid(@Body() body: StopSquidRequestDto): Promise<StopSquidResponseDto> {
        const response = await this.squidService.stopSquid(body);
        const data = errorHandler(response);
        return {
            response: data,
        };
    }
    
    @Post(SQUID_ROUTES.RESTART)
    public async restartSquid(@Body() body: RestartSquidRequestDto): Promise<RestartSquidResponseDto> {
        const response = await this.squidService.restartSquid(body);
        const data = errorHandler(response);
        return {
            response: data,
        };
    }
}