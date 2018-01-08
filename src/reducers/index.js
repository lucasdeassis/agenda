import { combineReducers } from 'redux'
import contactsReducer from './reducer_contacts'
import { reducer as reduxFormReducer } from 'redux-form'

const rootReducer = combineReducers({
  form: reduxFormReducer,
  contacts: contactsReducer
})

export default rootReducer
