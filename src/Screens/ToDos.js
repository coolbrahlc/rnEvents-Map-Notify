import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Button,
    FlatList,
    Alert,
    Modal,
    TouchableHighlight,
    ToastAndroid
} from 'react-native';
import ListItem from '../Components/ListItem';
import {observer, inject} from 'mobx-react/index'
import listStore from "../Stores/ObservableStore";
import Map from "./Map";
import DateTimePicker from "react-native-modal-datetime-picker";


const LIGHT_GRAY = "#D3D3D3";

type Props = {};

@inject('listStore')
@observer
class ToDosScreen extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            eventDate: null,
            geoLocation: null,
            modalVisible: false,
            isDateTimePickerVisible: false,
        };
    }

    onSubmitToDo = () =>{
        const {listStore} = this.props;
        const {text, geoLocation, description, eventDate} = this.state;
        if (text) {
            listStore.addListItem({
                name: text,
                description,
                geoLocation,
                eventDate
            });
            this.setState({
                text:'',
                description: '',
                geoLocation: null,
                eventDate: null,
            })
        } else {
            ToastAndroid.show('Enter event name', ToastAndroid.SHORT);
        }
    };

    saveLocation = (geoLocation) =>{
        this.setState({geoLocation})
    };

    setModalVisible = (visibility) =>{
        if(visibility) return this.setState({modalVisible: visibility});
        this.setState({modalVisible: !this.state.modalVisible})
    };

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = date => {
        this.setState({ eventDate: date });
        console.log("A date has been picked: ", date, typeof date);
        this.hideDateTimePicker();
    };

    render() {
        const {listStore} = this.props;
        const {geoLocation, eventDate} = this.state;
        return (
            <View style={styles.container}>
                {/*<Button*/}
                {/*    title="Go to map"*/}
                {/*    onPress={() =>*/}
                {/*        this.props.navigation.navigate('Map')*/}
                {/*    }*/}
                {/*/>*/}
                <TextInput
                    style={{height: 40, margin: 10}}
                    placeholder="Add event"
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                    underlineColorAndroid={LIGHT_GRAY}
                />
                <TextInput
                    style={{height: 40, margin: 10}}
                    placeholder="Add event description"
                    onChangeText={(description) => this.setState({description})}
                    value={this.state.description}
                    underlineColorAndroid={LIGHT_GRAY}
                />
                { geoLocation && <Text style={{padding:10}}>({geoLocation.latitude}, {geoLocation.longitude})</Text>}
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10}}>
                    {
                        eventDate ? <Text>{eventDate.toUTCString()}</Text> :
                            <View>
                                <Button title="Choose date" onPress={this.showDateTimePicker} />
                                <DateTimePicker
                                    isVisible={this.state.isDateTimePickerVisible}
                                    mode={'datetime'}
                                    onConfirm={this.handleDatePicked}
                                    onCancel={this.hideDateTimePicker}
                                />
                            </View>
                    }


                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
                    <Button
                        onPress={this.onSubmitToDo}
                        title="Add event"
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"

                    />
                    {
                        !geoLocation &&
                        <Button
                            title="Add geolocation"
                            color="#841584"
                            onPress={() => this.setModalVisible(!this.state.modalVisible)}
                        />
                    }
                </View>
                <FlatList
                    data={listStore.list}
                    renderItem={({item, index}) => <ListItem name={item.name}
                                                             description={item.description}
                                                             eventDate={item.eventDate}
                                                             id={index}
                                                             listStore={listStore}/>}
                    keyExtractor={(item, index) => index.toString()}
                />

                <Modal animationType="slide"
                       transparent={false}
                       visible={this.state.modalVisible}
                       onRequestClose={() => this.setModalVisible(!this.state.modalVisible)} >
                    <Map setModalVisible={this.setModalVisible} saveLocation={this.saveLocation} editMode={true}/>
                </Modal>

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
