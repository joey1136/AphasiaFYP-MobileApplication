import { observer } from 'mobx-react'
import * as React from 'react';
import { View, Text } from 'react-native';

export const ProfileScreen = observer(() =>
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Profile Screen</Text>
  </View>
);