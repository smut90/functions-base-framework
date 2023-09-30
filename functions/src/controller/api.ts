import express, { NextFunction, Response } from "express";
import { runWith } from "firebase-functions";
import cors from "cors";
import * as dotenv from 'dotenv';
import userRoute from "@routes/userRoute";
import ApiResponse from "@entities/ApiResponse";
import ApiError from "@entities/ApiError";
import { debugLog, errorLog } from "@util/util";
import { ApiErrorJson } from "@root/entities/ApiError";
import {db} from "../config/firebase";

const app = express();
dotenv.config();

app.use(cors());

app.use((req: any, res: Response, next: NextFunction) => {
    debugLog(`new request: ${req.method} ${req.url}`);
    next();
});

app.use("/v1/users", userRoute(db));

app.use((err: Error, req: any, res: any, next: NextFunction) => {
    errorLog('error occurred while processing', err.message);
    if (res.headersSent) {
        return next(err);
    }
    const error = err as ApiErrorJson;
    // @ts-ignore
    return res.status(error.code || ApiError.unknownError({}).code).json(ApiResponse.error({
        source: error.source || ApiError.unknownError({}).source,
        message: error.message || err,
    } as ApiError ));
});

const runtimeOpts: { memory: any, timeoutSeconds: number } = {
    memory: "2GB",
    timeoutSeconds: 300,
};
const api = runWith(runtimeOpts).https.onRequest(app);

export default api;