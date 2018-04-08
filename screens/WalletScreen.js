import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import { ArkDisplay } from '../components/ArkDisplay';
import TransactionList from '../components/TransactionList'
import { connect } from 'react-redux'


function getDescription(address,source, source_name, target, target_name,direction,amount,status, otherName){

  let ret = '';
  address = 'bob'
  if(status == 'finalized') {
    if(target == address) {
      if(direction == 'forward'){
        ret = source_name+ ' paid You'
      } else {
        ret = source_name + ' charged You'
      }
    } else {
      if(direction == 'forward'){
        ret = 'You paid ' + target_name
      } else {
        ret = 'You charged ' + target_name
      }
    }
  } else if(status == 'pending'){
    if(target == address){
      if(direction == 'forward'){
        ret = source_name + ' is paying You'
      } else {
        ret = source_name + ' is charging You'
      }
    } else {
      if(direction == 'forward'){
        ret = 'You are paying ' + target_name
      } else {
        ret = 'You are charging ' + target_name
      }
    }
  } else {
    return false
  }

  return ret + ' ' + amount + ' Ark'
}

@connect((state, props) => {
  const {
    contacts : {contactsById},
    transactions : {transactionsById}, 
    user: {address,balanceByHash},
  } = state

  return {
    transactions: Object.keys(transactionsById).filter(id => {
      const {
        block : { 
          data: {
            source_address, target_address, amount, direction
          },
          hash,
        },
        status,
        source_username,
        target_username,
      } = transactionsById[id]

      return status == 'pending' && target_address == 'bob' && direction == 'forward'
    }).map((id )=> {
      const {
        block : { 
          data: {
            source_address, target_address, amount, direction
          },
          hash,
        },
        status,
        source_username,
        target_username,
      } = transactionsById[id]

      return {
        description: getDescription(
          address,
          source_address,
          source_username,
          target_address,
          target_username,
          direction,
          amount,
          status,
        ),
        balance: balanceByHash[transactionsById[id].hash] || 0,
        status,
        address,
        target_address,
        hash,
      }
    })
  }
})
export default class WalletScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props){
    super(props);
    this.state = {
      arkAmount: 100
    }
  }

  render() {
    const { transactions } = this.props
    return (
      <View style={styles.container}>
        <View>
          <ArkDisplay value={this.state.arkAmount}></ArkDisplay>
        </View>
        <ScrollView style={[styles.container]} contentContainerStyle={styles.contentContainer}>
          <TransactionList transactions = {transactions} />
        </ScrollView>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  paymentsScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
