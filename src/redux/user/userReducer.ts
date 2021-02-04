import {LOGIN_ERROR, LOGIN_FETCHING_START, SET_USER_LOGIN, TUserActionsTypes} from "./userTypes"
import {CLEAR_ALL_STATES, TSharedActionTypes} from "../shared/sharedTypes"

const initialState = {
  isLoginFetching: false,
  login: null as null | string,
  loginErrorMessage: null as null | string
}

type TUserState = typeof initialState

const userReducer = (state = initialState, action: TUserActionsTypes | TSharedActionTypes): TUserState => {
  switch (action.type) {
    case CLEAR_ALL_STATES:
      return initialState
    case LOGIN_FETCHING_START:
      return {...state, isLoginFetching: true}
    case SET_USER_LOGIN:
      return { ...state, isLoginFetching: false, login: action.payload}
    case LOGIN_ERROR:
      return {...state, isLoginFetching: false, loginErrorMessage: action.payload.errorMessage}
    default:
      return state
  }
}


export default userReducer