import axios from 'axios'
import {TLoginData} from "./user/userTypes";

export const DOMAINS = [
  'egsabuser.mcdir.ru',
  'pook.tk',
  'egsacc.mcdir.ru',
  'egsaccount.mcdir.ru',
  'egsfarm.mcdir.ru',
  'myrusmail.mcdir.ru',
  'neverban.mcdir.ru',
  'givenluck.mcdir.ru',
  'a357287.mcdir.ru',
  'projectstudior.mcdir.ru',
]

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

export type TError = {
  errorMessage: string
}

type TResponse<T> = {
  code: EResponseCodes,
  data: T & TError
}

type TLoginResponse = {
  login: string
}

type TOkResponse = 'ok'

export type TMail = {
  subject: string,
  from: string,
  to: string,
  date: string,
  uid: string
}

type TMailDataResponse = {
  mails: TMail[]
}

type TMailBodyResponse = {
  body: string
}

const instance = axios.create({
  // baseURL: 'https://hiddenway.net'
  baseURL: 'http://localhost:3001'
})

instance.defaults.withCredentials = true

export const userAPI = {
  needLogin() {
    return instance.get<TResponse<TNeedLogin>>('/need-login').then(res => res.data)
  },

  getUserData() {
    return instance.get<TResponse<TLoginResponse>>('/get-user-data').then(res => res.data)
  },

  login({login, password}: TLoginData) {
    return instance.post<TResponse<TLoginResponse>>('/login', {login, password}).then(res => res.data)
  },

  logout() {
    return instance.get<TResponse<TOkResponse>>('/logout').then(res => res.data)
  },

  deleteAccount(password: string) {
    return instance.post<TResponse<TOkResponse>>('/delete-account', {password}).then(res => res.data)
  }
}

export const mailAPI = {
  getMails() {
    return instance.get<TResponse<TMailDataResponse>>('/get-mails').then(res => res.data)
  },

  getMailBody(uid: string) {
    return instance.get<TResponse<TMailBodyResponse>>(`/get-body?uid=${uid}`).then(res => res.data)
  }
}








