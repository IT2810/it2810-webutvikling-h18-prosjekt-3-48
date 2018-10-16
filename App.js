import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import MapScreen from './screens/MapScreen.js';
import ListScreen from './screens/ListScreen.js';
import SearchScreen from './screens/SearchScreen.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class App extends React.Component {
    render() {
        return (
            <BottomTabNavigator />
        );
    }
}

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
                    <Icon name="format-list-bulleted" size={24} color={tintColor} />
                )
            }
        },
        Search: {
            screen: SearchScreen,
            navigationOptions: {
                tabBarLabel: 'Search',
                tabBarIcon: ({tintColor}) => (
                    <Icon name="map-marker-plus" size={24} color={tintColor} />
                )
            }
        }
    }
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
