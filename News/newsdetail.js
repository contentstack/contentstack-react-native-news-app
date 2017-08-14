/* Setup ==================================================================== */
import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions,
    ScrollView,
    ActivityIndicator,
    InteractionManager
} from 'react-native'
import { Bars } from 'react-native-loader';
import AppConfig from './appconfig'
var HTMLView = require('react-native-htmlview')
import CacheableImage from 'react-native-cacheable-image'

var { width, height } = Dimensions.get('window');
import { darkgradient, placeholder } from './images';

class NewsDetail extends Component {
    static componentName = 'NewsDetail';
    constructor(props) {
        super(props);
        this.state = {
            showLoading: true,
            featured_image: "",
            title: "",
            body: "",
            category: "",
            updated_at: "",
        }
    }

    _data = function (d) {
        if (d.response != undefined) {
            var monthNames = [
                "Jan", "Feb", "Mar",
                "Apr", "May", "Jun", "Jul",
                "Aug", "Sept", "Oct",
                "Nov", "Dec"
            ];
            if (d !== undefined) {
                var date = new Date(d.response.updated_at);
                var formattedDate = monthNames[date.getMonth()] + " " + date.getDay() + ", " + date.getFullYear();
                this.setState({
                    featured_image: d.response.featured_image.url,
                    title: d.response.title,
                    body: d.response.body,
                    category: d.response.category[0].title,
                    updated_at: formattedDate,
                });
            }
        }
    }

    Fetch(uid, cb) {
        var Query = this.props.stack.ContentType('news').Entry(uid);
        if (this.props.isHindi) {
            Query.only(['title', 'body','category', 'thumbnail', 'updated_at', 'top_news', 'featured_image'])
                .language('hi-in')
                .includeReference('category')
                .toJSON()
                .fetch()
                .then(function success(result) {
                    cb({ success: result.success, response: result });
                }, function error(err) {
                    // err object
                    cb({ success: false, errorMessage: err });
                });
        } else {
            Query.only(['title', 'body','category', 'thumbnail', 'updated_at', 'top_news', 'featured_image'])
                .includeReference('category')
                .toJSON()
                .fetch()
                .then(function success(result) {
                    cb({ success: result.success, response: result });
                }, function error(err) {
                    // err object
                    cb({ success: false, errorMessage: err });
                });
         
        }
    }


    static propTypes = {
        navigator: React.PropTypes.object.isRequired,
        uid: React.PropTypes.string.isRequired,
        isHindi: React.PropTypes.bool.isRequired
    }

    componentDidMount = () => {
        InteractionManager.runAfterInteractions(() => {
            let uid = this.props.uid;
            this.Fetch(uid, (result) => {
                this._data(result);
            });
        });
    }

    /**
    * RENDER
    */
    render = () => {
        if (this.state.featured_image.length > 0) {
            return (
                <View style={[styles.container]} navigationBarHidden={false}>
                    <ScrollView>
                        <CacheableImage style={styles.image} source={{ uri: this.state.featured_image + ".jpg" }} defaultSource={placeholder} >
                            <Image source={darkgradient} style={styles.gradientimage}>
                                <Text numberOfLines={2} style={[styles.baseText, styles.listRow_text]}>{this.state.title}</Text>
                            </Image>
                        </CacheableImage>
                        <View style={styles.bottomView}>
                            <Text style={[styles.baseText, styles.subTitleText]}>{this.state.category}</Text>
                            <Text style={[styles.baseText, styles.subTitleText]}>{"  •  "}</Text>
                            <Text style={[styles.baseText, styles.subTitleText]}>{this.state.updated_at}</Text>
                        </View>
                        <View style={styles.body}>
                            <HTMLView stylesheet={htmlstyles} value={this.state.body} />
                        </View>
                        <View style={styles.bottomPadding}>
                        </View>
                    </ScrollView>
                </View >
            );
        } else {
            return (
                <View style={styles.loadingBackground}>
                    <Bars size={20} />
                </View>
            );
        }
    }
}
const htmlstyles = StyleSheet.create({
    p: {
        left: 10,
        width: width - 20,
        color: '#333',
    },
});
/* Styles ==================================================================== */
const styles = StyleSheet.create({
    image: {
        backgroundColor: '#B8B4B8',
        width: width,
        height: 220,
    },
    body: {
        top: 17,
        left: 17,
        width: width - 34,
    },
    loadingBackground: {
        backgroundColor: "#f5f5f7",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        left: 0,
        right: 0,
    },
    container: {
        position: 'relative',
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#f5f5f7',
    },
    bottomView: {
        backgroundColor: '#f5f5f7',
        flexDirection: 'row',
        maxWidth: width - 34,
        height: 35,
        left: 17,
        top: 16,
    },
    baseText: {
        fontFamily: 'Verdana',
        fontSize: AppConfig.baseFontSize,
        fontWeight: 'bold',
        color: AppConfig.textColor,
    },
    listRow_text: {
        textAlign: 'left',
        left: 17,
        backgroundColor: 'transparent',
        maxWidth: width - 34,
        height: 30,
        position: 'absolute',
        bottom: 40,
        color: "#fff",

    },
    bottomPadding: {
        height: 20,
    },
    gradientimage: {
        backgroundColor: 'transparent',
        width: width,
        height: 240,
    },
    subTitleText: {
        fontSize: 10,
        color: AppConfig.textColor,
    },
});

/* Export Component ==================================================================== */
export default NewsDetail