/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import 'react-native-gesture-handler';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import {useColorScheme} from 'react-native';
const StackNav = createStackNavigator();

export default function App() {
  const scheme = useColorScheme();

  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StackNav.Navigator>
        <StackNav.Screen
          options={{headerShown: false}}
          name="Home"
          component={HomeScreen}
        />
        <StackNav.Screen name="DetailsScreen" component={DetailsScreen} />
      </StackNav.Navigator>
    </NavigationContainer>
  );
}
