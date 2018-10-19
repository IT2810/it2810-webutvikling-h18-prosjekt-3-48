import React from 'react';
import { StyleSheet, Text, View, FlatList, AsyncStorage} from 'react-native';
import { List, ListItem,Button } from 'react-native-elements';



export default class ListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            checked: false,

        }
        press = () => {
            this.setState((state) => ({
                checked: !state.checked,
            }));
        }

    }



    getLocalPoints = async  () => {
     AsyncStorage.getItem('POI: active').then((value) => {
         var active=[];
         if(value != null) {
             active = JSON.parse(value);
             this.setState({data: active});
         }
         console.log(active);
     });
    }


    render() {

        return (
            <List style={styles.container}>
                <FlatList
                    data={this.state.data}
                    renderItem={({item}) => (
                        <ListItem
                            title={item.description}
                            subtitle={<View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center'}}>
                                <Text>
                                    Latitude: {item.coordinate.lat} Longitude: {item.coordinate.long}
                                    {item.description}
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
        borderWidth:0,
        borderRadius:5,
        marginLeft: 20,
        marginTop:5

    }
});
