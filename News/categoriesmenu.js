const React = require('react');
const {
    StyleSheet,
    View,
    ListView,
    Dimensions,
    InteractionManager
} = require('react-native');
const { Component } = React;
var SGListView = require('react-native-sglistview');
import AppConfig from './appconfig'
import MenuCell from './menucell'

const styles = StyleSheet.create({
    menuContainer: {
        flex: 1,
        left: 0,
        right: 0,
        backgroundColor: "#2D2C31",
    },
    padding: {
        height: 20
    },
    paddingBottom: {
        paddingBottom: 2,
    }
});

module.exports = class Menu extends Component {
    constructor() {
        super();
        // Initial state
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            isHindi: false,
            selectedItem: AppConfig.default_category,
        };
    }
    static propTypes = {
        onItemSelected: React.PropTypes.func.isRequired,
        selectedItem: React.PropTypes.string.isRequired,
        isHindi: React.PropTypes.bool.isRequired,
    };

    shouldComponentUpdate = (nextProps, nextState) => {
        return true;
    }

    componentWillReceiveProps = (nextProps) => {
        // Load new data when the dataSource property changes.
        if (nextProps.isHindi != this.props.isHindi || nextProps.selectedItem != this.props.selectedItem) {
            this.setState(state => {
                isHindi = nextProps.isHindi,
                    selectedItem = nextProps.selectedItem
            }, () => {
                this.Fetch(AppConfig.menu_class_uid, (result) => {
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(this._menuData(result)),
                    });
                });
            });
        }
    }
    _menuData = function (data) {
        var res = [];
        if (data !== undefined
            && data.response !== undefined
            && data.response instanceof Array
            && data.response.length > 0) {
            if (this.props.isHindi) {

                res.push({
                    title: AppConfig.default_category_hindi,
                    uid: AppConfig.default_category
                })
            } else {
                res.push({
                    title: AppConfig.default_category,
                    uid: AppConfig.default_category
                })
            }

            data.response.forEach(function (item) {
                res.push(
                    {
                        title: item.title,
                        uid: item.uid
                    }
                )
            })
        }
        return res;
    }

    /**
      * Each Row Item
      */
    _renderRow = (item) => {
        let { title, uid } = item;
        return (
            <MenuCell title={title.toString()}
                selectedItem={this.props.selectedItem}
                uid={uid}
                onPress={() => {
                    this.props.onItemSelected(uid)
                }} />
        );
    }

    componentDidMount = () => {
        InteractionManager.runAfterInteractions(() => {

            this.Fetch(AppConfig.menu_class_uid, (result) => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this._menuData(result)),
                });
            });
        });
    }

    Fetch(type_uid, cb) {
        var Query = this.props.stack.ContentType('category').Query();
        if (this.props.isHindi == true) {
            Query
                .only(['title'])
                .includeCount()
                .language('hi-in')
                .toJSON()
                .find()
                .then(function success(result) {
                    if (result.length > 0 && result[0] != undefined && result[0].length > 0) {
                        cb({ success: true, response: result[0] });
                    } else {
                        cb({ success: false, errorMessage: errorMessage });
                    }
                }, function error(err) {
                    // err object
                    cb({ success: false, errorMessage: err });
                });
        } else {
            Query
                .only(['title'])
                .includeCount()
                .toJSON()
                .find()
                .then(function success(result) {
                    if (result.length > 0 && result[0] != undefined && result[0].length > 0) {
                        cb({ success: true, response: result[0] });
                    } else {
                        cb({ success: false, errorMessage: errorMessage });
                    }
                }, function error(err) {
                    // err object
                    cb({ success: false, errorMessage: err });
                });
        }
    }


    render() {
        return (
            <View style={[styles.menuContainer]}>
                <View style={styles.padding} />
                <SGListView
                    initialListSize={1}
                    stickyHeaderIndices={[]}
                    automaticallyAdjustContentInsets={false}
                    dataSource={this.state.dataSource}
                    onEndReachedThreshold={1}
                    pageSize={1}
                    scrollRenderAheadDistance={1}
                    renderRow={this._renderRow}
                    contentContainerStyle={styles.paddingBottom}
                />
            </View>
        );
    }
};
