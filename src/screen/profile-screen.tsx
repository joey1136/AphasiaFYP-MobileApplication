import { observer } from 'mobx-react'
import styled from 'styled-components'
import * as React from 'react';
import { Text, Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import { t } from '../language-pack/language';

const Root = styled.View`
  flex : 1;
  align-items : center;
  justify-content : center;
`

const ButtonContainer = styled.View`
  padding:10px;
`

export const ProfileScreen = observer(({ navigation }) => {
  const [initializing, setInitializing] = React.useState(true);
  const [user, setUser] = React.useState(undefined);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const handleLogin = React.useCallback(() => {
    navigation.navigate(t.profileScreen.login)
  }
    , [])

  const handleRegister = React.useCallback(() => {
    navigation.navigate(t.profileScreen.register)
  }
    , [])

  const handleLogout = React.useCallback(() => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }
    , [])

  return (
    initializing ? null :
      user != null ?
        <Root>
          < Text >{t.profileScreen.welcomeMessage}{user.email}</Text >
          <Button title={t.profileScreen.logout} onPress={handleLogout} />
        </Root >
        :
        <Root>
          <Text>{t.profileScreen.loginHints}</Text>
          <ButtonContainer>
            <Button title={t.profileScreen.login} onPress={handleLogin} />
          </ButtonContainer>
          <ButtonContainer>
            <Button title={t.profileScreen.register} onPress={handleRegister} />
          </ButtonContainer>
        </Root>

  );

}
);