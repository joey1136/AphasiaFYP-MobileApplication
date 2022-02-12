import { observer } from 'mobx-react'
import styled from 'styled-components'
import * as React from 'react';
import { Text, Button } from 'react-native';
import { t } from '../language-pack/language'
import { ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';

const Root = styled.View`
  flex : 1;
  align-items : center;
  justify-content : center;
`

export const UploadScreen = observer(({ navigation }) => {

  const handleUpload = React.useCallback(async () => {
    const result = await launchCamera({
      mediaType: 'photo',
      includeBase64: false,
    });
    uploadImage(result)
  }
    , [])
  const handleTakeImage = React.useCallback(async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: false,
    });
    uploadImage(result)
  }
    , [])

  const uploadImage = React.useCallback((ImageUri: ImagePickerResponse) => {

  }
    , [])
  return <Root>
    <Text>{t.uploadScreen.title}</Text>
    <Button title="take picture" onPress={handleTakeImage} />
    <Button title="upload" onPress={handleUpload} />
  </Root>
}
);