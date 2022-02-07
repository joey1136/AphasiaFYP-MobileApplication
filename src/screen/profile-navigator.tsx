import { observer } from 'mobx-react'
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileScreen } from './profile-screen';
import { LoginScreen } from './login-screen';
import { RegisterScreen } from './register-screen';
import { t } from '../language-pack/language';

const Stack = createNativeStackNavigator();

export const ProfileNavigator = observer(() => {
    return (
        <Stack.Navigator >
            <Stack.Screen name={t.profileScreen.title} component={ProfileScreen} />
            <Stack.Screen name={t.loginScreen.title} component={LoginScreen} />
            <Stack.Screen name={t.registerScreen.title} component={RegisterScreen} />
        </Stack.Navigator>
    );

}
);

export default ProfileNavigator;