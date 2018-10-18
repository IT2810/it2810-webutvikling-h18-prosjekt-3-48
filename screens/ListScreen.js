import React from 'react';
import { StyleSheet, Text, View, FlatList, AsyncStorage } from 'react-native';
import { List, ListItem} from 'react-native-elements';



export default class ListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            data:[]

        };


    }
    componentDidMount(){
        this.fetchDataRequest()
    }

    fetchDataRequest = () => {
        const json = [{"location": "Trondheim", "lat": "2", "long": "3", "index":"2"},{"location":"Bergen", "lat":"31", "long":"43", "index":"1"}];
        this.setState({data:json});
    }

    render() {
        return (
            <List style={styles.container}>
                <FlatList
                    data={this.state.data}
                    renderItem={({item}) => (
                        <ListItem
                            title={item.location}
                            subtitle={item.lat}

                        />
                    ) }
                    keyExtractor={item => item.index}
                />
            </List>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
