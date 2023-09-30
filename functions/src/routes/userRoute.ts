import express, { RequestHandler, NextFunction } from "express";
import admin from "firebase-admin";
import ApiResponse from "@entities/ApiResponse";
import { httpCodes } from "@root/helper/constants";
import {debugLog, performValidation} from "@util/util";
import {param} from "express-validator";
import {UserDetailsJson} from "@entities/UserDTO";
import {getUserDetails} from "@core/userCore";

const router = express.Router();

export default function userRoute(db: admin.firestore.Firestore): RequestHandler {

    router.get('/:id',
        performValidation(
            param("id").trim()
                .not().isEmpty().withMessage("user id cannot be empty"),
        ),
        async (req: any, res: any, next: NextFunction) => {
            try {
                const userId: string = req.params.id;
                debugLog(`request received to fetch user details for userId: ${userId}`);

                const response: UserDetailsJson = await getUserDetails(db, userId);

                // eslint-disable-next-line consistent-return
                return res.status(httpCodes.OK).json(ApiResponse.ok(response));
            } catch (e) {
                // eslint-disable-next-line consistent-return
                return next(e);
            }
        });

    return router;
}