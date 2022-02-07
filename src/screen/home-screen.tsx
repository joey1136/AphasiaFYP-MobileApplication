import { observer } from 'mobx-react'
import styled from 'styled-components'
import * as React from 'react';
import { Text } from 'react-native';
import { t } from '../language-pack/language'

const Root = styled.View`
  flex : 1;
  align-items : center;
  justify-content : center;
`

export const HomeScreen = observer(() =>
  <Root>
    <Text>{t.homeScreen.title}</Text>
  </Root>
);