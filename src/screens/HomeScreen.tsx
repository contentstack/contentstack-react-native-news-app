import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import NavigationDrawer from '..//drawer/NavigationDrawer';
import Stack from '../../dependencies/contentstack';
import LoadingView from '../components/LoadingView';

export default function HomeScreen() {
  const [data, setData] = React.useState(['Top Stories']);
  const [isLoading, setIsLoading] = React.useState(true);

  const getCategories = async () => {
    const category = await Stack.ContentType('category')
      .Query()
      .toJSON()
      .find();
    setData(['Top Stories', ...category[0].map(item => item.title)]);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isLoading) {
      getCategories();
    }
  });

  return isLoading ? <LoadingView /> : <NavigationDrawer data={data} />;
}
