import React from 'react';
import ListContactsScreen from './ListContactsScreen';
import AddContactScreen from './AddContactScreen';
import { StackNavigator } from 'react-navigation';
import CreateContactScreen from './CreateContactScreen';

const ContactsStackNavigator = StackNavigator(
  {
    ListContacts: {
      screen: ListContactsScreen
    },
    AddContact: {
      screen: AddContactScreen
    },
    CreateContact: {
      screen: CreateContactScreen
    }
  },
)

export default class RootNavigator extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return <ContactsStackNavigator />;
  }
}