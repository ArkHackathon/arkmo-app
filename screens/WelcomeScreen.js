import React from 'react';
import { View, StyleSheet, Platform, TouchableHighlight,Text } from 'react-native';
import { FormInput, FormLabel, Button, FormValidationMessage } from 'react-native-elements';
import { SecureStore } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import RandomWords from 'random-words';
import axios from 'axios';
import { withNavigation } from 'react-navigation';

export default class WelcomeScreen extends React.Component {
  state = {
    hasName: false,
    showError: false
  }
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
          <FormInput onChangeText={this._handleNameChangeText} />
          <Text style={{padding:20}}>If you already have a (D)ARK wallet, enter your secret to import your account!</Text>
          <FormLabel>Secret</FormLabel>
          <FormInput onChangeText={this._handleSecretChangeText} autoCapitalize='none'/>
          {this.state.showError && 
          <FormValidationMessage>Secret must be 12 words separated by spaces. If you are unsure about this field, just leave it blank</FormValidationMessage>
          }
        </View>
        <View>
          <Button 
            title='SUBMIT'
            buttonStyle={styles.button}
            disabledStyle={styles.disabled}
            disabled={!this.state.hasName}
            onPress={this._handleSubmit} />
        </View>
      </View>
    );
  }

  _handleNameChangeText = (val) => {
    this.setState({ hasName: val.length !== 0, nameText: val});
  }
  _handleSecretChangeText = (val) => {
    this.setState( {secretText: val} );
    if(val.match(/^(\b\w+\b\s*){12}$/) || val === ""){
      this.setState({showError:false});
    } else {
      this.setState({showError:true});
    }
  }
  _handleSubmit = () => {
    //Send the name to the server
    let usernamePromise = axios.post(`${global.apiUrl}user/create`,
      {name: this.state.nameText}).then( (response) => {
        console.log("theresponse");
        console.log(response);
        console.log(response.data);
        console.log(response.data.username);
        return SecureStore.setItemAsync('username',response.data.username.toString());
    }).catch(function (error) { 
      console.error(error);
    });;
    //Save the secret, if there is one
    let secretPromise;
    if(!this.state.showError && this.state.secretText  && this.state.secreText !== ""){
      secretPromise = SecureStore.setItemAsync('secret',this.state.secretText.toString());
    } else {
      secretPromise = SecureStore.setItemAsync('secret',RandomWords(12).join(' ').toString());
    }
    Promise.all(usernamePromise,secretPromise).then( () => {
      this.props.navigation.navigate('Main');
    });
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
