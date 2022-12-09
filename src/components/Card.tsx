import React, {useContext} from 'react';
import {View, StyleSheet, Image, Dimensions, Text, TouchableOpacity} from 'react-native';
import {Theme} from '../config/theme';
import themeContext from '../config/themeContext';
// import RenderHtml from 'react-native-render-html';

const {width, height} = Dimensions.get('window');

function Card({item, onPress}) {
  const theme = useContext(themeContext) as Theme;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.view]}>
        <View style={[styles.overflow]}>
          <Image source={{uri: item.thumbnail.url}} style={styles.image} />
          <Text
            style={[
              {
                color: theme.textColor,
              },
              styles.text,
            ]}
            numberOfLines={2}>
            {item.title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  image: {
    width: width,
    height: height * 0.15,
  },
  author: {
    width: width,
    marginTop: -10,
    marginHorizontal: width * 0.03,
    color: 'darkgray',
  },
  desc: {
    width: width,
    marginTop: 5,
    marginHorizontal: width * 0.03,
    color: 'gray',
    maxWidth: width * 0.8,
  },
  overflow: {
    overflow: 'hidden',
    borderRadius: 15,
  },
  view: {
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 15,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: {width: -1, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 3,
    backgroundColor: '#fff',
  },
  text: {
    width: width * 0.75,
    marginHorizontal: 5,
    marginVertical: 5,
    fontSize: 15,
    fontWeight: 'bold',
    maxWidth: width * 0.75,
    padding: 5,
  },
});

export default Card;
