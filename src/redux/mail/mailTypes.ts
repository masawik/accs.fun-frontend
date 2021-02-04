import {TMail} from "../api";

export const MAIL_FETCH_START = 'MAIL_FETCH_START'
export const MAIL_FETCH_ERROR = 'MAIL_FETCH_ERROR'
export const MAIL_FETCH_SUCCESS = 'MAIL_FETCH_SUCCESS'

export type TMailFetchStart = {type: typeof MAIL_FETCH_START}
export type TMailFetchError = {
  type: typeof MAIL_FETCH_ERROR,
  payload: {
    errorMessage: string
  }
}
export type TMailFetchSuccess = {
  type: typeof MAIL_FETCH_SUCCESS,
  payload: {
    mails: TMail[]
  }
}

export type TMailActionTypes = TMailFetchStart | TMailFetchError | TMailFetchSuccess