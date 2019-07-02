import {StyleSheet, Text, View, TouchableOpacity, ToastAndroid, Alert, TextInput, Button} from "react-native";
import React, {Component} from 'react';
import {CheckBox} from "native-base";
import Map from "../Screens/Map";
import DateTimePicker from "react-native-modal-datetime-picker";
import {inject, observer} from "mobx-react";

const LIGHT_GRAY = "#D3D3D3";

@inject('listStore')
@observer
export default class ToDoForm extends Component<Props> {

    constructor(props) {
        super(props);
        const {getParam} = props.navigation;
        this.state = {
            name: getParam('name', ''),
            description: getParam('description', ''),
            eventDate: null,
            geoLocation: getParam('geoLocation', null),
            showDatepicker: false,
            mapChecked: !!getParam('geoLocation', ''),
        }
    }
    switchMapCheckboox = () =>{
        if (this.state.mapChecked) {
             return this.setState({
                mapChecked: false,
                geoLocation: null
            });

        }
        this.setState({mapChecked: true});
    };

    saveLocation = (geoLocation) =>{
        this.setState({geoLocation})
    };

    switchDateTimePicker = () => {
        this.setState({ showDatepicker: !this.state.showDatepicker });
    };

    handleDatePicked = date => {
        this.setState({ eventDate: date });
        console.log("A date has been picked: ", date, typeof date);
        this.switchDateTimePicker();
    };

    onSubmit = () =>{
        const {listStore, navigation:{goBack}} = this.props;
        const {name, geoLocation, description, eventDate, } = this.state;
        if (name) {
            listStore.addListItem({
                name,
                description,
                geoLocation,
                eventDate
            });
            this.setState({
                name:'',
                description: '',
                geoLocation: null,
                eventDate: null,
                mapChecked: false
            });
            goBack();
        } else {
            ToastAndroid.show('Enter event name', ToastAndroid.SHORT);
        }
    };

    edit = () => {
        const {name, description, geoLocation} = this.state;
        const {listStore, navigation:{getParam, goBack}} = this.props;
        const id = getParam('id');
        if (name.length === 0) {
            return ToastAndroid.show('Can not be empty !', ToastAndroid.SHORT);
        }
        listStore.editListItem(id, {name, description, geoLocation});
        goBack();
        return ToastAndroid.show('Edited!', ToastAndroid.SHORT);
    };

    renderMap = () => {
        const {mapChecked, geoLocation} = this.state;
        if (mapChecked) {
            return (
                <View style={{height: 200, margin: 10}}>
                    <Map saveLocation={this.saveLocation} geoLocation={geoLocation} editMode={true}/>
                </View>
            )
        }
    };

    render() {
        const {eventDate, mapChecked} = this.state;
        const {editMode} = this.props;
        return (
            <View style={editMode? styles.card:{}}>
                <TextInput
                    style={{height: 40, margin: 10}}
                    placeholder="Add event"
                    onChangeText={(name) => this.setState({name})}
                    value={this.state.name}
                    underlineColorAndroid={LIGHT_GRAY}
                />
                <TextInput
                    style={{height: 40, margin: 10}}
                    placeholder="Add event description"
                    onChangeText={(description) => this.setState({description})}
                    value={this.state.description}
                    underlineColorAndroid={LIGHT_GRAY}
                />
                <View style={{marginBottom: 10}}>

                    <CheckBox checked={mapChecked} onPress={()=>this.switchMapCheckboox()}/>

                    { this.renderMap() }
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10}}>
                    {
                        eventDate ? <Text>{eventDate.toUTCString()}</Text> :
                            <View>
                                <Button title="Choose date" onPress={this.switchDateTimePicker} />
                                <DateTimePicker
                                    isVisible={this.state.showDatepicker}
                                    mode={'datetime'}
                                    onConfirm={this.handleDatePicked}
                                    onCancel={this.switchDateTimePicker}
                                />
                            </View>
                    }
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
                    {
                        this.props.editMode?
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                                <Button
                                    onPress={() => this.props.navigation.goBack()}
                                    title="Dismiss"
                                />
                                <Button
                                    onPress={()=>this.edit()}
                                    title="Edit"
                                    color="#841584"
                                />
                            </View> :
                            <Button
                                onPress={this.onSubmit}
                                title="Add event"
                                color="#841584"
                                accessibilityLabel="Learn more about this purple button"
                            />
                    }
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    }
});