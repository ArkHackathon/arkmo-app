import React, {Component} from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import Transaction from './Transaction'

function getDescription(address,source,target,direction,ammount,status, otherName){

	let ret = '';
	if(status == 'finalized') {
		if(target == address) {
			if(direction == 'forward'){
				ret = otherName+ ' paid You'
			} else {
				ret = otherName + ' charged You'
			}
		} else {
			if(direction == 'forward'){
				ret = 'You paid ' + otherName
			} else {
				ret = 'You charged ' + otherName
			}
		}
	} else if(status == 'pending'){
		if(target == address){
			if(direction = 'forward'){
				ret = otherName + ' is paying You'
			} else {
				ret = otherName + ' is charging You'
			}
		} else {
			if(direction = 'forward'){
				ret = 'You are paying ' + otherName
			} else {
				ret = 'You are charging ' + otherName
			}
		}
	} else {
		return false
	}

	return ret + ' ' + ammount + ' Ark'
}

@connect((state, props) => {
	const {
		contacts,
		transactions : {transactionsById}, 
		user: {address},
	} = state

	return {
		transactions: Object.keys(transactionsById).map(id => {
			const {source, target, direction, ammount, status} = transactionsById[id]
			return {
				ammount,
				description: getDescription(address,source,target,direction,ammount)
			}
		}).filter(tx => tx.description)
	}
})
export default class TransactionList extends Component {
	render() {
		const { transactions } = this.props
		return (
			<View>
				{transactions.map(({ammount, description}) => (
					<Transaction 
						description= {verb}
					/>
				))}
			</View>
		)
	}
}