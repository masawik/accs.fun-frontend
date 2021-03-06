import {
  DELETE_ERROR,
  FETCHING_START,
  LOGIN_ERROR,
  SET_USER_LOGIN,
  TDeleteError,
  TLoginData,
  TLoginError,
  TSetUserLogin,
  TUserActionsTypes,
  TUserFetchingStart,
} from "./userTypes"
import {TThunkType} from "../rootReducer"
import {EResponseCodes, userAPI} from "../api"
import {clearAllStates, genericErrorHandler} from "../shared/sharedActions"
import {TSharedActionTypes} from "../shared/sharedTypes"

export const setUserLogin = (login: string): TSetUserLogin => ({type: SET_USER_LOGIN, payload: login})
const fetchingStart = (): TUserFetchingStart => ({type: FETCHING_START})
const loginError = (errorMessage: string): TLoginError => ({type: LOGIN_ERROR, payload: {errorMessage}})
const deleteError = (errorMessage: string): TDeleteError => ({type: DELETE_ERROR, payload: {errorMessage}})

export const onLogin = (data: TLoginData): TThunkType<TUserActionsTypes>  => {
  return async dispatch => {
    dispatch(fetchingStart())
    const loginInfo = await userAPI.login(data)
    if (loginInfo.code !== EResponseCodes.success) return dispatch(loginError(loginInfo.data.errorMessage))
    return dispatch(setUserLogin(loginInfo.data.login))
  }
}

export const onLogout = (): TThunkType<any> => {
  return async dispatch => {
    const logoutResponse = await userAPI.logout()
    if (logoutResponse.code === EResponseCodes.success) {
      return dispatch(clearAllStates())
    }
  }
}

export const onDeleteAccount = (password: string): TThunkType<TUserActionsTypes | TSharedActionTypes> => {
  return async dispatch => {
    dispatch(fetchingStart())
    const {code, data} = await userAPI.deleteAccount(password)
    genericErrorHandler(dispatch, code, () => {
      if (code !== EResponseCodes.success) return dispatch(deleteError(data.errorMessage))
      return dispatch(clearAllStates())
    })
  }
}