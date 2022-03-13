import { observer } from 'mobx-react'
import styled from 'styled-components'
import * as React from 'react';
import { Text, Image, Modal, TouchableOpacity } from 'react-native';
import { t } from '../language-pack/language'
import { ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
import { showToast as showToastInPage } from '../functions/showToast'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { firebase } from '@react-native-firebase/database';

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
  padding-bottom:15px;
`

const UploadCard = styled.View`
  width:95%;
  background-color:lightgrey;
  padding:15px;
  margin:10px;
  border:1px solid black;
  display:flex;
  flex-direction: column;
`

const UploadCardContent = styled.View`
  display:flex;
  flex-direction: column;
`

const UploadIcon = styled(MaterialCommunityIcon)`
  font-size:30px;
  padding-left:10px;
`

const UploadDisplayGroup = styled.View`
  display:flex;
  flex-direction: row; 
  justify-content:space-between;
  padding-top:10px;
`

const UploadButtonGroup = styled.View`
  display:flex;
  flex-direction: row;  
  gap:10px;
`

const UploadObjectImage = styled(Image)`
  width:100%;
  height:200px;
  justify-content : center;
`
const ImageHistoryUpload = styled(Text) <{ $warning: boolean }>`
  font-size:16px
  color:black;
  width:40%;
  padding-bottom:15px;
  color:grey;
  background-color: ${({ $warning }) => $warning ? "lightyellow" : undefined}
`

const OpacityModalContainer = styled(TouchableOpacity)`
  height:100%;
  width:100%;
  justify-content : center;
  display:flex;
  align-items:center;
  background-color:rgba(0, 0, 0, 0.8);
`

const FullSceneImage = styled(Image)`
  width:90%;
  height:60%;
  justify-content : center;
`

export const UploadScreen = observer(({ navigation }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [frameImageUrl, setFrameImageUrl] = React.useState(undefined)
  const [modalImageUrl, setModalImageUrl] = React.useState(undefined);

  React.useEffect(() => {
    const user = auth().currentUser
    if (user == null) return
    const reference = firebase
      .app()
      .database('https://fyp-aphasia-default-rtdb.asia-southeast1.firebasedatabase.app/')
      .ref(`/customizedPhotoFrame/${user.uid}`);
    const code = reference.once('value')
      .then(snapshot => {
        var JsonObject = snapshot.val()
        if (JsonObject != null) {
          if (JsonObject.frameImageLink != null) {
            setFrameImageUrl(JsonObject.frameImageLink)
          }
        }
      });
    return
  }, []);

  const Objects = t.uploadScreen.Object
  const handleUpload = React.useCallback(async (objectName: string) => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: false,
    });
    if (result.didCancel) {
      showToastInPage("error", t.toastMessage.error.uploadCancelMessage)
    } else {
      uploadImage(objectName, result)
    }
  }
    , [])

  const handleTakeImage = React.useCallback(async (objectName: string) => {
    const result = await launchCamera({
      mediaType: 'photo',

      includeBase64: false,
    });
    if (result.didCancel) {
      showToastInPage("error", t.toastMessage.error.uploadCancelMessage)
    } else {
      uploadImage(objectName, result)
    }
  }
    , [])

  const uploadImage = React.useCallback(async (objectName: string, Image: ImagePickerResponse) => {
    const user = auth().currentUser
    if (!user) {
      showToastInPage("error", t.toastMessage.error.loginErrorMessage)
      return
    }
    const reference = storage().ref(`/${user.uid}/image/${objectName}.png`);
    await reference.putFile(Image.assets[0].uri);
    const link = (await reference.getDownloadURL()).toString()
    setFrameImageUrl(link)
    const UpdateLinkReference = firebase
      .app().database('https://fyp-aphasia-default-rtdb.asia-southeast1.firebasedatabase.app/')
      .ref(`/customizedPhotoFrame/${user.uid}`);

    UpdateLinkReference.set({
      frameImageLink: link
    })
      .then(() => {
        showToastInPage("success", t.toastMessage.success.dataSetSuccessMessage)
      });
  }
    , [])

  return <Root>
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
          <UploadDisplayGroup>
            {frameImageUrl != null
              ?
              <Text onPress={() => {
                setModalVisible(true)
                setModalImageUrl(frameImageUrl)
              }}>{t.customizedScreen.history}</Text>
              :
              <ImageHistoryUpload >{t.customizedScreen.nohistory}</ImageHistoryUpload>}
            <UploadButtonGroup>
              <UploadIcon name="camera" onPress={() => handleTakeImage(it.title)} />
              <UploadIcon name="upload" onPress={() => handleUpload(it.title)} />
            </UploadButtonGroup>
          </UploadDisplayGroup>
        </UploadCardContent>
      </UploadCard>)}
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false)
      }}
    >
      <OpacityModalContainer onPress={() => setModalVisible(false)}>
        <FullSceneImage
          source={{
            uri: modalImageUrl,
          }}
          resizeMode="contain"
        />
      </OpacityModalContainer>
    </Modal>
    <Toast />
  </Root>
}
);