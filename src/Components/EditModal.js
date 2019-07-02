import React, {Component} from 'react';
import {StyleSheet, Button, View, ToastAndroid, TextInput,} from "react-native";
import ToDoForm from '../Components/ToDoForm';


class EditModal extends React.Component {

    render() {
        const {getParam} = this.props.navigation;
        const editMode = getParam('editMode');
        return (
            <View style={styles.container}>
                <ToDoForm {...this.props} editMode={editMode}/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        padding: 10,
        backgroundColor: '#EAEDF2',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});
export default EditModal;