
'use strict';

/* Setup ==================================================================== */
import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import AppConfig from './appconfig.js'
import { language } from './images';
import { darkgradient } from './images';

/* Navbar Title Component ==================================================================== */
class NavbarTitle extends Component {
  static propTypes = {
    title: React.PropTypes.string,
  }

  render = () => {
    return (
      <Text style={[styles.baseText, styles.strong, styles.navbarTitle]}>{this.props.title || ''}</Text>
    );
  }
}

exports.Title = NavbarTitle;


/* Navbar Left Button Component ==================================================================== */
class NavbarLeftButton extends Component {
  static propTypes = {
    onPress: React.PropTypes.func.isRequired,
    icon: React.PropTypes.string.isRequired,
  }

  render = () => {
    return (
      <TouchableOpacity onPress={this.props.onPress} activeOpacity={0.7}
        style={styles.navbarButton}
        hitSlop={{ top: 7, right: 7, bottom: 7, left: 7 }}>
        <Icon name={this.props.icon} size={36} color={"#FFF"} />
      </TouchableOpacity>
    );
  }
}

exports.LeftButton = NavbarLeftButton;

/* Navbar Right Button Component ==================================================================== */
class NavbarRightButton extends Component {
  static propTypes = {
    onPress: React.PropTypes.func.isRequired,
  }

  render = () => {
    if (this.props.icon.length > 0) {
      return (
        <TouchableOpacity onPress={this.props.onPress} activeOpacity={0.7}
          style={styles.rightNavbarButton}
          hitSlop={{ top: 7, right: 7, bottom: 7, left: 7 }}>
          <Icon name={this.props.icon} size={36} color={"#FFF"} />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.rightNavbarButton}>
        </TouchableOpacity>
      );
    }
  }
}

exports.RightButton = NavbarRightButton;

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  navbarButton: {
    left: 20,
    top: 4,
  },
  rightNavbarButton: {
    right: 20,
    top: 4,
  },
  navbarTitle: {
    color: '#FFFFFF',
    bottom: 6,
    fontSize: 13,
  },
  /* Text Styles */
  baseText: {
    fontWeight: '500',
    color: AppConfig.textColor,
    fontSize: AppConfig.baseFontSize,
    lineHeight: parseInt(AppConfig.baseFontSize + (AppConfig.baseFontSize * 0.5)),
  },
  strong: {
    fontWeight: '900',
  },
});
