import { Notifications } from 'expo';
import React from 'react';
import { StackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';
import WelcomeScreen from '../screens/WelcomeScreen';

export default class RootNavigator extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      firstRun: !props.hasRunBefore
    }
  }
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    let screens;
    if(this.state.firstRun){
      screens = {
        Welcome: {
          screen: WelcomeScreen
        },
        Main: {
          screen: MainTabNavigator
        }
      }
    } else {
      screens = {
        Main: {
          screen: MainTabNavigator
        },
        Welcome: {
          screen: WelcomeScreen
        }
      }
    }
    const RootStackNavigator = StackNavigator(
      screens,
      {
        navigationOptions: () => ({
          headerTitleStyle: {
            fontWeight: 'normal',
          },
        }),
      }
    );
    return <RootStackNavigator />;
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = ({ origin, data }) => {
    console.log(`Push notification ${origin} with data: ${JSON.stringify(data)}`);
  };
}
