import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import PointList from '../components/PointList';

export default class ListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activePoints: null,
        }
    }

    componentDidMount() {
        // get active challenges from AsyncStorage
        this.getLocalPoints();
        // this is update rendering on tab change 
        this.subs = [
            this.props.navigation.addListener('didFocus', () => this.getLocalPoints()),
        ];
    }
    
    // this is update rendering on tab change 
    componentWillUnmount() {
        this.subs.forEach(sub => sub.remove());
    }

    // retrieves active challenges from AsyncStorage 
    getLocalPoints = async () => {
        AsyncStorage.getItem('POI:active').then((value) => {
            if (value != null) {
                this.setState({ activePoints: JSON.parse(value) });
            }
        });
    }

    // simple function to store json in async storage
    storeData = async (tag, list) => {
        try {
            await AsyncStorage.setItem(tag, JSON.stringify(list));
        } catch (error) {
            console.log(error);
        }
    }

    // marks the challenge as done and removes it from the active list
    check = async (pressed) => {
        let selectedPoint = pressed.item;
        let otherPoints = this.state.activePoints.filter(function (p) {
            return p.index !== selectedPoint.index
        });
        this.setState({
            activePoints: otherPoints,
        });
        this.storeData('POI:active', otherPoints);
        this.forceUpdate();
    }

    // removes a challenge from the active list and puts it back to the available list
    remove = async (pressed) => {
        let selectedPoint = pressed.item;
        let otherPoints = this.state.activePoints.filter(function (p) {
            return p.index !== selectedPoint.index
        });
        this.setState({
            activePoints: otherPoints,
        });
        this.storeData('POI:active', otherPoints);
        AsyncStorage.getItem('POI:available').then((value) => {
            var availablePoints = [];
            if (value != null) { // we only want to parse if value has data
                availablePoints = JSON.parse(value);
            }
            // we update the index as to not get conflicts later
            selectedPoint.index = Object.keys(availablePoints).length;
            // then add and update the async storage
            availablePoints.push(selectedPoint);
            this.storeData('POI:available', availablePoints);
        });
        this.forceUpdate();
    }

    render() {
        if (this.state.activePoints != null) {
            return (
                <PointList list={this.state.activePoints} 
                    add={{symbol:' ✔️ ', method:this.check}} 
                    remove={{symbol:' x ', method:this.remove}}
                />
            );
        } else {
            return (
                <View style={styles.container}>
                    <Text>No active challenges, you can find some in the search tab</Text>
                </View>
            );
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: 30,
        height: 30,
        backgroundColor: '#101010',
        borderWidth: 0,
        borderRadius: 5,
        marginLeft: 20,
        marginTop: 5
    }
});
