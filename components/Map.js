import React from 'react';
import { MapView, Marker } from 'expo';

import { Constants, Location, Permissions } from 'expo';


export default class Map extends React.Component {
  state = {
      region: null,
      hasLocationPermissions: false,
      locationResult: null,
      locationCoords: {latitude: 0, longitude: 0},
  }

  onRegionChange(region) {
  this.setState({ region });
  }

  componentDidMount() {
    this.getLocation();
  }

  getLocation = async () => {
   let { status } = await Permissions.askAsync(Permissions.LOCATION);
   if (status !== 'granted') {
     this.setState({
       locationResult: 'Permission to access location was denied',
     });
   } else {
     this.setState({ hasLocationPermissions: true });
   }

   let location = await Location.getCurrentPositionAsync({});
   this.setState({ locationResult: JSON.stringify(location) });
   
   this.setState({locationCoords: {latitude: location.coords.latitude, longitude: location.coords.longitude}})
   // Center the map on the location we just fetched.
    this.setState({region: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }});
  };

  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 60.928243699999996,
          longitude: 8.383486929952534,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        region={this.state.region}
        showPointsOfInterests={true}

        //onRegionChange={this.onRegionChange}
      >
        <MapView.Marker
          key={1}
          coordinate={this.state.locationCoords}
          title={"Me"}
          description={"This is where i am!"}
        />
      </MapView>
    );
  }
}