import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ContactsForm from './contacts_form'
import { Modal } from 'react-materialize'
import ContactsList from './contacts_list'
import {
  fetchContact, updateContact, deleteContact,
  addMessage, updateMessage, deleteMessage, fetchAllContactMessages
} from '../actions/index'

export class ContactsUpdateComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      messageSelected: {}
    }
  }

  deleteContact() {
    const { id } = this.props.match.params
    const { history, deleteContact } = this.props

    deleteContact(id)
    history.push('/')

  }

  renderContactInfoCard() {
    const { id } = this.props.match.params
    const { contact } = this.props

    return (
      <div className='row'>
        <div className='col s12 m9 l7'>
          <div className='card horizontal'>
            <div className='card-stacked'>

              <div className='card-content'>

                <div className="row">
                  <span className="card-title teal-text col s7 m7 l7" > {contact.name} {contact.surname}</span>
                </div>

                <span className='teal-text block'>
                  <i className='tiny material-icons'>mail</i> {contact.email}
                </span>
                <span className='teal-text block'>
                  <i className='tiny material-icons'>phone</i> {contact.phone}
                </span>

              </div>

              <div className='card-action'>

                <div className='col s6 m6 l6'>
                  <Link className='waves-effect waves-light btn' to={`/contacts/${id}`}>
                    <i className='material-icons left'>edit</i> Update Contact
                  </Link>
                </div>

                <div className='col offset-s2 s2 offset-m1 m5 offset-l2 l4'>
                  <button onClick={this.deleteContact.bind(this)} className='waves-effect waves-light red btn hoverable' >
                    <i className='material-icons left'>delete</i>
                    Delete
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div >

    )
  }

  renderContactMessages() {
    const { messages } = this.props

    return (
      <div className="row">
        <div className="col s12 m9 l7">
          <div className="card white">
            <div className="card-content teal-text">
              <div className="section row">
                <span className="card-title col s7 m7 l7"> <i className='material-icons left'>description</i> Notes</span>
                <div className="col offset-s2 s1 offset-m2 m1  offset-l3 l1">
                  {this.renderAddNoteModal()}
                </div>
              </div>

              {messages.length ? this.renderMessageList(messages) : ''}

            </div>
          </div>
        </div>
      </div>
    )
  }

  renderAddNoteModal() {
    return (
      <Modal header={`Add Note`}
        trigger={
          <button className=" waves-effect hoverable teal btn ">
            Add
         </button>
        }>

        <div className="row">
          <form onSubmit={(event) => this.addContactMessage(event)} className="col s12 m12 l12 ">
            {this.renderMessageTextArea()}

            <button type="submit" className="right-align btn hoverable teal waves-effect waves-dark teal-lighten-1 modal-close">
              save
          </button>
          </form>
        </div>

      </Modal>
    )
  }

  renderMessageList(messages) {

    return (
      messages.map((message, index) => (
        <div key={index} className="section margin-top row">
          <div className="col s10 m10 l11">
            {`(${message.time.toLocaleString()})`} {message.description}
          </div>

          <div className="card-fab fixed-action-btn horizontal click-to-toggle">
            <a className="btn-floating btn yellow darken-4 ">
              <i className="material-icons">menu</i>
            </a>

            {this.renderMessageOptions(message)}
          </div>
        </div>
      ))
    )

  }

  renderMessageOptions(message) {
    return (
      <ul>
        <Modal header={`Edit Note`}
          trigger={
            <li><a className="btn-floating teal" ><i className="material-icons">edit</i></a></li>

          }>

          <div className="row">
            <form onSubmit={(event) => this.updateContactMessage(event, message)} className="col s12 m12 l12 ">
              {this.renderMessageTextArea(message.description)}

              <button type="submit" className="right-align btn hoverable teal waves-effect waves-dark teal-lighten-1 modal-close">
                save
            </button>
            </form>
          </div>

        </Modal>

        <li><a onClick={() => this.deleteContactMessage(message)} className="btn-floating red"><i className="material-icons">delete</i></a></li>
      </ul>
    )
  }

  renderMessageTextArea(description) {
    return (
      <div className="row">
        <div className="input-field col s12">
          <textarea
            ref={element => {
              description ?
                this.messageTextArea = element :
                this.newMessageTextArea = element
            }}

            id="textarea-message"
            defaultValue={description || ''} className="materialize-textarea"></textarea>
          <label className="active" htmlFor="textarea-message">Message</label>
        </div>
      </div>
    )
  }

  addContactMessage(event) {
    const { id } = this.props.match.params


    if (event) event.preventDefault()

    this.props.addMessage(id, this.newMessageTextArea.value)
  }

  updateContactMessage(event, message) {
    if (event) event.preventDefault()

    this.props.updateMessage(message.messageId, this.messageTextArea.value)

  }

  deleteContactMessage(message) {
    this.props.deleteMessage(message.messageId)
  }

  render() {
    const { contact } = this.props

    if (!contact) {
      return (
        <ContactsList />
      )
    }

    return (
      <div className='row map-container section'>

        <div className='row'>
          <div className='col s6 m6 l6'>
            <Link className='waves-effect waves-dark white teal-text text-lighten-1 btn' to='/'>
              <i className='material-icons left'>navigate_before</i>
              Back
            </Link>
          </div>
        </div>

        {this.renderContactInfoCard()}
        {this.renderContactMessages()}

      </div >
    )
  }
}

const mapStateToProps = ({ contacts, messages }, ownProps) => {
  const contactId = ownProps.match.params.id

  return {
    contact: contacts[contactId],
    messages: _.filter(messages, message => message.contactId === contactId) // only the selected contact messages as list
  }
}

const ContactsUpdate = connect(
  mapStateToProps,
  { fetchContact, updateContact, deleteContact, addMessage, updateMessage, deleteMessage, fetchAllContactMessages, })
  (ContactsUpdateComponent)

export default ContactsUpdate
