import React from 'react';
import { ScrollView, StyleSheet, FlatList, Platform, Button, TouchableHighlight } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
export default class AddContactScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
        title: 'Add Contact',
        headerRight: <TouchableHighlight underlayColor='white' onPress={() => navigation.navigate('CreateContact')}>
        <Ionicons
        name={Platform.OS === 'ios'? 'ios-barcode-outline' : 'md-barcode'}
        size={28}
        style={{ marginBottom: -3, width: 30,  }}
      />
      </TouchableHighlight>
    };
  };

  render() {
    return (

      <ScrollView style={styles.container}>
        <SearchBar lightTheme />
        <FlatList data={[{key: 'asdfjkl;', name: 'John Do', address: 'asdfjkl;'}, {key: 'qweruiop', name: 'Jane Do', address: 'qweruiop'}]}
        renderItem={({item}) => <ListItem title={item.name} subtitle={item.address} hideChevron />}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
