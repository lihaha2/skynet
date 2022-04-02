import { useEffect, useRef, useState } from 'react'
import {
    Dimensions,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    BackHandler,
    View,
    ScrollView
} from 'react-native'
import WebView from 'react-native-webview'
//@ts-ignore
import Logo from './assets/splash.svg'



const { width, height } = Dimensions.get('window')

export default function App() {
    const [loading, setLoading] = useState(true)
    const webref = useRef<any>()
    BackHandler.addEventListener('hardwareBackPress', function () {
        !!webref && webref.current.goBack()

        return true
    })

    useEffect(() => {
        setTimeout(() => setLoading(false), 2000)
    }, [])

    const injectedScript = `
        const SendLocalStorage = function() {
            if(!document) {
                SendLocalStorage();
            }
            else {
                document.querySelector('body')
                    .style['-webkit-tap-highlight-color'] = 'transparent'
            }
        }
        
        SendLocalStorage()
    `

    return (
        <>
            {/* <ScrollView  /> */}
            <StatusBar
                animated={true}
                backgroundColor='#6fb316'
                // barStyle='dark-content'
            />
            <SafeAreaView style={styles.container}>
                <WebView
                    overScrollMode='never'
                    mixedContentMode={'compatibility'}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    injectedJavaScript={injectedScript}
                    ref={(ref) => {
                        webref.current = ref
                    }}
                    style={{ width, height }}
                    source={{ uri: 'https://skynet.ru/' }}
                />
            </SafeAreaView>
            {loading &&
                <View style={styles.splashScreen}>
                    <Logo />
                </View>
            }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        height: height,
        backgroundColor: '#141414',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        zIndex: 1,
        elevation: 1
    },
    splashScreen: {
        width,
        height,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
        elevation: 100,
        position: 'absolute',
        left: 0,
        top: 0
    }
})
