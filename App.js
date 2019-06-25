
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, View, AppRegistry, Button, FlatList} from 'react-native';
import ListItem from './components/ListItem';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      data: [
        {key: 'Devin'},
      ]
    };
  }
  onPressSubmit = () =>{
    const {data, text} = this.state;
    //console.log(text);
    const newItem = {key: text};
    if (text) {
      this.setState({
        data: [...data, newItem],
        text: '',
      })
    }
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
    })
  };


  render() {
    return (
      <View style={styles.container}>
        {/*<Text style={styles.welcome}>Welcome to React Native?</Text>*/}
        {/*<Text style={styles.instructions}>{instructions}</Text>*/}
        <TextInput
            style={{height: 40}}
            placeholder="Add event"
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
        />
        <Button
            onPress={this.onPressSubmit}
            title="Add event"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
        />
        <FlatList
            data={this.state.data}
            //renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
            renderItem={({item, index}) => <ListItem name={item.key} id={index} remove={this.remove} edit={this.edit}/>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
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
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});*/
