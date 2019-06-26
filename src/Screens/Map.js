import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, View, Button, FlatList, Alert} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
type Props = {};


class Map extends Component<Props> {

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    region={{
                        latitude: 31.776685,
                        longitude: 35.234491,
                        latitudeDelta: 0.04,
                        longitudeDelta: 0.05,
                    }}
                >
                </MapView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerOld: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        paddingTop: 22,
        backgroundColor: '#EAEDF2',
    },
    container: {
        ...StyleSheet.absoluteFillObject,
        height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },

});

export default Map;
