import React, { Component } from 'react';
import { View, Text } from 'react-native'
import { MonoText } from '../components/StyledText';

export default ({description}) => (
	<View>
		<MonoText style = {{padding:20}}>{description}</MonoText>
	</View>
)