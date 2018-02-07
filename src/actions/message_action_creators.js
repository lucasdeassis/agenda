import * as actionTypes from './constants/messages_action_types'
import uniqueId from 'lodash/uniqueId'

export const addMessageByContactId = (contactId, description, messageId) => {
  return {
    type: actionTypes.ADD_MESSAGE,
    payload: {
      messageId: messageId ? messageId : uniqueId('_'),
      contactId,
      description,
      time: new Date()
    }
  }
}

export const updateMessageById = (messageId, description) => {
  return {
    type: actionTypes.UPDATE_MESSAGE,
    payload: {
      messageId,
      description,
      time: new Date()
    }
  }
}

export const fetchMessageById = (messageId) => {
  return {
    type: actionTypes.FETCH_MESSAGE,
    payload: {
      messageId
    }
  }
}

export const deleteMessageById = (messageId) => {
  return {
    type: actionTypes.DELETE_MESSAGE,
    payload: {
      messageId
    }
  }
}

export const fetchAllContactMessages = (contactId) => {
  return {
    type: actionTypes.FETCH_ALL_CONTACT_MESSAGES,
    payload: contactId === '_jy6b5zvzj' ?
      [
        {
          messageId: '_235jbbaa2',
          contactId: '_jy6b5zvzj',
          description: 'Wabba Lubba Dub Dub!',
          time: new Date(Date.UTC(2017, 3, 7, 3, 24, 0))
        }
      ] : []
  }
}