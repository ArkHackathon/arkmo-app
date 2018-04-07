export const addContact = (id,data) => ({
	type: 'ADD_CONTACT',
	payload: {id, data},
})

export const removeContact = (id) => ({
	type: 'REMOVE_CONTACT',
	payload: {id},
})