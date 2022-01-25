import { observer } from 'mobx-react'
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, ProfileNavigator } from './screen'

const Tab = createBottomTabNavigator();

const App = observer(() =>
  <NavigationContainer >
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="ProfileNavigator" component={ProfileNavigator} />
    </Tab.Navigator>
  </NavigationContainer>
);

export default App;