/* global it, describe, expect */

import contactReducer from '../../src/reducers/contact_reducer'
import deepFreeze from 'deep-freeze'
import { createStore } from 'redux'
import { addContactById, updateContactById, deleteContactById } from '../../src/actions/index'

describe('contactReducer', () => {
  const stateBefore = () => {
    return {
      '_jy6b5zvzj': {
        id: '_jy6b5zvzj',
        name: 'Lucas',
        surname: 'de Assis',
        email: 'lucasassis413@gmail.com',
        phone: '62993385991'
      },
      '_43jks234': {
        id: '_43jks234',
        name: 'Jorge',
        surname: 'Hitman',
        email: 'jorgehitman@gmail.com',
        phone: '23433440595'
      }
    }
  }

  it('should get default state on unknown action', () => {
    const action = {
      type: 'CONTACT_TYPE_NOT_CATEGORIZED',
      payload: {
        id: '_jy6b5zvzj',
        name: 'Dean',
        surname: 'Jones',
        email: 'deanj@gmail.com',
        phone: '1 535 234 2345'
      }
    }

    deepFreeze(stateBefore())
    deepFreeze(action)

    expect(contactReducer(stateBefore(), action)).toEqual(stateBefore())
  })

  it('should get default mocked contact on create store', () => {
    const store = createStore(contactReducer)
    const initialContact = {
      '_jy6b5zvzj': {
        id: '_jy6b5zvzj',
        name: 'Lucas',
        surname: 'de Assis',
        email: 'lucasassis413@gmail.com',
        phone: '62993385991'
      }
    }

    expect(store.getState()).toEqual(initialContact)
  })

  it('should add contact by id', () => {
    const newContact = {
      name: 'Julius',
      surname: 'Rock',
      email: 'rockj@gmail.com',
      phone: '155324359349'
    }

    const action = addContactById(newContact, '_3dad124kk')

    const stateAfter = {
      '_jy6b5zvzj': {
        id: '_jy6b5zvzj',
        name: 'Lucas',
        surname: 'de Assis',
        email: 'lucasassis413@gmail.com',
        phone: '62993385991'
      },
      '_43jks234': {
        id: '_43jks234',
        name: 'Jorge',
        surname: 'Hitman',
        email: 'jorgehitman@gmail.com',
        phone: '23433440595'
      },
      '_3dad124kk': {
        id: '_3dad124kk',
        name: 'Julius',
        surname: 'Rock',
        email: 'rockj@gmail.com',
        phone: '155324359349'
      }
    }

    deepFreeze(stateBefore())
    deepFreeze(action)

    expect(contactReducer(stateBefore(), action)).toEqual(stateAfter)
  })

  it('should update contact by id', () => {
    const updatedContact = {
      name: 'Lucas',
      surname: 'de Assis Rosa',
      email: 'lucasassis413@gmail.com',
      phone: '(62) 99338-5991'
    }

    const action = updateContactById('_jy6b5zvzj', updatedContact)

    const stateAfter = {
      '_jy6b5zvzj': {
        id: '_jy6b5zvzj',
        name: 'Lucas',
        surname: 'de Assis Rosa',
        email: 'lucasassis413@gmail.com',
        phone: '(62) 99338-5991'
      },
      '_43jks234': {
        id: '_43jks234',
        name: 'Jorge',
        surname: 'Hitman',
        email: 'jorgehitman@gmail.com',
        phone: '23433440595'
      }
    }

    deepFreeze(stateBefore())
    deepFreeze(action)

    expect(contactReducer(stateBefore(), action)).toEqual(stateAfter)
  })

  it('should delete contact by id', () => {
    const action = deleteContactById({id: '_43jks234'})

    const stateAfter = {
      '_jy6b5zvzj': {
        id: '_jy6b5zvzj',
        name: 'Lucas',
        surname: 'de Assis',
        email: 'lucasassis413@gmail.com',
        phone: '62993385991'
      }
    }

    deepFreeze(stateBefore())
    deepFreeze(action)

    expect(contactReducer(stateBefore(), action)).toEqual(stateAfter)
  })
})
