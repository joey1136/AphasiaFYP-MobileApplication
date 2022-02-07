import { observer } from 'mobx-react'
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, ProfileNavigator } from './src/screen'
import { t } from './src/language-pack/language';

const Tab = createBottomTabNavigator();

const App = observer(() =>
  <NavigationContainer >
    <Tab.Navigator >
      <Tab.Screen name={t.homeScreen.title} component={HomeScreen} />
      <Tab.Screen options={{ headerShown: false }} name={t.profileScreen.title} component={ProfileNavigator} />
    </Tab.Navigator>
  </NavigationContainer>
);

export default App;