import {useIsFocused} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Button, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Stack from '../../dependencies/contentstack';
import Card from '../components/Card';
import LoadingView from '../components/LoadingView';

export default function NewsScreen({navigation, route}) {
  const isFocused = useIsFocused();

  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const getNews = async () => {
    const query = Stack.ContentType('news').Query();
    if (route.name !== 'Top Stories') {
      const category = Stack.ContentType('category')
        .Query()
        .where('title', route.name);
      query.referenceIn('category', category);
    }
    const category = await query.toJSON().includeReference('category').find();
    setData(category[0]);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isLoading) {
      getNews();
    }
  });

  return isLoading ? (
    <LoadingView />
  ) : (
    <FlatList
      data={data}
      keyExtractor={(item, index) => 'key' + index}
      renderItem={({item}) => (
        <Card
          item={item}
          onPress={() =>
            navigation.push('DetailsScreen', {
              uid: item.uid,
            })
          }
        />
      )}
      style={{marginBottom: 65}}
    />
  );
}
