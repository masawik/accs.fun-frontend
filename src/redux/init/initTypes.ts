export const INIT_START = 'INIT_START'
export const INIT_FINISH = 'INIT_FINISH'

export type TInitFinish = {type: typeof INIT_FINISH}
export type TInitStart = {type: typeof INIT_START}

export type TInitActionsTypes = TInitStart | TInitFinish