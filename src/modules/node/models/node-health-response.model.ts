export class NodeHealthResponseModel {
    success: boolean;
    error: null | string;
    state: null | string;
    status = 'ok' as const;
    
    constructor(success: boolean, error?: null | string, state?: null | string) {
        this.success = success;
        this.error = error || null;
        this.state = state || null;
    }
}