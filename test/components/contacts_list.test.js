/* global beforeEach, describe, it, expect */

import React from 'react'
import expect from 'expect'

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { ContactsListComponent } from '../../src/components/contacts_list'
import { Link } from 'react-router-dom'

describe('Contact List', () => {

  const contactsState = [
    {
      id: '_jy6b5zvzj',
      name: 'Lucas',
      surname: 'de Assis',
      email: 'lucasassis413@gmail.com',
      phone: '62993385991'
    },
    {
      id: '_43jks234',
      name: 'Jorge',
      surname: 'Hitman',
      email: 'jorgehitman@gmail.com',
      phone: '2343344059'
    }
  ]

  const contactsProps = {
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
      phone: '2343344059'
    }
  }

  let wrapper

  configure({ adapter: new Adapter() })

  beforeEach(() => {

    wrapper = shallow(
      <ContactsListComponent />)
  })

  it('it should shallow render', () => {
    expect(wrapper.length).toEqual(1)
  })

  it('it should render jsx initial empty div', () => {
    expect(wrapper.find('.empty-contacts-list').length).toEqual(1)
  })

  it('should render jsx empty message div when contacts list is empty', () => {
    wrapper.setState({
      contacts: []
    })

    expect(wrapper.find('.empty-message').length).toEqual(1)
  })

  it('should render contacts names links', () => {
    wrapper.setState({
      contacts: contactsState
    })

    // 2 plus person add link
    expect(wrapper.find(Link).length).toEqual(3)
  })

  it('should change contacts names list when search input changes', () => {

    wrapper.setState({ contacts: contactsState })

    wrapper.setProps({ contacts: contactsProps })

    const searchInput = wrapper.find('#search')
        
    expect(wrapper.find(Link).length).toEqual(3)

    searchInput.simulate('change', { target: { value: 'J' } })

    // 1 plus person add link
    expect(wrapper.find(Link).length).toEqual(2)

    searchInput.simulate('change', { target: { value: 'l' } })

    expect(wrapper.find(Link).length).toEqual(2)

    searchInput.simulate('change', { target: { value: 'ldf' } })

    expect(wrapper.find(Link).length).toEqual(1)

    searchInput.simulate('change', { target: { value: 'ksd' } })

    expect(wrapper.find(Link).length).toEqual(1)
  })

})