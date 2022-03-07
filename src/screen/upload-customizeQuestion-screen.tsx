import { observer } from 'mobx-react'
import styled from 'styled-components'
import * as React from 'react';
import { Text, Button, Image, ScrollView, SafeAreaView, TextInput, Modal, TouchableOpacity } from 'react-native';
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
  text-align:center;
`

const WarningMessage = styled(Text)`
  color:red;
  text-align:center;
`

const QuestionInputContainer = styled.View`
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content:space-between;
  padding-top:12px;
`

const QuestionInput = styled(TextInput)`
  height: 40px;
  margin-bottom: 12px;
  border-bottom-width: 1px;
  width:80%;
`

const InstructionQuestionInput = styled(TextInput)`
  height: 40px;
  margin-bottom: 12px;
  border-bottom-width: 1px;
`

const SaveButtonContainer = styled.View`

`

const SaveButton = styled(TouchableOpacity)`
  padding:15px;
  border-radius:50px;
  background-color:lightgrey;
  z-index:-1;
`
const SaveIcon = styled(MaterialCommunityIcon)`
  font-size:30px;
`

const ModalContainer = styled(TouchableOpacity)`
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

const ImageHistoryUpload = styled(Text)`
  font-size:16px
  color:black;
  width:80%;
  padding-bottom:15px;
  color:grey;
`

export const CustomizedScreen = observer(({ navigation }) => {
  const [warningMessage, setWarningMessage] = React.useState(undefined)
  const [successMessage, setSuccessMessage] = React.useState(undefined)
  const [totalQuestion, setTotalQuestion] = React.useState(0)
  const [question, setQuestion] = React.useState(undefined)
  const [instructionQuestion, setInstructionQuestion] = React.useState(undefined)
  const [coverImageUrl, setCoverImageUrl] = React.useState(undefined)
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalImageUrl, setModalImageUrl] = React.useState(undefined);

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
    return
  }, []);


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
  const handleUploadImage = React.useCallback(async (objectName: string, index?: number) => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: false,
    });
    if (result.didCancel) return
    uploadImage(objectName, result, index)
  }
    , [])

  const handleTakeImage = React.useCallback(async (objectName: string, index?: number) => {
    const result = await launchCamera({
      mediaType: 'photo',
      includeBase64: false,
    });
    if (result.didCancel) return
    uploadImage(objectName, result, index)
  }
    , [])

  const uploadImage = React.useCallback(async (objectName: string, Image: ImagePickerResponse, index?: number) => {
    const user = auth().currentUser
    if (!user) {
      setWarningMessage("Please first Login before upload")
      setSuccessMessage(undefined)
      return
    }
    const date = (new Date()).toLocaleDateString().split('/').join('-') + "_" + (new Date()).toLocaleTimeString().split('/').join('-');
    const reference = storage().ref(`/${user.uid}/image/${objectName}_${date}.png`);
    await reference.putFile(Image.assets[0].uri);
    const link = (await reference.getDownloadURL()).toString()
    if (objectName === "Book Cover" || objectName === "相簿封面") {
      setCoverImageUrl(link)
    } else {
      if (index != null) {
        UpdateQuestion(index, "url", link)
      }
    }

    setSuccessMessage("Image Upload successfully")
    setWarningMessage(undefined)
  }
    , [])

  const UploadQuestions = React.useCallback(() => {
    const user = auth().currentUser
    if (!user) {
      setWarningMessage("Please first Login before upload")
      setSuccessMessage(undefined)
      return
    }
    if (question == null) return
    const reference = firebase
      .app().database('https://fyp-aphasia-default-rtdb.asia-southeast1.firebasedatabase.app/')
      .ref(`/customizedQuestion/${user.uid}`);

    reference.set({
      coverImageLink: coverImageUrl,
      instructionQuestion: instructionQuestion,
      totalQuestions: question.length,
      questions: question
    })
      .then(() => {
        console.log('Data set.')
      });
  }, [question, coverImageUrl, instructionQuestion])

  const QuestionsUI = React.useMemo(() => question?.map((it, index) => <UploadCard>
    <UploadObjectTitle>{t.customizedScreen.question}{index + 1}</UploadObjectTitle>
    <QuestionInputContainer>
      <UploadObjectDiscription>{t.customizedScreen.question}:</UploadObjectDiscription>
      <QuestionInput
        value={it.question}
        onChangeText={(text) => UpdateQuestion(index, "quesiton", text)}
      />
    </QuestionInputContainer>
    <QuestionInputContainer>
      <UploadObjectDiscription>{t.customizedScreen.answer}:</UploadObjectDiscription>
      <QuestionInput
        value={it.answer}
        onChangeText={(text) => UpdateQuestion(index, "answer", text)}
      />
    </QuestionInputContainer>
    <QuestionInputContainer>
      <UploadObjectDiscription>{t.customizedScreen.image}:</UploadObjectDiscription>
      {it?.imageLink != null && <ImageHistoryUpload onPress={() => {
        setModalVisible(true)
        setModalImageUrl(it.imageLink)

      }}>{t.customizedScreen.history}</ImageHistoryUpload>}
    </QuestionInputContainer>
    <UploadButtonGroup>
      <Button title={t.uploadScreen.takeImage} onPress={() => handleTakeImage(`${t.customizedScreen.question}${index + 1}${t.customizedScreen.image}`, index)} />
      <Button title={t.uploadScreen.select} onPress={() => handleUploadImage(`${t.customizedScreen.question}${index + 1}${t.customizedScreen.image}`, index)} />
    </UploadButtonGroup>

  </UploadCard>
  )
    , [question])

  const renderModalContent = React.useMemo(() =>
    <FullSceneImage
      source={{
        uri: modalImageUrl,
      }}
      resizeMode="contain"
    />
    , [modalImageUrl])


  return <SafeAreaView >
    <ScrollView >
      <Root>
        <SaveButtonContainer>
          <SaveButton onPress={UploadQuestions}>
            <SaveIcon name="content-save" />
          </SaveButton>
        </SaveButtonContainer>
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
                resizeMode="contain"
              />
              {coverImageUrl != null && <Text onPress={() => {
                setModalVisible(true)
                setModalImageUrl(coverImageUrl)

              }}>{t.customizedScreen.history}</Text>}
              <UploadButtonGroup>
                <Button title={t.uploadScreen.takeImage} onPress={() => handleTakeImage(it.title)} />
                <Button title={t.uploadScreen.select} onPress={() => handleUploadImage(it.title)} />
              </UploadButtonGroup>
            </UploadCardContent>
          </UploadCard>)}
        <UploadCard>
          <UploadObjectTitle>{t.customizedScreen.instructionQuestion}</UploadObjectTitle>
          <UploadObjectDiscription>{t.customizedScreen.instructionQuestionDescription}</UploadObjectDiscription>
          <InstructionQuestionInput
            value={instructionQuestion}
            onChangeText={setInstructionQuestion}
          />
        </UploadCard>
        {QuestionsUI}

      </Root>
    </ScrollView>

    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false)
      }}
    >
      <ModalContainer onPress={() => setModalVisible(false)}>
        {renderModalContent}
      </ModalContainer>

    </Modal>
  </SafeAreaView>


}
);