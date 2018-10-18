import React from 'react';
import { MapView, Marker } from 'expo';

import { Constants, Location, Permissions } from 'expo';
import LocationManager from '../utility/LocationManager'

/*
Component for a Map. Has the props 'markers'. 'markers' can be put in as a list of objects with the keys coordinate, title and description.

*/
export default class Map extends React.Component {
  constructor(props) {
    super(props);

    this.populateMarkers = this.populateMarkers.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
  }

  state = {
      region: null,
      hasLocationPermissions: false,
      locationResult: null,
      locationCoords: {latitude: 0, longitude: 0},
  }

  onRegionChange(region) {
  this.setState({ region });
  }

  updateLocation(location) {
    this.setState({locationCoords: {latitude: location.coords.latitude, longitude: location.coords.longitude}});
    this.setState({region: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }});
  }

  componentDidMount() {
    var lcm = new LocationManager();
    var location = lcm.getLocation(this);
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

  populateMarkers() {

    var markers = this.props.markers;
    var keyIndex = 1;

    console.log("poop");
    var mComps = markers.map(function (marker) {
      keyIndex++;
      
      var coords = marker.coordinate;
      var title = marker.title;
      var description = marker.description;

      console.log(title);

      return <MapView.Marker key={keyIndex} coordinate={coords} title={title} description={description}/>;
    });

    return mComps;
  }

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
          title={"Me!"}
          description={"This is where i am!"}
        />
        {this.populateMarkers()}
      </MapView>
    );
  }
}
