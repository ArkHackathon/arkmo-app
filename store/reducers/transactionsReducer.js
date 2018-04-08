const defaultState = {
	transactionsById: {
		"9bfe2c0573390e7f8484e65155a24ba2de5e8984a9743e72e6417a63788a639f": {
			"block": {
				"data": {
					"source_address": "D74BQWJKBWnHGLWL2FNrLn1oynnB8Rzeak",
					"target_address": "asdf",
					"amount": 10,
					"direction": "SourceToTarget",
					"timestamp": "2018-04-07 21:38:16.476296"
				}, 
				"previous_hash": "b14607cc870d6b301e58414970bcc4c307d897cebc3b1f6849e1cf4ad1057199", 
				"hash": "9bfe2c0573390e7f8484e65155a24ba2de5e8984a9743e72e6417a63788a639f"
			}, 
			"status": "finalized",
			"source_username": "testy",
			"target_username": "bill"
		}, 
		"07a96f947536262bbd2ef61bf707ea9f6461188e0126df310c239f712627ce9e": {
			"block": {
				"data": {
					"source_address": "D74BQWJKBWnHGLWL2FNrLn1oynnB8Rzeak",
					"target_address": "bob",
					"amount": 100, 
					"direction": "forward",
					"timestamp": "2018-04-07 21:38:41.000783"
				}, 
				"previous_hash": "9bfe2c0573390e7f8484e65155a24ba2de5e8984a9743e72e6417a63788a639f",
				"hash": "07a96f947536262bbd2ef61bf707ea9f6461188e0126df310c239f712627ce9e"
			},
			"status": "pending",
			"source_username": "testy",
			"target_username": "bob"
		}, "173417c3bdc9c5f1fac5ba88984e50acaed2b8cc1aef71f1e0cd03b1fe5d35e2": {
			"block": {
				"data": {
					"source_address": "D74BQWJKBWnHGLWL2FNrLn1oynnB8Rzeak", 
					"target_address": "bob",
					 "amount": 102,
					  "direction": "backward",
					   "timestamp": "2018-04-07 21:38:51.575147"
				}, 
				"previous_hash": "07a96f947536262bbd2ef61bf707ea9f6461188e0126df310c239f712627ce9e", 
				"hash": "173417c3bdc9c5f1fac5ba88984e50acaed2b8cc1aef71f1e0cd03b1fe5d35e2"
			}, 
			"status": "pending", 
			"source_username": "george", 
			"target_username": "bobby"
		}, "asdf": {
			"block": {
				"data": {
					"source_address": "bob", 
					"target_address": "notbob",
					 "amount": 104,
					  "direction": "backward",
					   "timestamp": "2018-04-07 21:38:51.575147"
				}, 
				"previous_hash": "07a96f947536262bbd2ef61bf707ea9f6461188e0126df310c239f712627ce9e", 
				"hash": "173417c3bdc9c5f1fac5ba88984e50acaed2b8cc1aef71f1e0cd03b1fe5d35e2"
			}, 
			"status": "pending", 
			"source_username": "bob", 
			"target_username": "mario"
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