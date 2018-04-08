import React, {Component} from 'react'
import { connect } from 'react-redux'
import { View , Text} from 'react-native'
import Transaction from './Transaction'

function getDescription(address,source, source_name, target, target_name,direction,amount,status, otherName){

	let ret = '';
	address = 'bob'
	if(status == 'finalized') {
		if(target == address) {
			if(direction == 'forward'){
				ret = source_name+ ' paid You'
			} else {
				ret = source_name + ' charged You'
			}
		} else {
			if(direction == 'forward'){
				ret = 'You paid ' + target_name
			} else {
				ret = 'You charged ' + target_name
			}
		}
	} else if(status == 'pending'){
		if(target == address){
			if(direction == 'forward'){
				ret = source_name + ' is paying You'
			} else {
				ret = source_name + ' is charging You'
			}
		} else {
			if(direction == 'forward'){
				ret = 'You are paying ' + target_name
			} else {
				ret = 'You are charging ' + target_name
			}
		}
	} else {
		return false
	}

	return ret + ' ' + amount + ' Ark'
}

@connect((state, props) => {

	const {
		contacts : {contactsById},
		transactions : {transactionsById}, 
		user: {address,balanceByHash},
	} = state
	return {
		transactions: props.transactions || Object.keys(transactionsById).map(id => {
			const {
				block : { 
					hash,
					data: {
						source_address, target_address, amount, direction
					}
				},
				status,
				source_username,
				target_username,
			} = transactionsById[id]
			return {
				description: getDescription(
					address,
					source_address,
					source_username,
					target_address,
					target_username,
					direction,
					amount,
					status,
				),
				balance: balanceByHash[hash],
				status,
				address,
				target_address,
				hash,
				amount,
				direction
			}
		}).filter(tx => tx.description),
	}
})

export default class TransactionList extends Component {
	render() {
		const { transactions } = this.props
		return (
			<View>
				{transactions.map(({amount,description, balance, status,address, target_address,hash, direction}, i) => (
					<View  key = {i} style= {{marginBottom:10}}>
						<Transaction 
							description= {description}
							balance = {balance}
							status = {status}
							address = {address}
							target_address = {target_address}
							direction = {direction}
							hash = {hash}
							amount = {amount}
						/>
				      <View style={{
				        flex: 1,
				        flexDirection: 'column',
				        justifyContent: 'center',
				        alignItems: 'center',
				      }}>
				        <View style={{width: '100%', height:1,borderBottomColor:'skyblue',borderBottomWidth:1}} />
				      </View>
					</View>
				))}
			</View>
		)
	}
}