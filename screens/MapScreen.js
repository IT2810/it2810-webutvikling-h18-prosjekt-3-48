import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Map from '../components/Map'

export default class MapScreen extends React.Component {
    constructor(props)
    {
        super(props);

        this.markers =[
        {
            coordinate: {latitude: 63.41809226569999, longitude: 10.406053585173026},
            title: "Testitude",
            description: "desc desc test",
         },
         {
            coordinate: {latitude: 63.42776925527186, longitude: 10.36253742611541},
            title: "Testitude1",
            description: "desc desc test",
         },
         {
            coordinate: {latitude: 63.41586455953235, longitude: 10.377901119352714},
            title: "Testitude3",
            description: "desc desc test",
         },
       ];

    }
    
    render() {
        return (
          <Map markers={this.markers}/>
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
