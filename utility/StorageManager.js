import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Map from '../components/Map';
import { AsyncStorage } from 'react-native';

/*
  Class used for loading and storing data in 'AsyncStorage'.
*/
export default class StorageManager {

  /*
    Stores the data specified in the parameter in Asynchronous Storage.
  */
  storeData = async (data) => {
    try {
      await AsyncStorage.setItem('POI:available', JSON.stringify(data));
    } catch (error) {
      this.setState({ errorMessage: error });
    }
  }

  /*
    Loads the data specified in the parameter in Asynchronous Storage. The data is sent to the callback function as a parameter.
  */
  loadData = async (callback) => {
    try {
      await AsyncStorage.getItem('POI:available', callback);
    } catch (error) {
      this.setState({ errorMessage: error });
    }
  }
}
