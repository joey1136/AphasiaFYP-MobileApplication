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
import Toast from 'react-native-toast-message';
import { showToast as showToastInPage } from '../functions/showToast'

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
  gap:10px;
`

const UploadObjectImage = styled(Image)`
  width:100%;
  height:200px;
  justify-content : center;
`

const QuestionInputContainer = styled.View`
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content:space-between;
  padding-top:12px;
`

const QuestionInput = styled(TextInput) <{ $warning: boolean }>`
  height: 40px;
  margin-bottom: 12px;
  border-bottom-width: 1px;
  width:80%;
  background-color: ${({ $warning }) => $warning ? "lightyellow" : undefined}
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
`

const SaveIcon = styled(MaterialCommunityIcon)`
  font-size:30px;
`

const OpacityModalContainer = styled(TouchableOpacity)`
  height:100%;
  width:100%;
  justify-content : center;
  display:flex;
  align-items:center;
  background-color:rgba(0, 0, 0, 0.8);
`

const ModalContainer = styled.View`
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

const ImageHistoryUpload = styled(Text) <{ $warning: boolean }>`
  font-size:16px
  color:black;
  width:40%;
  padding-bottom:15px;
  color:grey;
  background-color: ${({ $warning }) => $warning ? "lightyellow" : undefined}
`

const QuestionTitleContainer = styled.View`
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  align-items:center;
`

const DeleteIcon = styled(MaterialCommunityIcon)`
  font-size:25px;
`

const AddQuestionConfirmButtonContainer = styled.View`
  padding-top:15px;
`

const UploadIcon = styled(MaterialCommunityIcon)`
  font-size:30px;
  padding-left:10px;
`

export const CustomizedScreen = observer(({ route, navigation }) => {
  const { showToast } = route.params

  const [totalQuestion, setTotalQuestion] = React.useState(0)
  const [question, setQuestion] = React.useState([])
  const [instructionQuestion, setInstructionQuestion] = React.useState(undefined)
  const [coverImageUrl, setCoverImageUrl] = React.useState(undefined)
  const [modalImageUrl, setModalImageUrl] = React.useState(undefined);

  const [newQuestion, setNewQuestion] = React.useState(undefined);
  const [newQuestionAnswer, setNewQuestionAnswer] = React.useState(undefined);
  const [newQuestionImagsUrl, setNewQuestionImageUrl] = React.useState(undefined);

  const [newQuestionModalWarning, setNewQuestionModalWarning] = React.useState(false);
  const [warning, setWarning] = React.useState(false);

  const [modalVisible, setModalVisible] = React.useState(false);
  const [addQuestionModalVisible, setAddQuestionModalVisible] = React.useState(false);
  const [deleteQuestionModalVisible, setDeleteQuestionModalVisible] = React.useState(false);

  const [deleteQuestionIndex, setDeleteQuestionIndex] = React.useState(undefined);

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
        if (JsonObject.totalQuestions != null) {
          setTotalQuestion(JsonObject.totalQuestions)
          if (JsonObject.questions != null) {
            setQuestion(JsonObject.questions)
          }
        } if (JsonObject.instructionQuestion != null) {
          setInstructionQuestion(JsonObject.instructionQuestion)
        }
        if (JsonObject.coverImageLink != null) {
          setCoverImageUrl(JsonObject.coverImageLink)
        }
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

  const DeleteQuestion = React.useCallback((index: number) => {
    if (question == null) return
    var newQuestion = [...question]
    newQuestion.splice(index, 1);
    setQuestion(newQuestion)
  }, [question])

  const CheckQuestion = React.useCallback(() => {
    var isWarning = false;
    question?.forEach((it) => {
      if (it.question == null || it.answer == null || it.imageLink == null || it.question == "" || it.answer == "" || it.imageLink == "") {
        setWarning(true)
        isWarning = true
        return
      }
    })
    if (!isWarning) {
      setWarning(false)
      UploadQuestions()
    }
  }, [question, coverImageUrl, instructionQuestion])

  const UploadQuestions = React.useCallback(() => {
    const user = auth().currentUser
    if (!user) {
      showToastInPage("error", t.toastMessage.error.loginErrorMessage)
      return
    }
    if (question == null) return
    const reference = firebase
      .app().database('https://fyp-aphasia-default-rtdb.asia-southeast1.firebasedatabase.app/')
      .ref(`/customizedQuestion/${user.uid}`);

    const onHide = () => navigation.pop()

    reference.set({
      coverImageLink: coverImageUrl,
      instructionQuestion: instructionQuestion,
      totalQuestions: question.length,
      questions: question
    })
      .then(() => {
        showToast("success", t.toastMessage.success.dataSetSuccessMessage, 2000, onHide, onHide)
      });
  }, [question, coverImageUrl, instructionQuestion])

  const Objects = t.customizedScreen.Object
  const handleUploadImage = React.useCallback(async (objectName: string, index?: number) => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: false,
    });
    if (result.didCancel) {
      showToastInPage("error", t.toastMessage.error.uploadCancelMessage)
    } else {
      uploadImage(objectName, result, index)
    }
  }
    , [])

  const handleTakeImage = React.useCallback(async (objectName: string, index?: number) => {
    const result = await launchCamera({
      mediaType: 'photo',
      includeBase64: false,
    });
    if (result.didCancel) {
      showToastInPage("error", t.toastMessage.error.uploadCancelMessage)
    } else {
      uploadImage(objectName, result, index)
    }
  }
    , [])

  const uploadImage = React.useCallback(async (objectName: string, Image: ImagePickerResponse, index?: number) => {
    const user = auth().currentUser
    if (!user) {
      showToastInPage("error", t.toastMessage.error.loginErrorMessage)
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
        if (index >= totalQuestion) {
          setNewQuestionImageUrl(link)
        } else {
          UpdateQuestion(index, "url", link)
        }
      }
    }
    showToastInPage("success", `${t.customizedScreen.image}:${objectName}${t.customizedScreen.uploadSuccess}`)
  }
    , [totalQuestion])

  const renderQuestionsCard = React.useMemo(() => question?.map((it, index) =>
    <UploadCard>
      <QuestionTitleContainer>
        <UploadObjectTitle>{t.customizedScreen.question}{index + 1}</UploadObjectTitle>
        <DeleteIcon name="delete" onPress={() => {
          setDeleteQuestionIndex(index)
          setDeleteQuestionModalVisible(true)
        }} />
      </QuestionTitleContainer>
      <QuestionInputContainer>
        <UploadObjectDiscription>{t.customizedScreen.question}:</UploadObjectDiscription>
        <QuestionInput
          value={it.question}
          onChangeText={(text) => UpdateQuestion(index, "quesiton", text)}
          placeholder={t.customizedScreen.questionPlaceholder}
          $warning={warning && it.question == null || it.question == ""}
        />
      </QuestionInputContainer>
      <QuestionInputContainer>
        <UploadObjectDiscription>{t.customizedScreen.answer}:</UploadObjectDiscription>
        <QuestionInput
          value={it.answer}
          onChangeText={(text) => UpdateQuestion(index, "answer", text)}
          placeholder={t.customizedScreen.answerPlaceholder}
          $warning={warning && it.answer == null || it.answer == ""}
        />
      </QuestionInputContainer>
      <QuestionInputContainer>
        <UploadObjectDiscription>{t.customizedScreen.image}:</UploadObjectDiscription>
        {it?.imageLink != null ?
          <ImageHistoryUpload onPress={() => {
            setModalVisible(true)
            setModalImageUrl(it.imageLink)

          }}>{t.customizedScreen.history}</ImageHistoryUpload>
          :
          <ImageHistoryUpload $warning={warning}>{t.customizedScreen.nohistory}</ImageHistoryUpload>
        }
        <UploadButtonGroup>
          <UploadIcon name="camera" onPress={() => handleTakeImage(`${t.customizedScreen.question}${index + 1}${t.customizedScreen.image}`, index)} />
          <UploadIcon name="upload" onPress={() => handleUploadImage(`${t.customizedScreen.question}${index + 1}${t.customizedScreen.image}`, index)} />
        </UploadButtonGroup>
      </QuestionInputContainer>
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


  const renderAddNewQuestionModalContent = React.useMemo(() =>
    <ModalContainer>
      <UploadCard>
        <QuestionTitleContainer>
          <UploadObjectTitle>{t.customizedScreen.new}{t.customizedScreen.question}{totalQuestion + 1}</UploadObjectTitle>
          <DeleteIcon name="close" onPress={() => {
            setAddQuestionModalVisible(false)
            setNewQuestionModalWarning(false)
          }
          } />
        </QuestionTitleContainer>
        <QuestionInputContainer>
          <UploadObjectDiscription>{t.customizedScreen.question}:</UploadObjectDiscription>
          <QuestionInput
            value={newQuestion}
            onChangeText={setNewQuestion}
            $warning={newQuestionModalWarning && newQuestion == null}
            placeholder={t.customizedScreen.questionPlaceholder}
          />
        </QuestionInputContainer>
        <QuestionInputContainer>
          <UploadObjectDiscription>{t.customizedScreen.answer}:</UploadObjectDiscription>
          <QuestionInput
            value={newQuestionAnswer}
            onChangeText={setNewQuestionAnswer}
            $warning={newQuestionModalWarning && newQuestionAnswer == null}
            placeholder={t.customizedScreen.answerPlaceholder}
          />
        </QuestionInputContainer>
        <QuestionInputContainer>
          <UploadObjectDiscription>{t.customizedScreen.image}:</UploadObjectDiscription>
          {newQuestionImagsUrl != null
            ?
            <ImageHistoryUpload onPress={() => {
              setModalVisible(true)
              setModalImageUrl(newQuestionImagsUrl)
            }}>{t.customizedScreen.history}</ImageHistoryUpload>
            :
            <ImageHistoryUpload $warning={newQuestionModalWarning}>{t.customizedScreen.nohistory}</ImageHistoryUpload>}
          <UploadButtonGroup>
            <UploadIcon name="camera" onPress={() => handleTakeImage(`${t.customizedScreen.question}${totalQuestion + 1}${t.customizedScreen.image}`, totalQuestion)} />
            <UploadIcon name="upload" onPress={() => handleUploadImage(`${t.customizedScreen.question}${totalQuestion + 1}${t.customizedScreen.image}`, totalQuestion)} />
          </UploadButtonGroup>
        </QuestionInputContainer>
        <AddQuestionConfirmButtonContainer>
          <Button title={t.customizedScreen.confirm} onPress={() => {
            if (newQuestion == null || newQuestionAnswer == null || newQuestionImagsUrl == null) {
              setNewQuestionModalWarning(true)
            } else {
              var addQuestionSet = { "question": newQuestion, "answer": newQuestionAnswer, "imageLink": newQuestionImagsUrl }
              var newQuestionSet = [...question]
              newQuestionSet.push(addQuestionSet)
              setQuestion(newQuestionSet)
              setAddQuestionModalVisible(false)
              setTotalQuestion(totalQuestion + 1)
              setNewQuestion(undefined)
              setNewQuestionAnswer(undefined)
              setNewQuestionImageUrl(undefined)
              setNewQuestionModalWarning(false)
            }
          }} />
        </AddQuestionConfirmButtonContainer>
      </UploadCard>
    </ModalContainer>
    , [question, newQuestion, newQuestionAnswer, newQuestionImagsUrl, newQuestionModalWarning, totalQuestion])

  const renderDeleteQuestionModalContent = React.useMemo(() =>
    <ModalContainer>
      <UploadCard>
        <QuestionTitleContainer>
          <UploadObjectTitle>{t.customizedScreen.deleteModalTitle}{deleteQuestionIndex + 1}?</UploadObjectTitle>
          <DeleteIcon name="close" onPress={() => {
            setDeleteQuestionModalVisible(false)
            setDeleteQuestionIndex(undefined)
          }
          } />
        </QuestionTitleContainer>
        <AddQuestionConfirmButtonContainer>
          <Button title={t.customizedScreen.confirm} onPress={() => {
            setDeleteQuestionModalVisible(false)
            DeleteQuestion(deleteQuestionIndex)
            setDeleteQuestionIndex(undefined)
          }} />
        </AddQuestionConfirmButtonContainer>
      </UploadCard>
    </ModalContainer>
    , [question, deleteQuestionIndex])


  return <SafeAreaView >
    <ScrollView >
      <Root>
        <SaveButtonContainer>
          <SaveButton onPress={CheckQuestion}>
            <SaveIcon name="content-save" />
          </SaveButton>
        </SaveButtonContainer>
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
              <QuestionInputContainer>
                {coverImageUrl != null
                  ?
                  <Text onPress={() => {
                    setModalVisible(true)
                    setModalImageUrl(coverImageUrl)
                  }}>{t.customizedScreen.history}</Text>
                  :
                  <ImageHistoryUpload >{t.customizedScreen.nohistory}</ImageHistoryUpload>}
                <UploadButtonGroup>
                  <UploadIcon name="camera" onPress={() => handleTakeImage(it.title)} />
                  <UploadIcon name="upload" onPress={() => handleUploadImage(it.title)} />
                </UploadButtonGroup>
              </QuestionInputContainer>
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
        {renderQuestionsCard}
        <SaveButtonContainer>
          <SaveButton onPress={() => setAddQuestionModalVisible(true)}>
            <SaveIcon name="plus" />
          </SaveButton>
        </SaveButtonContainer>
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
      <OpacityModalContainer onPress={() => setModalVisible(false)}>
        {renderModalContent}
      </OpacityModalContainer>
    </Modal>
    <Modal
      animationType="slide"
      transparent={true}
      visible={addQuestionModalVisible}
      onRequestClose={() => {
        setAddQuestionModalVisible(false)
      }}
    >
      {renderAddNewQuestionModalContent}
    </Modal>
    <Modal
      animationType="slide"
      transparent={true}
      visible={deleteQuestionModalVisible}
      onRequestClose={() => {
        setDeleteQuestionModalVisible(false)
      }}
    >
      {renderDeleteQuestionModalContent}
    </Modal>
    <Toast />
  </SafeAreaView>
}
);