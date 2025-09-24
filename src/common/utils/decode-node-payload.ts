interface INodePayload {
    caCertPem: string;
    jwtPublicKey: string;
    nodeCertPem: string;
    nodeKeyPem: string;
}

export function parseNodePayload(): INodePayload {
    const nodePayload = process.env.SSL_CERT;
    return parseNodePayloadFromConfigService(nodePayload);
}

export function parseNodePayloadFromConfigService(sslCert: string | undefined): INodePayload {
    if (!sslCert) {
        throw new Error('SSL_CERT is not set');
    }
    
    const parsed = ((): INodePayload => {
        try {
            return JSON.parse(sslCert) as INodePayload;
        } catch (error) {
            if (error instanceof SyntaxError) {
                throw new Error('SSL_CERT contains invalid JSON');
            }
            throw error;
        }
    })();
    
    if (!isValidNodePayload(parsed)) {
        throw new Error('Invalid SSL certificate payload structure');
    }
    
    return parsed;
}

function isValidNodePayload(payload: unknown): payload is INodePayload {
    if (!payload || typeof payload !== 'object') return false;
    
    return (
        'caCertPem' in payload &&
        typeof payload.caCertPem === 'string' &&
        'jwtPublicKey' in payload &&
        typeof payload.jwtPublicKey === 'string' &&
        'nodeCertPem' in payload &&
        typeof payload.nodeCertPem === 'string' &&
        'nodeKeyPem' in payload &&
        typeof payload.nodeKeyPem === 'string'
    );
}