import React from 'react';
import { AsyncStorage } from 'react-native';
import Map from '../components/Map';

// The Screen for viewing the map.
export default class MapScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeList: null,
    }
  }

  componentDidMount() {
    // fetch the current challenges
    this.getActiveList();
    // this is to handle updates when changing tabs
    this.subs = [
      this.props.navigation.addListener('didFocus', () => this.getActiveList()),
    ];
  }

  // this is to handle updates when changing tabs
  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove());
  }

  // retrieves challenges from AsyncStorage
  getActiveList = async () => {
    AsyncStorage.getItem('POI:active').then((value) => {
      if (value != null) {
        this.setState({ activeList: JSON.parse(value) });
      }
    });
  }

  render() {
    return (
      <Map markers={this.state.activeList} />
    );
  }
}
