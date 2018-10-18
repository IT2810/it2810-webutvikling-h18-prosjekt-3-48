import { Constants, Location, Permissions } from 'expo';


export default class LocationManager  {
  
  getLocation = async (component) => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      /*
      this.setState({
        locationResult: 'Permission to access location was denied',
      });*/
    } else {
      /*
      this.setState({ hasLocationPermissions: true });
      */
    }

    let location = await Location.getCurrentPositionAsync({});
    component.updateLocation(location);
  };
}