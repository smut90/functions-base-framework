import admin from "firebase-admin";
import {UserDetailsJson} from "@entities/UserDTO";
import ApiError from "@entities/ApiError";
import {errorLog} from "@util/util";
import {createUser, getUserById} from "@repository/usersCollection";
import * as firebase from "firebase-admin";

export async function checkUserExists(db: admin.firestore.Firestore, userId: string) {
    const userRecord = await getUserById(db, userId);
    if (!userRecord) {
        errorLog("user does not exist for id:", userId);
        throw ApiError.userDoesNotExist();
    }

    return userRecord;
}

export async function getUserDetails(db: admin.firestore.Firestore, userId: string):
    Promise<UserDetailsJson>
{
    return checkUserExists(db, userId);
}

export async function addNewUser(db: admin.firestore.Firestore,
                                 userId: string,
                                 payload: firebase.auth.UserRecord):
    Promise<any>
{
    const userRecord = await getUserById(db, userId);
    if (userRecord) {
        errorLog("user already exists for userId:", userId);
        throw ApiError.userAlreadyExists();
    }

    return await createUser(db, userId, payload);
}