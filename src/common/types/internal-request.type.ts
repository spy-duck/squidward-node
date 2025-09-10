import { Request } from 'express';

export type InternalRequest = Request & {
    isInternalRequest: boolean;
}