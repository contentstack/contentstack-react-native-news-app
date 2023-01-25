import React from 'react';
import {ActivityIndicator, useColorScheme, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function LoadingView() {
  const scheme = useColorScheme();
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          paddingTop: 30,
          padding: 8,
        }}>
        <ActivityIndicator color={scheme === 'dark' ? 'white' : 'gray'} />
      </View>
    </SafeAreaView>
  );
}
