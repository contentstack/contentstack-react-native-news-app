'use strict';

import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AppConfig from './appconfig'

class MenuCell extends React.Component {
  static propTypes = {
    onPress: React.PropTypes.func.isRequired,
    title: React.PropTypes.string.isRequired,
    selectedItem: React.PropTypes.string.isRequired,
    uid:React.PropTypes.string.isRequired,
  }

 shouldComponentUpdate = (nextProps, nextState) => {
    return true;
  }

  render() {
    if (this.props.selectedItem.toUpperCase() == this.props.title.toUpperCase() || this.props.selectedItem.toUpperCase() == this.props.uid.toUpperCase()) {
      return (
        <TouchableOpacity
          style={[styles.highlightedListRow]}
          onPress={this.props.onPress} activeOpacity={0.7}>
          <Text numberOfLines={1} style={styles.highlightedText}>{this.props.title}</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={[styles.listRow]}
          onPress={this.props.onPress} activeOpacity={0.7}>
          <Text numberOfLines={1} style={styles.text}>{this.props.title}</Text>
        </TouchableOpacity>
      )
    }
  }
}

const styles = StyleSheet.create({
  listRow: {
    left: 0,
    right: 0,
    backgroundColor: "#2D2C31",
    borderBottomWidth: 1,
    borderColor: "#706F79",
    height: 44,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 1,
  },
  highlightedListRow: {
    left: 0,
    right: 0,
    backgroundColor: "#f5f5f7",
    borderBottomWidth: 1,
    borderColor: "#706F79",
    height: 44,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 1,
  },
  text: {
    color: '#f5f5f7',
    textAlign: 'center',
    backgroundColor: 'transparent',
    fontFamily: 'Verdana',
    fontSize: AppConfig.baseFontSize + 1,
  },
  highlightedText: {
    color: '#2D2C31',
    textAlign: 'center',
    backgroundColor: 'transparent',
    fontFamily: 'Verdana',
    fontSize: AppConfig.baseFontSize + 1,
  },
});

module.exports = MenuCell;