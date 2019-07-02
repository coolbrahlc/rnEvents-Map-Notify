import React, {Component} from 'react';
import {StyleSheet, View, FlatList, Button, TouchableOpacity, Alert, Text, Image, ActivityIndicator, ScrollView} from 'react-native';
import ListItem from '../Components/ListItem';
import {observer, inject} from 'mobx-react/index'
import listStore from "../Stores/ObservableStore";
//import RightChevron from "../Images/baseline_chevron_right_black_18dp.png";

@inject('listStore')
@inject('notif')
@observer
class ToDosScreen extends Component<Props> {

    showEditModal = ({id, name, description, geoLocation, eventDate}) => {
        this.props.navigation.navigate('EditModal', {id, name, description, geoLocation, eventDate, editMode: true})
    };
    showCreateModal = () => {
        this.props.navigation.navigate('EditModal', {editMode: false})
    };
    componentDidMount() {
        const {listStore, notif} = this.props;
        listStore.loadWeatherGenerator();
    }

    newDog = () => listStore.loadWeatherGenerator(false);

    renderImage = () =>{
        const {listStore:{dog, isFetching, list, error}, notif} = this.props;
        if (error) {
            return (
                <ScrollView contentContainerStyle={{flexDirection: 'row', justifyContent: 'center', padding:10}}>
                    <Text>Error</Text>
                </ScrollView>
            )
        }

        return (
            <ScrollView contentContainerStyle={{flexDirection: 'row', justifyContent: 'center', padding:10}}>
                { isFetching?
                    <ActivityIndicator size="large" color="grey" />
                    :
                    <Image
                        style={{width: 300, height: 300}}
                        source={{uri: dog}}
                    />
                }
            </ScrollView>
        )
    };

    render() {
        const {listStore:{dog, isFetching, list, error}, notif} = this.props;
        return (
            <View style={styles.container}>
                <View style={{padding: 10}}>
                    <Button
                        onPress={this.showCreateModal}
                        title="Add event"
                        color="#841584"
                    />
                    { this.renderImage() }
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <TouchableOpacity onPress={this.newDog}>
                            <Text style={{fontSize: 24, fontWeight: 'bold'}}>New dog</Text>
                        </TouchableOpacity>
                    </View>
                    {/*<TouchableOpacity style={styles.button} onPress={() => { notif.localNotif() }}>*/}
                    {/*    <Text>Local Notification (now)</Text>*/}
                    {/*</TouchableOpacity>*/}
                    {/*<TouchableOpacity style={styles.button} onPress={() => { notif.scheduleNotif() }}>*/}
                    {/*    <Text>Schedule Notification in 3s</Text>*/}
                    {/*</TouchableOpacity>*/}
                </View>
                <FlatList
                    data={list}
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
