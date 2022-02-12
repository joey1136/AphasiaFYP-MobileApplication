import { observer } from 'mobx-react'
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ProfileNavigator } from './src/screen'
import { t } from './src/language-pack/language';
import HomeNavigator from './src/screen/home-navigator';

const Tab = createBottomTabNavigator();

const App = observer(() =>
  <NavigationContainer >
    <Tab.Navigator >
      <Tab.Screen options={{ headerShown: false }} name={t.homeScreen.title} component={HomeNavigator} />
      <Tab.Screen options={{ headerShown: false }} name={t.profileScreen.title} component={ProfileNavigator} />
    </Tab.Navigator>
  </NavigationContainer>
);

export default App;