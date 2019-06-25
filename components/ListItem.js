import {StyleSheet, Text, TextInput, View,  TouchableOpacity, ToastAndroid} from "react-native";
import React, {Component} from 'react';

const BLUE = "#428AF8";
const LIGHT_GRAY = "#D3D3D3";

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
        this.props.edit(id, newName);
        this.setState({
            editMode: !this.state.editMode
        })
    };

    render() {
        const {remove, id}= this.props;
        const {editMode, newName, isFocused}= this.state;
        return (
            <View style={styles.item}>
                {
                    editMode ?
                    <TextInput
                        style={{height: 35, maxWidth: '50%'}}
                        placeholder={this.props.name}
                        onChangeText={(newName) => this.setState({newName})}
                        value={this.state.newName}
                        // selectionColor={BLUE}
                        underlineColorAndroid={LIGHT_GRAY}
                        //     isFocused? BLUE : LIGHT_GRAY
                        // }
                        // onBlur={this.handleBlur}
                        // onFocus={this.handleFocus}
                        // {...otherProps}
                    />
                    :
                    <Text ellipsizeMode='tail' numberOfLines={1} style={styles.name}>{this.props.name}</Text>
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
                    <TouchableOpacity onPress={()=>remove(id)}>
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
        marginBottom:0,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        fontSize: 20,
        height: 50,
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
        color: 'black',
        maxWidth: '70%',
    },
    actionsColumn: {
        width: 100,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    button: {
        alignItems: 'center',
        backgroundColor: LIGHT_GRAY,
        padding: 10
    },
});