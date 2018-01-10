import * as actionTypes from './constants/action_types'
import ID from '../../utils/id'

export const addContact = (contact) => {
  contact.id = ID()

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

export const fetchAllContacts = () => {
  return {
    type: actionTypes.FETCH_ALL_CONTACTS,
    payload: [
      {
        id: '_j8mdi7ut8',
        name: 'Lucas',
        surname: 'de Assis Rosa',
        email: 'lucasassis413@gmail.com',
        phone: '62993385991'
      }
    ]
  }
}