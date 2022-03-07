import { observer } from 'mobx-react'
import styled from 'styled-components'
import * as React from 'react';
import { Text, Button } from 'react-native';
import { t } from '../language-pack/language'

const Root = styled.View`
  flex : 1;
  align-items : center;
  justify-content : center;
`

export const HomeScreen = observer(({ navigation }) => {
  const handleUploadForObject = React.useCallback(() => {
    navigation.navigate(t.uploadScreen.title)
  }
    , [])

  const handleUploadForCustmoizedQuestions = React.useCallback(() => {
    navigation.navigate(t.customizedScreen.title)
  }
    , [])

  return <Root>
    <Text>{t.homeScreen.title}</Text>
    <Button title={t.homeScreen.upload} onPress={handleUploadForObject} />
    <Button title={t.homeScreen.upload2} onPress={handleUploadForCustmoizedQuestions} />
  </Root>
}
);