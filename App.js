import { observer } from 'mobx-react'
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ProfileNavigator } from './src/screen'
import { t } from './src/language-pack/language';
import HomeNavigator from './src/screen/home-navigator';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import styled from 'styled-components';

const Tab = createBottomTabNavigator();

const SaveIcon = styled(MaterialCommunityIcon)`
  font-size:25px;
`
const App = observer(() =>
  <NavigationContainer >
    <Tab.Navigator >
      <Tab.Screen options={{
        headerShown: false, tabBarIcon: ({ color, size }) => (
          <SaveIcon name="home" color={color} size={size} />
        )
      }} name={t.homeScreen.title} component={HomeNavigator} />
      <Tab.Screen options={{
        headerShown: false, tabBarIcon: ({ color, size }) => (
          <SaveIcon name="account-circle" color={color} size={size} />
        )
      }} name={t.profileScreen.title} component={ProfileNavigator} />
    </Tab.Navigator>
  </NavigationContainer>
);

export default App;