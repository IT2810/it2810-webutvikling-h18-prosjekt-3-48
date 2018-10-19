import React from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { List } from 'react-native-elements';

// This components creates a list of points of interest, with optional buttons
export default class PointList extends React.PureComponent {

    render() {
        return (
            <List style={styles.list}>
                <FlatList
                    data={this.props.list}
                    renderItem={({ item }) => (
                        <View style={styles.container}>
                            <View style={styles.textContainer}>
                                <Text style={styles.title}>
                                    {item.title}
                                </Text>
                                <Text style={styles.desc}>
                                    {item.description}
                                </Text>
                                <Text style={styles.coords}>
                                    Lat: {item.coordinate.lat} Long: {item.coordinate.long}
                                </Text>
                            </View>
                            <View style={styles.buttonContainer}>
                                {this.props.add != null && (
                                    <Button
                                        title={this.props.add.symbol}
                                        color='green'
                                        onPress={() => this.props.add.method({ item })}
                                    />)}
                                {this.props.remove != null && (
                                    <Button
                                        title={this.props.remove.symbol}
                                        color='red'
                                        onPress={() => this.props.remove.method({ item })}
                                    />)}
                            </View>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </List>
        );
    }
}

const styles = StyleSheet.create({
    list: {
        height: '80%',
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
    },
    textContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 32,
    },
    desc: {
        color: '#666',
    },
    coords: {
        color: '#999',
        fontSize: 10,
    },
    buttonContainer: {
        padding: 10,
    },
});