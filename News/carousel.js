
'use strict';

/* Setup ==================================================================== */
import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native'
var Carousel = require('react-native-carousel');
import CacheableImage from 'react-native-cacheable-image'

var { width } = Dimensions.get('window');
import AppConfig from './appconfig'

import { darkgradient,placeholder } from './images';

/* Component ==================================================================== */
class ImageCarousel extends Component {
    static propTypes = {
                onBannerSelected: React.PropTypes.func.isRequired,
        data: React.PropTypes.array.isRequired
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        return true;
    }

    _images = () => {
        if (this.props.data.length > 0) {
            return this.props.data.map((obj) => {
                let {image, title, uid} = obj;
                return (
                    <TouchableOpacity style={styles.container} key={title} onPress={() => {
                    this.props.onBannerSelected(uid)
                }} activeOpacity={0.7}>
                        <CacheableImage style={styles.image} source={{ uri: image + ".jpg" }} defaultSource={placeholder} >
                        <Image source={darkgradient} style={styles.gradientimage}>
                            <Text numberOfLines={2} style={[styles.baseText, styles.listRow_text]}>{title}</Text>
                        </Image>
                        </CacheableImage>
                    </TouchableOpacity >
                )
        })
    } else {
    return (
        <View style={styles.container}>
        </View>
    )
}
    }

/**
  * RENDER
  */
render = () => {
    let data = this.props;
    return (
        <View style={styles.container}>
            <Carousel width={width} height={240} animate={true} loop={true} hideIndicators={true} delay={5000}>
                {this._images()}
            </Carousel>
        </View>
    )
}
}

/* Styles ==================================================================== */
const styles = StyleSheet.create({
    image: {
        backgroundColor: '#B8B4B8',
        width: width,
        height: 240,
    },
    baseText: {
        fontFamily: 'Verdana',
        fontSize: AppConfig.baseFontSize + 0.5,
        fontWeight: 'bold',
        color: "#fff",
    },
    listRow_text: {
        textAlign: 'left',
        left: 17,
        backgroundColor: 'transparent',
        maxWidth: width - 34,
        height: 30,
        position: 'absolute',
        bottom: 40,
    },
    gradientimage: {
        backgroundColor: 'transparent',
        width: width,
        height: 240,
    },
    container: {
        width: width,
        height: 220,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#333',
    },
});

/* Export Component ==================================================================== */
export default ImageCarousel