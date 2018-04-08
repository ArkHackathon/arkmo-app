import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import WalletScreen from '../screens/WalletScreen';
import HistoryScreen from '../screens/HistoryScreen';
import ContactsScreen from '../screens/ContactsScreen';
import ProfileScreen from '../screens/ProfileScreen';

export default TabNavigator(
  {
    Wallet: {
      screen: WalletScreen,
    },
    History: {
      screen: HistoryScreen,
    },
    Contacts: {
      screen: ContactsScreen,
    },
    Profile: {
      screen: ProfileScreen,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Wallet':
            iconName =
              Platform.OS === 'ios'
                ? `ios-cash${focused ? '' : '-outline'}`
                : 'md-cash';
            break;
          case 'History':
          iconName = Platform.OS === 'ios' ? `ios-cloud-upload${focused ? '' : '-outline'}` : 'md-cloud-upload';
            break;
          case 'Contacts':
            iconName = Platform.OS === 'ios' ? `ios-contacts${focused ? '' : '-outline'}` : 'md-contacts';
            break;
          case 'Profile':
            iconName =
              Platform.OS === 'ios' ? `ios-contact${focused ? '' : '-outline'}` : 'md-contact';
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3, width: 25 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);
