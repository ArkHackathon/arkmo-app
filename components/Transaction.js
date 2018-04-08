import React, { Component } from 'react';
import { View, Text } from 'react-native'
import { MonoText } from '../components/StyledText';

export default ({description, balance}) => (
	<View style={{flex: 1, flexDirection: 'row', padding:20}}>
	  <View style={{flex: 3}}>
	    <Text>{description}</Text>
	  </View>
	  <View style={{flex: 1}}>
	    <Text style={{backgroundColor: 'skyblue',textAlign: 'right'}}>{balance}</Text>
	  </View>
	</View>
)