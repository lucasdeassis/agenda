import * as actionTypes from './constants/contacts_action_types'
import uniqueId from 'lodash/uniqueId'

export const addContactById = (payload, id) => {
  return {
    type: actionTypes.ADD_CONTACT,
    payload: {
      ...payload,
      id: id || uniqueId('_')
    }
  }
}

export const updateContactById = (id, payload) => {
  return {
    type: actionTypes.UPDATE_CONTACT,
    payload: {
      ...payload,
      id
    }
  }
}

export const deleteContactById = (payload) => {
  return {
    type: actionTypes.DELETE_CONTACT,
    payload: payload
  }
}
