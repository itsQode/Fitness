import { createAction, props } from "@ngrx/store";

export const SET_AUTHENTICATED = createAction('[Auth] Set Authenticated')
export const SET_UNAUTHENTICATED = createAction('[Auth] Set Unauthenticated')
export const SET_UID = createAction('[Auth] Set Uid',props<{payload:string}>())
