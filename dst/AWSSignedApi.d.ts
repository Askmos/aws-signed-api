import { AxiosInstance } from 'axios';
import { Credentials } from './AWSTypes';
export declare class AWSSignedApi {
    baseURL: string;
    api: AxiosInstance;
    constructor(baseURL: string, credentials: Credentials, region?: string, service?: string);
    get<T>(url?: string): import("axios").AxiosPromise<T>;
    post<T>(url?: string, data?: {}): import("axios").AxiosPromise<T>;
    put<T>(url?: string, data?: {}): import("axios").AxiosPromise<T>;
    patch<T>(url?: string, data?: {}): import("axios").AxiosPromise<T>;
    delete<T>(url?: string, data?: {}): import("axios").AxiosPromise<T>;
}
