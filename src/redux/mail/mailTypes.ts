import {TMail} from "../api";

export const MAIL_FETCH_START = 'MAIL_FETCH_START'
export const MAIL_FETCH_ERROR = 'MAIL_FETCH_ERROR'
export const MAIL_FETCH_SUCCESS = 'MAIL_FETCH_SUCCESS'
export const MAIL_BODY_FETCH_START = 'MAIL_BODY_FETCH_START'
export const MAIL_BODY_FETCH_SUCCESS = 'MAIL_BODY_FETCH_SUCCESS'
export const MAIL_BODY_FETCH_ERROR = 'MAIL_BODY_FETCH_ERROR'




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

export type TMailBodyFetchStart = {type: typeof MAIL_BODY_FETCH_START}

export type TMailBodyFetchSuccess = {
  type: typeof MAIL_BODY_FETCH_SUCCESS,
  payload: {mailBody: string}
}

export type TMailBodyFetchError = {
  type: typeof MAIL_BODY_FETCH_ERROR,
  errorMessage: string
}

export type TMailActionTypes = TMailFetchStart | TMailFetchError | TMailFetchSuccess
  | TMailBodyFetchStart | TMailBodyFetchSuccess | TMailBodyFetchError