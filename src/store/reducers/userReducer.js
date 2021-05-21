import {
  UPDATE_USER,
  UPDATE_CURRENT_SERVICE
} from '../actions/actionTypes'

const defaultState = {
  user: undefined,
  currentService: undefined
}

export default function userReducer (state = defaultState, action) {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        user: action.user
      }
    case UPDATE_CURRENT_SERVICE:
      return {
        ...state,
        currentService: action.currentService
      }
    default:
      return state
  }
}