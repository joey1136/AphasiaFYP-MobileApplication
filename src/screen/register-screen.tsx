import { observer } from 'mobx-react'
import styled from 'styled-components'
import * as React from 'react'
import { Text, TextInput, Button } from 'react-native'
import { t } from '../language-pack/language'
import auth, { firebase } from '@react-native-firebase/auth';
import { showToast as showToastInPage } from '../functions/showToast'
import { Toast } from 'react-native-toast-message/lib/src/Toast'

const Root = styled.View`
  flex : 1;
  align-items : center;
  justify-content : center;
`

const Title = styled(Text)`
    font-size:20px;
    color:black;
`

const WarningMessage = styled(Text)`
    font-size:14px;
    color:red;
`

const Input = styled(TextInput)`
    height:60px;
    width:250px;
    border-width:1px;
    padding:10px;
    font-size:20px;
    border-radius:10px;
`

const InputField = styled.View`
    margin:12px;
`

const ButtonContainer = styled.View`
  padding:10px;
`

export const RegisterScreen = observer(({ route, navigation }) => {
    const { showToast, setLoginCode } = route.params

    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [validEmail, setValidEmail] = React.useState<Boolean>(true)
    const [ValidPassword, setValidPassword] = React.useState<Boolean>(true)

    const handleRegister = React.useCallback(() => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(email) === false) {
            setValidEmail(false)

            if (password === "" || password.length < 6) {
                setValidPassword(false)
                return
            }
            return
        }

        if (password === "" || password.length < 6) {
            setValidPassword(false)
            return
        }

        setValidEmail(true)
        setValidPassword(true)

        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                const reference = firebase
                    .app()
                    .database('https://fyp-aphasia-default-rtdb.asia-southeast1.firebasedatabase.app/')
                    .ref(`/accountRecord`);

                const code = reference.once('value')
                    .then(snapshot => {
                        var unityCode = Math.floor(Math.random() * 899 + 100)
                        var JsonObject = snapshot.val()

                        if (JsonObject.length >= 999) {
                            showToastInPage("error", t.registerScreen.fullAccountWarning)
                        } else {
                            var duplicatedCode = JsonObject.filter((it) => it.code === unityCode)
                            while (duplicatedCode.length > 0) {
                                unityCode = Math.floor(Math.random() * 899 + 100)
                                var duplicatedCode = JsonObject.filter((it) => it.code === unityCode)
                            }
                            const user = auth().currentUser
                            setLoginCode(unityCode)
                            JsonObject.push({ "code": `${unityCode}`, "id": `${user.uid}` })

                            reference.set(JsonObject)
                                .then(() => {
                                    navigation.pop()
                                    showToast("success", t.registerScreen.successMessage)
                                });
                        }

                    });
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    showToastInPage("error", t.registerScreen.duplicatedEmailWarning)
                } else {
                    showToastInPage("error", error.code)
                }
            });
    }
        , [email, password])

    return (
        <Root>
            <InputField>
                <Title>{t.registerScreen.email}</Title>
                <Input
                    onChangeText={setEmail}
                    value={email}
                />
                {validEmail === false && <WarningMessage>{t.registerScreen.nonValidEmailWarning}</WarningMessage>}
            </InputField>
            <InputField>
                <Title>{t.registerScreen.password}</Title>
                <Input
                    onChangeText={setPassword}
                    value={password}
                />
                {ValidPassword === false && <WarningMessage>{t.registerScreen.nonValidPasswordWarning}</WarningMessage>}
            </InputField>
            <ButtonContainer>
                <Button title={t.profileScreen.register} onPress={handleRegister} />
            </ButtonContainer>
            <Toast />
        </Root>
    );

}
);