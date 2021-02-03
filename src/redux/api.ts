import axios from 'axios'

export enum EResponseCodes {
  success = 0,
  invalidMail = 1,
  serverError = 2,
  invalidUid = 3,
  getBodyWrongData = 4,
  wrongAuthData = 5,
  wrongPassword = 6,
  unauthorized = 7
}

type TNeedLogin = {
  needLogin: boolean
}

type TResponse<T> = {
  code: EResponseCodes,
  data: T
}

const instance = axios.create({
  baseURL: 'http://localhost:8989'
})

export const userAPI = {
  needLogin() {
    return instance.get<TResponse<TNeedLogin>>('/need-login').then(res => res.data)
  },
}












