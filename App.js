import React from 'react';
import { Platform, StatusBar, StyleSheet, View, SafeAreaView } from 'react-native';
import { AppLoading, Asset, Font, SecureStore } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import RootNavigation from './navigation/RootNavigation';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import store from './store'
import './constants/Global'


export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    hasRunBefore: false
  };

  render() {
    return (
      <Provider store = {store} >
        {(!this.state.isLoadingComplete && !this.props.skipLoadingScreen) ? (
            <AppLoading 
              startAsync={this._loadResourcesAsync}
              onError={this._handleLoadingError}
              onFinish={this._handleFinishLoading}
            />
        ) : (
            <SafeAreaView style={styles.container}>
                {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                <RootNavigation hasRunBefore={this.state.hasRunBefore} />
            </SafeAreaView>
        )}
      </Provider>
    )
  }

  _loadResourcesAsync = async () => {
    let checkFirstRun = SecureStore.getItemAsync('hasRunBefore').then( (val) => {
      if(val) this.setState({hasRunBefore:true});
      else return SecureStore.setItemAsync('hasRunBefore','true')
    });
    let setGlobals = Promise.all([
      SecureStore.getItemAsync('username').then( (val) => { if(val) global.username = val }),
      SecureStore.getItemAsync('secret').then( (val) => { if(val) global.secret = val })
    ])
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
      checkFirstRun,
      setGlobals
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },


});
