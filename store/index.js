import { createStore , combineReducers} from 'redux'
import contactsReducer from './reducers/contactsReducer'
import transactionsReducer from './reducers/transactionsReducer'
import userReducer from './reducers/userReducer'
export default store = createStore(
	combineReducers({
		contacts: contactsReducer,
		transactions: transactionsReducer,
		user: userReducer,
	})
)

