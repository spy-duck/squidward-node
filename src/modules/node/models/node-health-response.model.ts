export class NodeHealthResponseModel {
    success: boolean;
    error: null | string;
    state: null | string;
    status = 'ok' as const;
    version: null | string;
    
    constructor(success: boolean, error?: null | string, state?: null | string, version?: null | string) {
        this.success = success;
        this.error = error || null;
        this.state = state || null;
        this.version = version || null;
    }
}