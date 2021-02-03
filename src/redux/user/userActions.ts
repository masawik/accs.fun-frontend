import {TSetUserLogin, SET_USER_LOGIN, TUserActionsTypes, TLoginData} from "./userTypes"
import {ThunkAction} from "redux-thunk"
import axios from 'axios'
import {TRootState} from "../rootReducer";

export const setUserLogin = (login: string): TSetUserLogin => ({type: SET_USER_LOGIN, payload: login})

type TThunkType = ThunkAction<void, TRootState, unknown, TUserActionsTypes>

export const onLogin = (data: TLoginData): TThunkType  => dispatch => {

}