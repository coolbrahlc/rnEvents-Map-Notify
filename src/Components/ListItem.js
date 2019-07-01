import {StyleSheet, Text, TextInput, View, TouchableOpacity, ToastAndroid, Alert} from "react-native";
import React, {Component} from 'react';

const BLUE = "#428AF8";
const LIGHT_GRAY = "#D3D3D3";

// @inject('observableListStore')
// @observer
export default class ListItem extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            newName: this.props.name,
        };
    }

    switchEditMode = () => {
        this.setState({
            editMode: !this.state.editMode,
            newName: this.props.name,
        })
    };

    edit = (id, newName) => {
        if (newName.length === 0) {
            return ToastAndroid.show('Can not be empty !', ToastAndroid.SHORT);
        }
        const {listStore} = this.props;
        listStore.editListItem(id, newName);
        this.setState({
            editMode: !this.state.editMode
        });
        return ToastAndroid.show('Edited!', ToastAndroid.SHORT);
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
                {text: 'OK', onPress: () => this.remove(index)},
            ],
            {cancelable: false},
        );
    };

    remove = (index) => {
        const {listStore} = this.props;
        listStore.removeListItem(index);
        return ToastAndroid.show('Removed', ToastAndroid.SHORT);
    };


    render() {
        const {id, eventDate}= this.props;
        const {editMode, newName, /*isFocused*/}= this.state;
        return (
            <View style={styles.item}>
                {
                    editMode ?
                    <TextInput
                        style={{height: 35, maxWidth: '50%'}}
                        placeholder={this.props.name}
                        onChangeText={(newName) => this.setState({newName})}
                        value={this.state.newName}
                        underlineColorAndroid={LIGHT_GRAY}
                    />
                    :
                        <View style={{width: '60%'}}>
                            <Text ellipsizeMode='tail' numberOfLines={1} style={styles.name}>{this.props.name}</Text>
                            <Text ellipsizeMode='tail' numberOfLines={1} style={styles.description}>{this.props.description}</Text>
                        </View>

                }
                {editMode &&
                <TouchableOpacity onPress={()=>this.edit(id, newName)}>
                    <Text>Submit</Text>
                </TouchableOpacity>
                }
                <View style={styles.actionsColumn}>

                    <TouchableOpacity onPress={()=>this.switchEditMode()}>
                        <Text>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.removeAlert(id)}>
                        <Text>Remove</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        margin:10,
        marginTop:0,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        fontSize: 20,
        height: 60,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    name: {
        fontSize: 16,
        color: 'black',
    },
    description: {
        color: 'grey',
        fontSize: 14,
    },
    actionsColumn: {
        width: 100,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',

    },
    button: {
        alignItems: 'center',
        backgroundColor: LIGHT_GRAY,
        padding: 10
    },
});