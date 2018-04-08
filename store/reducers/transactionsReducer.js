const defaultState = {
	transactionsById: {
		0 : {
			source: 'test source',
			target: 'test target',
			direction: 'forward',
			ammount: 5,
			status: 'pending',
		}
	}
}

export default function(state = defaultState, {type, payload}){
	switch(type){
		case 'ADD_TRANSACTION': {

			const {data : {id, transactionType}} = payload
			const transactionsById = {...state.transactionsById}
			return {
				...state,
				payload,
			}
		}	
		case  'SOFT_UPDATE_TRANSACTION': {
			const {data: {id}} = payload
			const transactionsById = {...state.transactionsById}
			Object.keys(data).reduce((ret,key) => {
				ret[key] = data[key]
 				return ret
			}, {...transactionsById[id]})
			return {
				...state,
				transactionsById
			}
		}

		case 'HARD_UPDATE_TRANSACTION':{
			const {data: {id}} = payload
			const transactionsById = {...state.transactionsById}
			transactionsById[id] = data
			return {
				...state,
				transactionsById
			}
		}
		default: {
			return {...state}
		}

	}
}