const React = require('react');
const SideMenu = require('react-native-side-menu');
const Menu = require('./categoriesmenu');
import AppConfig from './appconfig'
const {
  StyleSheet,
  View,
  InteractionManager,
  Platform
} = require('react-native');

const {
  Navigator,
} = require('react-native-deprecated-custom-components');

const { Component } = React;
import NavigationBar from 'react-native-navbar'
import NavbarElements from './navbar';
import NewsListView from './newslistview';
import Contentstack from 'contentstack/react-native'
import Loading from './loading';
import ActionSheet from 'react-native-actionsheet';

const buttons = ["Cancel", AppConfig.language_one, AppConfig.language_two];
const CANCEL_INDEX = 0;

const styles = StyleSheet.create({
  /* Default */
  container: {
    position: 'relative',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f5f5f7',
  },
  navcontainer: {
    position: 'relative',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f5f5f7',
  },
});


module.exports = class Basic extends Component {
  state = {
    isOpen: false,
    isHindi: false,
    selectedItem: AppConfig.default_category,
    data: [],
    count: 0,
    stack: Contentstack.Stack({ "api_key": AppConfig.api_key, "access_token": AppConfig.access_token, "environment": AppConfig.env }),
    showLoading: false,
    DESTRUCTIVE_INDEX: 1,
  };

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

  _handlePress(index) {
    if (this.state.DESTRUCTIVE_INDEX != index && index != 0) {
      this.setState({
        DESTRUCTIVE_INDEX: index,
      });
      this.setState(state => {
        DESTRUCTIVE_INDEX = index
      }, () => {
        if (this.state.isHindi != true) {
          this.setState({
            isHindi: true,
          });
          this.setState(state => {
            isHindi = true
          }, () => {
            this.Fetch(this.state.selectedItem, (result) => {
              this.setState({
                showLoading: false,
                data: this._data(result.response),
                count: result.response.length,
              });
            });
          });

        } else {
          this.setState({
            isHindi: false,
          });
          this.setState(state => {
            isHindi = false
          }, () => {
            this.Fetch(this.state.selectedItem, (result) => {
              this.setState({
                showLoading: false,
                data: this._data(result.response),
                count: result.response.length,
              });
            });
          });
        }
      });
    }
  }

  /**
  * Toggle Side Menu
  */
  _onSideMenuChange = (isOpen) => {
    if (isOpen != this.state.isOpen) {
      this.setState({
        isOpen: !this.state.isOpen,
      });
    }
  }

  /**
* Toggle language
*/
  _languageChange = () => {
    InteractionManager.runAfterInteractions(() => {
      this.ActionSheet.show();
    });
  }

  /**
    * Executes after all modules have been loaded
    */
  componentDidMount = () => {
    // Fetch Data
    InteractionManager.runAfterInteractions(() => {
      this.Fetch(AppConfig.default_category, (result) => {
        this.setState({
          data: this._data(result.response),
          count: result.response.length,
        });
      });
    });
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen, });
  }

  onMenuItemSelected = (item) => {
    this.setState(state => {
      state.isOpen = false,
        state.selectedItem = item,
        state.data = [],
        state.showLoading = true
    }, () => {
      this.Fetch(item, (result) => {
        if (result.response.length > 0) {
          this.setState({
            showLoading: false,
            data: this._data(result.response),
            count: result.response.length,
          });
        } else {
          this.setState({
            showLoading: false,
            count: -1,
            data: []
          });
        }

      });
    });
  }

  Fetch(type_uid, cb) {
    var self = this;
    var Query = this.state.stack.ContentType('news').Query();
    if (this.state.isHindi) {
      if (type_uid == "Top Stories") {
        Query
          .only(['title', 'category', 'thumbnail', 'updated_at', 'top_news', 'featured_image'])
          .includeCount()
          .language('hi-in')
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
          .language('hi-in')
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
    } else {
      if (type_uid == "Top Stories") {
        Query
          .only(['title', 'category', 'thumbnail', 'updated_at', 'top_news', 'featured_image'])
          .includeCount()
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
  shouldComponentUpdate = (nextProps, nextState) => {
    return true;
  }

  /**
    * Render each scene with a Navbar and Sidebar
    */
  _renderScene = (route, navigator) => {
    // Default Navbar Title
    let title = route.title || AppConfig.defaultTitle;
    // Show Hamburger Icon when index is 0, and Back Arrow Icon when index is > 0
    let leftButton = {
      onPress: (route.index > 0)
        ? this.refs.rootNavigator.pop
        : this._onSideMenuChange,
      icon: (route.index > 0)
        ? 'ios-arrow-back-outline'
        : 'ios-menu-outline'
    };

    let rightButton = {
      onPress: this._languageChange,
      icon: (route.index <= 0) ? 'ios-globe-outline' : ''
    };

    // Show a cross icon when transition pops from bottom
    if (route.transition == 'FloatFromBottom') {
      leftButton.icon = 'ios-close-outline';
    }

    if (route.index == 0) {
      return (
        <View style={styles.container}>
          <NavigationBar
            title={<NavbarElements.Title title={title || AppConfig.appname} />}
            statusBar={{ style: 'light-content', hidden: false }}
            style={[styles.navbar]}
            tintColor={AppConfig.primary_color}
            leftButton={<NavbarElements.LeftButton onPress={leftButton.onPress} icon={leftButton.icon} />}
            rightButton={<NavbarElements.RightButton onPress={rightButton.onPress} icon={rightButton.icon} />} />
          <NewsListView data={this.state.data} navigator={navigator} count={this.state.count} stack={this.state.stack} selectedItem={this.state.selectedItem} isHindi={this.state.isHindi} />
          <ActionSheet
            ref={(o) => this.ActionSheet = o}
            title="Select Langugae"
            options={buttons}
            cancelButtonIndex={CANCEL_INDEX}
            destructiveButtonIndex={this.state.DESTRUCTIVE_INDEX}
            onPress={this._handlePress.bind(this)}
          />
        </View>
      );
    } else if (route.index == 1) {
      return (
        <View style={styles.container}>
          <NavigationBar
            title={<NavbarElements.Title title={title || AppConfig.appname} />}
            statusBar={{ style: 'light-content', hidden: false }}
            style={[styles.navbar]}
            tintColor={AppConfig.primary_color}
            leftButton={<NavbarElements.LeftButton onPress={leftButton.onPress} icon={leftButton.icon} />}
            rightButton={<NavbarElements.RightButton onPress={rightButton.onPress} icon={rightButton.icon} />} />
          <route.component navigator={navigator} route={route} {...route.passProps} />
          <ActionSheet
            ref={(o) => this.ActionSheet = o}
            title="Select Langugae"
            options={buttons}
            cancelButtonIndex={CANCEL_INDEX}
            destructiveButtonIndex={this.state.DESTRUCTIVE_INDEX}
            onPress={this._handlePress.bind(this)}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <NavigationBar
            title={<NavbarElements.Title title={title || AppConfig.appname} />}
            statusBar={{ style: 'light-content', hidden: false }}
            style={[styles.navbar]}
            tintColor={AppConfig.primary_color}
            leftButton={<NavbarElements.LeftButton onPress={leftButton.onPress} icon={leftButton.icon} />}
            rightButton={<NavbarElements.RightButton onPress={rightButton.onPress} icon={rightButton.icon} />} />
          <route.component navigator={navigator} route={route} {...route.passProps} />
          <ActionSheet
            ref={(o) => this.ActionSheet = o}
            title="Select Langugae"
            options={buttons}
            cancelButtonIndex={CANCEL_INDEX}
            destructiveButtonIndex={this.state.DESTRUCTIVE_INDEX}
            onPress={this._handlePress.bind(this)}
          />
        </View>
      );
    }

  }



  render = () => {
    const menu = <Menu onItemSelected={this.onMenuItemSelected} selectedItem={this.state.selectedItem} isHindi={this.state.isHindi} stack={this.state.stack}/>;
    if (this.state.data !== undefined && this.state.data.length > 0) {
      return (
        <SideMenu
          menu={menu}
          isOpen={this.state.isOpen}
          onChange={this._onSideMenuChange} >
          <Navigator
            ref="rootNavigator"
            style={[styles.navcontainer]}
            renderScene={this._renderScene}
            configureScene={function (route, routeStack) {
              if (route.transition == 'FloatFromBottom')
                return Navigator.SceneConfigs.FloatFromBottom;
              else
                return Navigator.SceneConfigs.PushFromRight;
            }}
            initialRoute={{
              component: NewsListView,
              index: 0,
              navigator: this.refs.rootNavigator,
              passProps: {
                data: this.state.data,
                count: this.state.count,
                stack: this.state.stack,
                selectedItem: this.state.selectedItem,
                isHindi: this.state.isHindi
              }
            }} />
        </SideMenu>
      );
    } else {
      if (this.state.showLoading === true || this.state.count == -1) {
        return (
          <SideMenu
            menu={menu}
            isOpen={this.state.isOpen}
            onChange={this._onSideMenuChange}>
            <Navigator
              ref="rootNavigator"
              style={[styles.navcontainer]}
              renderScene={this._renderScene}
              initialRoute={{
                component: NewsListView,
                index: 0,
                navigator: this.refs.rootNavigator,
                passProps: {
                  data: this.state.data,
                  count: this.state.count,
                  stack: this.state.stack,
                  selectedItem: this.state.selectedItem,
                  isHindi: this.state.isHindi
                }
              }} />
          </SideMenu>
        );
      } else {
        return (
          <Loading />
        );
      }
    }
  }
}