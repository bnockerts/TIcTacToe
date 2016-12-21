import React, {Component} from 'react';
import {
    AppRegistry,
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

export default function Square(props) {
    return (
        <TouchableOpacity
            onPress={() => props.onClick()}
            style={styles.button}>
            <Text style={styles.text}>{props.value}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: .5,
        height: 75,
        maxWidth: 75,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 32
    }
});

AppRegistry.registerComponent('Square', () => Square);
