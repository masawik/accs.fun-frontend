import {TError} from "../api";

export const SET_USER_LOGIN = 'SET_USER_LOGIN'
export const FETCHING_START = 'FETCHING_START'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const DELETE_ERROR = 'DELETE_ERROR'


export type TSetUserLogin = {
  type: typeof SET_USER_LOGIN,
  payload: string
}
export type TUserFetchingStart = {type: typeof FETCHING_START}
export type TLoginError = {
  type: typeof LOGIN_ERROR,
  payload: TError
}
export type TLoginData = {
  login: string,
  password: string
}
export type TDeleteError = {
  type: typeof DELETE_ERROR,
  payload: TError
}

export type TUserActionsTypes = TSetUserLogin | TUserFetchingStart | TLoginError | TDeleteError