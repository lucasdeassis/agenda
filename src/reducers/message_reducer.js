import * as actionTypes from '../actions/constants/messages_action_types'
import omit from 'lodash/omit'
import mapKeys from 'lodash/mapKeys'

const initialMessage = {
  '_235jbbaa2': {
    messageId: '_235jbbaa2',
    contactId: '_jy6b5zvzj',
    description: 'Wabba Lubba Dub Dub!',
    time: new Date(Date.UTC(2017, 3, 7, 3, 24, 0))
  }
}

const messageReducer = (state = initialMessage, action) => {
  switch (action.type) {
    case actionTypes.ADD_MESSAGE:
      return newMessage(state, action)
    case actionTypes.FETCH_MESSAGE:
      return messageOnList(state, action)
    case actionTypes.UPDATE_MESSAGE:
      return updatedDescriptionMessage(state, action)
    case actionTypes.DELETE_MESSAGE:
      return omit(state, action.payload.messageId)
    case actionTypes.FETCH_ALL_CONTACT_MESSAGES:
      return mapKeys(action.payload, 'messageId')
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

export default messageReducer
