import { createStore } from 'redux'
import contactsReducer from './contactsReducer'
const store = createStore(
	combineReducers({contacts: contactsReducer})
)

export default store;
