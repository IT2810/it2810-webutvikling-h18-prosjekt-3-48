import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Map from '../components/Map';
import { AsyncStorage } from 'react-native';


export default class StorageManager {
    storeData = async (list) => {
        try {
            await AsyncStorage.setItem('POI:available', JSON.stringify(list));
        } catch (error) {
            this.setState({ errorMessage: error });
        }
    }
    loadData = async (callback) => {
        try {
            await AsyncStorage.getItem('POI:available', callback);
        } catch (error) {
            this.setState({ errorMessage: error });
        }
    }
}
