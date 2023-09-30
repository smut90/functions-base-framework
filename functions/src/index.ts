// tslint:disable-next-line:no-var-requires
import {debugLog} from "@util/util";

require("module-alias/register");

import * as functions from "firebase-functions";
import api from "@root/controller/api";
import {db} from "./config/firebase";
import {addNewUser} from "@core/userCore";

exports.addUserWhenCreatedInFirebaseAuth = functions.auth.user()
    .onCreate(async (user) => {
        debugLog('a new user was registered, hence adding user to user collection' + JSON.stringify(user));

        return await addNewUser(db, user.uid, user);
    });

exports.api_v1 = api;
