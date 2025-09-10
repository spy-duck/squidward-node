import { Request } from 'express';
import { INTERNAL_ALLOWED_CONTROLLERS, INTERNAL_USER_AGENT } from '@contract/constants';
import { ROOT } from '@/contracts';

export function validateInternalRequest(req: Request): boolean {
    console.log(req);
    const headers = req.headers;
    console.log('headers', headers, headers['user-agent']);
    if (headers['user-agent'] === INTERNAL_USER_AGENT) {
        return true;
    }
    for (const controller of INTERNAL_ALLOWED_CONTROLLERS) {
        console.log(
            req.url,
            `${ROOT}/${controller}`
        )
        if (req.url.startsWith(`${ROOT}/${controller}`)) {
            return true;
        }
    }
    return false;
}
