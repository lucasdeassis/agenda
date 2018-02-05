import * as actionTypes from '../actions/constants/messages_action_types'
import _ from 'lodash'

const initialMessage = {
  '_235jbbaa2': {
    messageId: '_235jbbaa2',
    contactId: '_jy6b5zvzj',
    description: 'Wabba Lubba Dub Dub!',
    time: new Date(Date.UTC(2017, 3, 7, 3, 24, 0))
  }
}

const messagesReducer = (state = initialMessage, action) => {
  switch (action.type) {
    case actionTypes.ADD_MESSAGE:
      return newMessage(state, action)
    case actionTypes.FETCH_MESSAGE:
      return messageOnList(state, action)
    case actionTypes.UPDATE_MESSAGE:
      return updatedDescriptionMessage(state, action)
    case actionTypes.DELETE_MESSAGE:
      return _.omit(state, action.payload.messageId)
    case actionTypes.FETCH_ALL_MESSAGES:
      return _.mapKeys(action.payload, 'id')
    default:
      return state
  }
}

const newMessage = (state, action) => {
  return {
    ...state,
    [action.payload.messageId]: action.payload
  }
}

const updatedDescriptionMessage = (state, action) => {
  return {
    ...state,
    [action.payload.messageId]: {
      ...state[action.payload.messageId],
      description: action.payload.description,
      time: action.payload.time
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