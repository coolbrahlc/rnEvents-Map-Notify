import {StyleSheet, Text, View, TouchableOpacity, ToastAndroid, Image, TextInput, Button, Switch} from "react-native";
import React, {Component} from 'react';
//import {CheckBox} from "native-base";
import Map from "../Screens/Map";
import DateTimePicker from "react-native-modal-datetime-picker";
import {inject, observer} from "mobx-react";
import RightChevron from '../Images/baseline_chevron_right_black_18dp.png'

const LIGHT_GRAY = "#D3D3D3";

@inject('listStore')
@inject('notif')
@observer
export default class ToDoForm extends Component<Props> {

    constructor(props) {
        super(props);
        const {getParam} = props.navigation;
        this.state = {
            name: getParam('name', ''),
            description: getParam('description', ''),
            notify_at: getParam('notify_at', new Date()),
            geoLocation: getParam('geoLocation', {}),
            showDatepicker: false,
            mapChecked: getParam('toggle_map_points', false),
        }
    }
    switchMapCheckboox = () =>{
        if (this.state.mapChecked) {
             return this.setState({

                 mapChecked: false,
                 geoLocation: {}
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
        this.setState({ notify_at: date });
        this.switchDateTimePicker();
    };

    onSubmit = () =>{
        const {listStore, navigation:{goBack}, notif} = this.props;
        const {name, geoLocation:{latitude, longitude}, description, notify_at, mapChecked} = this.state;
        if (name.length === 0) {
            return ToastAndroid.show('Can not be empty !', ToastAndroid.SHORT);
        }
        listStore.addListItem(notif, {
            name,
            description,
            latitude,
            longitude,
            notify_at,
            toggle_map_points: mapChecked,
            created_at: new Date(),
        });
        this.setState({
            name:'',
            description: '',
            geoLocation: {},
            notify_at: new Date(),
            mapChecked: false,
        });
        goBack();

    };

    edit = () => {
        const {name, mapChecked, description, geoLocation:{latitude, longitude}, notify_at} = this.state;
        console.log(latitude, longitude, 'coordinates')
        const {listStore, notif, navigation:{getParam, goBack}} = this.props;
        if (name.length === 0) {
            return ToastAndroid.show('Can not be empty !', ToastAndroid.SHORT);
        }

        let notificationId = null;
        if (getParam('notify_at', new Date()) !== notify_at) {
            const notifId = getParam('notificationId');
            notif.removeSceduleNotif(notifId);
            notificationId = notif.scheduleNotif(notify_at, name, description)
        }
        const id = getParam('id');
        listStore.editListItem(id, {name, description, latitude, longitude, notify_at, notificationId, toggle_map_points:mapChecked});

        goBack();
        return ToastAndroid.show('Edited!', ToastAndroid.SHORT);
    };

    renderMap = () => {
        const {getParam} = this.props.navigation;

        console.log('renderMap !', getParam('toggle_map_points', ''));

        const {mapChecked, geoLocation} = this.state;
        if (mapChecked) {

            const latitude = getParam('latitude', 37.78825);
            const longitude = getParam('longitude', -122.4324);

            return (
                <View style={{height: 200, margin: 10}}>
                    <Map saveLocation={this.saveLocation} geoLocation={{latitude, longitude}} editMode={true}/>
                </View>
            )
        }
    };

    render() {
        const {notify_at, mapChecked} = this.state;
        const {editMode} = this.props;
        return (
            <View style={styles.card}>
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
                <View style={{paddingLeft: 10, paddingRight:10, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{	fontWeight: 'bold'}}>Geolocation</Text>
                    <Switch  value={mapChecked} onValueChange={()=>this.switchMapCheckboox()}/>
                </View>
                <View style={{marginBottom: 10}}>
                    { this.renderMap() }
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10, marginTop: 0}}>
                    <Text style={{	fontWeight: 'bold'}}>Event time</Text>
                    <TouchableOpacity onPress={()=>this.switchDateTimePicker()}>
                        <Text >
                            {notify_at.toString().substring(0, 21)}
                            <Image source={RightChevron}/>
                        </Text>
                    </TouchableOpacity>
                    {/*<Button title="Choose date" onPress={this.switchDateTimePicker} />*/}
                    <DateTimePicker
                        isVisible={this.state.showDatepicker}
                        mode={'datetime'}
                        onConfirm={this.handleDatePicked}
                        onCancel={this.switchDateTimePicker}
                    />
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
                    {
                        editMode ?
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
                        </View>
                            :
                        <View style={{flexDirection: 'row', justifyContent: 'flex-end', width: '100%'}}>
                            <Button
                                onPress={this.onSubmit}
                                title="Add event"
                                color="#841584"
                                accessibilityLabel="Learn more about this purple button"
                            />
                        </View>
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