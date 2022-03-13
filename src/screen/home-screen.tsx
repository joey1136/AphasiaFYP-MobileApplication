import { observer } from 'mobx-react'
import styled from 'styled-components'
import * as React from 'react';
import { Text, TouchableOpacity, Image } from 'react-native';
import { t } from '../language-pack/language'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
import { showToast } from '../functions/showToast';

const Root = styled.View`
  flex : 1;
  align-items : center;
`

const Card = styled(TouchableOpacity)`
  background-color:white;
  width:40%;
  border:9px solid lightgrey;
`

const CardSet = styled.View`
  display:flex;
  flex-direction:row;
  height:30%;
  width:100%;
  justify-content : space-around;
  margin-top:100px;
`

const StyledImage = styled(Image)`
  width:100%;
  height:75%;
`

const CardTitle = styled(Text)`
  height:25%;
  background-color:lightgrey;
  text-align:center;
  padding-top:6px;
  font-weight:bold;
`

const HelpIconContainer = styled.View`
  height:75%;
  display:flex;
  justify-content:center;
  align-items:center;
`

const HelpIcon = styled(MaterialCommunityIcon)`
  font-size:100px;
  text-align:center;
  color:lightgrey;
`

export const HomeScreen = observer(({ navigation }) => {

  const handleUploadForObject = React.useCallback(() => {
    const user = auth().currentUser
    if (user == null) {
      navigation.navigate(t.profileScreen.title)
    } else {
      navigation.navigate("HomePages", { screen: t.uploadScreen.title })
    }
  }
    , [])

  const handleUploadForCustmoizedQuestions = React.useCallback(() => {
    const user = auth().currentUser
    if (user == null) {
      navigation.navigate(t.profileScreen.title)
    } else {
      navigation.navigate("HomePages", { screen: t.customizedScreen.title, params: { showToast } })
    }
  }
    , [])

  const handleCheckRecord = React.useCallback(() => {
    const user = auth().currentUser
    if (user == null) {
      navigation.navigate(t.profileScreen.title)
    } else {
      navigation.navigate("HomePages", { screen: t.customizedTrainingRecord.title })
    }
  }
    , [])

  const handleHelp = React.useCallback(() => {
    navigation.navigate("HomePages", { screen: t.help.title })
  }
    , [])

  return <Root>
    <CardSet>
      <Card onPress={handleUploadForObject}>
        <StyledImage
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/fyp-aphasia.appspot.com/o/sample%2Fframe_image.PNG?alt=media&token=0d519deb-0bbc-4edf-897b-f67d84784b73",
          }}
          resizeMode="contain"
        />
        <CardTitle>{t.homeScreen.upload}</CardTitle>
      </Card>
      <Card onPress={handleUploadForCustmoizedQuestions}>
        <StyledImage
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/fyp-aphasia.appspot.com/o/sample%2Falbum_training.PNG?alt=media&token=c1af4f6c-97a9-4986-9eeb-0ffd083e8a2e",
          }}
          resizeMode="contain"
        />
        <CardTitle>{t.homeScreen.upload2}</CardTitle>
      </Card>
    </CardSet>
    <CardSet>
      <Card onPress={handleCheckRecord}>
        <HelpIconContainer>
          <HelpIcon name="clipboard-list-outline" />
        </HelpIconContainer>
        <CardTitle>{t.homeScreen.record}</CardTitle>
      </Card>
      <Card onPress={handleHelp}>
        <HelpIconContainer>
          <HelpIcon name="help-circle" />
        </HelpIconContainer>
        <CardTitle>{t.help.title}</CardTitle>
      </Card>
    </CardSet>
    <Toast />
  </Root>
}
);