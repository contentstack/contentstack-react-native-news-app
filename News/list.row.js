
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
import { ListItem } from 'native-base';
import AppConfig from './appconfig'
var { width, height } = Dimensions.get('window');
import CacheableImage from 'react-native-cacheable-image'
import { placeholder } from './images';

/* Component ==================================================================== */
class ListRow extends ListItem {
    static propTypes = {
        onPress: React.PropTypes.func.isRequired,
        title: React.PropTypes.string.isRequired,
        thumbnail: React.PropTypes.string.isRequired,
        category: React.PropTypes.string.isRequired,
        updated_at: React.PropTypes.string.isRequired
    }

    static defaultProps = {
        title: "React.PropTypes.string.isRequired",
        thumbnail: "React.PropTypes.string.isRequired",
        category: "React.PropTypes.string.isRequired",
        updated_at: "React.PropTypes.string.isRequired"
    }

    /**
      * RENDER
      */

    render = () => {
        let { title, category, thumbnail, onPress, updated_at } = this.props;
        return (
            <TouchableOpacity style={[styles.listRow]} onPress={onPress} activeOpacity={0.7}>
                <View style={styles.listRowInner}>
                    <CacheableImage style={styles.image}  source={{ uri: thumbnail+".jpg" }} defaultSource={placeholder}/>
                    <View style={[styles.sidePanel]}>
                        <Text numberOfLines={2} style={[styles.baseText, styles.listRow_text]}>{title}</Text>
                        <View style={styles.bottomView}>
                            <Text style={[styles.subTitleText]}>{category}</Text>
                            <Text style={[styles.subTitleText]}>{"  •  "}</Text>
                            <Text style={[styles.subTitleText]}>{updated_at}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

/* Styles ==================================================================== */
const styles = StyleSheet.create({
    baseText: {
        fontFamily: 'Verdana',
        fontSize: AppConfig.baseFontSize,
        fontWeight: 'bold',
        color: AppConfig.textColor,
    },
    subTitleText: {
        color: AppConfig.subtitleTextColor,
        fontSize: AppConfig.subTitleFontSize,
    },
    listRow: {
        left: 0,
        right: 0,
        height: 83,
        backgroundColor: "#f5f5f7",
        alignSelf: 'flex-start',

    },
    listRowInner: {
        left: 10,
        right: 5,
        maxWidth: width - 20,
        height: 65,
        top: 16,
        backgroundColor: '#f5f5f7',
        flexDirection: 'row'

    },
    image: {
        height: 65,
        width: 65,
        top: 0,
        left: 7,
        backgroundColor: '#B8B4B8'
    },
    sidePanel: {
        height: 65,
        width: width - 105,
        top: 0,
        left: 20,
        backgroundColor: '#f5f5f7',
        flexDirection: 'column',
    },
    bottomView: {
        bottom: 0,
        top: 7,
        backgroundColor: '#f5f5f7',
        flexDirection: 'row',
        maxWidth: width - 85,
        height: 20
    },
    listRow_text: {
        color: "#333",
        textAlign: 'left',
        fontWeight: '500',
        backgroundColor: '#f5f5f7',
        maxWidth: width - 85,
        height: 35,
    },
    rightAlign: { position: 'absolute', right: 10, top: 0 },
    listRow_description: {
        color: "#666",
        textAlign: 'left',
        fontWeight: '500',
        backgroundColor: 'transparent',
        maxWidth: width,
    },
    listRowImage_text: {
        color: "#f5f5f7",
    },

    // With Image
    imageBackground: {
        backgroundColor: "#333",
    },
});

/* Export Component ==================================================================== */
export default ListRow