import {INIT_FINISH, INIT_START, TInitFinish, TInitStart} from "./initTypes";

export const initStart = (): TInitStart => ({type: INIT_START})
export const initFinish = (): TInitFinish => ({type: INIT_FINISH})
