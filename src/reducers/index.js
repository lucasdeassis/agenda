import { combineReducers } from 'redux'
import contactsReducer from './reducer_contacts'
import messagesReducer from './reducer_messages'
import { reducer as reduxFormReducer } from 'redux-form'

const rootReducer = combineReducers({
  form: reduxFormReducer,
  contacts: contactsReducer,
  messages: messagesReducer
})

export default rootReducer
