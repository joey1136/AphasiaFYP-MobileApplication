import { observer } from 'mobx-react'
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { t } from '../language-pack/language';
import { HomeScreen } from './home-screen';
import { UploadScreen } from './upload-photoframe-screen';
import { CustomizedScreen } from './upload-customizeQuestion-screen'
import { CustomizedTrainingRecordScreen } from './customizeTrainingRecord-screen'
import { HelpScreen } from './help-screen';

const Stack = createNativeStackNavigator();

export const HomeNavigator = observer(() => {
    return (
        <Stack.Navigator >
            <Stack.Screen name={t.homeScreen.title} component={HomeScreen} />
            <Stack.Screen name={t.uploadScreen.title} component={UploadScreen} />
            <Stack.Screen name={t.customizedScreen.title} component={CustomizedScreen} />
            <Stack.Screen name={t.customizedTrainingRecord.title} component={CustomizedTrainingRecordScreen} />
            <Stack.Screen name={t.help.title} component={HelpScreen} />
        </Stack.Navigator>
    );
}
);

export default HomeNavigator;