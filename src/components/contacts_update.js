import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchContact, updateContact } from '../actions/index'
import ContactsForm from './contacts_form'
import { Row, Col, ProgressBar, Modal, Collapsible, CollapsibleItem } from 'react-materialize'

export class ContactsUpdateComponent extends Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    // route params
    const { id } = this.props.match.params
  }


  renderContactInfoCard() {
    const { id } = this.props.match.params
    const { contact } = this.props

    return (
      <div className='row'>
        <div className='col s12 m7 l7'>
          <h2 className='header'>
            {contact.name} {contact.surname}
          </h2>
          <div className='card horizontal'>
            <div className='card-stacked'>
              <div className='card-content'>
                <span className='teal-text'>
                  <p>Email: {contact.email}
                    Phone: {contact.phone}
                  </p>
                </span>
              </div>
              <div className='card-action'>
                <div className='col s6 m6 l6'>
                  <Link className='waves-effect waves-light btn ' to={`/contacts/${id}`}>
                    <i className='material-icons left'>edit</i> Update Contact
                  </Link>
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
        <Row>
          <Col s={12} m={12} l={12}>
            <ProgressBar />
          </Col>
        </Row>
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
  { fetchContact, updateContact })
  (ContactsUpdateComponent)

export default ContactsUpdate
