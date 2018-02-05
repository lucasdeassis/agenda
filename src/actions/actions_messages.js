import * as actionTypes from './constants/messages_action_types'
import _ from 'lodash'

export const addMessage = (contactId, description) => {
  return {
    type: actionTypes.ADD_MESSAGE,
    payload: {
      messageId: _.uniqueId('_'),
      contactId,
      description,
      time: new Date()
    }
  }
}

export const fetchMessage = (messageId) => {
  return {
    type: actionTypes.FETCH_MESSAGE,
    payload: {
      messageId
    }
  }
}

export const updateMessage = (messageId, description) => {
  return {
    type: actionTypes.UPDATE_MESSAGE,
    payload: {
      messageId,
      description,
      time: new Date()
    }
  }
}

export const deleteMessage = (messageId) => {
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
    payload: {
      messageId
    }
  }
}