import * as actionTypes from './constants/contacts_action_types'
import _ from 'lodash'

export const addContactById = (payload, id) => {

  return {
    type: actionTypes.ADD_CONTACT,
    payload: {
      ...payload,
      id: id ? id : _.uniqueId('_')  
    }
  }
}


export const updateContactById = (id, payload) => {
  payload.id = id

  return {
    type: actionTypes.UPDATE_CONTACT,
    payload: payload
  }
}

export const deleteContactById = (payload) => {
  return {
    type: actionTypes.DELETE_CONTACT,
    payload: payload
  }
}