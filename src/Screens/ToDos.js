import React, {Component} from 'react';
import {StyleSheet, View, FlatList, Button,} from 'react-native';
import ListItem from '../Components/ListItem';
import ToDoForm from '../Components/ToDoForm';
import {observer, inject} from 'mobx-react/index'
import listStore from "../Stores/ObservableStore";


@inject('listStore')
@observer
class ToDosScreen extends Component<Props> {

    showEditModal = ({id, name, description, geoLocation}) => {
        this.props.navigation.navigate('EditModal', {id, name, description, geoLocation, editMode: true})
    };
    showCreateModal = () => {
        this.props.navigation.navigate('EditModal', {editMode: false})
    };


    render() {
        const {listStore} = this.props;
        return (
            <View style={styles.container}>

                <View style={{padding: 10}}>
                    <Button
                        onPress={this.showCreateModal}
                        title="Add event"
                        color="#841584"
                    />
                </View>
                {/*<ToDoForm {...this.props}/>*/}
                <FlatList
                    data={listStore.list}
                    renderItem={({item, index}) => (
                        <ListItem
                            item={item}
                            id={index}
                            navigation={this.props.navigation}
                            showEdit={this.showEditModal}
                        />)}
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

/*
    alignItems: 'center',
    fontSize: 20,
    textAlign: 'center',
*/
