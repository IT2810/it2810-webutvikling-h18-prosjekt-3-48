import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Map from '../components/Map';
import StorageManager from '../utility/StorageManager';

/*
  The Screen for viewing the map.
*/
export default class MapScreen extends React.Component {
 
  render() {
    return (
      <Map/>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
