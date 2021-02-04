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

export const mailFetch = (): TThunkType<TMailActionTypes> => {
  return async dispatch => {
    dispatch(mailFetchStart())
    const mailsInfo = await mailAPI.getMails()
    if (mailsInfo.code !== EResponseCodes.success) dispatch(mailFetchError(mailsInfo.data.errorMessage))
    dispatch(mailFetchSuccess(mailsInfo.data.mails))
  }
}

export const getMailBody = (uid: string): TThunkType<TMailActionTypes> => {
  return async dispatch => {
    dispatch(mailBodyFetchStart())
    const mailBodyInfo = await mailAPI.getMailBody(uid)
    console.log(mailBodyInfo)
    if (mailBodyInfo.code !== EResponseCodes.success) return dispatch(mailBodyFetchError(mailBodyInfo.data.errorMessage))
    dispatch(mailBodyFetchSuccess(mailBodyInfo.data.body))
  }
}
