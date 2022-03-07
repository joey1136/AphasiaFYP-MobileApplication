import { observer } from 'mobx-react'
import styled from 'styled-components'
import * as React from 'react';
import { Text, Button, Image, ScrollView, SafeAreaView, TextInput } from 'react-native';
import { t } from '../language-pack/language'
import { ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

interface Question {
  question: string
  answer: string
  imageUrl: string
}

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


const UploadButtonGroup = styled.View`
  display:flex;
  flex-direction: row;  
  justify-content : space-between;
  padding:15px;

`

const UploadObjectImage = styled(Image)`
  width:100%;
  height:200px;
  justify-content : center;
`

const SuccessMessage = styled(Text)`
  color:green;
`

const WarningMessage = styled(Text)`
  color:red;
`

const QuestionInputContainer = styled.View`
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content:space-around;
  padding-top:12px;
`

const QuestionInput = styled(TextInput)`
  height: 40px;
  margin-bottom: 12px;
  border-bottom-width: 1px;
  width:80%;
`

const SaveIcon = styled(MaterialCommunityIcon)`
  font-size:25px;
`

export const CustomizedScreen = observer(({ navigation }) => {
  const [warningMessage, setWarningMessage] = React.useState(undefined)
  const [successMessage, setSuccessMessage] = React.useState(undefined)
  const [totalQuestion, setTotalQuestion] = React.useState(0)
  const [question, setQuestion] = React.useState(undefined)
  const [instructionQuestion, setInstructionQuestion] = React.useState(undefined)
  const [coverImageUrl, setCoverImageUrl] = React.useState(undefined)

  React.useEffect(() => {
    const user = auth().currentUser
    if (user == null) return
    const reference = firebase
      .app()
      .database('https://fyp-aphasia-default-rtdb.asia-southeast1.firebasedatabase.app/')
      .ref(`/customizedQuestion/${user.uid}`);
    const code = reference.once('value')
      .then(snapshot => {
        var JsonObject = snapshot.val()
        if (JsonObject.totalQuestions != 0) {
          setTotalQuestion(JsonObject.totalQuestions)
          setQuestion(JsonObject.questions)
        }
        setInstructionQuestion(JsonObject.instructionQuestion)
        setCoverImageUrl(JsonObject.coverImageLink)
      });

  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <SaveIcon name="content-save" onPress={() => console.log(123)} />
      ),
    });
  }, [navigation]);

  const UpdateQuestion = React.useCallback((index: number, item: "quesiton" | "answer" | "url", value: string) => {
    if (question == null) return
    if (index > totalQuestion) return

    var newQuestion = [...question]
    if (item === "quesiton") {
      newQuestion[index].question = value
    } else if (item === "answer") {
      newQuestion[index].answer = value
    } else {
      newQuestion[index].imageLink = value
    }
    setQuestion(newQuestion)
  }, [question])

  const Objects = t.customizedScreen.Object
  const handleUploadImage = React.useCallback(async (objectName: string) => {
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
    console.log(reference.getDownloadURL());
    setSuccessMessage("Upload successfully")
    setWarningMessage(undefined)
  }
    , [])

  const uploadQuestions = React.useCallback(async (objectName: string, Image: ImagePickerResponse) => {
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

  const QuestionsUI = React.useMemo(() => question?.map((it, index) => <UploadCard>
    <UploadObjectTitle>{t.customizedScreen.Question}{index + 1}</UploadObjectTitle>
    <QuestionInputContainer>
      <UploadObjectDiscription>{t.customizedScreen.Question}:</UploadObjectDiscription>
      <QuestionInput
        value={it.question}
        onChangeText={(text) => UpdateQuestion(index, "quesiton", text)}
      />
    </QuestionInputContainer>
    <QuestionInputContainer>
      <UploadObjectDiscription>{t.customizedScreen.Answer}:</UploadObjectDiscription>
      <QuestionInput
        value={it.answer}
        onChangeText={(text) => UpdateQuestion(index, "answer", text)}
      />
    </QuestionInputContainer>
  </UploadCard>
  )
    , [question])

  return <SafeAreaView >
    <ScrollView >
      <Root>
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
                <Button title={t.uploadScreen.takeImage} onPress={() => handleTakeImage(it.title)} />
                <Button title={t.uploadScreen.select} onPress={() => handleUploadImage(it.title)} />
              </UploadButtonGroup>

            </UploadCardContent>
          </UploadCard>)}
        {QuestionsUI}

      </Root>
    </ScrollView>

  </SafeAreaView>
}
);