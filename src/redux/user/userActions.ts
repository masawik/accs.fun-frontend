import {
  TSetUserLogin,
  SET_USER_LOGIN,
  TUserActionsTypes,
} from "./userTypes"
import {ThunkAction} from "redux-thunk"
import {TRootState} from "../rootReducer";

type TThunkType = ThunkAction<void, TRootState, unknown, TUserActionsTypes>


export const setUserLogin = (login: string): TSetUserLogin => ({type: SET_USER_LOGIN, payload: login})

export const needLogin = (): TThunkType => dispatch => {

}

// export const onLogin = (data: TLoginData): TThunkType  => dispatch => {
//
// }