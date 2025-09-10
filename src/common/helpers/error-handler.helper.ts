import { InternalServerErrorException } from '@nestjs/common';


import { ERRORS } from '@contract/constants';
import { ICommandResponse } from '@/common/types';
import { HttpExceptionWithErrorCodeType } from '@/common/exceptions';

export function errorHandler<T>(response: ICommandResponse<T>): T {
    if (response.success) {
        if (!response.response) {
            throw new InternalServerErrorException('No data returned');
        }
        return response.response;
    } else {
        if (!response.code) {
            throw new InternalServerErrorException('Unknown error');
        }
        const errorObject = Object.values(ERRORS).find((error) => error.code === response.code);
        
        if (!errorObject) {
            throw new InternalServerErrorException('Unknown error');
        }
        throw new HttpExceptionWithErrorCodeType(
            errorObject.message,
            errorObject.code,
            errorObject.httpCode,
        );
    }
}