import { observer } from 'mobx-react'
import styled from 'styled-components'
import * as React from 'react'
import { Text, TextInput, Button } from 'react-native'
import { t } from '../language-pack/language'

const Root = styled.View`
  flex : 1;
  align-items : center;
  justify-content : center;
`

const Title = styled(Text)`
    font-size:20px;
    color:black;
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

    const handleRegister = React.useCallback(() => {
        console.log('123')
    }
        , [])

    return (
        <Root>
            <InputField>
                <Title>{t.registerScreen.email}</Title>
                <Input
                    onChangeText={setEmail}
                    value={email}
                />
            </InputField>
            <InputField>
                <Title>{t.registerScreen.password}</Title>
                <Input
                    onChangeText={setPassword}
                    value={password}
                />
            </InputField>
            <ButtonContainer>
                <Button title={t.profileScreen.register} onPress={handleRegister} />
            </ButtonContainer>
        </Root>
    );

}
);