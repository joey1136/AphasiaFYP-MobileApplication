import { observer } from 'mobx-react'
import styled from 'styled-components'
import * as React from 'react';
import { Text, Button, Image } from 'react-native';
import { t } from '../language-pack/language'
import { ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

const Root = styled.View`
  flex : 1;
  align-items : center;
  justify-content : center;
`

const UploadObjectTitle = styled(Text)`
  font-size:20px
  color:black;
`

const UploadObjectDiscription = styled(Text)`
  font-size:16px
  color:black;
`

const UploadCard = styled.View`
  width:95%;
  background-color:lightgrey;
  padding:5px;
  margin:10px;
  border:1px solid black;
  display:flex;
  flex-direction: column;
`

const UploadCardContent = styled.View`
  display:flex;
  flex-direction: row;
`


const UploadButtonGroup = styled.View`
  align-items : center;
  justify-content : center;

`

const UploadObjectImage = styled(Image)`
  width:200px;
  height:200px;
`

const SuccessMessage = styled(Text)`
  color:green;
`

const WarningMessage = styled(Text)`
  color:red;
`

export const UploadScreen = observer(({ navigation }) => {
  const [warningMessage, setWarningMessage] = React.useState(undefined)
  const [successMessage, setSuccessMessage] = React.useState(undefined)

  const Objects = t.uploadScreen.Object
  const handleUpload = React.useCallback(async (objectName: string) => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: false,
    });
    uploadImage(objectName, result)
  }
    , [])
  const handleTakeImage = React.useCallback(async (objectName: string) => {
    const result = await launchCamera({
      mediaType: 'photo',

      includeBase64: false,
    });
    console.log(result)
    uploadImage(objectName, result)
  }
    , [])

  const uploadImage = React.useCallback(async (objectName: string, Image: ImagePickerResponse) => {
    const user = auth().currentUser
    if (!user) {
      setWarningMessage("Please first Login before upload")
      setSuccessMessage(undefined)
      return
    }

    const reference = storage().ref(`/${user.uid}/image/${objectName}.png`);
    await reference.putFile(Image.assets[0].uri);
    setSuccessMessage("Upload successfully")
    setWarningMessage(undefined)
  }
    , [])

  return <Root>
    {warningMessage != null && <WarningMessage>{warningMessage}</WarningMessage>}
    {successMessage != null && <SuccessMessage>{successMessage}</SuccessMessage>}
    {Objects.map((it) =>
      <UploadCard>
        <UploadObjectTitle>{it.title}</UploadObjectTitle>
        <UploadObjectDiscription>{it.description}</UploadObjectDiscription>
        <UploadCardContent>
          <UploadObjectImage
            source={{
              uri: it.url,
            }}
          />
          <UploadButtonGroup>
            <Button title="take picture" onPress={() => handleTakeImage(it.title)} />
            <Button title="upload" onPress={() => handleUpload(it.title)} />
          </UploadButtonGroup>
        </UploadCardContent>
      </UploadCard>)}
  </Root>
}
);