import React from 'react';
import { View, StyleSheet, Platform, TouchableHighlight,Text } from 'react-native';
import { FormInput, FormLabel, Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
export default class WelcomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
        title: 'Welcome to ArkMo!'
    };
  };

  render() {
    return (
      <View style={{flex:1, justifyContent: 'space-between'}}>
        <View>
        <Text style={{padding:20}}>Before we get started, introduce yourself!</Text>
        <FormLabel>Name</FormLabel>
        <FormInput onChangeText={() => {}} ref={ref => this.nameInput = ref}/>
        <Text style={{padding:20}}>If you already have a (D)ARK wallet, enter your secret to import your account!</Text>
        <FormLabel>Secret</FormLabel>
        <FormInput onChangeText={() => {}} ref={ref => this.secretInput = ref} autoCapitalize='none'/>
        </View>
        <View>
          <Button title='SUBMIT' buttonStyle={styles.button} disabledStyle={styles.disabled} disabled={true} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: 'green',
    marginBottom: 10
  },
  buttonDisabled: {
    backgroundColor: '#aaa'
  }
});
