import {combineReducers} from "redux";
import user from "./user/userReducer";
import init from "./init/initReducer";
import {ThunkAction} from "redux-thunk";
import mail from "./mail/mailReducer";

const rootState = combineReducers({
  user,
  init,
  mail
})
//todo чекнуть reselect
export default rootState
export type TRootState = ReturnType<typeof rootState>
// @ts-ignore
export type TThunkType<T> = ThunkAction<void, TRootState, unknown, T>