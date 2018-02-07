import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import rootReducer from './reducers/index'
import ReduxPromise from 'redux-promise'
import '../style/style.css'

import ContactsList from './components/contacts_list'
import ContactsForm from './components/contacts_form'
import ContactsUpdate from './components/contacts_update'
import Navbar from './components/navbar'

require('materialize-css/dist/css/materialize.css')
window.jQuery = require('jquery')
window.$ = require('jquery')
require('materialize-css/dist/js/materialize.js')

let store = createStore(
  rootReducer,
  applyMiddleware(ReduxPromise)
)

render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Navbar />
        <div>
          <Switch>
            <Route path='/contacts/show/:id' component={ContactsUpdate} />
            <Route path='/contacts/new' component={ContactsForm} />
            <Route path='/contacts/:id' component={ContactsForm} />
            <Route path='/' component={ContactsList} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'))
