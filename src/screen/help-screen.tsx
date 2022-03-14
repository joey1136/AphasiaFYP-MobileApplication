import { observer } from 'mobx-react'
import * as React from 'react';
import { Text } from 'react-native'
import styled from 'styled-components';
import Pdf from 'react-native-pdf';

const Root = styled.View`
    height:100%;

    flex:1;
    justify-content:center;
`

const PDFReader = styled(Pdf)`
    height:80%;
    width:100%;
`

export const HelpScreen = observer(() => {
    const source = { uri: 'https://firebasestorage.googleapis.com/v0/b/fyp-aphasia.appspot.com/o/sample%2Fuser_manual.pdf?alt=media&token=7512d646-d12b-4ad6-8ec5-94a28a953bff', cache: true };

    return <Root>
        <PDFReader
            source={source}
            onLoadComplete={(numberOfPages, filePath) => {
                console.log(`Number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
                console.log(`Current page: ${page}`);
            }}
            onError={(error) => {
                console.log(error);
            }}
            onPressLink={(uri) => {
                console.log(`Link pressed: ${uri}`);
            }} />
    </Root>
}
);
