import {INIT_FINISH, INIT_START, TInitActionsTypes} from "./initTypes";

const initialState = {
  isFetching: true
}

type TInitState = typeof initialState

const initReducer = (state = initialState, action: TInitActionsTypes): TInitState => {
  switch (action.type) {
    case INIT_START:
      return {...state, isFetching: true}
    case INIT_FINISH:
      return {...state, isFetching: false}
    default:
      return state
  }
}

export default initReducer