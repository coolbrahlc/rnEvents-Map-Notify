
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, View, ToastAndroid, Button, FlatList, Alert} from 'react-native';
import ListItem from './components/ListItem';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
const LIGHT_GRAY = "#D3D3D3";


type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      data: [
        {key: 'Walking in park'},
      ]
    };
  }
  onPressSubmit = () =>{
    const {data, text} = this.state;
    const newItem = {key: text};
    if (text) {
      this.setState({
        data: [...data, newItem],
        text: '',
      })
    }
  };

  removeAlert = (index) =>{
    Alert.alert(
        'Confirmation',
        'Are you sure?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => this.remove()},
        ],
        {cancelable: false},
    );
  };

  remove = (index) =>{
    const {data} = this.state;
    data.splice(index, 1);
    this.setState({
      data: [...data],
    })
  };

  edit = (index, newName) =>{
    const {data} = this.state;
    data[index] = {key: newName};
    this.setState({
      data: [...data],
    });
    return ToastAndroid.show('Edited!', ToastAndroid.SHORT);
  };


  render() {
    return (
      <View style={styles.container}>

        <TextInput
            style={{height: 40, padding: 10}}
            placeholder="Add event"
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            underlineColorAndroid={LIGHT_GRAY}
        />
        <View style={{alignItems: 'flex-start', padding: 10}}>
          <Button
              onPress={this.onPressSubmit}
              title="Add event"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
          />
        </View>
        <FlatList
            data={this.state.data}
            //renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
            renderItem={({item, index}) => <ListItem name={item.key} id={index} remove={this.removeAlert} edit={this.edit}/>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    paddingTop: 22,
    backgroundColor: '#EAEDF2',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

/*const stylesOld = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});*/
