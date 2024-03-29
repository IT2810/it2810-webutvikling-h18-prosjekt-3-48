import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import MapScreen from './screens/MapScreen.js';
import ListScreen from './screens/ListScreen.js';
import SearchScreen from './screens/SearchScreen.js';
import Icon from 'react-native-vector-icons/Feather';

export default class App extends React.Component {
    render() {
        return (
            <BottomTabNavigator />
        );
    }
}

// creates a simple tab navigation menu
const BottomTabNavigator = createBottomTabNavigator(
    {
        Map: {
            screen: MapScreen,
            navigationOptions: {
                tabBarLabel: 'Map',
                tabBarIcon: ({tintColor}) => (
                    <Icon name="map" size={24} color={tintColor} />
                )
            }
        },
        List: {
            screen: ListScreen,
            navigationOptions: {
                tabBarLabel: 'List',
                tabBarIcon: ({tintColor}) => (
                    <Icon name="list" size={24} color={tintColor} />
                )
            }
        },
        Search: {
            screen: SearchScreen,
            navigationOptions: {
                tabBarLabel: 'Search',
                tabBarIcon: ({tintColor}) => (
                    <Icon name="search" size={24} color={tintColor} />
                )
            }
        }
    }
)
