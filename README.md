# IT2810 - Project 3 - Group 48

## The App
We've created an application which is a challenge app to visit certain points of interest which are displayed on a map. You also have the oppurtunity to find points of interest nearby using the search functionality. The available points can be added to a list to mark them as "active" and create a challenge. You can then see your available challenges and remove them and also mark them as done.

## Install and Setup
To install the required libaries and start the project, use these scripts:
```bs
npm install 
npm install expo-cli --global
expo start
```

## API og Libraries

### React-navigation

We used react navigation to get a simple tab navigation for our app. This library makes it really simple to create tabs. Later on we realized that this tab view does not follow the standard lifecycle for updating the state. (`componenetDidMount()` does not fire when switching tabs). So we had to add some event listeners to make sure we update the apps state properly when switching tabs.

### Search / Point of interest API

To get the nearby points of interest we simply send a fetch request to [Here's geocoding api](https://developer.here.com/documentation/geocoder/topics/what-is.html) It is a really nice api you can use for free. It takes in a standard GET request and returns data in json format. The API call we used was:
```
https://reverse.geocoder.api.here.com/6.2/reversegeocode.json
  ?app_id={YOUR_APP_ID}
  &app_code={YOUR_APP_CODE}
  &mode=retrieveLandmarks
  &prox={lat},{long},{alt}
```

### React-native-maps
This API is a way to use either Google maps or Apple maps within a React Native App. We used this library because it was the easiest way to include map functionality in our app. It is also easily accessible through Expo, no need to install a whole other bunch of things. Since the app showing the user's location in relation to their closest points of interest is an essential part of the app, the functionality offered by this library is considered essential.

The map can easily be embedded into the app with this code.
```jsx
<MapView
  region={this.state.region}
  onRegionChange={this.onRegionChange}
/>
```
'Region' is the area the map is going to display. 'onRegionChange' is the function that will be called when the region changes. 
The inside of the 'region' object could look like this.
```jsx
region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }
```
Markers can also be placed onto the map. These can be clicked on to reveal more information. 
```jsx
<Marker
 coordinate={{latitude: 37.4444, longitude : -8.8888}}
 title={marker.title}
 description={marker.description}
/>
```
The 'coordinate' prop contains information about where on the map the marker appears, this is described in latitude and longitude. The 'title' prop is the text that appears when someone clicks the marker. 'description' is what appears underneath the 'title' prop. There also exists other props in the Marker element, one of them is the 'pinColor' prop, which determines the color of the prop.

The Marker element is put within the Mapview element, just like in the code bellow.
```jsx
<MapView
  region={this.state.region}
  onRegionChange={this.onRegionChange}
>
 <Marker
  coordinate={{latitude: 37.4444, longitude : -8.8888}}
  title={marker.title}
  description={marker.description}
 />
</Mapview>
```

More documentation and information about the react-native-maps library exists in the link below.   
https://github.com/react-community/react-native-maps/


### Location 
In order to find the location of the user the Expo Location module is used. This module has multiple areas of use, but in this app it is only used to find the latitude and the longtitude of the user's location. Because this module is included within Expo it was a simple choice to use this when considering what to use. Since both the map functionality and finding the user's nearest points of interest is  a core part of the app's functionality, this module is an important part of the app.

This functionality is usually done asynchronously, and therefore we're using an asynchronous function. But in order to find the location of the user, we'll first need the user's permission.
```js
let { status } = await Permissions.askAsync(Permissions.LOCATION);
```
When we have the user's permission one can find their location. 
```js
let location = await Location.getCurrentPositionAsync({});
```
In the end one will maybe end up with a function looking something like this. 
```js
getLocation = async (callback) => {
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== 'granted') {
    //What happens when permission has been denied.
  }
  let location = await Location.getCurrentPositionAsync({});
  if (callback === undefined) {
    return location;
  }//sends the data to the callback function
  callback(location);
};
```
Inside the location object we can find the latitude and longitude here.
```js
location.coordinate // {latitude, longitude}
```

More documentation and information about the Expo Location module exists in the link below.   
https://docs.expo.io/versions/latest/sdk/location

### FlatList component
To display all our active and available challenges we decided to use the FlatList component. FlatList offered what we needed, which is simply to display data in a list and have buttons attached to every list item. FlatList requires two props: data and renderItem. The data field is simply an array of whatever relevant data you wish to display and the renderItem field is a function which takes an item from the data field and renders it into the list. It is also recommended to have a keyExtractor-field, simply to have something to separate all the items in the list from eachother.

## Testing

### JEST
To test this application we used the JEST-framework for the testing. To start, install the framework by using this script:
```bs
npm install --save-dev jest
```
After installing the framework, you have to create a folder named \_\_tests\_\_ and put all the tests there and have the names of the testfiles end with 'test.js'. 
We tested our application by testing each component we used, using Snapshot tests. The JEST-framework then created a snapshot of the application when the test is runned, and the snapshot is saved inside the \_\_tests\_\_ folder. The snapshot consists of the application in a JSON-object form and you can test if the application renders correctly. This is how we decided to test the application, simply because we didn't see the need to test the frameworks and API used. Much of the logic is based on the APIs we used so the only thing to really test was if the components rendered properly. We did this by using a renderer from the react-test-renderer library and create a component and see if it matches the snapshot.
```jsx
import renderer from 'react-test-renderer';
import App from '../../App.js';
```
the function we used in all of our tests, except the imports and the type of tag used in the renderer.create method.
```jsx
it('renders correctly', () => {
    const tree = renderer.create(<App>Snapshot test</App>).toJSON();
    expect(tree).toMatchSnapshot();
});
```
The testing didn't go as planned though. The tests were written correctly but wouldn't run on our PCs, due to errors within the framework and some unicode issues within the frameworks' files. Since we only planned to test if the components were rendered correctly, we didn't see the need in using too much resources on solving these issues. We have included the tests we wrote, but the \_\_tests\_\_ folder is incomplete since we never got to create any snapshots due to our issues with the framework.  

