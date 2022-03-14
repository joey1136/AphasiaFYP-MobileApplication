import { observer } from 'mobx-react'
import * as React from 'react';
import { Text, Image, TouchableOpacity, Linking } from 'react-native'
import styled from 'styled-components';
import Pdf from 'react-native-pdf';
import { t } from '../language-pack/language'
import { firebase } from '@react-native-firebase/database';

const Root = styled.View`
    height:100%;
    flex:1;
    justify-content:center;
`

const PDFReader = styled(Pdf)`
    height:50%;
    width:100%;
`

const PDFReaderTitle = styled(Text)`
    font-size:20px;
    color:black;
    padding-bottom:20px;
`

const ImageTitle = styled(Text)`
    font-size:20px;
    color:black;
`

const StyledImage = styled(Image)`
    width:100%;
    height:100%;
`

const ImageContainer = styled(TouchableOpacity)`
    height:80%;
`

const DemoContainer = styled.View`
    width:50%;
    height:100%;
    justify-content:space-between;
    padding:10px;
`

const DemosContainer = styled.View`
    height:30%;
    display:flex;
    flex-direction:row;

`

export const HelpScreen = observer(() => {
    const source = { uri: 'https://firebasestorage.googleapis.com/v0/b/fyp-aphasia.appspot.com/o/sample%2Fuser_manual.pdf?alt=media', cache: true };
    const [demo1Url, setDemo1Url] = React.useState(undefined)
    const [demo2Url, setDemo2Url] = React.useState(undefined)

    React.useEffect(() => {
        const reference = firebase
            .app()
            .database('https://fyp-aphasia-default-rtdb.asia-southeast1.firebasedatabase.app/')
            .ref(`/demoVideoLink`);
        const code = reference.once('value')
            .then(snapshot => {
                var JsonObject = snapshot.val()
                if (JsonObject.demo1 != null) {
                    setDemo1Url(JsonObject.demo1)
                }
                if (JsonObject.demo2 != null) {
                    setDemo2Url(JsonObject.demo2)
                }
            });
        return
    }, []);

    return <Root>
        <DemosContainer>
            <DemoContainer>
                <ImageTitle>{t.help.demo1Title}</ImageTitle>
                <ImageContainer onPress={() => { Linking.openURL(demo1Url).catch(err => console.error('An error occurred', err)); }}>
                    <StyledImage
                        source={{
                            uri: "https://firebasestorage.googleapis.com/v0/b/fyp-aphasia.appspot.com/o/sample%2Fframe_image.PNG?alt=media&token=0d519deb-0bbc-4edf-897b-f67d84784b73",
                        }}
                        resizeMode="contain"
                    />
                </ImageContainer>
            </DemoContainer>
            <DemoContainer>
                <ImageTitle>{t.help.demo2Title}</ImageTitle>
                <ImageContainer onPress={() => { Linking.openURL(demo2Url).catch(err => console.error('An error occurred', err)); }}>
                    <StyledImage
                        source={{
                            uri: "https://firebasestorage.googleapis.com/v0/b/fyp-aphasia.appspot.com/o/sample%2Falbum_training.PNG?alt=media&token=c1af4f6c-97a9-4986-9eeb-0ffd083e8a2e",
                        }}
                        resizeMode="contain"
                    />
                </ImageContainer>
            </DemoContainer>
        </DemosContainer>
        <PDFReaderTitle>{t.help.userManualTitle}</PDFReaderTitle>
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
