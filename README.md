# IT2810 - Project 3 - Group 48

## Install and Setup
Bare installer

## API og Libraries

### React-native-maps
This API is a way to use either Google maps or Apple maps within a React Native App. We used this library because it was the easiest way to include map functionality in our app. It is also easily accessible through Expo, no need to install a whole other bunch of things. Since the app showing the user's location in relation to their closest points of interest is an essential part of the app, the functionality offered by this library is considerer essential. 

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
