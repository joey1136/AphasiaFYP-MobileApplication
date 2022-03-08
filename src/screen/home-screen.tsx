import { observer } from 'mobx-react'
import styled from 'styled-components'
import * as React from 'react';
import { Text, Button, TouchableOpacity, Image } from 'react-native';
import { t } from '../language-pack/language'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import auth from '@react-native-firebase/auth';

const Root = styled.View`
  flex : 1;
  align-items : center;
`

const Card = styled(TouchableOpacity)`
  background-color:white;
  width:40%;
  border:9px solid grey;
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
  background-color:grey;
  color:white;
  text-align:center;
  padding-top:6px;
  font-weight:bold;
  vertical-align: middle;
`

const HelpIconContainer = styled.View`
  height:75%;
  display:flex;
  justify-content:center;
`

const HelpIcon = styled(MaterialCommunityIcon)`
  font-size:100px;
  text-align:center;
`

export const HomeScreen = observer(({ navigation }) => {
  const user = React.useMemo(() => auth().currentUser, [])

  const handleUploadForObject = React.useCallback(() => {
    if (user == null) {
      navigation.navigate(t.profileScreen.title)
    } else {
      navigation.navigate("HomePages", { screen: t.uploadScreen.title })
    }
  }
    , [])

  const handleUploadForCustmoizedQuestions = React.useCallback(() => {
    if (user == null) {
      navigation.navigate(t.profileScreen.title)
    } else {
      navigation.navigate("HomePages", { screen: t.customizedScreen.title })
    }
  }
    , [])

  const handleCheckRecord = React.useCallback(() => {
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
            uri: "https://firebasestorage.googleapis.com/v0/b/fyp-aphasia.appspot.com/o/sample%2FPhoto%20Frame.PNG?alt=media&token=0ff18052-9d10-499e-bfbc-aa58d1159b04",
          }}
          resizeMode="contain"
        />
        <CardTitle>{t.homeScreen.upload}</CardTitle>
      </Card>
      <Card onPress={handleUploadForCustmoizedQuestions}>
        <StyledImage
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/fyp-aphasia.appspot.com/o/sample%2FPhoto%20Frame.PNG?alt=media&token=0ff18052-9d10-499e-bfbc-aa58d1159b04",
          }}
          resizeMode="contain"
        />
        <CardTitle>{t.homeScreen.upload2}</CardTitle>
      </Card>
    </CardSet>
    <CardSet>
      <Card onPress={handleCheckRecord}>
        <HelpIconContainer>
          <HelpIcon name="help-circle" />
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
  </Root>
}
);