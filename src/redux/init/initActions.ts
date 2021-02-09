import {INIT_FINISH, INIT_START, TInitActionsTypes, TInitFinish, TInitStart} from "./initTypes";
import {TThunkType} from "../rootReducer";
import {TUserActionsTypes} from "../user/userTypes";
import {EResponseCodes, userAPI} from "../api";
import {setUserLogin} from "../user/userActions";

export const initStart = (): TInitStart => ({type: INIT_START})
export const initFinish = (): TInitFinish => ({type: INIT_FINISH})

type TInitThunkActionTypes = TUserActionsTypes | TInitActionsTypes

export const init = (): TThunkType<TInitThunkActionTypes> => async dispatch => {
  dispatch(initStart())
  const needLoginInfo = await userAPI.needLogin()
  //todo обработать ошибку
  if (needLoginInfo.code !== EResponseCodes.success) console.log('error')

  if (!needLoginInfo.data.needLogin) {
    const userData = await userAPI.getUserData()
    dispatch(setUserLogin(userData.data.login))
  }

  dispatch(initFinish())
}

