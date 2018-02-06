/* global test, expect */
import messageReducer from '../../src/reducers/message_reducer'
import deepFreeze from 'deep-freeze'
import { createStore } from 'redux'
import { addMessage } from '../../src/actions/message_action_creators'
import { addMessageByContactId, updateMessageById } from '../../src/actions/index'

describe('messageReducer', () => {
  const stateBefore = () => {
    return {
      '_235jbbaa2': {
        messageId: '_235jbbaa2',
        contactId: '_jy6b5zvzj',
        description: 'Wabba Lubba Dub Dub!',
        time: new Date(Date.UTC(2017, 3, 7, 3, 24, 0))
      }
    }
  }

  it('should get default state on unknown action', () => {
    const action = {
      type: 'MESSAGE_TYPE_NOT_CATEGORIZED',
      payload: {
        messageId: '_235jbbaa2',
        contactId: '_jy6b5zvzj',
        description: 'Wabba Lubba Dub Dub!',
        time: new Date(Date.UTC(2017, 3, 7, 3, 24, 0))
      }
    }

    deepFreeze(stateBefore())
    deepFreeze(action)

    expect(messageReducer(stateBefore(), action)).toEqual(stateBefore())
  })

  it('should get default mocked contact on create store', () => {
    const store = createStore(messageReducer)

    expect(store.getState()).toEqual(stateBefore())
  })

  it('should add new message by id', () => {
    const action = addMessageByContactId('_jy6b5zvzj', 'TINY RICK!!!', '_as231k4j3')
    const stateAfter = {
      '_235jbbaa2': {
        messageId: '_235jbbaa2',
        contactId: '_jy6b5zvzj',
        description: 'Wabba Lubba Dub Dub!',
        time: new Date(Date.UTC(2017, 3, 7, 3, 24, 0))
      },
      '_as231k4j3': {
        messageId: '_as231k4j3',
        contactId: '_jy6b5zvzj',
        description: 'TINY RICK!!!',
        time: new Date()
      }
    }

    deepFreeze(stateBefore())
    deepFreeze(action)

    expect(messageReducer(stateBefore(), action)).toEqual(stateAfter)
  })


  it('should update with new message by id', () => {
    const action = updateMessageById('_235jbbaa2', `I'M PICKLE RICK!!!`, )
    const stateAfter = {
      '_235jbbaa2': {
        messageId: '_235jbbaa2',
        contactId: '_jy6b5zvzj',
        description: `I'M PICKLE RICK!!!`,
        time: new Date()
      }
    }

    deepFreeze(stateBefore())
    deepFreeze(action)

    expect(messageReducer(stateBefore(), action)).toEqual(stateAfter)
  })

})