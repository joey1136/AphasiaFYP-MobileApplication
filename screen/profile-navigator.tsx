import { observer } from 'mobx-react'
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileScreen } from './profile-screen';
import { LoginScreen } from './login-screen';
import { RegisterScreen } from './register-screen';

const Stack = createNativeStackNavigator();

export const ProfileNavigator = observer(() => {
    return (
        <Stack.Navigator >
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
    );

}
);

export default ProfileNavigator;