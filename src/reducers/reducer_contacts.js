import * as actionTypes from '../actions/constants/contacts_action_types'
import _ from 'lodash'

const contactsReducer = (state = {}, action) => {
  const contactWithState = {
    ...state,
    [action.payload.id]: action.payload
  }

  switch (action.type) {
    case actionTypes.ADD_CONTACT:
      return contactWithState
    case actionTypes.FETCH_CONTACT:
      return {
        ...state,
        [action.payload.id]: state[action.payload.id]
      }
    case actionTypes.UPDATE_CONTACT:
      return contactWithState
    case actionTypes.DELETE_CONTACT:
      return _.omit(state, action.payload.id)
    case actionTypes.FETCH_ALL_CONTACTS:
      return _.mapKeys(action.payload, 'id')
    default:
      return state
  }
}

export default contactsReducer