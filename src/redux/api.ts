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

type TResponse = {
  code: EResponseCodes,
  data: any
}

const instance = axios.create({
  baseURL: 'http://localhost:8989'
})

export const userAPI = {
  
}












