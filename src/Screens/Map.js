import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    SafeAreaView,
    TouchableOpacity,
    Alert,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import locationMarker from '../Images/google-maps-marker-for-residencelamontagne.svg.hi.png'
import {inject, observer} from "mobx-react";
const latitudeDelta = 0.025;
const longitudeDelta = 0.025;


@inject('listStore')
@observer
class Map extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta,
                longitudeDelta
            },
        };
    }
    onRegionChange = (region) => {
        this.setState({ region });
    };

    saveGeoLocation = () =>{
        const {setModalVisible, saveLocation} = this.props;
        saveLocation(this.state.region);
        setModalVisible();
    };

    renderMapView= () =>{
        const {editMode, listStore} = this.props;
        //console.log(listStore);
        const {latitude, longitude} = this.state.region;
        if (editMode) {
            return (
                <View style={styles.container}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        region={this.state.region}
                        onRegionChangeComplete={this.onRegionChange}
                    >
                    </MapView>
                    <View style={styles.markerFixed}>
                        <Image style={styles.marker} source={locationMarker} />
                    </View>
                    <SafeAreaView style={styles.footer}>
                        <TouchableOpacity onPress={() => this.saveGeoLocation()}>
                            <Text style={styles.region}>Save geo</Text>
                        </TouchableOpacity>
                        <Text style={styles.regionCoordinates}>({latitude}, {longitude})</Text>
                    </SafeAreaView>
                </View>
            )
        } else {
            const markers = [...listStore.list];
            const filtered = markers.filter(item=> item.geoLocation !== null);
            return (
                <View style={styles.container}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        region={this.state.region}
                        onRegionChangeComplete={this.onRegionChange}
                    >
                        {filtered.map((item, index) => (
                            <View>
                                <Marker
                                    onPress={()=>Alert.alert('123')}
                                    coordinate={item.geoLocation}
                                    title={item.name}
                                    description={item.name}
                                />
                            </View>

                        ))}
                    </MapView>
                </View>
            )
        }

    };

    render() {
        return this.renderMapView()
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    markerFixed: {
        left: '50%',
        marginLeft: -10,
        marginTop: -20,
        position: 'absolute',
        top: '50%'
    },
    marker: {
        flex: 1,
        width: 50,
        height: 50,
        resizeMode: 'contain'
    },
    footer: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        bottom: 0,
        position: 'absolute',
        width: '100%'
    },
    region: {
        fontSize: 18,
        color: '#fff',
        lineHeight: 20,
        margin: 10
    },
    regionCoordinates: {
        color: '#fff',
        lineHeight: 20,
        margin: 10
    },
});

export default Map;
