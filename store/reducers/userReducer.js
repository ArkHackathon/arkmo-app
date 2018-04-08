const defaultState = {
	address: 'Fake Address',
	name: 'Fake Name',
}

export default function(state = defaultState, {type, payload}){
	switch(type){
		case 'UPDATE_USER': {
			return {
				...state,
				...payload.data,
			}
		}
		default: {
			return {...state}
		}
	}
}