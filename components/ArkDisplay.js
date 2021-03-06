import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

import { connect } from 'react-redux'
@connect((state) => ({
  balance: state.user.currentBalance, 
}))
export class ArkDisplay extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
    <View style={styles.container}>
      <Text {...this.props} style={[styles.text,this.props.style]}>
        Ѧ{this.props.balance}
      </Text>
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 4,
    borderBottomColor: 'black',
    borderStyle: 'solid'
  },
  text: {
    fontSize: 60,
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 30
  }
})