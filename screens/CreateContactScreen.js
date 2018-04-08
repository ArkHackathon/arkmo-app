import React from 'react';
import { View, StyleSheet, Text, Button, TouchableHighlight } from 'react-native';
import { ListItem, SearchBar, FormLabel, FormInput } from 'react-native-elements';
import { BarCodeScanner, Permissions } from 'expo';
import { Ionicons } from '@expo/vector-icons';
export default class CreateContactScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
        title: 'Scan QR Code',
    };
  };
  state = {
    hasCameraPermission: null,
    qrIteration: 0,
    canSubmit: false
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
            style={StyleSheet.absoluteFill}
          />
          <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,.7)'}}>
            <FormLabel labelStyle={{
                fontSize: 15,
                color: 'white'
              }}>
              Address
            </FormLabel>
            <FormInput shake={this.state.qrIteration} value={this.state.address} onChangeText={this._lookupAddress} inputStyle={{
              fontSize: 20,
              color: 'white'
            }}/>
          </View>
          <View style={{flex: 5}} />
          <View style={{flex: 1}}>
            {/* TODO Create Contact button when valid address is added */}
          </View>
        </View>
      );
    }
  }

  _handleBarCodeRead = ({ type, data }) => {
    if(this.state.address !== data)this.setState({address: data, qrIteration: this.state.qrIteration+1});
  }
  
  _lookupAddress = () => {

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});