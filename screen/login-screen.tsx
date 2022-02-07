import { observer } from 'mobx-react'
import styled from 'styled-components'
import * as React from 'react';
import { Text } from 'react-native';

const Root = styled.View`
  flex : 1;
  align-items : center;
  justify-content : center;
`

export const LoginScreen = observer(({ navigation }) => {
    return (
        <Root>
            <Text>Login Page</Text>
        </Root>
    );

}
);