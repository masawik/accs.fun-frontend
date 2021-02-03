import {SET_USER_LOGIN, TUserActionsTypes} from "./userTypes";

const initialState = {
  login: null as null | string
}

type TUserState = typeof initialState

const userReducer = (state = initialState, action: TUserActionsTypes): TUserState => {
  switch (action.type) {
    case SET_USER_LOGIN:
      return { ...state ,login: action.payload}
    default:
      return state
  }
}


export default userReducer