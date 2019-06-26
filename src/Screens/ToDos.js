import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, View, Button, FlatList, Alert} from 'react-native';
import ListItem from '../Components/ListItem';
import {observer, inject} from 'mobx-react/index'
import listStore from "../Stores/ObservableStore";


const LIGHT_GRAY = "#D3D3D3";

type Props = {};

@inject('listStore')
@observer
class ToDosScreen extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
        };
    }

    onPressSubmit = () =>{
        const {listStore} = this.props;
        const {text} = this.state;
        if (text) {
            listStore.addListItem({name: text});
            this.setState({text:''})
        }
    };

    render() {
        const {listStore} = this.props;
        return (
            <View style={styles.container}>
                <Button
                    title="Go to map"
                    onPress={() =>
                        this.props.navigation.navigate('Map')
                    }
                />
                <TextInput
                    style={{height: 40, margin: 10}}
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
                    data={listStore.list}
                    renderItem={({item, index}) => <ListItem name={item.name} key={index} id={index} listStore={listStore}/>}
                    keyExtractor={(item, index) => index.toString()}
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

export default ToDosScreen;

/*const stylesOld = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});*/
