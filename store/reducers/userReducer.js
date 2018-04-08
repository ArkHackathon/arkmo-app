import moment from 'moment'
const defaultState = {
	address: 'bob',
	name: 'Fake Name',
	balanceByHash: {},
	currentBalance: 0,
	lastTransactionTime: new Date(),
}


export default function(state = defaultState, {type, payload}){
	switch(type){
		case 'UPDATE_USER': {
			return {
				...state,
				...payload.data,
			}
		}


		case 'ADD_TRANSACTION': {
			const {
				hash,
				previous_hash,
				status,				
				block: {
					data : {source_address, target_address, amount, direction}
				}
			} = payload
			let { address, balanceByHash} = state
			let newBalance = balanceByHash[previous_hash] || 0;
			if(data.source_address == address || data.target_address == address && status == 'finalized'){
				if(
					(source_address == address && direction == 'forward') ||
					(target_address == address && direction == 'backwards')
				) { 
					newBalance -= amount
				} else {
					newBalance += amount
				}
			}

			balanceByHash = {...balanceByHash, hash: newBalance}
			return {
				...state,
				balanceByHash,
			}
		}

		case 'LOAD_ALL_TRANSACTIONS': {
			const { data } = payload
			const { address } = state

			const balanceByHash = {}
			data.forEach(transaction => {
				const {
					hash,
					previous_hash,
					status,				
					block: {
						data : {source_address, target_address, amount, direction}
					}
				} = transaction

				let newBalance = balanceByHash[previous_hash] || 0;
				if(data.source_address == address || data.target_address == address && status == 'finalized'){
					if(
						(source_address == address && direction == 'forward') ||
						(target_address == address && direction == 'backwards')
					) { 
						newBalance -= amount
					} else {
						newBalance += amount
					}
				}
				balanceByHash[hash] = newBalance;
			})

			return {
				...state,
				balanceByHash,
			}

		}

		case 'FINALIZE_TRANSACTION': {
			let { hash, amount,target_address, direction } = payload
			if(
				(target_address == state.address && direction == 'forward') ||
				(target_address != state.address && direction != 'forward')
			){
				amount *= 1
			} else {
				amount *=-1
			}

			const newBalance = state.currentBalance+amount
			return {
				...state,
				currentBalance: newBalance,
			}
		}

		default: {
			return {...state}
		}


	}
}