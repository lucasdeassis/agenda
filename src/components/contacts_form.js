import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Input, Col } from 'react-materialize'
import { connect } from 'react-redux'
import { addContact, updateContact } from '../actions/index'
import { Link } from 'react-router-dom'

import { withRouter } from 'react-router'

export const renderNameField = (field) => {
  const { input, label, small, medium, large, name,
    meta: { touched, error } } = field

  return (
    <div className={`input-field col s${small} m${medium} l${large}`} >
      <input
        {...input} type='text' />
      {' '}
      <label className={input.value ? 'active' : ''} htmlFor={name}>{label}</label>

      <div className={touched && error ? 'has-error' : ''}>
        {touched ? error : ''}
      </div>
    </div>
  )
}

export const renderPhoneField = (field) => {
  const { input, label, small, medium, large, name,
    meta: { touched, error } } = field

  return (
    <div className={`input-field col s${small} m${medium} l${large}`}>
      <input 
        {...input} type='text' />
      {' '}
      <label className={input.value ? 'active' : ''} htmlFor={name}>{label}</label>

      {touched && error && <span className='has-error'>{error}</span>}
    </div>
  )
}

export const renderEmailField = (field) => {
  const { input, label, small, medium, large, name,
    meta: { touched, error } } = field

  return (
    <div className={`input-field col s${small} m${medium} l${large}`}>
      <input
        {...input} type='text' />
      {' '}
      <label className={input.value ? 'active' : ''} htmlFor={name}>{label}</label>

      {touched && error && <span className='has-error'>{error}</span>}
    </div>
  )
}

export class ContactsFormComponent extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { contact } = this.props

    if (contact) {
      this.props.initialize(contact)
    }
  }

  personFields() {
    return (
      <div>
        <div className='row'>
          <Field
            label='First Name'
            name='name'
            id='name'
            small={4}
            medium={2}
            large={1}
            component={renderNameField}
          />

        </div>

        <div className='row'>
          <Field
            label='Last Name'
            name='surname'
            id='surname'
            small={8}
            medium={3}
            large={2}
            component={renderNameField}
          />

        </div>
        <div className='row'>

          <Field
            name='email'
            label='Email'
            small={6}
            medium={3}
            large={2}
            component={renderEmailField}
          />
          <Field
            name='phone'
            label='Phone'
            small={3}
            medium={2}
            large={2}
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
    errors.name = 'please enter your first name'
  }
  if (!values.surname) {
    errors.surname = 'inform your last name'
  }

  if (!values.email) {
    errors.email = 'provide your main email contact'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'incorrect email format'
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
