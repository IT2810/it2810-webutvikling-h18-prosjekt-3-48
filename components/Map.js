import React from 'react';
import { MapView, Marker } from 'expo';
import LocationManager from '../utility/LocationManager';
import StorageManager from '../utility/StorageManager';

/*
  Component for a Map. Retrives possible points of interest from AsyncStorage. Also finds the current position of the user.
*/
export default class Map extends React.Component {
  constructor(props) {
    super(props);

    this.populateMarkers = this.populateMarkers.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
    this.updateMarkers = this.updateMarkers.bind(this);
  }


  /*
    The state variables of the component.
      - markers is the data of the current points of interest. An array of objects with the values title, description and coordinate.
        - title is the name displayed when clicking the marker
        - description is the text beneath the title.
        - coordinate is an object containing the latitude and longitude of the marker.
      - region is the current region / area displayed by the map.
      - locationCoords are the current coordinates of the user.
  */
  state = {
      markers: null,
      region: null,
      locationCoords: {latitude: 0, longitude: 0},
      populated: false,
  }

  /*
    Changes the state of the component when the region changes.
  */
  onRegionChange(region) {
  this.setState({ region });
  }

  /*
    Sets the location of the user on the map. Also loads the points of interest from 'AsyncStorage'. Used when the location of the user has been found.
  */
  updateLocation(location) {
    this.setState({
      locationCoords: {latitude: location.coords.latitude, longitude: location.coords.longitude}, 
      region: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }
    });

    //loads the markers from storage.
    var sm = new StorageManager();
    sm.loadData(this.updateMarkers);
  }
  
  /*
    Updates the marker data. Invoked after loading the points of interest from 'AsyncStorage'.
  */
  updateMarkers(err, result) {
    var res = JSON.parse(result);
    this.setState({markers: res});
  }

  /*
    Used by 'render()' to render the markers on the map.
  */
  populateMarkers() {
    var markers = this.state.markers;

    //Determines if there are markers to fill the map with.
    if (markers == null) {
      return;
    }

    var keyIndex = 1;

    //Dynamicaly generates the neccessary amount of markers.
    var mComps = markers.map(function (marker) {  
      keyIndex++;
      var coords = {latitude: marker.coordinate.lat, longitude : marker.coordinate.long};
      var title = marker.title;
      var description = marker.description;
      return <MapView.Marker key={keyIndex} coordinate={coords} title={title} description={description}/>;
    });
    
    return mComps;
  }

  componentDidMount() {
    var lcm = new LocationManager();
    var location = lcm.getLocation(this.updateLocation);
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
