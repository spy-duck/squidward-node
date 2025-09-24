import { Request } from 'express';
import { INTERNAL_ALLOWED_CONTROLLERS, INTERNAL_USER_AGENT } from '@contract/constants';
import { ROOT } from '@contract/api';

export function validateInternalRequest(req: Request): boolean {
    const headers = req.headers;
    console.log('headers', headers, headers['user-agent']);
    if (headers['user-agent'] === INTERNAL_USER_AGENT) {
        return true;
    }
    for (const controller of INTERNAL_ALLOWED_CONTROLLERS) {
        if (req.url.startsWith(`${ROOT}/${controller}`)) {
            return true;
        }
    }
    return false;
}
