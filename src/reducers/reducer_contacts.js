import * as actionTypes from '../actions/constants/action_types'
import _ from 'lodash'

const contactsReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.ADD_CONTACT:
      return {
        ...state,
        [action.payload.id]: action.payload
      }
    case actionTypes.FETCH_CONTACT:
      return {
        ...state,
        [action.payload.id]: action.payload
      }
    case actionTypes.UPDATE_CONTACT:
      return {
        ...state,
        [action.payload.id]: action.payload
      }
    case actionTypes.FETCH_ALL_CONTACTS:
      return _.mapKeys(action.payload, 'id')
    case actionTypes.DELETE_CONTACT:
      return _.omit(state, action.payload.id)
    default:
      return state
  }
}

export default contactsReducer