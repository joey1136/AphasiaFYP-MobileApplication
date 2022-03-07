import { observer } from 'mobx-react'
import styled from 'styled-components'
import * as React from 'react';
import { Text, Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import { t } from '../language-pack/language';
import { firebase } from '@react-native-firebase/database';

const Root = styled.View`
  flex : 1;
  align-items : center;
  justify-content : center;
`

const ButtonContainer = styled.View`
  padding:10px;
`

const StyledText = styled(Text)`
  font-size:20px;
`

export const ProfileScreen = observer(({ navigation }) => {
  const [initializing, setInitializing] = React.useState(true);
  const [user, setUser] = React.useState(undefined);
  const [loginCode, setLoginCode] = React.useState(undefined);
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  React.useEffect(() => {
    if (user == null) return
    const reference = firebase
      .app()
      .database('https://fyp-aphasia-default-rtdb.asia-southeast1.firebasedatabase.app/')
      .ref('/accountRecord');
    const code = reference.once('value')
      .then(snapshot => {
        var JsonObject = snapshot.val()
        JsonObject?.map((value) => {
          if (value.id === user.uid) {
            setLoginCode(value.code)
          }
        })
        //console.log(typeof (JsonObject))
        //console.log('User data: ', JsonObject.length);
      });
  }, [user]);


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
          < StyledText >{t.profileScreen.welcomeMessage}{user.email}</StyledText >
          {loginCode != null && < StyledText >{t.profileScreen.loginCodeMessage}{loginCode}</StyledText >}
          <Button title={t.profileScreen.logout} onPress={handleLogout} />
        </Root >
        :
        <Root>
          <StyledText>{t.profileScreen.loginHints}</StyledText>
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