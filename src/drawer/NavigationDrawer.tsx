import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';
import NewsScreen from '../screens/NewsScreen';

const Drawer = createDrawerNavigator();

export default function NavigationDrawer({data}) {
  const [categories] = React.useState(data);

  return (
    <Drawer.Navigator initialRouteName="All">
      {categories.map((value, index) => (
        <Drawer.Screen name={value} key={index} component={NewsScreen} />
      ))}
    </Drawer.Navigator>
  );
}
