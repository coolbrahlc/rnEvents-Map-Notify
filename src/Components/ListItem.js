import {StyleSheet, Text, View, TouchableOpacity, ToastAndroid, Alert} from "react-native";
import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import Swipeable from 'react-native-gesture-handler/Swipeable'
const LIGHT_GRAY = "#D3D3D3";

const LeftActions = (progress, dragX) =>{
    return(
        <View style={styles.leftAction}>
            <Text style={styles.actionText}>
                left actions
            </Text>
        </View>
    )
};

const RightActions = (progress, dragX) =>{
    return(
        <View style={styles.rightAction}>
            <Text style={styles.actionText}>
                Remove
            </Text>
        </View>
    )
};


export const Separator = () => <View style={styles.separator} />;


@inject('notif')
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

    remove = (id) => {
        this.props.listStore.removeListItem(id);
    };


    render() {
        const {name, description, id, showEdit, onSwipeFromLeft}= this.props;
        console.log(id, 'rerendered')
        const onSwipeFromRight = () =>{
            this.remove(id)
        };
        return (
            <Swipeable
                renderLeftActions={LeftActions}
                renderRightActions={RightActions}
                onSwipeableLeftOpen={onSwipeFromLeft}
                onSwipeableRightOpen={onSwipeFromRight}
            >
                <View style={styles.item}>
                    <View style={styles.itemName}>
                        <Text ellipsizeMode='tail' numberOfLines={1} style={styles.name}>{name}</Text>
                        { !!description &&  <Text ellipsizeMode='tail' numberOfLines={1} style={styles.description}>{description}</Text> }
                    </View>
                    <View style={styles.actionsColumn}>
                        <TouchableOpacity onPress={() => showEdit({...this.props})}>
                            <Text>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.removeAlert(id)}>
                            <Text>Remove</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </Swipeable>

        );
    }
}


const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        paddingLeft: 20,
        fontSize: 20,
        height: 60,
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
    leftAction: {
        backgroundColor: '#388e3c',
        justifyContent: 'center',
        flex: 0.25,
    },
    rightAction: {
        backgroundColor: '#A9A9A9',
        justifyContent: 'center',
        alignItems: 'flex-end',
        flex: 0.5,
    },
    actionText: {
        color: '#fff',
        fontWeight: '600',
        padding: 20
    },
    separator: {
        flex: 1,
        height: 1,
        backgroundColor: '#e4e4e4',
        marginLeft: 10
    }

});