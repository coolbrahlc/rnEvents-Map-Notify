import React, {Component} from 'react';
import {StyleSheet, View, FlatList, Button, TouchableOpacity, Alert, Text, Image, ActivityIndicator, Animated} from 'react-native';
import ListItem from '../Components/ListItem';
import {observer, inject} from 'mobx-react/index'
import {Separator} from '../Components/ListItem';
import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";



@inject('listStore')
@inject('notif')
@observer
class ToDosScreen extends Component<Props> {

    showEditModal = (props) => {
        this.props.navigation.navigate('EditModal', {...props, editMode: true})
    };
    showCreateModal = () => {
        this.props.navigation.navigate('EditModal', {editMode: false})
    };
    componentDidMount() {
        const {listStore} = this.props;
        listStore.fetchEvents();
    }

    newDog = () => {
        this.props.listStore.loadImage(false)
    };

    renderImage = () =>{
        const {listStore:{dog, isFetching, list, error}, notif} = this.props;
        if (error) {
            return (
                <View contentContainerStyle={{flexDirection: 'row', justifyContent: 'center', padding:10}}>
                    <Text>Error</Text>
                </View>
            )
        }

        return (
            <View style={{flexDirection: 'row', justifyContent: 'center', padding:10}}>
                { isFetching?
                    <ActivityIndicator size="large" color="grey" />
                    :
                    <Image
                        style={{width: 300, height: 300}}
                        source={{uri: dog}}
                    />
                }
            </View>
        )
    };

    onSwipeFromLeft = () =>{
        Alert.alert('123', 'asd')
    };
    onSwipeFromRight = () =>{
        Alert.alert('123', 'asd')
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
                    {/*{ this.renderImage() }*/}
                    {/*<View style={{flexDirection: 'row', justifyContent: 'center'}}>*/}
                    {/*    <TouchableOpacity onPress={this.newDog}>*/}
                    {/*        <Text style={{fontSize: 24, fontWeight: 'bold'}}>New dog</Text>*/}
                    {/*    </TouchableOpacity>*/}
                    {/*</View>*/}

                    {/*<TouchableOpacity style={styles.button} onPress={() => { notif.localNotif() }}>*/}
                    {/*    <Text>Local Notification (now)</Text>*/}
                    {/*</TouchableOpacity>*/}
                    {/*<TouchableOpacity style={styles.button} onPress={() => { notif.scheduleNotif() }}>*/}
                    {/*    <Text>Schedule Notification in 3s</Text>*/}
                    {/*</TouchableOpacity>*/}
                </View>

                { isFetching?
                    <ActivityIndicator size="large" color="grey" />
                    :
                    <FlatList
                        data={list}
                        renderItem={({item, index}) => (
                            <ListItem
                                {...item}
                                onSwipeFromLeft={this.onSwipeFromLeft}
                                onSwipeFromRight={this.onSwipeFromRight}
                                navigation={this.props.navigation}
                                showEdit={this.showEditModal}
                            />)}
                        ItemSeparatorComponent={()=><Separator />}
                        keyExtractor={(item, index) => index.toString()}
                    />
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
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
