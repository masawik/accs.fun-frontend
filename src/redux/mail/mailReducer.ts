import {TMail} from "../api";
import {MAIL_FETCH_ERROR, MAIL_FETCH_START, MAIL_FETCH_SUCCESS, MailActionTypes} from "./mailTypes";

const initialState = {
  isFetching: false,
  mails: null as TMail[] | null
}

type TMailState = typeof initialState

const userReducer = (state = initialState, action: MailActionTypes): TMailState => {
  switch (action.type) {
    case MAIL_FETCH_START:
      return {...state, isFetching: true}
    case MAIL_FETCH_ERROR:
      return {...state, isFetching: false}
    case MAIL_FETCH_SUCCESS:
      return {...state, isFetching: false, mails: action.payload.mails}
    default:
      return state
  }
}


export default userReducer