import * as actionTypes from './constants/contacts_action_types'
import _ from 'lodash'

export const addContact = (contact) => {
  contact.id = _.uniqueId('_')

  return {
    type: actionTypes.ADD_CONTACT,
    payload: contact
  }
}

export const fetchContact = (id) => {
  return {
    type: actionTypes.FETCH_CONTACT,
    payload: {
      id
    }
  }
}

export const updateContact = (id, contact) => {
  contact.id = id

  return {
    type: actionTypes.UPDATE_CONTACT,
    payload: contact
  }
}

export const deleteContact = (id) => {
  return {
    type: actionTypes.DELETE_CONTACT,
    payload: {
      id
    }
  }
}