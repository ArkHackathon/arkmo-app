export const addTransaction = (data) => ({
	type:'ADD_TRANSACTION',
	payload: {data},
})

export const softUpdateTransaction = (data) => ({
	type: 'SOFT_UPDATE_TRANSACTION',
	payload: {data},
})

export const hardUpdateTransaction = (data) => ({
	type:'HARD_UPDATE_TRANSACTION',
	payload: {data}
})