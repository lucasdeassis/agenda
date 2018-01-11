import * as actionTypes from '../actions/constants/messages_action_types'
import _ from 'lodash'

const messagesReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.ADD_MESSAGE:
      return newMessage(state, action)
    case actionTypes.FETCH_MESSAGE:
      return messageOnList(state, action)
    case actionTypes.UPDATE_MESSAGE:
      return updatedDescriptionMessage(state, action)
    case actionTypes.DELETE_MESSAGE:
      return _.omit(state, action.payload.id)
    case actionTypes.FETCH_ALL_MESSAGES:
      return _.mapKeys(action.payload, 'id')
    default:
      return state
  }
}

const newMessage = (state, action) => {
  return {
    ...state,
    [action.payload.message.id]: {
      contactId: action.payload.contactId,
      description: action.payload.message.description
    }
  }
}

const updatedDescriptionMessage = (state, action) => {
  return {
    ...state,
    [action.payload.message.id]: {
      ...[action.payload.message.id],
      description: action.payload.message.description
    }
  }
}

const messageOnList = (state, action) => {
  return {
    ...state,
    [action.payload.messageId]: state[action.payload.messageId]
  }
}

export default messagesReducer