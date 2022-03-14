import { observer } from 'mobx-react'
import * as React from 'react';
import { Text } from 'react-native'
import styled from 'styled-components';


const Root = styled.View`
    height:100%;
    align-items:center;
    flex:1;
    justify-content:center;
`

export const HelpScreen = observer(() => {
    return <Root>
        <Text>123</Text>
    </Root>
}
);
