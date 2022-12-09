import React, {useEffect} from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Stack from '../../dependencies/contentstack';
import LoadingView from '../components/LoadingView';
import RenderHtml from 'react-native-render-html';
import Moment from 'moment';

const {width, height} = Dimensions.get('window');

export default function DetailsScreen({route}) {
  const [uid] = React.useState(route.params.uid);
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState({});

  const fetchEntryDetails = async () => {
    var Query = Stack.ContentType('news').Entry(uid);

    const entry = await Query.only([
      'title',
      'body',
      'category',
      'thumbnail',
      'updated_at',
      'top_news',
      'featured_image',
    ])
      .includeReference('category')
      .toJSON()
      .fetch();
    setData(entry);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isLoading) {
      fetchEntryDetails();
    }
  });

  return isLoading ? (
    <LoadingView />
  ) : (
    <ScrollView>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Image source={{uri: data.thumbnail.url}} style={styles.image} />
      </View>
      <View style={{paddingHorizontal: 5, paddingTop: 5}}>
        <Text style={[styles.baseText]}>{data.title}</Text>
      </View>
      <View style={styles.bottomView}>
        <Text style={[styles.baseText, styles.subTitleText]}>
          {data.category[0].title}
        </Text>
        <Text style={[styles.baseText, styles.subTitleText]}>{'  •  '}</Text>
        <Text style={[styles.baseText, styles.subTitleText]}>
          {Moment(data.updated_at).format('d MMM YYYY')}
        </Text>
      </View>
      <View style={styles.body}>
        <RenderHtml contentWidth={width} source={{html: data.body}} />
        <View style={styles.bottomPadding} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: width,
    height: 220,
  },
  body: {
    top: 5,
    left: 5,
    width: width - 10,
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
  bottomView: {
    backgroundColor: '#f5f5f7',
    flexDirection: 'row',
    maxWidth: width - 10,
    left: 5,
    top: 1,
  },
  baseText: {
    fontFamily: 'Verdana',
    fontSize: 15,
    fontWeight: 'bold',
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
    color: 'gray',
  },
});
