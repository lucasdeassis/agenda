import * as actionTypes from '../actions/constants/contacts_action_types'
import omit from 'lodash/omit'
import mapKeys from 'lodash/mapKeys'

const initialContact = {
  '_jy6b5zvzj': {
    id: '_jy6b5zvzj',
    name: 'Lucas',
    surname: 'de Assis',
    email: 'lucasassis413@gmail.com',
    phone: '62993385991'
  }
}

const contactReducer = (state = initialContact, action) => {
  switch (action.type) {
    case actionTypes.ADD_CONTACT:
      return contactWithState(state, action)
    case actionTypes.UPDATE_CONTACT:
      return contactWithState(state, action)
    case actionTypes.DELETE_CONTACT:
      return omit(state, action.payload.id)
    case actionTypes.FETCH_ALL_CONTACTS:
      return mapKeys(action.payload, 'id')
    default:
      return state
  }
}

const contactWithState = (state, action) => {
  return {
    ...state,
    [action.payload.id]: action.payload
  }
}

export default contactReducer
