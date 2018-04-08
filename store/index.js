import { createStore , combineReducers} from 'redux'
import contactsReducer from './reducers/contactsReducer'
import transactionsReducer from './reducers/contactsReducer'
export default store = createStore(
	combineReducers({
		contacts: contactsReducer,
		transactions: transactionsReducer
	})
)

