import {Button, FlatList, StyleSheet, Text, TextInput, View, TouchableHighlight} from "react-native";
import React, {Component} from 'react';

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
            editMode: !this.state.editMode
        })
    };

    edit = (id, newName) => {
        this.props.edit(id, newName);
        this.setState({
            editMode: !this.state.editMode
        })
    };

    render() {
        const {remove, edit, id}= this.props;
        const {editMode, newName}= this.state;
        return (
            <View style={styles.item}>
                {
                    editMode ?
                    <TextInput
                        style={{height: 40}}
                        placeholder={this.props.name}
                        onChangeText={(newName) => this.setState({newName})}
                        value={this.state.newName}
                    />
                    :
                    <Text ellipsizeMode='tail' numberOfLines={1} style={styles.name}>{this.props.name}</Text>
                }
                {editMode &&
                <TouchableHighlight onPress={()=>this.edit(id, newName)}>
                    <Text>Submit</Text>
                </TouchableHighlight>
                }
                <View style={styles.actionsColumn}>

                    <TouchableHighlight onPress={()=>this.switchEditMode()}>
                        <Text>Edit</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={()=>remove(id)}>
                        <Text>Remove</Text>
                    </TouchableHighlight>
                </View>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    item: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    name: {
      maxWidth: '70%',
    },
    actionsColumn: {
        width: 100,
        justifyContent: 'space-between',
        flexDirection: 'row',
    }
});