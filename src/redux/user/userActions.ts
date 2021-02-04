import {
  LOGIN_ERROR,
  LOGIN_FETCHING_START,
  SET_USER_LOGIN,
  TLoginData,
  TLoginError,
  TLoginFetchingStart,
  TSetUserLogin,
  TUserActionsTypes,
} from "./userTypes"
import {TThunkType} from "../rootReducer";
import {userAPI} from "../api";
import {clearAllStates} from "../shared/sharedActions";

export const setUserLogin = (login: string): TSetUserLogin => ({type: SET_USER_LOGIN, payload: login})
const loginFetchingStart = (): TLoginFetchingStart => ({type: LOGIN_FETCHING_START})
const loginError = (errorMessage: string): TLoginError => ({type: LOGIN_ERROR, payload: {errorMessage}})


export const onLogin = (data: TLoginData): TThunkType<TUserActionsTypes>  => {
  return async dispatch => {
    dispatch(loginFetchingStart())
    const loginInfo = await userAPI.login(data)
    if (loginInfo.code !== 0) dispatch(loginError(loginInfo.data.errorMessage))
    dispatch(setUserLogin(loginInfo.data.login))
  }
}

export const onLogout = (): TThunkType<any> => {
  return async dispatch => {
    const logoutResponse = await userAPI.logout()
    if (logoutResponse.code === 0) {
      dispatch(clearAllStates())
    }
  }
}
