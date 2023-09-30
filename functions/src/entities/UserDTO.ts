import admin from "firebase-admin";
import * as firebase from "firebase-admin";
const FieldValue = admin.firestore.FieldValue;

export interface UserDetailsJson {
  id: string;
  name: string;
  display_name: string;
  email: string;
  image_url: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserRequestPayload {
  id: string;
  name: string;
  display_name: string;
  email: string;
  image_url: string;
}

export default class UserDTO {

  constructor(options: any) {
    return {
      name: options.name || null,
      email: options.email || null,
      display_name: options.display_name || null,
    }
  }

  static newUserDb(uid: string, payload: firebase.auth.UserRecord) {
    return {
      id: uid,
      name: payload.displayName,
      display_name: payload.displayName,
      email: payload.email,
      image_url: payload.photoURL,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };
  }

  static toUserDetailsJson(id: string, user: any): UserDetailsJson {
    return {
      id,
      name: user.name,
      display_name: user.display_name,
      email: user.email,
      image_url: user.image_url,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
