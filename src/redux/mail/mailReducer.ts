import {TMail} from "../api";
import {
  MAIL_BODY_FETCH_ERROR,
  MAIL_BODY_FETCH_START, MAIL_BODY_FETCH_SUCCESS,
  MAIL_FETCH_ERROR,
  MAIL_FETCH_START,
  MAIL_FETCH_SUCCESS,
  TMailActionTypes
} from "./mailTypes";
import {CLEAR_ALL_STATES, TSharedActionTypes} from "../shared/sharedTypes";

const initialState = {
  isFetching: false,
  mails: null as TMail[] | null,
  currentMailBody: null as null | string
}

type TMailState = typeof initialState

const mailReducer = (state = initialState, action: TMailActionTypes | TSharedActionTypes): TMailState => {
  switch (action.type) {
    case CLEAR_ALL_STATES:
      return initialState
    case MAIL_FETCH_START:
      return {...state, isFetching: true}
    case MAIL_FETCH_ERROR:
      return {...state, isFetching: false}
    case MAIL_FETCH_SUCCESS:
      return {...state, isFetching: false, mails: action.payload.mails.reverse()}
    case MAIL_BODY_FETCH_START:
      return {...state, isFetching: true, currentMailBody: null }
    case MAIL_BODY_FETCH_SUCCESS:
      return {...state, isFetching: false, currentMailBody: action.payload.mailBody}
    case MAIL_BODY_FETCH_ERROR:
      return {...state, isFetching: false, currentMailBody: null }
    default:
      return state
  }
}


export default mailReducer