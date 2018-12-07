export interface Request {
    service: string;
    region?: string;
    path?: string;
    body?: any;
    method?: string;
    headers?: Record<string, string>;
}
export interface Credentials {
    accessKeyId: string;
    secretAccessKey: string;
    sessionToken: string;
}
