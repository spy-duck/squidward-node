import { RequestHandler } from 'express-serve-static-core';
import { InternalRequest } from '@/common/types/internal-request.type';

export const InternalServerMiddleware = (httpServer: any): RequestHandler => (req: InternalRequest, res, next) => {
    req.url = req.originalUrl;
    req.isInternalRequest = true;
    httpServer.handle(req, res, next);
}