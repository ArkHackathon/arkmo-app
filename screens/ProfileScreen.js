import React from 'react';
import { View, Image, Text } from 'react-native';
import QRCode from 'react-native-qrcode';

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };

  constructor(props){
    super(props);
    this.state = {
      myArkAddress: 'I like turtles'
    }
  }

  componentDidMount(){
    console.log("LOGGING")
    let self = this;
  }

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}>
        {this.state.myArkAddress && (
          [
            <QRCode
              key = "QRCode"
              value = {this.state.myArkAddress}
              size = {200}
              bgColor = 'black'
              fgColor = 'white'/>,
            <Text
              key = ""
              selectable
              style={{
                fontSize: 20
              }}>
              {this.state.myArkAddress}
            </Text>
          ]
        )}
      </View>
    );
  }
}
