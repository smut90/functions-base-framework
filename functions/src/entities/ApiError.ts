import { ValidationError } from "express-validator";
import { httpCodes, errorSource } from "@root/helper/constants";

export interface ApiErrorJson {
    code?: number
    source?: string
    message?: string | [] | {}
}

export default class ApiError {

    static unauthorized(): ApiErrorJson {
        return { code: httpCodes.FORBIDDEN, source: errorSource.CLIENT_ERROR, message: ["missing or invalid Authentication token"] };
    }

    static validationError(errors?: ValidationError[] | string[]): ApiErrorJson {
        return { code: httpCodes.BAD_REQUEST, source: errorSource.CLIENT_ERROR, message: errors };
    }

    static userDoesNotExist(): ApiErrorJson {
        return { code: httpCodes.BAD_REQUEST, source: errorSource.CLIENT_ERROR, message: ["user with the provided id does not exist"] };
    }

    static userAlreadyExists() {
        return { code: httpCodes.BAD_REQUEST, source: errorSource.CLIENT_ERROR, message: ["user with given email already exists"] };
    }

    static unknownError(error?: any): ApiErrorJson {
        return { code: httpCodes.INTERNAL_SERVER_ERROR, source: errorSource.INTERNAL_SERVER_ERROR, message: error };
    }
};
