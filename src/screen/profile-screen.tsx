import { observer } from 'mobx-react'
import styled from 'styled-components'
import * as React from 'react';
import { Text, Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import { t } from '../language-pack/language';
import { firebase } from '@react-native-firebase/database';
import { showToast } from '../functions/showToast';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

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
    if (initializing) setInitializing(false);
  }

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const handleLogin = React.useCallback(() => {
    setLoginCode(undefined)
    navigation.navigate("ProfilePages", { screen: t.profileScreen.login, params: { showToast, setLoginCode } })
  }
    , [])

  const handleRegister = React.useCallback(() => {
    setLoginCode(undefined)
    navigation.navigate("ProfilePages", { screen: t.profileScreen.register, params: { showToast, setLoginCode } })
  }
    , [])

  const handleLogout = React.useCallback(() => {
    setLoginCode(undefined)
    auth()
      .signOut()
      .then(() => showToast("success", t.profileScreen.logoutSuccessMessage));
  }
    , [])

  return (
    initializing ? null :
      user != null ?
        <Root>
          < StyledText >{t.profileScreen.welcomeMessage}{user.email}</StyledText >
          {loginCode != null && < StyledText >{t.profileScreen.loginCodeMessage}{loginCode}</StyledText >}
          <Button title={t.profileScreen.logout} onPress={handleLogout} />
          <Toast />
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
          <Toast />
        </Root>

  );

}
);