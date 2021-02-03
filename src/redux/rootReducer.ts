import {combineReducers} from "redux";
import user from "./user/userReducer";
import init from "./init/initReducer";

const rootState = combineReducers({
  user,
  init
})

export default rootState
export type TRootState = ReturnType<typeof rootState>