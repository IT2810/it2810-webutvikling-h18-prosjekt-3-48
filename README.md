# IT2810 - Project 3 - Group 48

## Install and Setup
Bare installer

## Tutorial

### React-native-maps
Biblioteket er en måte å bruke Google Maps eller Apple Maps i React Native. 
Man kan ‘embedde’ en map ved å bruke:
```jsx
<MapView
  region={this.state.region}
  onRegionChange={this.onRegionChange}
/>
```
Her er ‘region’ hvor på kartet man er, onRegionChange er en funksjon som blir kalt når ‘region’ forandrer seg.
Region kan foreksempel se ut som dette
```jsx
region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }
```

En kan også plassere ‘markers’ på kartet 
```jsx
<Marker
 coordinate={{latitude: 37.4444, longitude : -8.8888}}
 title={marker.title}
 description={marker.description}
/>
```
Her er ‘coordinate’ hvor på kartet ‘markeren’ blir plassert, ‘title’ er teksten som dukker opp når man trykker på ‘markeren’ og description er teksten som dukker opp under ‘title’. Det finnes også andre ‘props’ på marker elementet, som f.eks. ‘pinColor’ som bestemmer farger på ‘markeren’.

Man putter marker inne i ‘MapView’-elementet, slik som vises under.
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

Man kan finne mer dokumentasjon og informasjon om react-native-maps her.   
https://github.com/react-community/react-native-maps/


### Location 
For å finne lokasjonen til enheten med React Native kan man bruke en modul som finnes i Expo, Location. Denne har mange bruksområder, men i denne applikasjonen brukes den for å finne enhetens latitude og longitude. 
Dette gjøres helst asynkront og man bruker derfor en asynkron funksjon. Men først trenger man tillatelse for å bruke enhetens lokasjonsfunksjonalitet.
```js
let { status } = await Permissions.askAsync(Permissions.LOCATION);
```
Når man har den tillatelsen kan man finne enhetens lokasjon.
```js
let location = await Location.getCurrentPositionAsync({});
```
Til slutt ender man kanskje opp med en funskjon som ser noenlunde slik ut.
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
Inne i 'location' objectet finner man latitude og longitude her.
```js
location.coordinate // {latitude, longitude}
```

Man kan finne mer dokumentasjon og informasjon om 'Expo Location'-modulen her.   
https://docs.expo.io/versions/latest/sdk/location