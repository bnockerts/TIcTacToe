import React, {Component} from 'react';
import {
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

function Square({value, onClick}) {
    return (
        <TouchableOpacity
            onPress={() => onClick()}
            style={styles.button}
        >
            <Text style={styles.text}>{value}</Text>
        </TouchableOpacity>
    );
}

Square.propTypes = {
    value: React.PropTypes.string,
    onClick: React.PropTypes.func
};

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

export default Square;
