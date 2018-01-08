import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Input, Col } from 'react-materialize'
import { connect } from 'react-redux'
import { addContact, updateContact } from '../actions/index'
import { Link } from 'react-router-dom'

import { withRouter } from 'react-router'

export const renderNameField = (field) => {
  const { input, label, small, medium, large,
    meta: { touched, error } } = field

  return (
    <Col s={small} m={medium} l={large}>
      <Input s={small} m={medium} l={large}
        label={label} {...input} type='text' />
      {' '}

      {touched && error && <span className='has-error'>{error}</span>}
    </Col>
  )
}

export const renderPhoneField = (field) => {
  const { input, label, small, medium, large,
    meta: { touched, error } } = field

  return (
    <Col s={5} m={5} l={5}>
      <Input s={small} m={medium} l={large}
        label={label} {...input} type='text' />
      {' '}

      {touched && error && <span className='has-error'>{error}</span>}
    </Col>
  )
}

export const renderEmailField = (field) => {
  const { input, label, small, medium, large,
    meta: { touched, error } } = field

  return (
    <Col>
      <Input label={label} {...input} type='email' min={0} />
      {' '}
      {touched && error && <span className='has-error'>{error}</span>}
    </Col>
  )
}

export class ContactsFormComponent extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { contact } = this.props

    if (contact) {
      this.props.initializeForm(contact)
    }
  }

  personFields() {
    return (
      <div>
        <div className='row'>
          <Field
            label='Name'
            name='name'
            id='name'
            small={4}
            medium={5}
            large={5}
            component={renderNameField}
          />
          <Field
            label='Surname'
            name='surname'
            id='surname'
            small={8}
            medium={6}
            large={6}
            component={renderNameField}
          />

        </div>
        <div className='row'>

          <Field
            name='email'
            label='Email'
            small={12}
            medium={6}
            large={6}
            component={renderEmailField}
          />
          <Field
            name='phone'
            label='Phone'
            small={12}
            medium={6}
            large={6}
            component={renderPhoneField}
          />
        </div>

      </div>
    )
  }

  formHandledOnSubmit(values) {
    const { contact, addContact, updateContact } = this.props

    if (contact) {
      updateContact(contact.id, values)
      this.props.history.push('/')

    } else {
      addContact(values)
      this.props.history.push('/')

    }
  }

  render() {
    // from redux-form
    const { handleSubmit } = this.props

    return (
      <div className='row section'>
        <form className='col s12' onSubmit={handleSubmit(this.formHandledOnSubmit.bind(this))}>

          {this.personFields()}

          <div className='row' >
            <div className='col s12 m12 l12 '>
              <Link className='waves-effect waves-light white teal-text text-lighten-1 btn' to='/' >
                <i className='material-icons left'>cancel</i>
                Cancel
              </Link>
              <button className='waves-effect waves-light btn' type='submit' >
                <i className='material-icons right'>send</i>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const validate = (values) => {
  const errors = {}

  if (!values.name) {
    errors.name = 'Enter a name!'
  }
  if (!values.surname) {
    errors.surname = 'Enter your surname'
  }
  if (!values.email) {
    errors.email = 'Provide your main email contact'
  }

  if (!values.phone) {
    errors.phone = 'inform a phone number'
  }

  return errors
}

const ContactsFormComponentWithRouter = withRouter(ContactsFormComponent)

let ContactsForm = reduxForm({
  validate,
  form: 'ContactsForm'
})(ContactsFormComponentWithRouter)


const mapStateToProps = ({ contacts }, ownProps) => {
  return { contact: contacts[ownProps.match.params.id] }
}

ContactsForm = connect(
  mapStateToProps,
  { addContact, updateContact }
)(ContactsForm)

export default ContactsForm
