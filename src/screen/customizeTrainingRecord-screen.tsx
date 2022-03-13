import { observer } from 'mobx-react'
import * as React from 'react';
import { Text, TouchableOpacity, Modal, ScrollView, Image } from 'react-native'
import styled from 'styled-components';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';
import { t } from '../language-pack/language'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

const Root = styled.View`
    height:100%;
    align-items:center;
    flex:1;
`

const Placeholder = styled(Text)`
    font-size:18px;
    text-align:center;
`

const CorrectRateTitle = styled(Text)`
    font-size:25px;
    text-align:center;
`

const CorrectRateText = styled(Text)`
    font-size:35px;
    text-align:center;
`
const CorrectRatePercentage = styled(Text)`
    font-size:20px;
    text-align:center;
`

const CorrectRateBackground = styled(TouchableOpacity)`
    background-color: white;
    border-radius:200px;
    width:240px;
    height:240px;
    display:flex;
    justify-content:center;
`

const CorrectRateBorder = styled(TouchableOpacity)`
    background-color: lightblue;
    border-radius:200px;
    width:270px;
    height:270px;
    display:flex;
    justify-content:center;
    align-items:center;
    margin:20px;
`

const RecordTable = styled.View`
    width:85%;
    max-height:50%;
    border: 2px solid lightgrey;
`

const RecordTableHeader = styled.View`
    background-color:lightgrey;
    display:flex;
    flex-direction:row;
    border:5px solid white;
`

const RecordRow = styled(TouchableOpacity)`
    background-color:lightblue;
    display:flex;
    flex-direction:row;
    border:5px solid white;
`

const RecordCell = styled(Text)`
    font-size:18px;
    margin:2px;
    text-align:center;
`

const RowIndex = styled(RecordCell)`
    flex:1.2;
    text-align:left;
`

const RowTime = styled(RecordCell)`
    flex:5;
`

const RowPercentage = styled(RecordCell)`
    flex:2;
`

const ModalContainer = styled.View`
    height:100%;
    width:100%;
    justify-content : center;
    display:flex;
    flex-direction:row;
    align-items:center;
    background-color:rgba(0, 0, 0, 0.8);
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

const ModalBackground = styled.View`
    height:70%;
    width:80%;
    background-color:white;
`

const ModalContent = styled.View`
    padding:10px;
`

const ModalHeader = styled.View`
    height:10%;
    background-color:lightgrey;
    display:flex;
    flex-direction:row;
    width:100%;
    justify-content:space-between
    padding:10px;
    align-items:center;

`
const ModalTitle = styled(Text)`
    font-size:22px;
`

const ModalText = styled(Text)`
    font-size:20px;
`

const DeleteIcon = styled(MaterialCommunityIcon)`
    font-size:30px;
`

const CorrectIcon = styled(MaterialCommunityIcon)`
    font-size:30px;
    color:green;
`
const WrongIcon = styled(MaterialCommunityIcon)`
    font-size:30px;
    color:red
`

const ChangePageIcon = styled(MaterialCommunityIcon)`
    font-size:35px;
    margin:5px;
    color:white;
`

const StyledScrollView = styled(ScrollView)`
    height:90%;
`
const QuestionCard = styled.View`
    border:2px solid lightgrey;
    margin-bottom:10px;
   
`
const QuestionTitle = styled(Text)`
    font-size:20px;
    padding:4px;
`

const QuestionCardText = styled(Text)`
    font-size:18px;
    padding:4px;
`

const FlexContainer = styled.View<{ $status?: boolean }>`
    display:flex;
    flex-direction:row;
    justify-content:space-between
    align-items:center;
    background-color:  ${({ $status }) => $status == null ? undefined : $status ? "lightgreen" : "pink"}
`

export const CustomizedTrainingRecordScreen = observer(() => {
    const [recordCount, setRecordCount] = React.useState(0)
    const [records, setRecords] = React.useState([])
    const [displayRecordIndex, setDisplayRecordIndex] = React.useState(undefined)
    const [modalVisible, setModalVisible] = React.useState(false)
    const [imageModalVisible, setImageModalVisible] = React.useState(false)
    const [modalImageUrl, setModalImageUrl] = React.useState(undefined);

    React.useEffect(() => {
        const user = auth().currentUser
        if (user == null) return
        const reference = firebase
            .app()
            .database('https://fyp-aphasia-default-rtdb.asia-southeast1.firebasedatabase.app/')
            .ref(`/trainingResult/${user.uid}/records`);
        const code = reference.once('value')
            .then(snapshot => {
                var JsonObject = snapshot.val()
                if (JsonObject != null) {
                    setRecordCount(JsonObject.length)
                    setRecords(JsonObject)
                }

            });
        return
    }, []);

    const handleShowRowDetail = React.useCallback((index) => {
        setDisplayRecordIndex(index)
        setModalVisible(true)
    }, [])

    const correctRate = React.useMemo(() => {
        var totalQuestionAnswered = 0
        var totalQuestionCorrected = 0
        records.map((it) => {
            totalQuestionAnswered += it.answers.length
            const correctedQuestions = it.answers?.filter((it) => it)
            totalQuestionCorrected += correctedQuestions.length
        })
        var percentage = Math.floor((totalQuestionCorrected / totalQuestionAnswered) * 100)
        return <CorrectRateBorder>
            <CorrectRateBackground>
                <CorrectRateTitle>{t.customizedTrainingRecord.correctRateTitle}</CorrectRateTitle>
                <CorrectRateText>{percentage}%</CorrectRateText>
                <CorrectRatePercentage>{totalQuestionCorrected} / {totalQuestionAnswered}</CorrectRatePercentage>
            </CorrectRateBackground>
        </CorrectRateBorder>

    }, [records])

    const renderRecordRow = React.useCallback((record, index) => {
        var totalQuestionCorrected = record.answers.filter((it) => it).length
        var totalQuestionAnswered = record.answers.length
        return <RecordRow onPress={() => handleShowRowDetail(index)}>
            <RowIndex>{index + 1}</RowIndex>
            <RowTime>{record.trainingTime}</RowTime>
            <RowPercentage>{totalQuestionCorrected}/{totalQuestionAnswered}</RowPercentage>
        </RecordRow>
    }, [])

    const renderModalContent = React.useMemo(() =>
        <ModalContainer >
            <ChangePageIcon name="arrow-left-circle-outline" onPress={() => {
                if (displayRecordIndex === 0) {
                    setDisplayRecordIndex(recordCount - 1)
                } else {
                    setDisplayRecordIndex(displayRecordIndex - 1)
                }
            }
            } />
            <ModalBackground>
                <ModalHeader>
                    <ModalTitle>{t.customizedTrainingRecord.modalTitle}{displayRecordIndex + 1}</ModalTitle>
                    <DeleteIcon name="close" onPress={() => {
                        setModalVisible(false)
                        setDisplayRecordIndex(undefined)
                    }} />
                </ModalHeader>
                <ModalContent>
                    <StyledScrollView>
                        <ModalText>{t.customizedTrainingRecord.tableTrainingTimeTitle} : {records[displayRecordIndex]?.trainingTime}</ModalText>
                        {records[displayRecordIndex]?.question?.map((question, recordIndex) =>
                            <QuestionCard >
                                <FlexContainer $status={records[displayRecordIndex]?.answers[recordIndex].toString() === 'true'}>
                                    <QuestionTitle >{t.customizedScreen.question}{recordIndex + 1}</QuestionTitle>
                                    {records[displayRecordIndex]?.answers[recordIndex].toString() === 'true'
                                        ?
                                        <CorrectIcon name="check" />
                                        :
                                        <WrongIcon name="close" />}
                                </FlexContainer>
                                <QuestionCardText>{t.customizedScreen.question} : {question}</QuestionCardText>
                                <QuestionCardText>{t.customizedTrainingRecord.modalAnswer} : {records[displayRecordIndex]?.modalAnswer[recordIndex]}</QuestionCardText>
                                <QuestionCardText onPress={() => {
                                    setImageModalVisible(true)
                                    setModalImageUrl(records[displayRecordIndex]?.imageLink[recordIndex])
                                }}>{t.customizedScreen.image} : {t.customizedScreen.history}</QuestionCardText>
                                <QuestionCardText>{t.customizedTrainingRecord.userAnswerTitle} : {records[displayRecordIndex]?.answersRecord[recordIndex]}</QuestionCardText>
                            </QuestionCard>
                        )}
                    </StyledScrollView>
                </ModalContent>
            </ModalBackground>
            <ChangePageIcon name="arrow-right-circle-outline" onPress={() => {
                if (displayRecordIndex === recordCount - 1) {
                    setDisplayRecordIndex(0)
                } else {
                    setDisplayRecordIndex(displayRecordIndex + 1)
                }
            }} />
        </ModalContainer>
        , [records, displayRecordIndex])

    return recordCount > 0 ? <Root>
        {correctRate}
        <RecordTable>
            <RecordTableHeader>
                <RowIndex>{t.customizedTrainingRecord.tableIndexTitle}</RowIndex>
                <RowTime>{t.customizedTrainingRecord.tableTrainingTimeTitle}</RowTime>
                <RowPercentage>{t.customizedTrainingRecord.tableCorrectTitle}</RowPercentage>
            </RecordTableHeader>
            <ScrollView>
                {records?.map((it, index) => renderRecordRow(it, index))}
            </ScrollView>
        </RecordTable>
        <Text></Text>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(false)
            }}
        >
            {renderModalContent}
        </Modal>
        <Modal
            animationType="slide"
            transparent={true}
            visible={imageModalVisible}
            onRequestClose={() => {
                setImageModalVisible(false)
            }}
        >
            <OpacityModalContainer onPress={() => setImageModalVisible(false)}>
                <FullSceneImage
                    source={{
                        uri: modalImageUrl,
                    }}
                    resizeMode="contain"
                />
            </OpacityModalContainer>
        </Modal>
        <Placeholder>{t.customizedTrainingRecord.selectRecordPlaceholder}</Placeholder>
    </Root> :
        <Root>
            <Placeholder>{t.customizedTrainingRecord.noRecordPlaceholder}</Placeholder>
        </Root>
}
);
