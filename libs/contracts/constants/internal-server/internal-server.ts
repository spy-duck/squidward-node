import { AUTH_CONTROLLER } from '../../index';

export const INTERNAL_SERVER_PORT = 9053 as const;
export const INTERNAL_USER_AGENT = 'squid-connector' as const;
export const INTERNAL_ALLOWED_CONTROLLERS = [
    AUTH_CONTROLLER,
]