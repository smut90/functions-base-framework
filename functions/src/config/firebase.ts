import admin from "firebase-admin";

admin.initializeApp();

const db = admin.firestore();
const adminAuth = admin.auth();

export { adminAuth, db };