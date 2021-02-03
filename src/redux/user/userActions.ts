import {TSetUserLogin, SET_USER_LOGIN, TUserActionsTypes, TLoginData} from "./userTypes"
import {ThunkAction} from "redux-thunk"
import axios from 'axios'
import {TRootState} from "../rootReducer";

const BASE_URL = 'http://localhost:8989'

export const setUserLogin = (login: string): TSetUserLogin => ({type: SET_USER_LOGIN, payload: login})

type TThunkType = ThunkAction<void, TRootState, unknown, TUserActionsTypes>

export const onLogin = (data: TLoginData): TThunkType  => dispatch => {
  axios
    .post(
      `${BASE_URL}/login`,
      {
        login: data.login,
        password: data.password
        }
    )
    .then((response) => {
      console.log(response.data)
    })
    .catch(console.log)
}