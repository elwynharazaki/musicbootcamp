import React, { Component } from 'react';
import { View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Expo from 'expo';

import Search from './src/screens/Search';
import Result from './src/screens/Result';
import Detail from './src/screens/Detail';

class App extends Component {
  render() {
   const MainNavigator = StackNavigator({
      search: { screen: Search },
      result: { screen: Result },
      detail: { screen: Detail }     
   });

   return (
      <View style={{ flex: 1, paddingTop: Expo.Constants.statusBarHeight }}>
         <MainNavigator />
      </View>
    );
  }
}

export default App;
