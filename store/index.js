import { createStore , combineReducers} from 'redux'
import contactsReducer from './reducers/contactsReducer'
export default store = createStore(
	combineReducers({
		contacts: contactsReducer
	})
)
