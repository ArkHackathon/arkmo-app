import React from 'react';
import { ScrollView, StyleSheet, FlatList, Platform, Button, TouchableHighlight } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
export default class ListContactsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
        title: 'Contacts',
        headerRight: <TouchableHighlight underlayColor='white' onPress={() => navigation.navigate('AddContact')}>
        <Ionicons
        name={Platform.OS === 'ios'? 'ios-add' : 'md-add'}
        size={28}
        style={{ marginBottom: -3, width: 25 }}
      />
      </TouchableHighlight>
    };
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
        <FlatList data={[{key: 'asdfjkl;', name: 'John Doe', address: 'asdfjkl;'}, {key: 'qweruiop', name: 'Jane Doe', address: 'qweruiop'}]}
        renderItem={({item}) => <ListItem title={item.name} subtitle={item.address} hideChevron />}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
