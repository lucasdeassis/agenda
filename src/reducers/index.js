import { combineReducers } from 'redux'
import contactReducer from './contact_reducer'
import messageReducer from './message_reducer'
import { reducer as reduxFormReducer } from 'redux-form'

const rootReducer = combineReducers({
  form: reduxFormReducer,
  contacts: contactReducer,
  messages: messageReducer
})

export default rootReducer
