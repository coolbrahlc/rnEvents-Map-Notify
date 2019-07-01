import React, {Component} from 'react';
import {StyleSheet, View, FlatList,} from 'react-native';
import ListItem from '../Components/ListItem';
import ToDoForm from '../Components/ToDoForm';
import {observer, inject} from 'mobx-react/index'
import listStore from "../Stores/ObservableStore";


@inject('listStore')
@observer
class ToDosScreen extends Component<Props> {

    showEditModal = ({id, name, description, geoLocation}) => {
        this.props.navigation.navigate('EditModal', {id, name, description, geoLocation})
    };

    render() {
        const {listStore} = this.props;
        return (
            <View style={styles.container}>
                <ToDoForm {...this.props}/>

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
