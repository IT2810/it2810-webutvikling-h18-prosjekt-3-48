import React from 'react';
import { StyleSheet, Text, View, Button, NetInfo, ActivityIndicator } from 'react-native';
import { Location, Permissions } from 'expo';
import { AsyncStorage } from 'react-native';

export default class SearchScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true, // this is used for the activity indicator
            errorMessage: null,
            location: null, // current location
            pointsOfInterest: null, //available points of interest nearby
        }
    }

    componentDidMount() {
        this.getLocationAsync();
    }

    getLocationAsync = async () => {
        //expo handles permission access for us 
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            // if we do not get access we cannot continue
            this.setState({
                errorMessage: 'Permission to access location was denied',
                loading: false,
            });
            return;
        }
        // if we get access we fetch the current location 
        var loc = await Location.getCurrentPositionAsync({});
        this.setState({
            location: loc,
        });

        // first we try to get the existing data from AsyncStorage
        AsyncStorage.getItem('POI:available').then((value) => {
            if (value) {
                // in the case where there is date we simply load it
                this.setState({
                    pointsOfInterest: JSON.parse(value),
                    loading: false,
                });
            } else {
                // if there is none then we check if the device has internet access
                NetInfo.isConnected.fetch()
                    .then(isConnected => {
                        if (isConnected) {
                            //if it does we fetch the POI data from the API
                            this.getNearestGeoPointsAsync();
                        } else {
                            // else we are out of luck
                            this.setState({
                                errorMessage: "No data in AsyncStorage :(\nconnect to internet to fetch points of interest",
                                loading: false,
                            });
                        }
                    })
                    .catch(error => {
                        this.setState({
                            errorMessage: error,
                            loading: false,
                        });
                    });
            }
        });
    }


    getNearestGeoPointsAsync = async () => {
        // unpack, we only care about lat, long and alt
        var { latitude, longitude, altitude } = await this.state.location.coords;
        // get data from geocoder API
        return fetch(`https://reverse.geocoder.api.here.com/6.2/reversegeocode.json?app_id=7M1fjsLrtDqtp4uXNxmL&app_code=oaBhRwHWhclh-48Wb1IcNw&mode=retrieveLandmarks&prox=${latitude},${longitude},${altitude}`)
            .then(response => response.json())
            .then(json => {
                // this is just to reformat the response, it contains a lot of data we don't use
                var formatted = []
                for (var i = 0; i < Object.keys(json.Response.View[0].Result).length; i++) {
                    let entry = json.Response.View[0].Result[i];
                    formatted.push(
                        {
                            index: i,
                            title: entry.Location.Name,
                            description: entry.Location.Address.Label,
                            coordinate: {
                                lat: entry.Location.DisplayPosition.Latitude,
                                long: entry.Location.DisplayPosition.Longitude
                            },
                        });
                    this.setState({
                        pointsOfInterest: formatted,
                        loading: false,
                    });
                }
                // each time we fetch data we also update AsyncStorage
                this.storeData('POI:available', formatted);
            })
            .catch(error => this.setState({ errorMessage: error, loading: false }));
    };

    storeData = async (tag, list) => {
        // simple function to store json in async storage
        try {
            await AsyncStorage.setItem(tag, JSON.stringify(list));
        } catch (error) {
            this.setState({ errorMessage: error });
        }
    }

    // moves a point from available to active
    addToActive = async (selectedPoint) => {
        selectedPoint = this.state.pointsOfInterest[0];
        // first we remove the selected point from the available list and update the async storage
        otherPoints = this.state.pointsOfInterest.filter(function (p) {
            return p.index !== selectedPoint.index
        });
        this.setState({
            pointsOfInterest: otherPoints,
        });
        this.storeData('POI:available', otherPoints);
        // then we need to get the active POIs and add this value
        AsyncStorage.getItem('POI:active').then((value) => {
            var activePoints = [];
            if (value != null) { // we only want to parse if value has data
                activePoints = JSON.parse(value);
            }
            console.log(activePoints);
            // we update the index as to not get conflicts later
            selectedPoint.index = Object.keys(activePoints).length;
            // then add and update the async storage
            activePoints.push(selectedPoint);
            this.storeData('POI:active', activePoints);
        });
        this.forceUpdate();
    }

    refresh = () => {
        // reset the state and fetch location and POI again
        this.setState({
            errorMessage: null,
            location: null,
            pointsOfInterest: null,
            loading: true,
        });
        this.getNearestGeoPointsAsync();
    }

    render() {
        // if we have POI in state we want to show them
        if (this.state.pointsOfInterest) {
            return (
                <View style={styles.container}>
                    <Text>SearchScreen</Text>
                    <Text>{JSON.stringify(this.state.pointsOfInterest)}</Text>
                    <Button title='Refresh' color="#3585ee" onPress={this.refresh}></Button>
                    <Button title='test' color="#3585ee" onPress={this.addToActive}></Button>
                </View>
            );
        } else {
            // else we are either loading or have an error
            // text var is to reduce the amount of return statements needed
            var text = 'Loading location...';
            if (this.state.errorMessage) {
                text = this.state.errorMessage;
            } else if (this.state.location) {
                text = 'Loading points of interest...';
            }
            // loading animation only plays if we are loading, button is disabled while loading
            return (
                <View style={styles.container}>
                    <Text>{text}</Text>
                    <ActivityIndicator size="large" color="#3585ee" animating={this.state.loading}></ActivityIndicator>
                    <Button title='Try again' disabled={this.state.loading} color="#3585ee" onPress={this.refresh}></Button>
                </View>
            );
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