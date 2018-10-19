import React from 'react';
import { StyleSheet, Text, View, FlatList, AsyncStorage} from 'react-native';
import { List, ListItem,Button } from 'react-native-elements';



export default class ListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            data:[],
            checked:false,

        }
        press = () =>{
            this.setState((state) => ({
                checked: !state.checked,
            }));
        }
    }


    componentDidMount(){
        this.fetchDataRequest();
    }

    fetchDataRequest = () => {
        const json = [{"location": "Trondheim", "lat": "2", "long": "3", "index":"2"},{"location":"Bergen", "lat":"31", "long":"43", "index":"1"
        },{"location": "Oslo", "lat": "310", "long": "999", "index":"3"}];
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
                        subtitle={<View style={{flexDirection:'row', flexWrap:'wrap', alignItems:'center'}}>
                            <Text>
                                Latitude: {item.lat} Longitude: {item.long}
                            </Text>
                        <Button
                            buttonStyle={styles.button}
                            title="Mark as done"
                            onPress={this.press}
                        />
                        <Button
                            buttonStyle={styles.button}
                            title="Remove"
                            onPress={this.press}
                        /></View>}
                    />)}
                keyExtractor={item => item.index}
            />
        </List>
    );
}}


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
        borderWidth:0,
        borderRadius:5,
        marginLeft: 20,
        marginTop:5

    }
});
