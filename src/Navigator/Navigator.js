import ToDosScreen from '../Screens/ToDos';
import Map from '../Screens/Map';
import React from 'react';
import {
    createBottomTabNavigator,
    createAppContainer
} from 'react-navigation';


import FAwesomeIcon from 'react-native-vector-icons/FontAwesome';


const RouteConfig = {
    ToDos: {
        screen: ToDosScreen,
        navigationOptions: () => ({
            tabBarIcon: ({ tintColor }) => (
                <FAwesomeIcon
                    name="sticky-note"
                    color={tintColor}
                    size={22}
                />
            ),
        }),
    },
    Map: {
        screen: Map,
        navigationOptions: () => ({
            tabBarIcon: ({ tintColor }) => (
                <FAwesomeIcon
                    name="map-marker"
                    color={tintColor}
                    size={22}
                />
            ),
        }),
    },
};

const BottomNavigatorConfig = {
    tabBarOptions: {
        activeTintColor: 'rgb(255,255,255)', //color when tab is active
        inactiveTintColor: 'rgb(89, 102, 139)',
        style: {
            backgroundColor: 'rgb(21, 31, 53)',
        },
        showLabel: false, // turn off tab labels
    },
};

const RootStack = createBottomTabNavigator(RouteConfig, BottomNavigatorConfig);

const AppNavigator = createAppContainer(RootStack);

export default AppNavigator;

