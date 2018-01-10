import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchContact, updateContact, deleteContact } from '../actions/index'
import ContactsForm from './contacts_form'
import { Row, Col, ProgressBar, Modal, Collapsible, CollapsibleItem } from 'react-materialize'
import ContactsList from './contacts_list'

export class ContactsUpdateComponent extends Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    // route params
    const { id } = this.props.match.params
  }

  deleteContact() {
    const { id } = this.props.match.params
    const { history , deleteContact } = this.props

    deleteContact(id)
    history.push('/')

  }

  renderContactInfoCard() {
    const { id } = this.props.match.params
    const { contact } = this.props

    return (
      <div className='row'>
        <div className='col s12 m7 l7'>
          <div className='card horizontal'>
            <div className='card-stacked'>

              <div className='card-content'>
                <span className="card-title teal-text"> {contact.name} {contact.surname}</span>
                
                <span className='teal-text block'>
                  <i className='tiny material-icons'>mail</i> {contact.email}
                </span>
                <span className='teal-text block'>
                  <i className='tiny material-icons'>phone</i> {contact.phone}
                </span>

              </div>

              <div className='card-action'>

                <div className='col s6 m6 l6'>
                  <Link className='waves-effect waves-light btn ' to={`/contacts/${id}`}>
                    <i className='material-icons left'>edit</i> Update Contact
                  </Link>
                </div>

                <div className='col s6 m6 l6'>
                  <button onClick={this.deleteContact.bind(this)} className='waves-effect waves-light red btn hoverable' >
                    <i className='material-icons left'>delete</i>
                    Delete
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

    )
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

      </div >
    )
  }
}

const mapStateToProps = ({ contacts }, ownProps) => {
  return { contact: contacts[ownProps.match.params.id] }
}

const ContactsUpdate = connect(
  mapStateToProps,
  { fetchContact, updateContact, deleteContact })
  (ContactsUpdateComponent)

export default ContactsUpdate
