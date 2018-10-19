import { Constants, Location, Permissions } from 'expo';

/*
  A class for managing the location of the user.
*/
export default class LocationManager  {
  
  /*
    Returns the a location object from expo. Returns the location through a callback function.
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