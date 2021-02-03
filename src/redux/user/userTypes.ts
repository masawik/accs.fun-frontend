export const SET_USER_LOGIN = 'SET_USER_LOGIN'

export type TSetUserLogin = {
  type: typeof SET_USER_LOGIN,
  payload: string
}

export type TLoginData = {
  login: string,
  password: string
}

export type TUserActionsTypes = TSetUserLogin