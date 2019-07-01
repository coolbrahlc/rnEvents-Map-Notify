import ToDosScreen from '../Screens/ToDos';
import Map from '../Screens/Map';
import EditModal from '../Components/EditModal';
import transitionConfig from '../Utils/TransitionModal';
import React from 'react';
import {
    createBottomTabNavigator,
    createAppContainer,
    createStackNavigator
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

const MainStack = createBottomTabNavigator(RouteConfig, BottomNavigatorConfig);

const RootStack = createStackNavigator(
    {
        Main: {
            screen: MainStack,
        },
        EditModal: {
            screen: EditModal,
        },
    },
    {
        mode: 'modal',
        headerMode: 'none',
        //transparentCard: true,
        //transitionConfig,
    }
);


const AppNavigator = createAppContainer(RootStack);

export default AppNavigator;

