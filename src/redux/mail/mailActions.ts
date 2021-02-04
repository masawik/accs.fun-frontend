import {
  MAIL_FETCH_ERROR,
  MAIL_FETCH_START,
  MAIL_FETCH_SUCCESS, MailActionTypes,
  TMailFetchError,
  TMailFetchStart,
  TMailFetchSuccess
} from "./mailTypes";
import {mailAPI, TMail} from "../api";
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

export const mailFetch = (): TThunkType<MailActionTypes> => {
  return async dispatch => {
    dispatch(mailFetchStart())
    const mailsInfo = await mailAPI.getMails()
    if (mailsInfo.code !== 0) dispatch(mailFetchError(mailsInfo.data.errorMessage))
    dispatch(mailFetchSuccess(mailsInfo.data.mails))
  }
}