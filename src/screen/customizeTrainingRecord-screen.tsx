import { observer } from 'mobx-react'
import * as React from 'react';
import { Text } from 'react-native'
import styled from 'styled-components';


const Root = styled.View`

`

export const CustomizedTrainingRecordScreen = observer(() => {
    return <Root>
        <Text>123</Text>
    </Root>
}
);
