import admin from "firebase-admin";
import { debugLog, errorLog } from "@util/util";
import { collections } from "@root/helper/collections";
import UserDTO from "@entities/UserDTO";
import * as firebase from "firebase-admin";

export async function getUserById(db: admin.firestore.Firestore, userId: string) {
    const userRef = await db.collection(collections.USERS_COL).doc(userId).get();
    return userRef.data() ? UserDTO.toUserDetailsJson(userId, userRef.data()) : null;
}

export async function createUser(db: admin.firestore.Firestore, uid: string, payload: firebase.auth.UserRecord) {
    debugLog("start creating new user in db: ", uid)
    const firestoreUser = UserDTO.newUserDb(uid, payload);

    return db.collection(collections.USERS_COL).doc(uid)
        .set(firestoreUser)
        .then(() => {
            return Promise.resolve(firestoreUser);
        })
        .catch(error => {
            errorLog("an error returned from firestore while creating new user ", error);
            return Promise.reject(error);
        });
}