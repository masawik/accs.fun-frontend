import {
  MAIL_BODY_FETCH_ERROR,
  MAIL_BODY_FETCH_START,
  MAIL_BODY_FETCH_SUCCESS,
  MAIL_FETCH_ERROR,
  MAIL_FETCH_START,
  MAIL_FETCH_SUCCESS,
  TMailActionTypes,
  TMailBodyFetchError,
  TMailBodyFetchStart,
  TMailBodyFetchSuccess,
  TMailFetchError,
  TMailFetchStart,
  TMailFetchSuccess
} from "./mailTypes";

import {EResponseCodes, mailAPI, TMail} from "../api";
import {TThunkType} from "../rootReducer";
import {genericErrorHandler} from "../shared/sharedActions";
import {TSharedActionTypes} from "../shared/sharedTypes";

const mailFetchStart = ():TMailFetchStart => ({type: MAIL_FETCH_START})
const mailFetchError = (errorMessage: string):TMailFetchError => ({
  type: MAIL_FETCH_ERROR,
  payload: {errorMessage}
})
const mailFetchSuccess = (mails: TMail[]):TMailFetchSuccess => ({
  type: MAIL_FETCH_SUCCESS,
  payload: {mails}
})

const mailBodyFetchStart = ():TMailBodyFetchStart => ({type: MAIL_BODY_FETCH_START})
const mailBodyFetchSuccess = (mailBody: string):TMailBodyFetchSuccess => ({type: MAIL_BODY_FETCH_SUCCESS, payload: {mailBody}})
const mailBodyFetchError = (errorMessage: string):TMailBodyFetchError => ({type: MAIL_BODY_FETCH_ERROR, errorMessage})

export const getMails = (): TThunkType<TMailActionTypes | TSharedActionTypes> => {
  return async dispatch => {
    dispatch(mailFetchStart())
    const {code, data} = await mailAPI.getMails()
    genericErrorHandler(dispatch, code, () => {
      if (code !== EResponseCodes.success) return dispatch(mailFetchError(data.errorMessage))
      return dispatch(mailFetchSuccess(data.mails))
    })
  }
}

export const getMailBody = (uid: string): TThunkType<TMailActionTypes | TSharedActionTypes> => {
  return async dispatch => {
    dispatch(mailBodyFetchStart())
    const {code, data} = await mailAPI.getMailBody(uid)

    genericErrorHandler(dispatch, code, () => {
      if (code !== EResponseCodes.success) return dispatch(mailBodyFetchError(data.errorMessage))
      return dispatch(mailBodyFetchSuccess(data.body))
    })
  }
}
