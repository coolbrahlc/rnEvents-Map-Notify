import {StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Button, Switch} from "react-native";
import React, {Component} from 'react';
import Map from "../Screens/Map";
import DateTimePicker from "react-native-modal-datetime-picker";
import {inject, observer} from "mobx-react";
import RightChevron from '../Images/baseline_chevron_right_black_18dp.png'
import moment from 'moment'
import { showToast } from '../Utils/ShowToast';
const LIGHT_GRAY = "#D3D3D3";

@inject('listStore')
//@inject('notif')
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
        const {listStore, navigation:{goBack}} = this.props;
        const {name, geoLocation:{latitude, longitude}, description, notify_at, mapChecked} = this.state;
        if (name.length === 0) {
            return showToast('Name can not be empty');
        }
        listStore.addListItem({
            name,
            description,
            latitude,
            longitude,
            notify_at,
            toggle_map_points: mapChecked,
            created_at: new Date(),
        });
        // this.setState({
        //     name:'',
        //     description: '',
        //     geoLocation: {},
        //     notify_at: new Date(),
        //     mapChecked: false,
        // });
        goBack();
    };

    edit = () => {
        const {name, mapChecked, description, geoLocation:{latitude, longitude}, notify_at} = this.state;
        const {listStore, navigation:{getParam, goBack}} = this.props;
        if (name.length === 0) {
            return showToast('Name can not be empty');
        }
        let reschedule = false;
        if (getParam('notify_at', new Date()) !== notify_at) {
            reschedule = true
        }
        const id = getParam('id');
        listStore.editListItem(reschedule, id, {
            id,
            name,
            description,
            latitude,
            longitude,
            notify_at,
            toggle_map_points:mapChecked
        });
        goBack();
    };

    renderMap = () => {
        const {getParam} = this.props.navigation;
        const {mapChecked} = this.state;
        if (mapChecked) {
            const haveGeo = getParam('toggle_map_points', false);
            const latitude = getParam('latitude');
            const longitude = getParam('longitude');
            return (
                <View style={{height: 200, margin: 10}}>
                    <Map saveLocation={this.saveLocation} geoLocation={{latitude, longitude}} haveGeo={haveGeo} editMode={true}/>
                </View>
            )
        }
    };

    render() {
        const {notify_at, mapChecked, showDatepicker} = this.state;
        const {editMode} = this.props;
        console.log(new Date(notify_at))
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
                            { moment(notify_at).format('MMMM Do YYYY, H:mm') }
                            <Image source={RightChevron}/>
                        </Text>
                    </TouchableOpacity>
                    <DateTimePicker
                        isVisible={showDatepicker}
                        mode={'datetime'}
                        onConfirm={this.handleDatePicked}
                        onCancel={this.switchDateTimePicker}
                        date={new Date(notify_at)}
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
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                            <Button
                                onPress={() => this.props.navigation.goBack()}
                                title="Dismiss"
                            />
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
