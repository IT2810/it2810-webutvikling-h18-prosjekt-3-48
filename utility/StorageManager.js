import { AsyncStorage } from 'react-native';

/*
  Class used for loading and storing data in 'AsyncStorage'.
*/
export default class StorageManager {

  /*
    Stores the data specified in the parameter in Asynchronous Storage.
  */
  storeData = async (tag, data) => {
    try {
      await AsyncStorage.setItem(tag, JSON.stringify(data));
    } catch (error) {
      this.setState({ errorMessage: error });
    }
  }

  /*
    Loads the data specified in the parameter in Asynchronous Storage. The data is sent to the callback function as a parameter.
  */
  loadData = async (tag, callback) => {
    try {
      await AsyncStorage.getItem(tag, callback);
    } catch (error) {
      this.setState({ errorMessage: error });
    }
  }
}
