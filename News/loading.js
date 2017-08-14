/* Setup ==================================================================== */
import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
} from 'react-native'
import { Bars } from 'react-native-loader';
import AppConfig from './appconfig'

class Loading extends Component {
    static componentName = 'Loading';
    constructor(props) {
        super(props);

    }

    /**
    * RENDER
    */
    render = () => {
        return (
            <View style={[styles.splashbackground]}>
                <Text style={{ color: "#FFF" }}>Loading...</Text>
                <Bars size={20} color="#FFF" />
            </View>
        );
    }
}


/* Styles ==================================================================== */
const styles = StyleSheet.create({
    splashbackground: {
        backgroundColor: AppConfig.primary_color,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    left: 0,
    right: 0,
    },
});

/* Export Component ==================================================================== */
export default Loading