const defaultState = {
	contactsById : {},
}

export default function contactsReducer(state, {type, payload}){
	switch(type){
		case 'ADD_CONTACT': {

			const {id, data} = payload
			const contactsById = {...state.contactsById}

			contactsById[id] = data
			contactsById
			return {
				...state,
				contactsById
			}
		}

		case 'REMOVE_CONTACT': {
			const { id } = payload
			const contactsById = {...state.contactsById}
			delete contactsById[id]

			return {
				...state,
				contactsById,
			}
		}

		default: {
			return {...state}
		} 
	}
}