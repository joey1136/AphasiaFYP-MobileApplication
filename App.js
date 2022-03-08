import { observer } from 'mobx-react'
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, ProfileNavigator, ProfileScreen } from './src/screen'
import { t } from './src/language-pack/language';
import HomeNavigator from './src/screen/home-navigator';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import styled from 'styled-components';

const Tab = createBottomTabNavigator();

const RootStack = createNativeStackNavigator()

const SaveIcon = styled(MaterialCommunityIcon)`
  font-size:25px;
`
const App = observer(() =>
  <NavigationContainer >
    <RootStack.Navigator>
      <RootStack.Screen
        name="Home"
        component={HomeTab}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="HomePages"
        component={HomeNavigator}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="ProfilePages"
        component={ProfileNavigator}
        options={{ headerShown: false }}

      />
    </RootStack.Navigator>
  </NavigationContainer>
);

const HomeTab = observer(() =>
  <Tab.Navigator >
    <Tab.Screen options={{
      tabBarIcon: ({ color, size }) => (
        <SaveIcon name="home" color={color} size={size} />
      )
    }} name={t.homeScreen.title} component={HomeScreen} />
    <Tab.Screen options={{
      tabBarIcon: ({ color, size }) => (
        <SaveIcon name="account-circle" color={color} size={size} />
      )
    }} name={t.profileScreen.title} component={ProfileScreen} />
  </Tab.Navigator>
);


export default App;