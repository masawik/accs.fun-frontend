import {TError} from "../api";

export const SET_USER_LOGIN = 'SET_USER_LOGIN'
export const LOGIN_FETCHING_START = 'LOGIN_FETCHING_START'
export const LOGIN_ERROR = 'LOGIN_ERROR'

export type TSetUserLogin = {
  type: typeof SET_USER_LOGIN,
  payload: string
}
export type TLoginFetchingStart = {type: typeof LOGIN_FETCHING_START}
export type TLoginError = {
  type: typeof LOGIN_ERROR,
  payload: TError
}

export type TLoginData = {
  login: string,
  password: string
}

export type TUserActionsTypes = TSetUserLogin | TLoginFetchingStart | TLoginError