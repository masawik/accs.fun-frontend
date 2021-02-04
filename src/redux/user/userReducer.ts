import {LOGIN_ERROR, FETCHING_START, SET_USER_LOGIN, TUserActionsTypes, DELETE_ERROR} from "./userTypes"
import {CLEAR_ALL_STATES, TSharedActionTypes} from "../shared/sharedTypes"

const initialState = {
  isFetching: false,
  login: null as null | string,
  loginErrorMessage: null as null | string,
  deleteErrorMessage: null as null | string
}

type TUserState = typeof initialState

const userReducer = (state = initialState, action: TUserActionsTypes | TSharedActionTypes): TUserState => {
  switch (action.type) {
    case DELETE_ERROR:
      return {...state, isFetching: false, deleteErrorMessage: action.payload.errorMessage}
    case CLEAR_ALL_STATES:
      return initialState
    case FETCHING_START:
      return {...state, isFetching: true}
    case SET_USER_LOGIN:
      return { ...state, isFetching: false, login: action.payload}
    case LOGIN_ERROR:
      return {...state, isFetching: false, loginErrorMessage: action.payload.errorMessage}
    default:
      return state
  }
}


export default userReducer