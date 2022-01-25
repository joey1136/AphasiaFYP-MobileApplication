import { observer } from 'mobx-react'
import styled from 'styled-components'
import * as React from 'react';
import { Text, Button } from 'react-native';
import auth from '@react-native-firebase/auth';

const Root = styled.View`
  flex : 1;
  align-items : center;
  justify-content : center;
`

const ButtonContainer = styled.View`
  padding:10px;
`

const LoginButton = styled(Button)``

const RegisterButton = styled(Button)``

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
    navigation.navigate('Login')
  }
    , [])

  const handleRegister = React.useCallback(() => {
    navigation.navigate('Register')
  }
    , [])

  return (
    initializing ? null :
      user != null ?
        <Root>
          < Text > Welcome {user.email}</Text >
        </Root >
        :
        <Root>
          <Text>Please Login</Text>
          <ButtonContainer>
            <LoginButton title="Login" onPress={handleLogin} />
          </ButtonContainer>
          <ButtonContainer>
            <RegisterButton title="Register" onPress={handleRegister} />
          </ButtonContainer>
        </Root>

  );

}
);