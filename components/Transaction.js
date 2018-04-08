import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native'
import { MonoText } from '../components/StyledText';
import { finalizeTransaction, removeTransaction } from '../actions/transactionsActions'
import { connect } from 'react-redux'

import Swipeout from 'react-native-swipeout';
// Buttons

// Swipeout component
@connect()
export default class Transaction extends Component{

	render(){

		const {hash,dispatch, description, balance, status, address, target_address, direction} = this.props
		const finalize = () => {dispatch(finalizeTransaction(hash))}
		const remove = () => {dispatch(removeTransaction(hash))}

		var acceptBtn = [
		  {
		    text: 'Accept',
		    backgroundColor:'green',
		    onPress: finalize
		  }
		]

		var rejectBtn = [
			{
				text: 'Reject',
				backgroundColor:'red',
				onPress: remove,
			}
		]

		var revokeBtn = [
			{
				text: 'Revoke',
				backgroundColor:'red',
				onPress: remove,
			}
		]

		const inner = (
			<View style={{flex: 1, flexDirection: 'row', padding:20}}>
			  <View style={{flex: 3}}>
			    <Text>{description}</Text>
			  </View>
			  <View style={{flex: 1}}>
			    <Text style={{backgroundColor: 'skyblue',textAlign: 'right'}}>{balance}</Text>
			  </View>
			</View>
		)

		return (
			<View>
			{ status == 'pending'? (
				'bob' == target_address? (
					<Swipeout buttonWidth = {100} left = {acceptBtn} right={rejectBtn}>
						{[inner]}
					</Swipeout>
				) : (
					<Swipeout buttonWidth = {100} right={revokeBtn}>
						{[inner]}
					</Swipeout>
				)
			) : (
				[inner]
			)}
			</View>
		)
	}
} 
