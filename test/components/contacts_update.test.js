/* global beforeEach, describe, it, expect */

import React from 'react'
import expect from 'expect'

import { configure, shallow } from 'enzyme'
import sinon from 'sinon'
import Adapter from 'enzyme-adapter-react-16'
import { ContactsUpdateComponent } from '../../src/components/contacts_update'
import { Link } from 'react-router-dom'
import ContactsList from '../../src/components/contacts_list'
import { Modal } from 'react-materialize'

describe('Contacts Update', () => {

  const contactProps = {
    '_jy6b5zvzj': {
      id: '_jy6b5zvzj',
      name: 'Lucas',
      surname: 'de Assis',
      email: 'lucasassis413@gmail.com',
      phone: '62993385991'
    }
  }

  const messagesProps = [
    {
      messageId: '_235jbbaa2',
      contactId: '_jy6b5zvzj',
      description: 'Wabba Lubba Dub Dub!',
      time: new Date(Date.UTC(2017, 3, 7, 3, 24, 0))
    }
  ]

  let wrapper

  configure({ adapter: new Adapter() })

  beforeEach(() => {
    wrapper = shallow(
      <ContactsUpdateComponent />)
  })

  it('it should shallow render', () => {
    expect(wrapper.length).toEqual(1)
  })

  it('it should render contacts list when no contact is passed as props', () => {
    expect(wrapper.find(ContactsList).length).toEqual(1)
  })

  it('should render contact info card', () => {
    wrapper.setState({
      messageSelected: {}

    })

    wrapper.setProps({
      contact: contactProps,
      match: {
        params: {
          id: contactProps._jy6b5zvzj.id
        }
      },
      messages: messagesProps
    })

    expect(wrapper.find('#card-contact-info').length).toEqual(1)
  })

  it('should render contact messages card', () => {
    wrapper.setState({
      messageSelected: {}

    })

    wrapper.setProps({
      contact: contactProps,
      match: {
        params: {
          id: contactProps._jy6b5zvzj.id
        }
      },
      messages: messagesProps
    })

    expect(wrapper.find('#card-contact-messages').length).toEqual(1)
  })

  it('should render contact messages list', () => {
    wrapper.setState({
      messageSelected: {}

    })

    wrapper.setProps({
      contact: contactProps,
      match: {
        params: {
          id: contactProps._jy6b5zvzj.id
        }
      },
      messages: messagesProps
    })

    expect(wrapper.find('#contact-messages-list').children().length).toEqual(1)
    expect(wrapper.find('#contact-messages-list').children().at(0).key()).toEqual(messagesProps[0].messageId)
  })

  it('should render message options', () => {
    wrapper.setState({
      messageSelected: {}

    })

    wrapper.setProps({
      contact: contactProps,
      match: {
        params: {
          id: contactProps._jy6b5zvzj.id
        }
      },
      messages: messagesProps
    })

    expect(wrapper.find('#contact-messages-list').children().at(0).find(Modal).length).toEqual(1)
  })

  it('should call deleteContact on delete button click', () => {
    const spy = sinon.spy(ContactsUpdateComponent.prototype, 'deleteContact')

    wrapper.setState({
      messageSelected: {}

    })

    wrapper.setProps({
      contact: contactProps,
      match: {
        params: {
          id: contactProps._jy6b5zvzj.id
        }
      },
      deleteContactById: (message) => {},
      history: [],
      messages: messagesProps
    })

    expect(wrapper.find('#delete-contact-btn').length).toEqual(1)

    wrapper.find('#delete-contact-btn').simulate('click')
    expect(spy.calledOnce).toEqual(true)

    spy.restore()
  })

  it('should call addContactMessage on add note modal form submit', () => {
    const spy = sinon.spy(ContactsUpdateComponent.prototype, 'addContactMessage')

    wrapper.setState({
      messageSelected: {}

    })

    wrapper.setProps({
      contact: contactProps,
      match: {
        params: {
          id: contactProps._jy6b5zvzj.id
        }
      },
      messages: messagesProps
    })

    expect(wrapper.find('#add-contact-message-form').length).toEqual(1)

    wrapper.find('#add-contact-message-form').simulate('submit')
    expect(spy.calledOnce).toEqual(true)

    spy.restore()
  })

  it('should call updateContactMessage on message update modal form submit', () => {
    const spy = sinon.spy(ContactsUpdateComponent.prototype, 'updateContactMessage')

    wrapper.setState({
      messageSelected: {}

    })

    wrapper.setProps({
      contact: contactProps,
      match: {
        params: {
          id: contactProps._jy6b5zvzj.id
        }
      },
      messages: messagesProps
    })

    expect(  wrapper.find('#update-contact-message-form').length).toEqual(1)

    wrapper.find('#update-contact-message-form').simulate('submit')
    expect(spy.calledOnce).toEqual(true)

    spy.restore()
  })

  it('should call deleteContactMessage on delete button click', () => {
    const spy = sinon.spy(ContactsUpdateComponent.prototype, 'deleteContactMessage')

    wrapper.setState({
      messageSelected: {}

    })

    wrapper.setProps({
      contact: contactProps,
      match: {
        params: {
          id: contactProps._jy6b5zvzj.id
        }
      },
      deleteMessageById: (message) => {},
      messages: messagesProps
    })

    expect(  wrapper.find('#delete-contact-message-btn').length).toEqual(1)

    wrapper.find('#delete-contact-message-btn').simulate('click')
    expect(spy.calledOnce).toEqual(true)

    spy.restore()
  })

})