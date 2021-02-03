import {
  TSetUserLogin,
  SET_USER_LOGIN,
  TUserActionsTypes, TLoginData,
} from "./userTypes"
import {TThunkType} from "../rootReducer";

export const setUserLogin = (login: string): TSetUserLogin => ({type: SET_USER_LOGIN, payload: login})


export const onLogin = (data: TLoginData): TThunkType<TUserActionsTypes>  => dispatch => {

}