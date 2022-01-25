import { observer } from 'mobx-react'
import styled from 'styled-components'
import * as React from 'react';
import { Text } from 'react-native';
import auth from '@react-native-firebase/auth';

const Root = styled.View`
  flex : 1;
  align-items : center;
  justify-content : center;
`

export const ProfileScreen = observer(() => {
  const [initializing, setInitializing] = React.useState(true);
  const [user, setUser] = React.useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    user != null ?
      <Root>
        < Text > Welcome {user.email}</Text >
      </Root >
      :
      <Root>
        <Text>Please Login</Text>
      </Root>

  );

}
);