import {StyleSheet, Text, View, TouchableOpacity, ToastAndroid, Alert} from "react-native";
import React, {Component} from 'react';
import {inject, observer} from "mobx-react";

const LIGHT_GRAY = "#D3D3D3";

@inject('listStore')
@observer
export default class ListItem extends Component<Props> {

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
        this.props.listStore.removeListItem(index);
        return ToastAndroid.show('Removed', ToastAndroid.SHORT);
    };


    render() {
        const {item :{name, description, geoLocation, eventDate}, id, showEdit, }= this.props;
        console.log(!!description, 555)
        return (
            <View style={styles.item}>
                <View style={styles.itemName}>
                    <Text ellipsizeMode='tail' numberOfLines={1} style={styles.name}>{name}</Text>
                    { !!description &&  <Text ellipsizeMode='tail' numberOfLines={1} style={styles.description}>{description}</Text> }
                </View>
                <View style={styles.actionsColumn}>
                    <TouchableOpacity onPress={() => showEdit({id, name, description, geoLocation, eventDate})}>
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
    itemName: {
        width: '60%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
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