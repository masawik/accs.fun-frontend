import {CLEAR_ALL_STATES, TClearAllStates} from "./sharedTypes";
import {Dispatch} from "react";
import {EResponseCodes} from "../api";

export const clearAllStates = (): TClearAllStates => ({type: CLEAR_ALL_STATES})

export const genericErrorHandler = (dispatch: Dispatch<any>, responseCode: EResponseCodes, cb: Function) => {
  if (responseCode === EResponseCodes.unauthorized) return dispatch(clearAllStates())
  return cb()
}