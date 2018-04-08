import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native'
import { MonoText } from '../components/StyledText';


import Swipeout from 'react-native-swipeout';
// Buttons
var acceptBtn = [
  {
    text: 'Accept',
    backgroundColor:'green'
  }
]

var rejectBtn = [
	{
		text: 'Reject',
		backgroundColor:'red'
	}
]

var revokeBtn = [
	{
		text: 'Revoke',
		backgroundColor:'red'
	}
]


// Swipeout component

export default ({description, balance, status, address, target_address, direction}) => {
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
