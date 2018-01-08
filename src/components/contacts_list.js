import { Row, Col, ProgressBar } from 'react-materialize'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchAllContacts } from '../actions/index'
import { Link } from 'react-router-dom'
import _ from 'lodash'

export class ContactsListComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      contacts: {}
    }
  }

  componentDidMount() {

    this.setState({
      contacts: this.props.contacts
    })
  }

  renderContacts() {
    if (!this.state.contacts) {
      return (
        <div> <h6 className='center-align empty-message'> No contacts registered </h6></div>
      )
    }

    return (
      <div className='collection col s12'>
        {
          _.map(this.state.contacts, (contact) => {
            return (
              <Link key={contact.id} className='collection-item' to={`/contacts/show/${contact.id}`}>
                {contact.name}
              </Link>
            )
          })
        }
      </div>
    )
  }

  onSearch(event) {
    const contactsByName = _.filter(this.props.contacts, (contact) => {
      return (
        contact.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
        contact.surname.toLowerCase().includes(event.target.value.toLowerCase())
      )
    })

    this.setState({
      contacts: contactsByName
    })
  }

  render() {
    if (!this.props.contacts) {
      return <div />
    }

    return (
      <div className='container section'>
        <div className='row valign-wrapper'>
          <div className='col s6 m8 l8'>
            <h4>Contacts List</h4>
          </div>

          <div className='input-field col s6 m4 l4'>
            <i className='material-icons prefix'>search</i>
            <input onChange={this.onSearch.bind(this)} id='search' type='text' className='validate' />
            <label htmlFor='search'>by contact full name</label>
          </div>

          <div className='fixed-action-btn'>
            <Link to={`/contacts/new`}
      
              className='waves-effect waves-light btn-floating btn-large'>
              <i className='material-icons'>person_add</i> Contact
            </Link>
          </div>
        </div>
        {this.renderContacts()}
      </div>
    )
  }
}

const mapStateToProps = ({ contacts }) => {
  return {
    contacts
  }
}

const ContactsList = connect(
  mapStateToProps
)(ContactsListComponent)

export default ContactsList
