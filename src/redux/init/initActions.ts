import {INIT_FINISH, INIT_START, TInitActionsTypes, TInitFinish, TInitStart} from "./initTypes";
import {TThunkType} from "../rootReducer";
import {TUserActionsTypes} from "../user/userTypes";
import {userAPI} from "../api";

export const initStart = (): TInitStart => ({type: INIT_START})
export const initFinish = (): TInitFinish => ({type: INIT_FINISH})

type TInitThunkActionTypes = TUserActionsTypes | TInitActionsTypes

export const init = (): TThunkType<TInitThunkActionTypes> => async dispatch => {
  dispatch(initStart())

  const needLogin = await userAPI.needLogin()

  //todo обработать ошибку
  if (needLogin.code !== 0) console.log('error')

  if (needLogin.data.needLogin) {
    dispatch(initFinish())
  } else {
    //todo доделать для случая если залогинен
    console.log('залогинен!')
  }
}

