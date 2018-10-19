import React from 'react';
import { StyleSheet, Text, View, Button, NetInfo, ActivityIndicator } from 'react-native';
import { Location, Permissions } from 'expo';
import { AsyncStorage } from 'react-native';

export default class SearchScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            errorMessage: null,
            location: null,
            pointsOfInterest: null,
        }
    }

    componentDidMount() {
        this.getLocationAsync();
    }

    getLocationAsync = async () => {
        this.setState({errorMessage: null, loading: true});
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
                loading: false,
            });
            return;
        }

        var loc = await Location.getCurrentPositionAsync({});
        this.setState({
            location: loc,
        });

        NetInfo.isConnected.fetch()
        .then(isConnected => {
            if (isConnected) {
                this.getNearestGeoPointsAsync();
            } else {
                AsyncStorage.getItem('POI:available').then((value) => {
                    this.setState({
                        pointsOfInterest: JSON.parse(value),
                        loading: false,
                    });
                });
            }
        })
        .catch(error => { this.setState({ errorMessage: error, loading: false, }) });
    };

    getNearestGeoPointsAsync = async () => {
        var {latitude, longitude, altitude } = await this.state.location.coords;
        return fetch(`https://reverse.geocoder.api.here.com/6.2/reversegeocode.json?app_id=7M1fjsLrtDqtp4uXNxmL&app_code=oaBhRwHWhclh-48Wb1IcNw&mode=retrieveLandmarks&prox=${latitude},${longitude},${altitude}`)
            .then(response => response.json())
            .then(json => {
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
                this.storeData(formatted);
            })
            .catch(error => this.setState({ errorMessage: error, loading: false }));
    };

    storeData = async (list) => {
        try {
            await AsyncStorage.setItem('POI:available', JSON.stringify(list));
        } catch (error) {
            this.setState({ errorMessage: error });
        }
    }

    refresh = () => {
        this.setState({
            errorMessage: null,
            location: null,
            pointsOfInterest: null,
            loading: true,
        });
        this.getLocationAsync();
    }

    render() {
        if (this.state.pointsOfInterest) {
            return (
                <View style={styles.container}>
                    <Text>SearchScreen</Text>
                    <Text>{JSON.stringify(this.state.pointsOfInterest)}</Text>
                    <Button title='Refresh' color="#3585ee" onPress={this.refresh}></Button>
                </View>
            );
        } else {
            var text = 'Loading location...';
            if (this.state.errorMessage) {
                text = this.state.errorMessage;
            } else if (this.state.location) {
                text = 'Loading points of interest...';
            }
            return (
                <View style={styles.container}>
                    <Text>{text}</Text>
                    <ActivityIndicator size="large" color="#1565ee" animating={this.state.loading}></ActivityIndicator>
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