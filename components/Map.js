import React from 'react';
import { MapView, Marker } from 'expo';

import { Constants, Location, Permissions } from 'expo';
import LocationManager from '../utility/LocationManager';
import StorageManager from '../utility/StorageManager';

/*
Component for a Map. Has the props 'markers'. 'markers' can be put in as a list of objects with the keys coordinate, title and description.

*/
export default class Map extends React.Component {
  constructor(props) {
    super(props);

    this.populated = false;
    this.located = false;

    this.populateMarkers = this.populateMarkers.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
    this.updateMarkers = this.updateMarkers.bind(this);
  }


  
  state = {
      markers: null,
      region: null,
      hasLocationPermissions: false,
      locationResult: null,
      locationCoords: {latitude: 0, longitude: 0},
  }

  onRegionChange(region) {
  this.setState({ region });
  }

  updateLocation(location) {
    if (this.located)
    {
      return;
    }
    this.located = true;

    this.setState({
      locationCoords: {latitude: location.coords.latitude, longitude: location.coords.longitude}, 
      region: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }
      });
    var sm = new StorageManager();
    sm.loadData(this.updateMarkers);
  }
  
  updateMarkers(err, result) {
    var res = JSON.parse(result);
    //console.log("res");
    //console.log(res);
    this.setState({markers: res});
  }

  componentDidMount() {
    var lcm = new LocationManager();
    var location = lcm.getLocation(this.updateLocation);
  }

  populateMarkers() {
    var markers = this.state.markers;

    if (markers == null || this.populated) {
      return;
    } else {
      console.log(markers);
    }
    console.log("populating markers");
    console.log(markers[0].title);
    console.log(markers[0]);
    this.populated = true;
    var keyIndex = 1;

    var mComps = markers.map(function (marker) {  
      keyIndex++;
      var coords = {latitude: marker.coordinate.lat, longitude : marker.coordinate.long};
      var title = marker.title;
      var description = marker.description;
      return <MapView.Marker key={keyIndex} coordinate={coords} title={title} description={description}/>;
    });
    console.log("ended shit, oh my god!");
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
        provider="google"
      >
        <MapView.Marker
          key={1}
          coordinate={this.state.locationCoords}
          title={"Current Location"}
          pinColor='#00FF00'
        />
        {this.populateMarkers()}
      </MapView>
    );
  }
}
