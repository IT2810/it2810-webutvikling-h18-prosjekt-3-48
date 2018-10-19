import { Constants, Location, Permissions } from 'expo';


export default class LocationManager  {
  
  /*
    Returns the a location object from expo. Can also update the location in the component through a callback function.
  */
  getLocation = async (callback) => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      //What happens when permission has been denied.
    } 

    let location = await Location.getCurrentPositionAsync({});
    if (callback === undefined) {
      return location;
    }
    callback(location);
    
  };
}