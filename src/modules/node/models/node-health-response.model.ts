export class NodeHealthResponseModel {
    success: boolean;
    error: null | string;
    status = 'OK' as const;
    
    constructor(success: boolean, error?: null | string) {
        this.success = success;
        this.error = error || null;
    }
}