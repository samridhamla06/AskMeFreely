const keys = require("../config/keys");

export const API_BASE_URL = keys.baseURL; // http://localhost:8080

export const ACCESS_TOKEN = "TALKFREELY_ACCESS_TOKEN";
export const LOGGED_IN_NAME = "TALKFREELY_LOGGED_IN_NAME";
export const LOGGED_IN_EMAIL = "TALKFREELY_LOGGED_IN_EMAIL";


export const GET_MENTOR_URL = API_BASE_URL + "/v1/mentor";
export const GET_USER_URL = API_BASE_URL + "/v1/auth/user";
export const ADD_MENTOR_URL = API_BASE_URL + "/v1/auth/mentor";
export const UPLOAD_IMAGE_URL = API_BASE_URL + "/v1/auth/uploadImage";
export const BOOK_SESSION_URL = API_BASE_URL + "/v1/auth/bookSession";
export const COMPLETE_SESSION_URL = API_BASE_URL + "/v1/auth/completeSession";
export const GET_SESSION_URL = API_BASE_URL + "/v1/auth/session";
export const GOOGLE_AUTH_URL = API_BASE_URL + "/auth/validate";
export const DEFAULT_IMAGE_LOCATION  = "https://stammerly-bucket.s3.us-east-2.amazonaws.com/images/download.png";

