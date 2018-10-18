import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import { AsyncStorage } from 'react-native';

export default class SearchScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            location: null,
            pointsOfInterest: []
        }
    }

    render() {
        if (false) {
            return (
                <View style={styles.container}>
                    <Text>Loading points of interest</Text>
                </View>
            );
        }
        //loc = Location.getCurrentPositionAsync({});
        return (
            <View style={styles.container}>
                <Text>SearchScreen</Text>
                <Button title='Get nearest' color="#841584" onPress={this.getNearestGeoPoints}></Button>
            </View>
        );
    }

    getLocation = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                location: 'Permission to access location was denied',
            });
        } else {
            this.setState({ hasLocationPermissions: true });
        }

        let res = await Location.getCurrentPositionAsync({});
        this.setState({ location: JSON.stringify(res) });
    };

    getNearestGeoPoints = async () => {
        //let loc = '37.7442,-119.5931,1000';
        let loc = '63.417261,10.404676,70';
        console.debug("button pressed");
        return fetch(`https://reverse.geocoder.api.here.com/6.2/reversegeocode.json?app_id=7M1fjsLrtDqtp4uXNxmL&app_code=oaBhRwHWhclh-48Wb1IcNw&mode=retrieveLandmarks&prox=${loc}`)
            .then(response => response.json())
            .then(json => {
                let formatted = []
                for (var i = 0; i < Object.keys(json.Response.View[0].Result).length; i++) {
                    let entry = json.Response.View[0].Result[i];
                    //console.debug(entry);
                    formatted.push({ index: i, name: entry.Location.Name, lat: entry.Location.DisplayPosition.Latitude, long: entry.Location.DisplayPosition.Longitude });
                    console.log(formatted[formatted.length - 1]);
                    this.setState({ pointsOfInterest: formatted });
                }
                this.storeData(formatted);
            })
            .catch(error => console.error(error));
    };

    storeData = async (list) => {
        try {
            await AsyncStorage.setItem('available', JSON.stringify(list));
        } catch (error) {
            //console.error("Could not store in async storage")
            console.error(error.message);
        }
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