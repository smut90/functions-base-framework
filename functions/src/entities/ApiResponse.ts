import ApiError from '@root/entities/ApiError';

export interface ApiResponseJson {
    readonly data: {} | null,
    readonly error: ApiError | null,
}

export default class ApiResponse {
    static error(error: ApiError): ApiResponseJson {
        return {
            data: null,
            error,
        };
    }

    static ok(data?: {} | string ): object {
        return {
            error: null,
            data,
        };
    }
}