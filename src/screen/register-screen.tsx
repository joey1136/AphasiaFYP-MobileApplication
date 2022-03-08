import { observer } from 'mobx-react'
import styled from 'styled-components'
import * as React from 'react'
import { Text, TextInput, Button } from 'react-native'
import { t } from '../language-pack/language'
import auth from '@react-native-firebase/auth';

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

export const RegisterScreen = observer(({ navigation }) => {
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [validEmail, setValidEmail] = React.useState<Boolean>(true)
    const [ValidPassword, setValidPassword] = React.useState<Boolean>(true)
    const [firebaseMessage, setFirebaseMessage] = React.useState("")

    const handleRegister = React.useCallback(() => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(email) === false) {
            console.log("Email is Not Correct");
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
                setFirebaseMessage(t.registerScreen.successMessage);
                console.log("CreateSuccess")
                navigation.pop()
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    setFirebaseMessage(t.registerScreen.duplicatedEmailWarning);
                } else {
                    setFirebaseMessage(error.code)
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
                {validEmail === false && <WarningMessage>{t.registerScreen.successMessage}</WarningMessage>}
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
            <WarningMessage>{firebaseMessage}</WarningMessage>
        </Root>
    );

}
);