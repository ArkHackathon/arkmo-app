const defaultState = {
	transactionsById: {}
}

export default function(state = defaultState, {type, payload}){
	switch(type){
		case: 'ADD_TRANSACTION' {

			const {data : {id, transactionType}} = payload
			const transactionsById = {...state.transactionsById}

			switch(transactionType)

			return {
				...state,
				payload,
			}
		}
		default: {
			return {...state}
		}

		case: 'SOFT_UPDATE_TRANSACTION' {
			const {data: {id}}
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
			const {data: {id}}
			const transactionsById = {...state.transactionsById}
			transactionsById[id] = data
			return {
				...state,
				transactionsById
			}
		}
	}
}