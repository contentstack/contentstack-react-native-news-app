
'use strict';

/* Setup ==================================================================== */
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  ListView,
  Dimensions,
  ActivityIndicator,
  InteractionManager
} from 'react-native'
import AppConfig from './appconfig'

// Components
import ListRow from './list.row'
import ImageCarousel from './carousel'
var SGListView = require('react-native-sglistview');

import { Container, Content, List, ListItem, Text } from 'native-base';
import Menu from './categoriesmenu';
import NewsDetail from './newsdetail';
import { Bars } from 'react-native-loader';

var { width } = Dimensions.get('window');

/* Component ==================================================================== */
class NewsListView extends Component {
  static componentName = 'NewsListView';

  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      count: 0,
      skip: 1,
      waiting: false,
    }
  }

  static propTypes = {
    navigator: React.PropTypes.object.isRequired,
    data: React.PropTypes.array.isRequired,
    count: React.PropTypes.number.isRequired,
    stack: React.PropTypes.object.isRequired,
    selectedItem: React.PropTypes.string.isRequired,
    isHindi: React.PropTypes.bool.isRequired,
  }

	/**
    * Executes after all modules have been loaded
    */
  componentDidMount = () => {
    // Fetch Data
    InteractionManager.runAfterInteractions(() => {
      this._fetchData();
    });
  }

  componentWillReceiveProps = (nextProps) => {
    // Load new data when the dataSource property changes.
    if (nextProps.data != this.props.data) {
      this.setState({
        data: nextProps.data,
        dataSource: this.state.dataSource.cloneWithRows(nextProps.data),
        count: nextProps.count,
      });
    }
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    return true;
  }

  /**
    * Fetch Data from "API" (for Demo Purposes)
    */
  _fetchData = () => {
    this.setState({
      data: this.props.data,
      dataSource: this.state.dataSource.cloneWithRows(this.props.data),
      count: this.props.count,
    });
  }

  Fetch(type_uid, cb) {
    var skipCount = this.state.skip * 10;
    var self = this;
    var Query = this.props.stack.ContentType('news').Query();
    if (this.props.isHindi) {
      if (type_uid == "Top Stories") {
        Query
          .only(['title', 'category', 'thumbnail', 'updated_at', 'top_news', 'featured_image'])
          .includeCount()
          .language('hi-in')
          .includeReference('category')
          .skip(skipCount)
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
          .only(['title', 'category', 'thumbnail', 'updated_at', 'top_news', 'featured_image'])
          .where('category', type_uid)
          .includeCount()
          .language('hi-in')
          .includeReference('category')
          .skip(skipCount)
          .toJSON()
          .find()
          .then(function success(result) {
            if (result != undefined && result[0] != undefined && result[0].length > 0) {
              cb({ success: true, response: result[0] });
            } else {
              cb({ success: false, errorMessage: errorMessage });
            }
          }, function error(err) {
            // err object
            cb({ success: false, errorMessage: err });
          });
      }
    } else {
      if (type_uid == "Top Stories") {
        Query
          .only(['title', 'category', 'thumbnail', 'updated_at', 'top_news', 'featured_image'])
          .includeCount()
          .skip(skipCount)
          .includeReference('category')
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
          .only(['title', 'category', 'thumbnail', 'updated_at', 'top_news', 'featured_image'])
          .where('category', type_uid)
          .includeCount()
          .skip(skipCount)
          .includeReference('category')
          .toJSON()
          .find()
          .then(function success(result) {
            if (result != undefined && result[0] != undefined && result[0].length > 0) {
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

  }

  _data = function (data) {
    var monthNames = [
      "Jan", "Feb", "Mar",
      "Apr", "May", "Jun", "Jul",
      "Aug", "Sept", "Oct",
      "Nov", "Dec"
    ];
    var res = [];
    if (data !== undefined
      && data instanceof Array
      && data.length > 0) {
      data.map(function (item, index) {
        if (item.top_news) {
          var date = new Date(item.updated_at);
          var formattedDate = monthNames[date.getMonth()] + " " + date.getDay() + ", " + date.getFullYear();
          res.push(
            {
              title: item.title,
              thumbnail: item.thumbnail.url,
              featured_image: item.featured_image.url,
              uid: item.uid,
              top_news: item.top_news,
              category: item.category[0].title,
              updated_at: formattedDate
            }
          )
        }
      })
    }
    return res;
  }

  _onEndReached = () => {
    if (this.state.skip < this.state.count / 10) {
      if (!this.state.waiting) {
        this.setState({
          waiting: true,
        });
        var self = this;
        this.Fetch(this.props.selectedItem, (result) => {
          this.setState({
            data: self.state.data.concat(self._data(result)),
            dataSource: this.state.dataSource.cloneWithRows(self.state.data.concat(self._data(result))),
            count: result.response.count,
            skip: self.state.skip + 1,
            waiting: false
          });
        });
      }
    }
  }
  /**
    * Each Row Item
    */
  _renderRow = (item) => {
    let { title, uid, thumbnail, updated_at, category } = item;
    return (
      <ListRow title={title.toString()}
        thumbnail={thumbnail}
        category={category}
        updated_at={updated_at}
        onPress={() => {
          InteractionManager.runAfterInteractions(() => {
            this.props.navigator.push({
              title: "Detail",
              component: NewsDetail,
              passProps: {
                uid: uid,
                stack: this.props.stack,
                isHindi: this.props.isHindi
              },
              index: 1,
            });
          });

        }
        } />
    );
  }

  _carouselData = () => {
    let imgs = [];
    this.props.data.map((obj) => {
      imgs.push({ image: obj.featured_image, title: obj.title, uid: obj.uid });
    })
    return imgs;
  }

  pushDetailFromBanner = (uid) => {
    InteractionManager.runAfterInteractions(() => {
      this.props.navigator.push({
        title: "Detail",
        component: NewsDetail,
        passProps: {
          uid: uid,
          stack: this.props.stack,
          isHindi: this.props.isHindi
        },
        index: 1,
      });
    });
  }

  _renderFooter = () => {
    if (this.state.waiting) {
      return <ActivityIndicator />;
    } else {
      return <Text style={styles.tilde}>~</Text>;
    }
  }
  /**
    * RENDER
    */
  render = () => {
    if (this.props.data.length == 0) {
      return (
        <View style={[styles.loadingBackground]}>
          <Bars size={20} />
        </View>
      );
    }
    return (
      <View style={[styles.container]}>
        <ImageCarousel data={this._carouselData()} onBannerSelected={this.pushDetailFromBanner} style={styles.carousel} />
        <SGListView style={[styles.listView]}
          ref={'listview'}
          automaticallyAdjustContentInsets={false}
          stickyHeaderIndices={[]}
          initialListSize={1}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          scrollRenderAheadDistance={1}
          renderFooter={this._renderFooter}
          pageSize={1}
          onEndReachedThreshold={1}
          contentContainerStyle={styles.paddingBottom}
          onEndReached={this._onEndReached}
        />
      </View>
    );
  }
}

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    left: 0,
    right: 0,
    backgroundColor: "#f5f5f7",
  },
  paddingBottom: {
    paddingBottom: 20,
  },
  loadingBackground: {
    backgroundColor: "#f5f5f7",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
  },
  listView: {
    maxWidth: width,
    backgroundColor: "#f5f5f7",
  }, tilde: {
    backgroundColor: "transparent",
    textAlign: 'center',
    fontFamily: 'Verdana',
    fontSize: AppConfig.baseFontSize,
    fontWeight: 'bold',
    color: AppConfig.textColor,
    width: width,
  },
  carousel: {
    height: 220,
  }
});

/* Export Component ==================================================================== */
export default NewsListView
